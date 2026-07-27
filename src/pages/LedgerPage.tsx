import React from 'react';
import { LedgerViewer } from '../components/LedgerViewer';
import { Database, ShieldAlert } from 'lucide-react';

export const LedgerPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-4">
          <Database className="w-3.5 h-3.5" />
          Midnight Public Blockchain Explorer
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Public Ledger <span className="text-gradient">Explorer</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm">
          Audit live on-chain credential registrations and proof verification events. Zero confidential records are disclosed.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold">Midnight Privacy Assurance</h4>
          <p className="mt-0.5">
            Every transaction recorded below contains strictly public credential hashes, verification booleans, and timestamps. Raw research manuscripts, author names, and institution records are 100% shielded.
          </p>
        </div>
      </div>

      <LedgerViewer />
    </div>
  );
};
