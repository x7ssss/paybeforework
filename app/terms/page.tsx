import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PLATFORM_ROLE_DISCLAIMER } from '@/lib/legal';

export const metadata = {
  title: 'Terms of Service | PayBeforeWork',
  description:
    'Terms of Service governing the non-custodial software protocol, absence of escrow liability, and electronic contract execution.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-zinc-900">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-zinc-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN_TO_PROTOCOL</span>
        </Link>
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
          LEGAL SPECIFICATION // MASTER_TERMS
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 mt-1">
          Terms of Service & Platform Disclaimers
        </h1>
        <p className="font-mono text-xs text-zinc-500 mt-2">
          EFFECTIVE_DATE: 2026-09-15 // VERSION: 1.2 // PROTOCOL: NON-CUSTODIAL
        </p>
      </div>

      {/* Prominent Platform Role Disclaimer Banner */}
      <div className="mb-8 p-4 bg-zinc-100 border border-zinc-300 rounded font-mono text-xs text-zinc-800 leading-relaxed">
        <span className="font-bold block text-zinc-950 mb-1">MANDATORY PLATFORM DISCLAIMER:</span>
        {PLATFORM_ROLE_DISCLAIMER}
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
        {/* Section 1 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [01] NON-CUSTODIAL SOFTWARE STATUS
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">STATUS_SPEC</span>
          </div>
          <p>
            PayBeforeWork (&quot;the Platform&quot;) operates solely as a specialized software generator and
            cryptographic signing utility. The Platform provides electronic document compilation,
            SHA-256 integrity digest generation, and audit logging services.
          </p>
          <p>
            Under no circumstances does PayBeforeWork act as an escrow agent, fiduciary, banking
            institution, payment processor, or money services business (MSB). PayBeforeWork does not
            take custody of, hold, transmit, receive, or intermediate funds transferred between
            contracting parties.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [02] ABSENCE OF PAYMENT & ESCROW LIABILITY
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">DIRECT_REMITTANCE</span>
          </div>
          <p>
            All monetary considerations, upfront milestone deposits, and final invoices are remitted
            directly from the Client to the Freelancer via external, third-party payment rails (such as
            direct Stripe Checkout URLs, ACH, SEPA, or direct bank wire instructions) specified by the
            Freelancer.
          </p>
          <p>
            PayBeforeWork expressly disclaims all liability, warranty, or responsibility for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-600">
            <li>Any failure, delay, or reversal in payment processing via external rails.</li>
            <li>Credit card chargebacks, payment disputes, or processing fee deductions.</li>
            <li>Verification of client creditworthiness or solvency.</li>
            <li>Tax calculation, withholding, or reporting obligations for either party.</li>
            <li>Direct settlement disputes between the client and contractor.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [03] CONTRACTUAL INDEPENDENCE & SCOPE
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">THIRD_PARTY_RELATION</span>
          </div>
          <p>
            Each milestone agreement generated through the Platform is a direct, bilateral commercial
            contract solely between the Freelancer and the Client. PayBeforeWork is not a party,
            guarantor, or beneficiary of any project agreement and has no obligation to inspect,
            audit, verify, or deliver work product.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [04] STATUTORY CONTRACT PROVISIONS
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">STATUTORY_CLAUSES</span>
          </div>
          <p>
            Agreements ratified through PayBeforeWork incorporate the four standard statutory covenants:
          </p>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
              <span className="font-bold text-zinc-900 block font-mono">
                Section 3.1: Condition Precedent to Performance & Deposit Clearance
              </span>
              <span className="text-zinc-600">
                Freelancer performance obligations are strictly contingent upon complete upfront deposit
                clearance. Work commences post-clearance only.
              </span>
            </div>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
              <span className="font-bold text-zinc-900 block font-mono">
                Section 4.2: Scope Delimitation, Revision Thresholds & Automatic Stop-Work
              </span>
              <span className="text-zinc-600">
                Itemized deliverables constitute the exhaustive scope. Revision limits are capped, and
                out-of-scope requests trigger immediate contractually protected work stoppage.
              </span>
            </div>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
              <span className="font-bold text-zinc-900 block font-mono">
                Section 8.1: Reservation of Rights & Conditional IP Assignment
              </span>
              <span className="text-zinc-600">
                IP and code remain the exclusive property of Freelancer until 100% of final invoices and
                out-of-scope adjustments clear.
              </span>
            </div>
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded">
              <span className="font-bold text-zinc-900 block font-mono">
                Section 14.9: Electronic Execution & Cryptographic Verification Assent
              </span>
              <span className="text-zinc-600">
                Parties agree to simple electronic execution under ESIGN, UETA, and eIDAS, with SHA-256
                hashes, IP, and timestamps serving as conclusive audit evidence.
              </span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [05] WARRANTY DISCLAIMER & LIABILITY CAP
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">LIABILITY_LIMIT</span>
          </div>
          <p className="uppercase text-xs font-mono text-zinc-500">
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
            INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p>
            To the maximum extent permitted by applicable law, PayBeforeWork and its operators shall not
            be liable for any indirect, punitive, incidental, special, or consequential damages arising
            out of or in any way connected with the use of the platform, the failure of any party to
            perform contractual obligations, or payment transfer discrepancies. Total aggregate liability
            shall not exceed $100 USD.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [06] GOVERNING LAW & SEVERABILITY
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">JURISDICTION</span>
          </div>
          <p>
            These Terms of Service are governed by the laws of Delaware, United States, without regard
            to conflict of law principles. If any provision is deemed unenforceable, it shall be modified
            to reflect the parties&apos; original intent, and all remaining provisions shall remain in full force
            and effect.
          </p>
        </section>
      </div>
    </div>
  );
}
