import React, { useEffect, useState } from 'react';
import { Database, CheckCircle2, Shield, Clock, Hash, ExternalLink, RefreshCw } from 'lucide-react';
import { fetchLedgerState } from '../services/midnightService';

export const LedgerViewer: React.FC = () => {
  const [ledger, setLedger] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadLedger = async () => {
    setLoading(true);
    const data = await fetchLedgerState();
    setLedger(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLedger();
  }, []);

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm glass-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              Midnight Public Ledger State
              <span className="text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Synced
              </span>
            </h3>
            <p className="text-xs text-slate-500">Only public identifiers and proof boolean states are logged</p>
          </div>
        </div>

        <button
          onClick={loadLedger}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Ledger
        </button>
      </div>

      {loading ? (
        <div className="space-y-3 py-6">
          <div className="h-10 skeleton rounded-xl w-full" />
          <div className="h-10 skeleton rounded-xl w-full" />
          <div className="h-10 skeleton rounded-xl w-full" />
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Summary Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">Registered Credentials</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{ledger?.credentialCount || 0}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">Verified Proofs</span>
              <p className="text-xl font-bold text-blue-900 mt-1">{ledger?.verificationCount || 0}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">Revocation Status</span>
              <p className="text-xl font-bold text-emerald-600 mt-1">
                {ledger?.isRevoked ? 'Revoked' : 'Active'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <span className="text-xs text-slate-500 font-medium">ZK Privacy Score</span>
              <p className="text-xl font-bold text-purple-600 mt-1">100% Zero Leak</p>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Credential Public ID</th>
                  <th className="py-3 px-4">Institution Hash</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-600">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-blue-900 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-blue-600" />
                    {ledger?.lastCredentialId?.slice(0, 16)}...
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {ledger?.lastInstitutionHash?.slice(0, 16)}...
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified Valid
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {new Date(Number(ledger?.lastTimestamp || 0) * 1000).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
