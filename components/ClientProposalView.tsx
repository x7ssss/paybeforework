'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  AlertTriangle,
  FileCheck,
  User,
  Mail,
  Scale,
} from 'lucide-react';
import {
  STATUTORY_SECTIONS,
  SIGNING_PRIVACY_NOTICE,
  PLATFORM_ROLE_DISCLAIMER,
} from '@/lib/legal';

interface ClientProposalProps {
  contract: {
    id: string;
    freelancerName: string;
    freelancerTaxId: string | null;
    paymentUrl: string;
    title: string;
    scopeSummary: string;
    deliverables: string[];
    revisionLimit: number;
    outOfScopeHourlyRate: number;
    totalAmount: number;
    depositAmount: number;
    currency: string;
    status: string;
    termsHash: string;
    signerName: string | null;
    signedAt: string | null;
  };
}

export default function ClientProposalView({ contract }: ClientProposalProps) {
  // Checkbox is strictly UNCHECKED by default
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAlreadySigned = contract.status === 'signed';
  const balanceDue = Math.max(0, Math.round((contract.totalAmount - contract.depositAmount) * 100) / 100);

  // Submit button must remain disabled until:
  // 1. Consent checkbox is checked.
  // 2. Signatory Full Name and Corporate Email fields are filled.
  const isButtonDisabled =
    isSubmitting ||
    !consentAccepted ||
    signerName.trim().length === 0 ||
    signerEmail.trim().length === 0;

  const handleSignAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isButtonDisabled) {
      return;
    }

    if (!signerEmail.includes('@')) {
      setErrorMessage('Please enter a valid corporate email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractId: contract.id,
          signerName: signerName.trim(),
          signerEmail: signerEmail.trim(),
          consentAccepted: true,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to sign contract. Integrity check or network error.');
        setIsSubmitting(false);
        return;
      }

      // Redirect client directly to payment URL
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        window.location.href = `/p/${contract.id}/success`;
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('A network error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Status Bar if already signed */}
      {isAlreadySigned && (
        <div className="mb-8 p-5 bg-emerald-50 border border-emerald-300 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-emerald-900 font-bold text-base">
                Contract Ratified & Electronically Signed
              </h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                Signed by <span className="font-semibold">{contract.signerName}</span> on{' '}
                {contract.signedAt ? new Date(contract.signedAt).toUTCString() : 'Record'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Link
              href={`/p/${contract.id}/success`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-sm"
            >
              <span>View Receipt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={`/api/pdf/${contract.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Proposal Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Document Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">
                  PAYBEFOREWORK
                </span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Milestone Agreement & Deposit Invoice
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">ID: {contract.id}</span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isAlreadySigned
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {isAlreadySigned ? 'SIGNED & RATIFIED' : 'PENDING CLIENT RATIFICATION'}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
              Project Proposal & Milestone Agreement
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {contract.title}
            </h1>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
              <span>Presented by:</span>
              <span className="font-semibold text-white">{contract.freelancerName}</span>
              {contract.freelancerTaxId && (
                <span className="text-slate-400">({contract.freelancerTaxId})</span>
              )}
            </p>
          </div>
        </div>

        {/* Proposal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Scope Summary */}
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Scope of Work Summary
            </h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {contract.scopeSummary}
            </div>
          </div>

          {/* Uneditable Deliverables Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Itemized Milestone Deliverables (Exhaustive Scope)
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                {contract.deliverables.length} Deliverables Included
              </span>
            </div>

            <div className="space-y-2.5">
              {contract.deliverables.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-sm font-medium text-slate-800 leading-snug">
                    <span className="text-xs font-bold text-slate-400 mr-2">#{index + 1}</span>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
              Financial Breakdown & Upfront Deposit
            </div>
            <div className="divide-y divide-slate-100 text-sm">
              <div className="px-5 py-3.5 flex justify-between items-center text-slate-600">
                <span>Total Agreed Contract Value</span>
                <span className="font-bold text-slate-900">
                  {contract.totalAmount.toFixed(2)} {contract.currency}
                </span>
              </div>
              <div className="px-5 py-4 flex justify-between items-center bg-emerald-50/60 text-emerald-900 font-semibold">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>Upfront Deposit Required (Work Commences Solely Upon Clearance)</span>
                </div>
                <span className="text-base font-extrabold text-emerald-700">
                  {contract.depositAmount.toFixed(2)} {contract.currency}
                </span>
              </div>
              <div className="px-5 py-3.5 flex justify-between items-center text-slate-500 text-xs">
                <span>Remaining Balance Due on Project Completion & Sign-off</span>
                <span className="font-semibold text-slate-700">
                  {balanceDue.toFixed(2)} {contract.currency}
                </span>
              </div>
            </div>
          </div>

          {/* STATUTORY CONTRACT PROVISIONS - All 4 Sections from LEGAL_REQUIREMENTS.md */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/70 space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-200 pb-3">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Mandated Statutory Agreement & Performance Provisions</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {STATUTORY_SECTIONS.map((section) => (
                <div
                  key={section.code}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1.5"
                >
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <span className="text-blue-600 font-semibold">{section.code}:</span>
                    <span>{section.title}</span>
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SHA-256 Tamper Evident Verification Badge */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-600 break-all space-y-1">
            <div className="flex items-center justify-between text-slate-800 font-sans font-semibold text-xs pb-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Cryptographic Terms Integrity
              </span>
              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                VERIFIED TAMPER-PROOF
              </span>
            </div>
            <div>
              <span className="text-slate-400">SHA-256: </span>
              {contract.termsHash}
            </div>
          </div>

          {/* Client Sign & Pay Section */}
          {!isAlreadySigned ? (
            <div className="pt-4 border-t border-slate-200">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-slate-900">
                  Ratify Agreement & Authorize Upfront Deposit
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Electronically sign under ESIGN, UETA, and eIDAS to proceed directly to payment.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSignAndPay} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Signatory Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Connor"
                        value={signerName}
                        onChange={(e) => setSignerName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Corporate Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@cyberdyne.com"
                        value={signerEmail}
                        onChange={(e) => setSignerEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Legal Consent Box - UNCHECKED by default */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      className="w-4 h-4 mt-1 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I confirm acceptance of the itemized deliverables as the exhaustive scope, agreed revision limits, Section 3.1 (Condition Precedent to Performance & Deposit Clearance), Section 4.2 (Scope Delimitation & Automatic Stop-Work), Section 8.1 (Reservation of Rights & Conditional IP Assignment), and Section 14.9 (Cryptographic Execution Assent). I authorize the immediate upfront deposit payment of <strong>{contract.depositAmount.toFixed(2)} {contract.currency}</strong>.
                    </span>
                  </label>
                </div>

                {/* Submit button - strictly disabled until checkbox checked AND name/email filled */}
                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 ${
                    isButtonDisabled
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Ratifying Agreement & Redirecting...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        Sign & Pay Deposit ({contract.depositAmount.toFixed(2)} {contract.currency})
                      </span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>

                {/* Explicit Legal & Privacy Notice directly below the button */}
                <p className="text-[11px] text-slate-500 text-center leading-relaxed pt-1 px-2">
                  {SIGNING_PRIVACY_NOTICE}
                </p>
              </form>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Agreement executed and legally binding. Conclusive audit log recorded.
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`/api/pdf/${contract.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Countersigned PDF</span>
                </a>
              </div>
            </div>
          )}

          {/* Platform Role Disclaimer Footer in the proposal view */}
          <div className="pt-6 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {PLATFORM_ROLE_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
