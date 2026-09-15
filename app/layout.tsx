import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PayBeforeWork | Upfront Deposit & Scope Control Protocol',
  description:
    'Zero-bloat milestone contract and 50% deposit invoice generator for solo developers and freelancers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-zinc-50/50 text-zinc-900 antialiased selection:bg-zinc-900 selection:text-zinc-50">
        <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center text-zinc-50 group-hover:bg-zinc-800 transition-colors">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-zinc-950 block leading-tight">
                  PayBefore<span className="text-zinc-500 font-normal">Work</span>
                </span>
                <span className="font-mono text-[9px] text-zinc-400 font-semibold tracking-wider uppercase block">
                  PROTOCOL // SPEC_1.0
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center justify-center text-xs font-semibold px-4 py-2 rounded bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors shadow-sm"
              >
                + Create Contract
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-zinc-200 bg-white py-8 text-xs text-zinc-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-zinc-600">
              <Link href="/" className="hover:text-zinc-950 transition-colors">
                Home
              </Link>
              <Link href="/create" className="hover:text-zinc-950 transition-colors">
                Create Contract
              </Link>
              <Link href="/terms" className="hover:text-zinc-950 transition-colors font-semibold">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-zinc-950 transition-colors font-semibold">
                Privacy Policy
              </Link>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed max-w-4xl mx-auto">
              PayBeforeWork provides software generation and electronic signature infrastructure only. It is not an escrow agent, payment processor, or money services business. All payments are remitted directly to the contractor.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-zinc-100 text-[11px] font-mono text-zinc-400">
              <p>© {new Date().getFullYear()} PayBeforeWork Protocol. eIDAS & ESIGN Compliant.</p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                SHA-256 Tamper-Evident Integrity Assured
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
