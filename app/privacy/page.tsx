import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | PayBeforeWork',
  description:
    'Privacy Policy and Data Protection Notice under GDPR Article 6(1)(b), Article 6(1)(f), US ESIGN, and EU eIDAS Regulation.',
};

export default function PrivacyPage() {
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
          LEGAL SPECIFICATION // DATA_PROTECTION
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 mt-1">
          Privacy Policy & Data Processing Notice
        </h1>
        <p className="font-mono text-xs text-zinc-500 mt-2">
          EFFECTIVE_DATE: 2026-09-15 // VERSION: 1.2 // PROTOCOL: NON-CUSTODIAL
        </p>
      </div>

      <div className="space-y-10 text-sm leading-relaxed text-zinc-700">
        {/* Section 1 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">[01] OVERVIEW & ROLE</h2>
            <span className="font-mono text-[11px] text-zinc-400">GDPR_COMPLIANCE</span>
          </div>
          <p>
            PayBeforeWork (&quot;the Platform&quot;) provides non-custodial contract generation and electronic
            signature software infrastructure for independent contractors and their commercial clients.
            We treat privacy and data minimization as foundational engineering constraints.
          </p>
          <p>
            This policy outlines our processing operations in strict adherence to the General Data
            Protection Regulation (Regulation (EU) 2016/679 - &quot;GDPR&quot;), the UK Data Protection Act 2018,
            the US Electronic Signatures in Global and National Commerce Act (ESIGN, 15 U.S.C. § 7001),
            and the EU eIDAS Regulation (Regulation (EU) No 910/2014).
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [02] LAWFUL BASES FOR PROCESSING UNDER GDPR
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">ART_6_BASES</span>
          </div>
          <div className="space-y-4">
            <div className="border-l-2 border-zinc-900 pl-4 space-y-1">
              <h3 className="font-bold text-zinc-900 font-mono text-xs uppercase">
                1. GDPR Article 6(1)(b) - Contract Formation & Performance
              </h3>
              <p className="text-xs text-zinc-600">
                Processing of signatory identification (Full Legal Name, Corporate Email Address) and
                milestone parameters is strictly necessary for entering into and executing the
                commercial project agreement between the Freelancer and the Client at the data subject&apos;s
                direct request.
              </p>
            </div>

            <div className="border-l-2 border-zinc-900 pl-4 space-y-1">
              <h3 className="font-bold text-zinc-900 font-mono text-xs uppercase">
                2. GDPR Article 6(1)(f) - Legitimate Interests & Fraud Prevention
              </h3>
              <p className="text-xs text-zinc-600">
                We process network and verification metadata (IP address, browser/device User-Agent
                string, UTC timestamp, and SHA-256 cryptographic terms digests) based on our legitimate
                interest in establishing non-repudiation, fraud prevention, tamper detection, and
                providing an enforceable legal audit trail required for electronic contract validity
                under US ESIGN, UETA, and EU eIDAS statutory frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [03] DATA CATEGORIES & EXCLUSIVE AUDIT PURPOSE
            </h2>
            <span className="font-mono text-[11px] text-zinc-400">DATA_MINIMIZATION</span>
          </div>
          <p>
            In conformity with the principle of data minimization (GDPR Art. 5(1)(c)), PayBeforeWork
            captures only the technical and identity fields essential to guarantee document validity:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border border-zinc-200">
              <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200">
                <tr>
                  <th className="p-2.5">Category</th>
                  <th className="p-2.5">Specific Field</th>
                  <th className="p-2.5">Dedicated Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-800">
                <tr>
                  <td className="p-2.5 font-bold">Signatory Identity</td>
                  <td className="p-2.5">Full Legal Name, Corporate Email</td>
                  <td className="p-2.5 font-sans text-xs">
                    Contract counterparty identification and PDF countersignature rendering.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Network Audit</td>
                  <td className="p-2.5">Originating IP Address</td>
                  <td className="p-2.5 font-sans text-xs">
                    Statutory forensic proof of execution locus and fraud prevention.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Client Environment</td>
                  <td className="p-2.5">Device User-Agent String</td>
                  <td className="p-2.5 font-sans text-xs">
                    Browser software environment verification to prove human signing action.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Temporal Stamp</td>
                  <td className="p-2.5">ISO 8601 UTC Timestamp</td>
                  <td className="p-2.5 font-sans text-xs">
                    Verifiable legal moment of electronic ratification.
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Integrity Hash</td>
                  <td className="p-2.5">Canonical SHA-256 Digest</td>
                  <td className="p-2.5 font-sans text-xs">
                    Cryptographic seal guaranteeing the terms have not been tampered with post-creation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-zinc-600 italic">
            Audit logs are permanently bound to the respective contract ID and are accessible only to
            the executing parties via the countersigned PDF document.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">
              [04] ZERO ADVERTISING & ZERO MARKETING TRACKING
            </h2>
            <span className="font-mono text-[11px] text-emerald-600 font-bold">NO_TRACKERS</span>
          </div>
          <p>
            PayBeforeWork maintains an unequivocal policy regarding user surveillance:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-600">
            <li>
              <strong>Zero Advertising Cookies:</strong> We do not deploy advertising, marketing, or
              behavioral targeting cookies of any kind.
            </li>
            <li>
              <strong>Zero Third-Party Pixels:</strong> We do not embed Meta Pixel, Google Ads, TikTok,
              or any tracking beacons.
            </li>
            <li>
              <strong>Zero Data Brokerage:</strong> We never sell, lease, or monetize user data or
              contract terms.
            </li>
            <li>
              <strong>Non-Custodial Architecture:</strong> Payment information is processed directly on
              the contractor&apos;s external payment rails (e.g. Stripe or direct wire); PayBeforeWork never
              receives or stores credit card numbers or banking secrets.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">[05] DATA RETENTION</h2>
            <span className="font-mono text-[11px] text-zinc-400">PRESERVATION</span>
          </div>
          <p>
            Contract records, terms hashes, and electronic audit logs are retained for the duration
            necessary to satisfy contractual dispute periods and statutory requirements under commercial
            and limitation law (generally up to 6 years following contract execution), after which they
            are securely purged.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-white border border-zinc-200 p-6 rounded space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
            <h2 className="text-base font-bold text-zinc-950 font-mono">[06] DATA SUBJECT RIGHTS</h2>
            <span className="font-mono text-[11px] text-zinc-400">GDPR_ART_15-22</span>
          </div>
          <p>
            Under GDPR Articles 15 through 22, qualifying data subjects possess rights of access,
            rectification, erasure, restriction, and portability regarding their personal data, subject
            to statutory exemptions where retention is mandated for legal claims or contract defense.
          </p>
          <p>
            To exercise these rights, submit inquiries to: <code className="font-mono text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded">legal@paybeforework.protocol</code>
          </p>
        </section>
      </div>
    </div>
  );
}
