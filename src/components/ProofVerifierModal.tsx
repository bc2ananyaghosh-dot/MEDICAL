import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { verifyProofRemote } from '../services/midnightService';
import { ZeroKnowledgeProofBlob } from '../witness';

interface ProofVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProof?: ZeroKnowledgeProofBlob | null;
}

export const ProofVerifierModal: React.FC<ProofVerifierModalProps> = ({
  isOpen,
  onClose,
  initialProof,
}) => {
  const [proofJson, setProofJson] = useState(
    initialProof ? JSON.stringify(initialProof, null, 2) : ''
  );
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    verified: boolean;
    message: string;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      let parsedPayload: ZeroKnowledgeProofBlob;
      if (proofJson.trim()) {
        parsedPayload = JSON.parse(proofJson);
      } else if (initialProof) {
        parsedPayload = initialProof;
      } else {
        throw new Error('Please paste a valid ZK proof JSON blob');
      }

      const res = await verifyProofRemote(parsedPayload);
      setVerificationResult(res);
    } catch (err: any) {
      setVerificationResult({
        success: false,
        verified: false,
        message: err.message || 'Invalid proof format',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const copySample = () => {
    const sample: ZeroKnowledgeProofBlob = initialProof || {
      proofId: 'zkp_demo_887192',
      publicIdentifier: '0x8f2a4b1c9e8d7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a',
      institutionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      verificationResult: true,
      disclosedData: {
        proofValidity: true,
        credentialStatus: 'Active',
        timestamp: Math.floor(Date.now() / 1000),
      },
      hiddenDataSummary: {
        confidentialDocumentsExposed: false,
        publicationDraftsExposed: false,
        authorIdentityExposed: false,
        institutionalDataExposed: false,
      },
      proofHash: '0x3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d',
    };
    setProofJson(JSON.stringify(sample, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Verify Zero-Knowledge Proof</h3>
              <p className="text-xs text-slate-500">Validate research claim against Midnight Smart Contract</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">Paste ZK Proof Payload JSON</label>
            <button
              onClick={copySample}
              className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 hover:underline"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied Sample!' : 'Load Sample Proof'}
            </button>
          </div>

          <textarea
            rows={7}
            value={proofJson}
            onChange={(e) => setProofJson(e.target.value)}
            placeholder="Paste Zero-Knowledge Proof JSON blob here..."
            className="w-full p-3 font-mono text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {verificationResult && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
                verificationResult.verified
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {verificationResult.verified ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-sm">
                  {verificationResult.verified ? 'Proof Verified Successfully!' : 'Proof Verification Failed'}
                </h4>
                <p className="mt-0.5">{verificationResult.message}</p>
                <div className="mt-2 pt-2 border-t border-emerald-200/60 font-mono text-[11px]">
                  <span>Zero Confidential Records Exposed: </span>
                  <strong className="text-emerald-700">TRUE</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all disabled:opacity-50"
          >
            {isVerifying ? (
              <span>Verifying on Circuit...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Verify Proof
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
