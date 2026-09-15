import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const url = process.env.DATABASE_URL || 'file:local.db';
const authToken = process.env.DATABASE_AUTH_TOKEN;

export const rawClient = createClient({
  url,
  authToken,
});

export const db = drizzle(rawClient, { schema });

let isDbInitialized = false;

export async function ensureDbInitialized(): Promise<void> {
  if (isDbInitialized) return;

  await rawClient.execute(`
    CREATE TABLE IF NOT EXISTS contracts (
      id TEXT PRIMARY KEY,
      freelancer_name TEXT NOT NULL,
      freelancer_tax_id TEXT,
      payment_url TEXT NOT NULL,
      title TEXT NOT NULL,
      scope_summary TEXT NOT NULL,
      deliverables TEXT NOT NULL,
      revision_limit INTEGER NOT NULL DEFAULT 2,
      out_of_scope_hourly_rate REAL NOT NULL,
      total_amount REAL NOT NULL,
      deposit_amount REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'EUR',
      status TEXT NOT NULL DEFAULT 'pending',
      terms_hash TEXT NOT NULL,
      signer_name TEXT,
      signer_email TEXT,
      signer_ip TEXT,
      signer_user_agent TEXT,
      signed_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  await rawClient.execute(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      contract_id TEXT NOT NULL REFERENCES contracts(id),
      signer_name TEXT NOT NULL,
      signer_email TEXT NOT NULL,
      ip_address TEXT NOT NULL,
      user_agent TEXT NOT NULL,
      signed_at TEXT NOT NULL,
      verified_hash TEXT NOT NULL,
      consent_text TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  isDbInitialized = true;
}
