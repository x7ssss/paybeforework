import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Lock,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),theme(colors.slate.50))] opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200/80 text-blue-700 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Built for Solo Developers & Freelancers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Get paid <span className="text-blue-600">50% upfront</span> before writing a single line of code.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Eliminate scope creep, payment delays, and client ghosting. Package an enforceable
            plain-English scope agreement, upfront deposit invoice, and eIDAS audit trail into one
            instant link.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-base shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              <span>Create Milestone Contract</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-base hover:bg-slate-50 transition-all"
            >
              How It Works
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero platform fee holds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Direct-to-Stripe / IBAN</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tamper-evident SHA-256</span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="how-it-works" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Define Scope & Rates</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              List clear milestone deliverables and specify your out-of-scope hourly rate so clients
              understand revisions have clear boundaries.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Client Signs & Pays</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Client reviews the clean proposal link, signs electronically, and is redirected
              straight to your Stripe checkout or payment details.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Tamper-Evident Audit PDF</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Both parties receive an eIDAS/ESIGN compliant countersigned PDF with IP, UTC timestamp,
              and SHA-256 cryptographic verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
