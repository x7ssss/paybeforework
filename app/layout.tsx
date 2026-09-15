import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

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
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-slate-900 block leading-tight">
                  PayBefore<span className="text-blue-600">Work</span>
                </span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase block">
                  Deposit & Scope Protocol
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all hover:shadow"
              >
                + Create Contract
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-3 text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-4xl mx-auto">
              PayBeforeWork provides software generation and electronic signature infrastructure only. It is not an escrow agent, payment processor, or money services business. All payments are remitted directly to the contractor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px]">
              <p>© {new Date().getFullYear()} PayBeforeWork. Cryptographic eIDAS & ESIGN compliance.</p>
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Tamper-evident SHA-256 integrity protection
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
