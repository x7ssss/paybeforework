import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { contracts, auditLogs } from '../db/schema.ts';
import { calculateTermsHash, verifyTermsHash, getLegalConsentText } from '../lib/hash.ts';
import { generateContractPdf } from '../lib/pdf.ts';
import { nanoid } from 'nanoid';

async function runTests() {
  console.log('--- STARTING PAYBEFOREWORK API & SECURITY TESTS ---');

  const client = createClient({ url: 'file:local.db' });
  const db = drizzle(client);

  // Test 1: Hash Calculation & Verification
  const sampleTerms = {
    title: 'Full-Stack Next.js SaaS MVP',
    scopeSummary: 'Develop complete authentication, dashboard, and billing flows.',
    deliverables: ['Auth with OAuth & email', 'Stripe customer portal', 'Responsive UI dashboard'],
    revisionLimit: 2,
    outOfScopeHourlyRate: 120,
    totalAmount: 5000,
    depositAmount: 2500,
    currency: 'EUR',
    freelancerName: 'Alex Rivera',
    paymentUrl: 'https://buy.stripe.com/test_123456',
  };

  const hash1 = calculateTermsHash(sampleTerms);
  console.log('Test 1: Generated SHA-256 Hash:', hash1);
  if (!hash1 || hash1.length !== 64) {
    throw new Error('Hash calculation failed: invalid length');
  }

  const isValid = verifyTermsHash(hash1, sampleTerms);
  console.log('Test 1.1: Verification with identical terms:', isValid);
  if (!isValid) {
    throw new Error('Hash verification failed for identical terms');
  }

  // Tamper Test
  const tamperedTerms = { ...sampleTerms, totalAmount: 4000 };
  const isTamperedValid = verifyTermsHash(hash1, tamperedTerms);
  console.log('Test 1.2: Tamper detection (totalAmount changed):', !isTamperedValid ? 'PASSED (Rejected)' : 'FAILED');
  if (isTamperedValid) {
    throw new Error('Tamper detection failed! Tampered payload was accepted.');
  }

  // Test 2: Database Insertion
  const contractId = nanoid(12);
  const nowIso = new Date().toISOString();
  await db.insert(contracts).values({
    id: contractId,
    freelancerName: sampleTerms.freelancerName,
    freelancerTaxId: 'EU987654321',
    paymentUrl: sampleTerms.paymentUrl,
    title: sampleTerms.title,
    scopeSummary: sampleTerms.scopeSummary,
    deliverables: JSON.stringify(sampleTerms.deliverables),
    revisionLimit: sampleTerms.revisionLimit,
    outOfScopeHourlyRate: sampleTerms.outOfScopeHourlyRate,
    totalAmount: sampleTerms.totalAmount,
    depositAmount: sampleTerms.depositAmount,
    currency: sampleTerms.currency,
    status: 'pending',
    termsHash: hash1,
    createdAt: nowIso,
    updatedAt: nowIso,
  });

  const [savedContract] = await db.select().from(contracts).where(eq(contracts.id, contractId));
  console.log('Test 2: Contract inserted and queried:', savedContract.id, 'status:', savedContract.status);
  if (savedContract.id !== contractId || savedContract.termsHash !== hash1) {
    throw new Error('Contract DB query mismatch');
  }

  // Test 3: Sign & Audit Log
  const auditId = nanoid(16);
  const signerName = 'Jane Doe';
  const signerEmail = 'jane@acmecorp.com';
  const consent = getLegalConsentText(sampleTerms.title, sampleTerms.depositAmount, sampleTerms.currency);

  await db.insert(auditLogs).values({
    id: auditId,
    contractId: savedContract.id,
    signerName,
    signerEmail,
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TestBrowser',
    signedAt: nowIso,
    verifiedHash: savedContract.termsHash,
    consentText: consent,
    createdAt: nowIso,
  });

  await db
    .update(contracts)
    .set({
      status: 'signed',
      signerName,
      signerEmail,
      signerIp: '192.168.1.100',
      signerUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TestBrowser',
      signedAt: nowIso,
      updatedAt: nowIso,
    })
    .where(eq(contracts.id, contractId));

  const [signedContract] = await db.select().from(contracts).where(eq(contracts.id, contractId));
  const [auditRecord] = await db.select().from(auditLogs).where(eq(auditLogs.id, auditId));

  console.log('Test 3: Contract updated to signed:', signedContract.status, 'Signed by:', signedContract.signerName);
  console.log('Test 3.1: Audit record captured:', auditRecord.id, 'IP:', auditRecord.ipAddress);
  if (signedContract.status !== 'signed' || !auditRecord) {
    throw new Error('Sign and audit log flow failed');
  }

  // Test 4: PDF Generation
  console.log('Test 4: Generating PDF buffer...');
  const pdfBuffer = await generateContractPdf(signedContract, auditRecord);
  console.log('Test 4.1: PDF generated successfully, byte size:', pdfBuffer.length);
  const pdfHeader = pdfBuffer.slice(0, 5).toString('utf-8');
  if (pdfHeader !== '%PDF-') {
    throw new Error(`PDF generation produced invalid header: ${pdfHeader}`);
  }
  console.log('Test 4.2: Valid PDF header verified: %PDF-');

  console.log('--- ALL API & SECURITY LOGIC TESTS PASSED SUCCESSFULLY! ---');
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
