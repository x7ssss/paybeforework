import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { db, ensureDbInitialized } from '@/db/client';
import { contracts } from '@/db/schema';
import { createContractSchema } from '@/lib/validations';
import { calculateTermsHash } from '@/lib/hash';

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

    const validationResult = createContractSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((e) => e.message);
      return NextResponse.json(
        { success: false, error: errorMessages[0], details: errorMessages },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate unique 12-char nanoid ID
    const contractId = nanoid(12);

    // Calculate canonical SHA-256 integrity hash
    const termsHash = calculateTermsHash({
      title: data.title,
      scopeSummary: data.scopeSummary,
      deliverables: data.deliverables,
      revisionLimit: data.revisionLimit,
      outOfScopeHourlyRate: data.outOfScopeHourlyRate,
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount,
      currency: data.currency,
      freelancerName: data.freelancerName,
      paymentUrl: data.paymentUrl,
    });

    const nowIso = new Date().toISOString();

    // Insert into database with parameterized query
    await db.insert(contracts).values({
      id: contractId,
      freelancerName: data.freelancerName,
      freelancerTaxId: data.freelancerTaxId || null,
      paymentUrl: data.paymentUrl,
      title: data.title,
      scopeSummary: data.scopeSummary,
      deliverables: JSON.stringify(data.deliverables),
      revisionLimit: data.revisionLimit,
      outOfScopeHourlyRate: data.outOfScopeHourlyRate,
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount,
      currency: data.currency,
      status: 'pending',
      termsHash,
      createdAt: nowIso,
      updatedAt: nowIso,
    });

    return NextResponse.json(
      {
        success: true,
        contractId,
        contractUrl: `/p/${contractId}`,
        termsHash,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contract:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred while creating the contract.' },
      { status: 500 }
    );
  }
}
