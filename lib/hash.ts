import { createHash, timingSafeEqual } from 'crypto';

export interface ContractTermsPayload {
  title: string;
  scopeSummary: string;
  deliverables: string[];
  revisionLimit: number;
  outOfScopeHourlyRate: number;
  totalAmount: number;
  depositAmount: number;
  currency: string;
  freelancerName: string;
  paymentUrl: string;
}

/**
 * Calculates a deterministic, canonical SHA-256 integrity hash of the contract's scope and terms.
 */
export function calculateTermsHash(data: ContractTermsPayload): string {
  const normalized = {
    currency: data.currency.trim().toUpperCase(),
    deliverables: data.deliverables.map((d) => d.trim()),
    depositAmount: Number(data.depositAmount).toFixed(2),
    freelancerName: data.freelancerName.trim(),
    outOfScopeHourlyRate: Number(data.outOfScopeHourlyRate).toFixed(2),
    paymentUrl: data.paymentUrl.trim(),
    revisionLimit: Math.floor(Number(data.revisionLimit)),
    scopeSummary: data.scopeSummary.trim(),
    title: data.title.trim(),
    totalAmount: Number(data.totalAmount).toFixed(2),
  };

  return createHash('sha256')
    .update(JSON.stringify(normalized))
    .digest('hex');
}

/**
 * Securely verifies if the re-calculated hash matches the expected hash.
 */
export function verifyTermsHash(expectedHash: string, data: ContractTermsPayload): boolean {
  const computedHash = calculateTermsHash(data);
  try {
    const expectedBuffer = Buffer.from(expectedHash, 'hex');
    const computedBuffer = Buffer.from(computedHash, 'hex');
    if (expectedBuffer.length !== computedBuffer.length) {
      return false;
    }
    return timingSafeEqual(expectedBuffer, computedBuffer);
  } catch {
    return false;
  }
}

export function getLegalConsentText(contractTitle: string, depositAmount: number, currency: string): string {
  return `By checking this box and submitting this form, I affirm my legal intent under US ESIGN Act, UETA, and EU Regulation 910/2014 (eIDAS) to ratify the project agreement for "${contractTitle}" including Section 3.1 (Condition Precedent to Performance & Deposit Clearance), Section 4.2 (Scope Delimitation & Automatic Stop-Work), Section 8.1 (Reservation of Rights & Conditional IP Assignment), and Section 14.9 (Cryptographic Execution Assent), accept all itemized deliverables as the sole defined scope, and authorize immediate payment of the upfront deposit of ${depositAmount.toFixed(2)} ${currency}.`;
}
