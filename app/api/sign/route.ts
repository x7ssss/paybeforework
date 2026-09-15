import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db, ensureDbInitialized } from '@/db/client';
import { contracts, auditLogs } from '@/db/schema';
import { signContractSchema } from '@/lib/validations';
import { verifyTermsHash, getLegalConsentText } from '@/lib/hash';

export async function POST(req: NextRequest) {
  try {
    await ensureDbInitialized();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request body' },
        { status: 400 }
      );
    }

    const validationResult = signContractSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((e) => e.message);
      return NextResponse.json(
        { success: false, error: errorMessages[0], details: errorMessages },
        { status: 400 }
      );
    }

    const { contractId, signerName, signerEmail } = validationResult.data;

    // Retrieve contract from DB
    const existingContracts = await db
      .select()
      .from(contracts)
      .where(eq(contracts.id, contractId))
      .limit(1);

    if (existingContracts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Contract not found' },
        { status: 404 }
      );
    }

    const contract = existingContracts[0];

    // Cryptographically validate contract hash
    let parsedDeliverables: string[] = [];
    try {
      parsedDeliverables = JSON.parse(contract.deliverables);
    } catch {
      parsedDeliverables = [contract.deliverables];
    }

    const isIntegrityValid = verifyTermsHash(contract.termsHash, {
      title: contract.title,
      scopeSummary: contract.scopeSummary,
      deliverables: parsedDeliverables,
      revisionLimit: contract.revisionLimit,
      outOfScopeHourlyRate: contract.outOfScopeHourlyRate,
      totalAmount: contract.totalAmount,
      depositAmount: contract.depositAmount,
      currency: contract.currency,
      freelancerName: contract.freelancerName,
      paymentUrl: contract.paymentUrl,
    });

    if (!isIntegrityValid) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Cryptographic integrity verification failed. Contract terms have been altered or corrupted.',
        },
        { status: 409 }
      );
    }

    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const nowIso = new Date().toISOString();

    const consentLegalText = getLegalConsentText(
      contract.title,
      contract.depositAmount,
      contract.currency
    );

    // Record audit log
    const auditLogId = nanoid(16);
    await db.insert(auditLogs).values({
      id: auditLogId,
      contractId: contract.id,
      signerName,
      signerEmail,
      ipAddress,
      userAgent,
      signedAt: nowIso,
      verifiedHash: contract.termsHash,
      consentText: consentLegalText,
      createdAt: nowIso,
    });

    // Update contract status to 'signed'
    await db
      .update(contracts)
      .set({
        status: 'signed',
        signerName,
        signerEmail,
        signerIp: ipAddress,
        signerUserAgent: userAgent,
        signedAt: nowIso,
        updatedAt: nowIso,
      })
      .where(eq(contracts.id, contract.id));

    return NextResponse.json({
      success: true,
      message: 'Contract ratified and signed successfully',
      contractId: contract.id,
      redirectUrl: contract.paymentUrl,
      signedAt: nowIso,
    });
  } catch (error) {
    console.error('Error signing contract:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred during contract signing.' },
      { status: 500 }
    );
  }
}
