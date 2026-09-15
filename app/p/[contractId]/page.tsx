import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db, ensureDbInitialized } from '@/db/client';
import { contracts } from '@/db/schema';
import ClientProposalView from '@/components/ClientProposalView';
import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  await ensureDbInitialized();

  const { contractId } = await params;

  if (!contractId || contractId.trim().length === 0) {
    notFound();
  }

  const matched = await db
    .select()
    .from(contracts)
    .where(eq(contracts.id, contractId))
    .limit(1);

  if (matched.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Proposal Not Found</h1>
        <p className="text-sm text-slate-600 mb-6">
          The requested milestone contract ({contractId}) does not exist or has expired.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  const contract = matched[0];
  let deliverables: string[] = [];
  try {
    deliverables = JSON.parse(contract.deliverables);
  } catch {
    deliverables = [contract.deliverables];
  }

  const serializedContract = {
    id: contract.id,
    freelancerName: contract.freelancerName,
    freelancerTaxId: contract.freelancerTaxId,
    paymentUrl: contract.paymentUrl,
    title: contract.title,
    scopeSummary: contract.scopeSummary,
    deliverables,
    revisionLimit: contract.revisionLimit,
    outOfScopeHourlyRate: contract.outOfScopeHourlyRate,
    totalAmount: contract.totalAmount,
    depositAmount: contract.depositAmount,
    currency: contract.currency,
    status: contract.status,
    termsHash: contract.termsHash,
    signerName: contract.signerName,
    signedAt: contract.signedAt,
  };

  return <ClientProposalView contract={serializedContract} />;
}
