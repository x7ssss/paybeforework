# Product Requirements Document: PayBeforeWork

## 1. Objective
A zero-bloat, direct-to-Stripe milestone contract and deposit invoice generator for solo developers and freelancers. Solves scope creep and payout holds by packaging an enforceable plain-English scope agreement, a 50% upfront deposit invoice, and an eIDAS/ESIGN audit log into a single client link.

## 2. Core Flows
1. **Create (`/create`):**
   - Inputs: Freelancer Name, Business/Tax ID (optional), Direct Payment URL (Stripe Checkout link or IBAN instructions).
   - Project: Title, Scope summary, Deliverables checklist (JSON array), Revision limit (default: 2), Out-of-Scope Hourly Rate (€/$).
   - Financials: Total contract value, Upfront deposit amount (default: 50%), Currency (EUR, USD, GBP, BGN).
   - Action: Generates a unique 12-char nanoid link (`/p/[contractId]`) and saves the SHA-256 hash of the exact terms.

2. **Client Sign & Pay (`/p/[contractId]`):**
   - Read-only proposal interface with the deliverable checklist and out-of-scope clause clearly displayed.
   - Client enters Name and Email, checks legal consent box.
   - Action: Clicks "Sign & Pay Deposit" -> Logs IP, User-Agent, UTC timestamp -> Redirects directly to the freelancer's payment link.

3. **Receipt & Export (`/p/[contractId]/success`):**
   - Displays confirmation status.
   - Generates and downloads a clean countersigned PDF at `/api/pdf/[contractId]` with the cryptographic audit trail footer.

## 3. Tech Stack
- Next.js (App Router), TypeScript, Tailwind CSS.
- Drizzle ORM + LibSQL (`@libsql/client`) with SQLite fallback (`file:local.db`).
- Validation: Zod schemas for all mutations.
- Security: Parameterized queries only, no third-party fund holding, tamper-evident SHA-256 validation.