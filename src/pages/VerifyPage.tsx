import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Lock, ArrowRight } from 'lucide-react';
import { ProofVerifierModal } from '../components/ProofVerifierModal';
import { ProofGeneratorModal } from '../components/ProofGeneratorModal';
import { ZeroKnowledgeProofBlob } from '../witness';

export const VerifyPage: React.FC = () => {
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [currentProof, setCurrentProof] = useState<ZeroKnowledgeProofBlob | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          Midnight Zero-Knowledge Verification Studio
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Verify Research Credentials <span className="text-gradient">Privately</span>
        </h1>
        <p className="mt-4 text-slate-600 text-sm">
          Test and validate Zero-Knowledge proof blobs against the Midnight Compact smart contract.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between glass-card">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Step 1: Generate Witness Proof</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Create a Zero-Knowledge proof blob from your private research witness (Authorship, Institution, Reviewer, or Grant).
            </p>
          </div>

          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="mt-8 w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-blue-900 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Launch Proof Generator
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between glass-card">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Step 2: Verify Proof Payload</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Paste or submit a ZK proof receipt to execute the circuit verification on Midnight Smart Contract.
            </p>
          </div>

          <button
            onClick={() => setIsVerifierOpen(true)}
            className="mt-8 w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-blue-900 via-blue-700 to-purple-600 hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Verify Proof Payload
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ProofGeneratorModal
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        onProofGenerated={(proof) => {
          setCurrentProof(proof);
          setIsVerifierOpen(true);
        }}
      />

      <ProofVerifierModal
        isOpen={isVerifierOpen}
        onClose={() => setIsVerifierOpen(false)}
        initialProof={currentProof}
      />
    </div>
  );
};
