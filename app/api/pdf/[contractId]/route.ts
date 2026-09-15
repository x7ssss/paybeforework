import { NextRequest, NextResponse } from 'next/server';
import { eq, desc } from 'drizzle-orm';
import { db, ensureDbInitialized } from '@/db/client';
import { contracts, auditLogs } from '@/db/schema';
import { generateContractPdf } from '@/lib/pdf';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ contractId: string }> }
) {
  try {
    await ensureDbInitialized();

    const { contractId } = await params;
    if (!contractId || contractId.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Contract ID is required' },
        { status: 400 }
      );
    }

    const matchedContracts = await db
      .select()
      .from(contracts)
      .where(eq(contracts.id, contractId))
      .limit(1);

    if (matchedContracts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Contract not found' },
        { status: 404 }
      );
    }

    const contract = matchedContracts[0];

    // Fetch most recent audit log if available
    const matchedAuditLogs = await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.contractId, contract.id))
      .orderBy(desc(auditLogs.createdAt))
      .limit(1);

    const auditLog = matchedAuditLogs.length > 0 ? matchedAuditLogs[0] : null;

    const pdfBuffer = await generateContractPdf(contract, auditLog);

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="paybeforework-contract-${contract.id}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate contract PDF.' },
      { status: 500 }
    );
  }
}
