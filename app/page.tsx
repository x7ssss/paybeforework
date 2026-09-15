'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Lock,
  Clock,
  DollarSign,
  AlertTriangle,
  FileCheck2,
  Sparkles,
  ChevronRight,
  Ban,
  ArrowUpRight,
  Receipt,
  UserCheck,
} from 'lucide-react';

interface ProjectPreset {
  id: string;
  category: string;
  projectName: string;
  clientName: string;
  freelancerName: string;
  totalAmount: number;
  depositAmount: number;
  hourlyRate: number;
  revisions: number;
  deliverables: string[];
}

const PRESETS: ProjectPreset[] = [
  {
    id: 'web-dev',
    category: 'Full-Stack Web App',
    projectName: 'Custom SaaS Platform & Stripe Billing',
    clientName: 'Acme Growth Labs Ltd.',
    freelancerName: 'David Vance (Full-Stack Engineer)',
    totalAmount: 3200,
    depositAmount: 1600,
    hourlyRate: 65,
    revisions: 2,
    deliverables: [
      'Responsive Web Application & Tailwind UI Design System',
      'Stripe Direct Checkout, Webhook Processing & Customer Portal',
      'Secure User Authentication, Database Schema & Production Deployment',
    ],
  },
  {
    id: 'ui-design',
    category: 'UI/UX & Branding',
    projectName: 'Mobile App Design & Design System',
    clientName: 'Fintech Studio Inc.',
    freelancerName: 'Elena Rostova (Lead Product Designer)',
    totalAmount: 2400,
    depositAmount: 1200,
    hourlyRate: 65,
    revisions: 2,
    deliverables: [
      'High-Fidelity Figma Prototypes (30+ Mobile Application Screens)',
      'Complete Design System, Component Library & Asset Export Specs',
      'Interactive User Flow Walkthrough & Developer Handoff Documentation',
    ],
  },
  {
    id: 'automation',
    category: 'Backend & API',
    projectName: 'Internal Automation & CRM Integration',
    clientName: 'VentureScale Operations',
    freelancerName: 'Marcus Lin (Backend Specialist)',
    totalAmount: 1900,
    depositAmount: 950,
    hourlyRate: 65,
    revisions: 2,
    deliverables: [
      'HubSpot to PostgreSQL Automated Real-Time Sync Pipeline',
      'Custom Webhook Event Handler & Dead-Letter Queue Logic',
      'Unit Test Suite, Dockerized Environment & API Documentation',
    ],
  },
];

