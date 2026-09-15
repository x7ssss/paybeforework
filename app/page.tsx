import Link from 'next/link';
import { ArrowRight, Check, Terminal, Shield, FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-zinc-50/50 text-zinc-900">
      {/* Hero Section */}
      <section className="border-b border-zinc-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="font-mono text-xs font-semibold text-zinc-500 tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-zinc-900 rounded-none"></span>
              PAYBEFOREWORK PROTOCOL // V1.0
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08]">
              Get paid 50% upfront before writing a single line of code.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
              Eliminate scope creep, payout holds, and client ghosting. Package an enforceable
              plain-English scope agreement, upfront deposit invoice, and eIDAS audit trail into one
              tamper-evident link.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 text-zinc-50 font-medium text-sm rounded hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <span>Create Milestone Contract</span>
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </Link>

              <a
                href="#specification"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-zinc-300 text-zinc-800 font-medium text-sm rounded hover:bg-zinc-50 transition-colors"
              >
                <span>Read Technical Spec</span>
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-zinc-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-600">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-900" />
                <span>Zero Escrow Custody</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-900" />
                <span>Direct Stripe / IBAN Rails</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-900" />
                <span>SHA-256 Tamper Evident</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-zinc-900" />
                <span>eIDAS & ESIGN Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Architecture / Feature Grid */}
      <section id="specification" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-zinc-200 gap-4">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mt-1">
              Engineering Contract Directives
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-500">
            NON-CUSTODIAL // STATUTORY_ENFORCEMENT
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 01 */}
          <div className="bg-white border border-zinc-200 p-6 rounded flex flex-col justify-between hover:border-zinc-300 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-zinc-900">[01]</span>
                <span className="font-mono text-[11px] text-zinc-500 uppercase">SECTION 4.2</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 tracking-tight mb-2">
                Scope Delimitation & Automatic Stop-Work
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Itemized deliverables constitute the exhaustive scope. Revision limits are capped, and
                out-of-scope requests trigger an immediate, contractually protected work stoppage
                billed at your explicit hourly rate.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-100 font-mono text-[11px] text-zinc-500">
              STATUS: AUTOMATIC_PAUSE_ENFORCED
            </div>
          </div>

          {/* Section 02 */}
          <div className="bg-white border border-zinc-200 p-6 rounded flex flex-col justify-between hover:border-zinc-300 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-zinc-900">[02]</span>
                <span className="font-mono text-[11px] text-zinc-500 uppercase">SECTION 3.1</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 tracking-tight mb-2">
                Condition Precedent & Direct Settlement
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Work strictly commences upon verifiable clearance of the upfront deposit into your
                designated account. No intermediary custody, zero platform holds, and zero escrow
                counterparty risk.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-100 font-mono text-[11px] text-zinc-500">
              RAILS: STRIPE_DIRECT // IBAN
            </div>
          </div>

          {/* Section 03 */}
          <div className="bg-white border border-zinc-200 p-6 rounded flex flex-col justify-between hover:border-zinc-300 transition-colors">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-zinc-900">[03]</span>
                <span className="font-mono text-[11px] text-zinc-500 uppercase">SECTION 14.9</span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 tracking-tight mb-2">
                Cryptographic Audit Log & IP Reservation
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Signer IP, device User-Agent, and UTC timestamp are cryptographically bound to a
                SHA-256 digest. IP and code rights remain with the freelancer until 100% of final invoices
                clear.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-zinc-100 font-mono text-[11px] text-zinc-500">
              AUDIT: SHA-256 // eIDAS_COMPLIANT
            </div>
          </div>
        </div>

        {/* Live Protocol Manifest Preview Box */}
        <div className="mt-12 bg-white border border-zinc-200 rounded overflow-hidden">
          <div className="bg-zinc-900 text-zinc-200 px-4 py-3 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>CONTRACT_MANIFEST_SPECIMEN.json</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              VERIFIED VALID
            </span>
          </div>
          <div className="p-6 font-mono text-xs text-zinc-800 bg-zinc-50/70 overflow-x-auto space-y-1">
            <p className="text-zinc-400">{'// Deterministic terms digest calculated at initialization'}</p>
            <p className="text-zinc-900 font-semibold">
              &#123; &quot;protocol&quot;: &quot;PayBeforeWork/1.0&quot;, &quot;integrity_hash&quot;: &quot;sha256:4e107ad90f4c51e84b7048c0013635...&quot;,
            </p>
            <p className="pl-4">
              &quot;condition_precedent&quot;: &#123; &quot;section&quot;: &quot;3.1&quot;, &quot;deposit_required&quot;: &quot;50%&quot;, &quot;work_commencement&quot;: &quot;POST_CLEARANCE_ONLY&quot; &#125;,
            </p>
            <p className="pl-4">
              &quot;scope_control&quot;: &#123; &quot;section&quot;: &quot;4.2&quot;, &quot;revisions_included&quot;: 2, &quot;work_stoppage_on_variance&quot;: true &#125;,
            </p>
            <p className="pl-4">
              &quot;ip_retention&quot;: &#123; &quot;section&quot;: &quot;8.1&quot;, &quot;assignment_trigger&quot;: &quot;100%_CLEARED_FUNDS&quot; &#125;,
            </p>
            <p className="pl-4">
              &quot;statutory_assent&quot;: &#123; &quot;frameworks&quot;: [&quot;US_ESIGN&quot;, &quot;UETA&quot;, &quot;EU_910/2014_eIDAS&quot;] &#125; &#125;
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center border-t border-zinc-200 pt-12">
          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
            Ready to secure your freelance cashflow?
          </h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
            Generate an enforceable milestone contract and deposit invoice in under two minutes.
          </p>
          <div className="mt-6">
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-900 text-zinc-50 font-medium text-sm rounded hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>Initialize Agreement</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
