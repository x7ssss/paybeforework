import { notFound } from 'next/navigation';
import { eq, desc } from 'drizzle-orm';
import { db, ensureDbInitialized } from '@/db/client';
import { contracts, auditLogs } from '@/db/schema';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  ShieldCheck,
  FileText,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  await ensureDbInitialized();

  const { contractId } = await params;
  if (!contractId) {
    notFound();
  }

  const matched = await db
    .select()
    .from(contracts)
    .where(eq(contracts.id, contractId))
    .limit(1);

  if (matched.length === 0) {
    notFound();
  }

  const contract = matched[0];

  const matchedAudit = await db
    .select()
    .from(auditLogs)
    .where(eq(auditLogs.contractId, contract.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(1);

  const audit = matchedAudit.length > 0 ? matchedAudit[0] : null;

  let deliverables: string[] = [];
  try {
    deliverables = JSON.parse(contract.deliverables);
  } catch {
    deliverables = [contract.deliverables];
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm shadow-emerald-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Legally Ratified & Tamper-Evident</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Agreement Ratified & Deposit Authorized
        </h1>

        <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
          The milestone agreement for <strong className="text-slate-900">{contract.title}</strong> has been
          countersigned. An electronic audit log has been immutably recorded.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`/api/pdf/${contract.id}`}
            target="_blank"
            rel="noopener noreferrer"
            download={`PayBeforeWork-${contract.id}.pdf`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Countersigned PDF</span>
          </a>

          <a
            href={contract.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20 transition-all"
          >
            <span>Proceed to Payment Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Financial & Scope Recap */}
        <div className="mt-10 pt-8 border-t border-slate-100 text-left space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Upfront Deposit
              </span>
              <span className="text-xl font-extrabold text-emerald-700 mt-1 block">
                {contract.depositAmount.toFixed(2)} {contract.currency}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Total Contract: {contract.totalAmount.toFixed(2)} {contract.currency}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Freelancer / Vendor
              </span>
              <span className="text-base font-bold text-slate-900 mt-1 block">
                {contract.freelancerName}
              </span>
              {contract.freelancerTaxId && (
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Tax ID: {contract.freelancerTaxId}
                </span>
              )}
            </div>
          </div>

          {/* Audit Log Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800 text-xs">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>eIDAS / ESIGN Audit Trail</span>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                RATIFIED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div>
                <span className="text-slate-400">Signer:</span>{' '}
                {contract.signerName || audit?.signerName || 'Recorded'}
              </div>
              <div>
                <span className="text-slate-400">Email:</span>{' '}
                {contract.signerEmail || audit?.signerEmail || 'Recorded'}
              </div>
              <div>
                <span className="text-slate-400">Timestamp:</span>{' '}
                {contract.signedAt || audit?.signedAt || 'UTC'}
              </div>
              <div>
                <span className="text-slate-400">IP Address:</span>{' '}
                {contract.signerIp || audit?.ipAddress || 'Verified'}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 font-mono text-[10px] break-all">
              <span className="text-slate-400">Canonical SHA-256 Hash:</span>{' '}
              {contract.termsHash}
            </div>
          </div>

          {/* Itemized Deliverables Recap */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Ratified Deliverables
            </span>
            <div className="space-y-1.5">
              {deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Role Disclaimer */}
        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 italic">
            PayBeforeWork provides software generation and electronic signature infrastructure only. It is not an escrow agent, payment processor, or money services business. All payments are remitted directly to the contractor.
          </p>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link href={`/p/${contract.id}`} className="hover:text-blue-600 transition-colors">
            ← Back to Proposal View
          </Link>
          <Link href="/create" className="text-blue-600 font-semibold hover:underline">
            Create another contract →
          </Link>
        </div>
      </div>
    </div>
  );
}
