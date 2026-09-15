'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  DollarSign,
  AlertCircle,
  FileText,
  Lock,
} from 'lucide-react';

export default function CreateContractPage() {
  const router = useRouter();

  // Form State
  const [freelancerName, setFreelancerName] = useState('');
  const [freelancerTaxId, setFreelancerTaxId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [title, setTitle] = useState('');
  const [scopeSummary, setScopeSummary] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Core MVP Architecture and Database Schema Setup',
    'Responsive User Interface and Client Workflows',
    'Third-Party Integration & Stripe Direct Checkout',
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [revisionLimit, setRevisionLimit] = useState(2);
  const [outOfScopeHourlyRate, setOutOfScopeHourlyRate] = useState(100);
  const [totalAmount, setTotalAmount] = useState(3000);
  const [depositPercentage, setDepositPercentage] = useState(50);
  const [currency, setCurrency] = useState<'EUR' | 'USD' | 'GBP' | 'BGN'>('EUR');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdContract, setCreatedContract] = useState<{
    contractId: string;
    contractUrl: string;
    termsHash: string;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Derived financial calculation
  const depositAmount = Math.round((totalAmount * (depositPercentage / 100)) * 100) / 100;
  const balanceDue = Math.max(0, Math.round((totalAmount - depositAmount) * 100) / 100);

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    if (deliverables.length <= 1) {
      setErrorMessage('At least one deliverable item is required.');
      return;
    }
    setDeliverables(deliverables.filter((_, i) => i !== index));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client checks
    if (!freelancerName.trim()) {
      setErrorMessage('Freelancer Name is required.');
      return;
    }
    if (!paymentUrl.trim() || (!paymentUrl.startsWith('http://') && !paymentUrl.startsWith('https://'))) {
      setErrorMessage('Valid Payment URL (starting with http:// or https://) is required.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Project Title is required.');
      return;
    }
    if (!scopeSummary.trim()) {
      setErrorMessage('Scope Summary is required.');
      return;
    }
    if (deliverables.length === 0) {
      setErrorMessage('Please add at least one deliverable item.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        freelancerName: freelancerName.trim(),
        freelancerTaxId: freelancerTaxId.trim() || undefined,
        paymentUrl: paymentUrl.trim(),
        title: title.trim(),
        scopeSummary: scopeSummary.trim(),
        deliverables,
        revisionLimit: Number(revisionLimit),
        outOfScopeHourlyRate: Number(outOfScopeHourlyRate),
        totalAmount: Number(totalAmount),
        depositAmount: Number(depositAmount),
        currency,
      };

      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to create contract. Please check all fields.');
        setIsSubmitting(false);
        return;
      }

      setCreatedContract({
        contractId: data.contractId,
        contractUrl: data.contractUrl,
        termsHash: data.termsHash,
      });
    } catch (err) {
      console.error(err);
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!createdContract) return;
    const fullUrl = `${window.location.origin}${createdContract.contractUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Milestone Agreement & Deposit Invoice
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Lock in your 50% upfront deposit and defend your scope before project kickoff.
        </p>
      </div>

      {/* Modal / Banner for successfully created contract */}
      {createdContract && (
        <div className="mb-8 p-6 bg-emerald-50 border border-emerald-300 rounded-2xl shadow-sm animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Proposal & Deposit Link Generated!</span>
              </div>
              <p className="text-sm text-emerald-700 mt-1">
                Contract ID: <span className="font-mono font-semibold">{createdContract.contractId}</span> | 
                SHA-256: <span className="font-mono text-xs">{createdContract.termsHash.slice(0, 16)}...</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-semibold text-sm hover:bg-emerald-100 transition-colors shadow-sm"
              >
                <Copy className="w-4 h-4" />
                {copiedLink ? 'Copied to Clipboard!' : 'Copy Client Link'}
              </button>

              <button
                type="button"
                onClick={() => router.push(createdContract.contractUrl)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors shadow-sm"
              >
                <span>View Proposal Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Freelancer Identification */}
            <div className="border-b border-slate-100 pb-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">1</span>
                Freelancer & Payment Setup
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Freelancer / Studio Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Acme Design"
                    value={freelancerName}
                    onChange={(e) => setFreelancerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Tax ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VAT / EIN / Tax Number"
                    value={freelancerTaxId}
                    onChange={(e) => setFreelancerTaxId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Direct Payment URL (Stripe Checkout Link or IBAN Invoice) <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://buy.stripe.com/... or payment link"
                  value={paymentUrl}
                  onChange={(e) => setPaymentUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Client is redirected directly here after signing. Zero intermediary holds.
                </p>
              </div>
            </div>

            {/* Project Scope & Deliverables */}
            <div className="border-b border-slate-100 pb-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">2</span>
                Scope & Itemized Deliverables
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js SaaS MVP & Stripe Billing Setup"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Scope Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Plain-English explanation of exactly what is being produced and delivered..."
                  value={scopeSummary}
                  onChange={(e) => setScopeSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Milestone Deliverables Checklist <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2 mb-3">
                  {deliverables.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs text-slate-800 flex-1 font-medium">{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(index)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add deliverable bullet (e.g. Responsive landing page)"
                    value={newDeliverable}
                    onChange={(e) => setNewDeliverable(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Scope Control & Out-of-Scope Protection */}
            <div className="border-b border-slate-100 pb-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">3</span>
                Scope Defense & Revision Boundaries
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Included Revision Rounds
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={revisionLimit}
                    onChange={(e) => setRevisionLimit(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Default 2 rounds prevents endless feedback cycles.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Out-of-Scope Hourly Rate ({currency})
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={outOfScopeHourlyRate}
                    onChange={(e) => setOutOfScopeHourlyRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Rate applied to any request outside checklist.</p>
                </div>
              </div>
            </div>

            {/* Financials & 50% Deposit Split */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">4</span>
                Financials & Deposit Split
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Contract Value
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BGN">BGN (лв)</option>
                  </select>
                </div>
              </div>

              {/* Deposit Split Slider / Buttons */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-900">Upfront Deposit Split:</span>
                  <span className="text-xs font-extrabold text-blue-700">{depositPercentage}% Upfront</span>
                </div>

                <div className="flex gap-2 mb-3">
                  {[30, 50, 70, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDepositPercentage(pct)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                        depositPercentage === pct
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-blue-200/60">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Upfront Deposit</span>
                    <span className="text-base font-bold text-emerald-600">
                      {depositAmount.toFixed(2)} {currency}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Balance Upon Completion</span>
                    <span className="text-base font-bold text-slate-700">
                      {balanceDue.toFixed(2)} {currency}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Proposal & Hash...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Generate Client Proposal & Deposit Link</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Dynamic Live Preview */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Client Preview
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Dynamic Update
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            {/* Header Mockup */}
            <div className="bg-slate-900 text-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  PayBeforeWork Protocol
                </span>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  PENDING DEPOSIT
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-2 leading-snug">
                {title || 'Untitled Project Scope'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Prepared by <span className="font-semibold text-white">{freelancerName || 'Freelancer'}</span>
                {freelancerTaxId ? ` (Tax: ${freelancerTaxId})` : ''}
              </p>
            </div>

            {/* Proposal Content Mockup */}
            <div className="p-5 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-1">
                  Scope Summary
                </span>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {scopeSummary || 'Add scope summary to preview project terms.'}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-1.5">
                  Deliverables Checklist
                </span>
                <div className="space-y-1.5">
                  {deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-100 text-[11px] text-blue-900 space-y-1">
                <p className="font-bold text-blue-950">Scope Defense Clause:</p>
                <p>• {revisionLimit} revision rounds included.</p>
                <p>• Additional requests billed at {outOfScopeHourlyRate.toFixed(2)} {currency}/hr.</p>
              </div>

              {/* Deposit Invoice Callout */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center text-slate-600 pb-1.5 border-b border-slate-200">
                  <span>Total Project Value:</span>
                  <span className="font-bold text-slate-900">
                    {totalAmount.toFixed(2)} {currency}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Upfront Deposit (50%):
                  </span>
                  <span className="text-sm">
                    {depositAmount.toFixed(2)} {currency}
                  </span>
                </div>
              </div>

              {/* Fake sign CTA */}
              <div className="pt-2">
                <div className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-center text-xs shadow-sm flex items-center justify-center gap-1.5 opacity-90 cursor-not-allowed">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Client Button: Sign & Pay Deposit ({depositAmount.toFixed(2)} {currency})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
