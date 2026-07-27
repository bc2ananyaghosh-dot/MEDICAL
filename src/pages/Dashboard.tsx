import React, { useEffect, useState } from 'react';
import {
  Wallet,
  Activity,
  FileCheck,
  ShieldCheck,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Clock,
  Building2,
  Copy,
  Check,
  ExternalLink,
  Award,
  Lock,
} from 'lucide-react';
import { laceWallet, LaceWalletState } from '../services/laceWallet';
import { ProofGeneratorModal } from '../components/ProofGeneratorModal';
import { ProofVerifierModal } from '../components/ProofVerifierModal';
import { LedgerViewer } from '../components/LedgerViewer';
import { ZeroKnowledgeProofBlob } from '../witness';

export const Dashboard: React.FC = () => {
  const [walletState, setWalletState] = useState<LaceWalletState>(laceWallet.getState());
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [activeProof, setActiveProof] = useState<ZeroKnowledgeProofBlob | null>(null);
  const [copiedAddr, setCopiedAddr] = useState(false);

  useEffect(() => {
    return laceWallet.subscribe(setWalletState);
  }, []);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '0x4d69646e6967687450726f6f665363686f6c6172000000000000000000000001';
  const networkName = import.meta.env.VITE_NETWORK || 'localnet';
  const proofServerUrl = import.meta.env.VITE_PROOF_SERVER_URL || 'http://localhost:6300';

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  const handleProofGenerated = (proof: ZeroKnowledgeProofBlob) => {
    setActiveProof(proof);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ─── Status Header Bar ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm glass-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            ProofScholar Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Academic Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Manage private witness state, generate zero-knowledge proofs, and audit public ledger</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsGenModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-blue-900 via-blue-700 to-purple-600 hover:opacity-95 shadow-md shadow-blue-500/10 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Generate Proof
          </button>

          <button
            onClick={() => setIsVerifyModalOpen(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-xs text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            Verify Credential
          </button>
        </div>
      </div>

      {/* ─── System & Wallet Status Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Lace Wallet Status */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wallet Status</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-bold text-slate-900 text-sm flex items-center gap-2">
            {walletState.isConnected ? (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Connected to Lace
              </span>
            ) : (
              <span className="text-slate-400 font-normal">Not Connected</span>
            )}
          </p>
          <p className="text-xs font-mono text-slate-500 mt-1">
            {walletState.isConnected ? walletState.address?.slice(0, 14) + '...' : 'Connect to sign ZK receipts'}
          </p>
        </div>

        {/* Card 2: Network Status */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Midnight Network</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-bold text-slate-900 text-sm uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {networkName}
          </p>
          <p className="text-xs text-slate-500 mt-1 font-mono">Proof Server: {proofServerUrl}</p>
        </div>

        {/* Card 3: Contract Address */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compact Contract</span>
            <button onClick={copyAddress} className="text-slate-400 hover:text-slate-700">
              {copiedAddr ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="mt-3 font-mono font-bold text-slate-900 text-xs truncate">{contractAddress}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> State Synced
          </p>
        </div>

        {/* Card 4: ZK Privacy Rating */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs glass-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Privacy Rating</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-extrabold text-purple-600 text-xl">100% Confidential</p>
          <p className="text-xs text-slate-500 mt-1">Zero raw data exposed to ledger</p>
        </div>
      </div>

      {/* ─── Active Proof Blob Display (if just generated) ──────────────────────── */}
      {activeProof && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Generated ZK Proof Receipt
            </span>
            <button
              onClick={() => setIsVerifyModalOpen(true)}
              className="px-3 py-1 text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              Verify on Contract
            </button>
          </div>

          <div className="font-mono text-xs bg-slate-950/60 p-4 rounded-xl border border-white/10 overflow-x-auto space-y-1">
            <p><span className="text-slate-400">Proof ID:</span> {activeProof.proofId}</p>
            <p><span className="text-slate-400">Public Identifier:</span> {activeProof.publicIdentifier}</p>
            <p><span className="text-slate-400">Proof Hash:</span> {activeProof.proofHash}</p>
            <p><span className="text-slate-400">Verification Result:</span> <strong className="text-emerald-400">TRUE</strong></p>
          </div>
        </div>
      )}

      {/* ─── Main Content Tabs: Credentials & Ledger ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Registered Credentials & Requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm glass-card">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="font-bold text-lg text-slate-900">Your Academic Credentials</h3>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                3 Active Proofs
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Co-Authorship Verification',
                  desc: 'IEEE Transactions on Quantum Cryptography',
                  inst: 'Stanford University',
                  date: '2026-07-20',
                  status: 'Verified Active',
                  icon: FileCheck,
                  color: 'text-blue-600 bg-blue-50',
                },
                {
                  title: 'Institutional Affiliation Proof',
                  desc: 'Department of Computer Science',
                  inst: 'MIT Research Lab',
                  date: '2026-07-15',
                  status: 'Verified Active',
                  icon: Building2,
                  color: 'text-purple-600 bg-purple-50',
                },
                {
                  title: 'Reviewer Credentials',
                  desc: 'Double-Blind Peer Reviewer Threshold (Count >= 5)',
                  inst: 'ACM Computing Surveys',
                  date: '2026-07-02',
                  status: 'Verified Active',
                  icon: Award,
                  color: 'text-emerald-600 bg-emerald-50',
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 transition-all flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${c.color} shrink-0 mt-0.5`}>
                      <c.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{c.desc}</p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                        <span>{c.inst}</span>
                        <span>•</span>
                        <span>{c.date}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Recent Activity Timeline */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm glass-card">
            <h3 className="font-bold text-lg text-slate-900 pb-4 border-b border-slate-100 mb-6">
              Recent Verification Activity
            </h3>

            <div className="space-y-6">
              {[
                { title: 'Grant Eligibility Witness Evaluated', time: '10 mins ago', detail: 'NSF ZK Witness Passed' },
                { title: 'Lace Wallet Signed Receipts', time: '1 hour ago', detail: 'Address mn_test1q8f...' },
                { title: 'Ledger State Updated', time: '3 hours ago', detail: 'Contract Block #199482' },
              ].map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div>
                    <h5 className="font-semibold text-slate-900">{act.title}</h5>
                    <p className="text-slate-500 text-[11px]">{act.detail}</p>
                    <span className="text-slate-400 text-[10px] flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Public Ledger Section ──────────────────────────────────────────────── */}
      <LedgerViewer />

      <ProofGeneratorModal
        isOpen={isGenModalOpen}
        onClose={() => setIsGenModalOpen(false)}
        onProofGenerated={handleProofGenerated}
      />

      <ProofVerifierModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        initialProof={activeProof}
      />
    </div>
  );
};
