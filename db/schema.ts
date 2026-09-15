import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const contracts = sqliteTable('contracts', {
  id: text('id').primaryKey(), // 12-char nanoid
  freelancerName: text('freelancer_name').notNull(),
  freelancerTaxId: text('freelancer_tax_id'),
  paymentUrl: text('payment_url').notNull(),
  title: text('title').notNull(),
  scopeSummary: text('scope_summary').notNull(),
  deliverables: text('deliverables').notNull(), // JSON array string
  revisionLimit: integer('revision_limit').notNull().default(2),
  outOfScopeHourlyRate: real('out_of_scope_hourly_rate').notNull(),
  totalAmount: real('total_amount').notNull(),
  depositAmount: real('deposit_amount').notNull(),
  currency: text('currency').notNull().default('EUR'), // EUR, USD, GBP, BGN
  status: text('status').notNull().default('pending'), // 'pending' | 'signed' | 'completed'
  termsHash: text('terms_hash').notNull(), // SHA-256 canonical hash
  signerName: text('signer_name'),
  signerEmail: text('signer_email'),
  signerIp: text('signer_ip'),
  signerUserAgent: text('signer_user_agent'),
  signedAt: text('signed_at'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  contractId: text('contract_id')
    .notNull()
    .references(() => contracts.id),
  signerName: text('signer_name').notNull(),
  signerEmail: text('signer_email').notNull(),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent').notNull(),
  signedAt: text('signed_at').notNull(), // ISO UTC timestamp
  verifiedHash: text('verified_hash').notNull(),
  consentText: text('consent_text').notNull(),
  createdAt: text('created_at').notNull(),
});

export type Contract = typeof contracts.$inferSelect;
export type NewContract = typeof contracts.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
