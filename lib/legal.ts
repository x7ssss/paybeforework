export const STATUTORY_SECTIONS = [
  {
    code: 'Section 3.1',
    title: 'Condition Precedent to Performance & Deposit Clearance',
    content:
      'The Client agrees that Freelancer obligations (scheduling, development, delivery) are strictly contingent upon the prior, complete clearance of the non-refundable upfront deposit into the Freelancer designated account. Any timeline or delivery date shall be automatically tolled and extended day-for-day until the deposit clears. Freelancer has zero obligation or liability to undertake preliminary work prior to clearance.',
  },
  {
    code: 'Section 4.2',
    title: 'Scope Delimitation, Revision Thresholds & Automatic Stop-Work',
    content:
      'Deliverables enumerated in the Scope Checklist constitute the entire, exhaustive scope. Any variation or modification not expressly included is deemed Out-of-Scope. Price includes a strict maximum of two (2) rounds of minor revisions within 5 business days. Upon exhaustion of revisions or presentation of an out-of-scope request, work automatically pauses (Work Stoppage) without delivery delay liability. Any out-of-scope work shall be billed at the agreed Out-of-Scope Hourly Rate.',
  },
  {
    code: 'Section 8.1',
    title: 'Reservation of Rights & Conditional IP Assignment',
    content:
      'All right, title, and interest in work product, code, designs, and deliverables remain the exclusive property of the Freelancer. Transfer of copyright and ownership rights to Client occurs solely and conditionally upon full, irrevocable payment of 100% of all invoices, fees, and out-of-scope adjustments. No license (express or implied) passes to Client until full payment clears.',
  },
  {
    code: 'Section 14.9',
    title: 'Electronic Execution & Cryptographic Verification Assent',
    content:
      'Parties agree to execution via Simple Electronic Signature under US ESIGN Act, UETA, and EU Regulation 910/2014 (eIDAS). The SHA-256 cryptographic hash of the terms, logged alongside IP, UTC timestamp, and User-Agent, serves as conclusive and legally binding proof of execution and document integrity.',
  },
] as const;

export const SIGNING_PRIVACY_NOTICE =
  "By checking the box and clicking 'Sign & Pay Deposit', you affirm that you are authorized to bind your organization. To establish an enforceable audit trail under US ESIGN, UK eIDAS, and EU Reg 910/2014, PayBeforeWork records your name, corporate email, IP address, device User-Agent, and execution timestamp, generating an unalterable SHA-256 hash. Processed under GDPR Art. 6(1)(b) & 6(1)(f). No marketing cookies used.";

export const PLATFORM_ROLE_DISCLAIMER =
  'PayBeforeWork provides software generation and electronic signature infrastructure only. It is not an escrow agent, payment processor, or money services business. All payments are remitted directly to the contractor.';