export default function HomePage() {
  const [selectedPreset, setSelectedPreset] = useState<ProjectPreset>(PRESETS[0]);
  const [hasSimulatedSign, setHasSimulatedSign] = useState(false);

  return (
    <div className="bg-[#fcfdfd] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* 1. VALUE-FIRST HERO */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle background ambient mesh */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.06),rgba(255,255,255,0))]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Built 100% for Freelancers & Independent Contractors</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 leading-[1.12] max-w-4xl mx-auto">
            Never start client work without a deposit again.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal max-w-3xl mx-auto">
            Generate an airtight scope agreement, collect a 50% upfront deposit directly to your Stripe or bank, and get legally binding e-signatures. No platform fees.
          </p>

          {/* Primary CTA & Micro-Trust Note */}
          <div className="mt-8 flex flex-col items-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-950 text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-zinc-800 transition-all duration-150 shadow-xl shadow-zinc-900/10 hover:shadow-zinc-900/20 active:scale-[0.99]"
            >
              <span>Create a Contract in 60 Seconds</span>
              <ArrowRight className="w-5 h-5 text-zinc-300" />
            </Link>

            {/* Micro-trust note below CTA */}
            <p className="mt-3.5 text-xs sm:text-sm font-medium text-zinc-500 flex items-center justify-center flex-wrap gap-2">
              <span>Free to use</span>
              <span className="text-zinc-300">•</span>
              <span>No account required</span>
              <span className="text-zinc-300">•</span>
              <span>100% direct payouts</span>
            </p>
          </div>

          {/* Value Badges */}
          <div className="mt-12 pt-8 border-t border-zinc-100 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50/70 border border-zinc-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-900">Zero Platform Fees</p>
                <p className="text-[11px] text-zinc-500">Keep 100% of what you bill</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50/70 border border-zinc-200/60">
              <DollarSign className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-900">Direct Settlement</p>
                <p className="text-[11px] text-zinc-500">Straight to your Stripe or bank</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50/70 border border-zinc-200/60">
              <FileCheck2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-900">Legally Binding</p>
                <p className="text-[11px] text-zinc-500">ESIGN & eIDAS audit trail</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-50/70 border border-zinc-200/60">
              <Clock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-zinc-900">Ready in 60s</p>
                <p className="text-[11px] text-zinc-500">No login, no complex setup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE / VISUAL CONTRACT PREVIEW */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            Realistic Contract Experience
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            See exactly what your client sees.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-600">
            Send clients a crisp, tamper-evident proposal link. Scope is strictly defined, revisions are capped, and work only begins after the 50% deposit clears.
          </p>

          {/* Interactive Preset Selector */}
          <div className="mt-6 inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200 text-xs font-medium">
            {PRESETS.map((preset) => {
              const isActive = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setHasSimulatedSign(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {preset.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Realistic Contract Preview Card */}
        <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-xl shadow-zinc-200/50 overflow-hidden">
          {/* Mock Browser / Document Header */}
          <div className="bg-zinc-900 text-zinc-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              </div>
              <span className="font-mono text-zinc-400 text-[11px] hidden sm:inline">
                paybeforework.com/p/cnt_{selectedPreset.id}_489f
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Official Milestone Agreement
              </span>
            </div>
          </div>

          {/* Proposal Document Body */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Top metadata grid */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-zinc-200">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Contract Agreement
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 mt-1">
                  {selectedPreset.projectName}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Prepared by <strong className="text-zinc-800 font-semibold">{selectedPreset.freelancerName}</strong> for{' '}
                  <strong className="text-zinc-800 font-semibold">{selectedPreset.clientName}</strong>
                </p>
              </div>

              <div className="sm:text-right bg-zinc-50 p-3 sm:p-3.5 rounded-xl border border-zinc-200/80 min-w-[200px]">
                <div className="text-[11px] uppercase font-semibold tracking-wider text-zinc-500">
                  Total Project Value
                </div>
                <div className="text-2xl font-extrabold text-zinc-950 mt-0.5">
                  €{selectedPreset.totalAmount.toLocaleString()} <span className="text-xs font-normal text-zinc-500">EUR</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  50% Deposit Required Before Commencement
                </div>
              </div>
            </div>

            {/* Scope & 3 Deliverables */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Agreed Scope of Deliverables
                </h4>
                <span className="text-xs text-zinc-500 font-medium">
                  {selectedPreset.revisions} rounds of revision included
                </span>
              </div>

              <div className="space-y-2.5">
                {selectedPreset.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-200/70 hover:bg-zinc-50 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-mono font-bold text-zinc-400 mr-2">
                        [0{idx + 1}]
                      </span>
                      <span className="text-sm font-semibold text-zinc-900">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Out-of-Scope Notice Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3.5">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-amber-950">
                  Out-of-scope requests billed at €{selectedPreset.hourlyRate}/hr
                </h5>
                <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                  Work outside the itemized deliverables above will not be performed without prior written client approval. Any scope additions automatically trigger hourly billing at the defined rate.
                </p>
              </div>
            </div>

            {/* Payment Calculation & Sign Action Mockup */}
            <div className="bg-zinc-50 rounded-xl p-5 sm:p-6 border border-zinc-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Upfront Deposit Amount (50%)
                  </div>
                  <div className="text-3xl font-black text-zinc-950 mt-1">
                    €{selectedPreset.depositAmount.toLocaleString()}{' '}
                    <span className="text-sm font-semibold text-zinc-500">EUR Due Now</span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>Freelancer obligations begin strictly upon deposit clearance.</span>
                  </p>
                </div>

                <div className="text-left sm:text-right text-xs text-zinc-500 space-y-1">
                  <div>Remaining balance: €{(selectedPreset.totalAmount - selectedPreset.depositAmount).toLocaleString()} EUR</div>
                  <div>Payable upon milestone completion</div>
                  <div className="text-emerald-700 font-medium">Direct Stripe / Bank Rails</div>
                </div>
              </div>

              {/* Clean 'Sign & Pay Deposit' Button Mockup */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-zinc-500">
                  <div className="font-semibold text-zinc-800">
                    One-Click Electronic Assent
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Legally binding digital signature & audit timestamp
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasSimulatedSign(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/20 active:scale-[0.98]"
                  >
                    <Lock className="w-4 h-4 text-emerald-100" />
                    <span>Sign & Pay Deposit (€{selectedPreset.depositAmount.toLocaleString()})</span>
                  </button>
                </div>
              </div>

              {/* Interactive confirmation feedback state */}
              {hasSimulatedSign && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-100/70 border border-emerald-300 text-emerald-950 text-xs font-medium flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Preview simulation: Client signs agreement & deposit transfers directly to your Stripe/bank. Contract status locks to &quot;Active&quot;.
                    </span>
                  </div>
                  <button
                    onClick={() => setHasSimulatedSign(false)}
                    className="text-[11px] font-bold text-emerald-900 underline hover:text-emerald-950 ml-2"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE CORE PAIN POINTS SOLVED (Human, direct copy) */}
      <section className="border-y border-zinc-200/80 bg-white py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
              Rock-Solid Protection
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Three rules that protect your time and income.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-zinc-600">
              Traditional contracts rely on good faith. PayBeforeWork bakes enforcement into the process so you never get taken advantage of.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Core 1: Deposit Before Work */}
            <div className="bg-zinc-50/70 border border-zinc-200/90 p-7 rounded-2xl flex flex-col justify-between hover:border-zinc-300 transition-all shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-5 font-bold text-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-700 tracking-wide uppercase mb-1">
                  Rule 01
                </div>
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight mb-3">
                  Deposit Before Work
                </h3>
                <p className="text-sm text-zinc-700 font-semibold leading-snug mb-2">
                  Freelancer obligations only begin once funds clear into your account.
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Never open your IDE, write copy, or render wireframes on a client&apos;s verbal promise. Your contract legally dictates that work only begins when the 50% deposit settles in your account.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-2 text-xs font-medium text-zinc-500">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Zero work without cleared cash</span>
              </div>
            </div>

            {/* Core 2: Automatic Scope Pause */}
            <div className="bg-zinc-50/70 border border-zinc-200/90 p-7 rounded-2xl flex flex-col justify-between hover:border-zinc-300 transition-all shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center mb-5 font-bold text-lg">
                  <Ban className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-700 tracking-wide uppercase mb-1">
                  Rule 02
                </div>
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight mb-3">
                  Automatic Scope Pause
                </h3>
                <p className="text-sm text-zinc-700 font-semibold leading-snug mb-2">
                  When clients ask for &apos;quick additions&apos;, work automatically halts until approved at your hourly rate.
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Kill scope creep with zero friction. Your contract sets clear deliverable boundaries. Any additional feature or extra revision requires formal client authorization at your set hourly rate (€65/hr).
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-2 text-xs font-medium text-zinc-500">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>No free overtime or unpaid additions</span>
              </div>
            </div>

            {/* Core 3: 100% IP Retention */}
            <div className="bg-zinc-50/70 border border-zinc-200/90 p-7 rounded-2xl flex flex-col justify-between hover:border-zinc-300 transition-all shadow-xs hover:shadow-md">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center mb-5 font-bold text-lg">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-blue-700 tracking-wide uppercase mb-1">
                  Rule 03
                </div>
                <h3 className="text-xl font-bold text-zinc-950 tracking-tight mb-3">
                  100% IP Retention
                </h3>
                <p className="text-sm text-zinc-700 font-semibold leading-snug mb-2">
                  Copyright remains yours until every invoice is paid.
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  You retain complete intellectual property and source code ownership until 100% of final invoices are paid in full. If a client defaults or drags payments, they have zero legal license to touch your work.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex items-center gap-2 text-xs font-medium text-zinc-500">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Full ownership retention until final payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS IN 3 STEPS */}
      <section className="py-20 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
            How it works in 3 simple steps
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600">
            From zero to an agreed contract with a paid deposit in under five minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white border border-zinc-200">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-zinc-950 mb-1.5">Define Your Terms</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              List your 3 deliverables, your out-of-scope hourly rate, and your direct payment URL (Stripe or bank transfer). Takes under 60 seconds.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-zinc-200">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-zinc-950 mb-1.5">Send One Clean Link</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Your client opens the link on mobile or desktop. They see exactly what they get, how much it costs, and the clear scope boundaries.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-zinc-200">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-zinc-950 mb-1.5">Client Signs & Pays Deposit</h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              The client electronically signs and pays the 50% deposit directly into your Stripe or bank account. You get notified and begin working.
            </p>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CONVERSION SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
          {/* Subtle glow effect */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold mb-6 border border-zinc-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Risk • No Subscription • Free to Use</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Stop chasing invoices after the fact. Lock your next project today.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Generate a legally binding scope contract and deposit link in under 60 seconds. Keep 100% of your earnings.
            </p>

            <div className="mt-8 flex flex-col items-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base sm:text-lg rounded-xl transition-all duration-150 shadow-xl shadow-emerald-500/20 active:scale-[0.99]"
              >
                <span>Create a Contract in 60 Seconds</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <p className="mt-3.5 text-xs text-zinc-400 flex items-center justify-center flex-wrap gap-2">
                <span>Free to use</span>
                <span className="text-zinc-600">•</span>
                <span>No account required</span>
                <span className="text-zinc-600">•</span>
                <span>100% direct payouts</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
