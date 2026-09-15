import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, ensureDbInitialized } from '@/db/client';
import { contracts } from '@/db/schema';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ contractId: string }> }
) {
  try {
    await ensureDbInitialized();

    const { contractId } = await params;
    if (!contractId) {
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

    return NextResponse.json({
      success: true,
      contract: {
        ...contract,
        deliverables: JSON.parse(contract.deliverables),
      },
    });
  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contract' },
      { status: 500 }
    );
  }
}
