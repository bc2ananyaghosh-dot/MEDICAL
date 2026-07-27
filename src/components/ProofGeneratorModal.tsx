import React, { useState } from 'react';
import { X, Lock, CheckCircle, Sparkles, FileText, UserCheck, Building2, Award } from 'lucide-react';
import { generateProofRemote } from '../services/midnightService';
import { ZeroKnowledgeProofBlob } from '../witness';

interface ProofGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProofGenerated: (proof: ZeroKnowledgeProofBlob) => void;
}

export const ProofGeneratorModal: React.FC<ProofGeneratorModalProps> = ({
  isOpen,
  onClose,
  onProofGenerated,
}) => {
  const [proofType, setProofType] = useState<'authorship' | 'institution' | 'reviewer' | 'grant'>('authorship');
  const [title, setTitle] = useState('');
  const [abstractText, setAbstractText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [orcidId, setOrcidId] = useState('');
  const [institutionDomain, setInstitutionDomain] = useState('');
  const [reviewerSecret, setReviewerSecret] = useState('');
  const [reviewCount, setReviewCount] = useState(3);
  const [grantId, setGrantId] = useState('');
  const [fundingAmount, setFundingAmount] = useState(50000);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const witness = {
      research: {
        title: title || 'Privacy Preserving Proofs in Distributed Systems',
        abstractText: abstractText || 'Confidential draft manuscript details...',
        coAuthors: ['Dr. A. Smith', 'Prof. B. Johnson'],
        journalRef: 'IEEE-Trans-Crypto-2026',
        publicationDate: '2026-07-27',
      },
      author: {
        authorName: authorName || 'Ananya Ghosh',
        orcidId: orcidId || '0000-0002-1825-0097',
        authorSecret: 'secret_key_' + Math.random().toString(36).substring(7),
      },
      institution: {
        institutionName: 'Stanford University',
        institutionDomain: institutionDomain || 'stanford.edu',
        institutionSecretKey: 'inst_secret_99812',
      },
      reviewer: {
        reviewerId: 'REV-99120',
        reviewerSecret: reviewerSecret || 'rev_secret_token',
        peerReviewCount: Number(reviewCount),
      },
      grant: {
        grantId: grantId || 'NSF-GR-2026-88',
        grantSecret: 'grant_secret_key',
        requestedCategory: 'Computer Science & ZK Cryptography',
        fundingAmountUSD: Number(fundingAmount),
      },
    };

    const proof = await generateProofRemote(witness, proofType);
    setIsGenerating(false);
    onProofGenerated(proof);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-blue-600 to-purple-600" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Generate Midnight Zero-Knowledge Proof</h3>
              <p className="text-xs text-slate-500">Private witness computed locally — confidential data is never transmitted</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Proof Type Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-4">
          <button
            type="button"
            onClick={() => setProofType('authorship')}
            className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              proofType === 'authorship'
                ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Authorship
          </button>

          <button
            type="button"
            onClick={() => setProofType('institution')}
            className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              proofType === 'institution'
                ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Institution
          </button>

          <button
            type="button"
            onClick={() => setProofType('reviewer')}
            className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              proofType === 'reviewer'
                ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Reviewer
          </button>

          <button
            type="button"
            onClick={() => setProofType('grant')}
            className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
              proofType === 'grant'
                ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Grant
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {proofType === 'authorship' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Research Paper Title (Private Witness)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Privacy-Preserving Zero-Knowledge Verification on Midnight"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Unpublished Draft Abstract (Kept Confidential)</label>
                <textarea
                  rows={2}
                  placeholder="Enter abstract snippet (remains 100% private)..."
                  value={abstractText}
                  onChange={(e) => setAbstractText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Jane Doe"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ORCID ID</label>
                  <input
                    type="text"
                    required
                    placeholder="0000-0002-1825-0097"
                    value={orcidId}
                    onChange={(e) => setOrcidId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {proofType === 'institution' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Institution Domain</label>
              <input
                type="text"
                required
                placeholder="mit.edu or harvard.edu"
                value={institutionDomain}
                onChange={(e) => setInstitutionDomain(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

          {proofType === 'reviewer' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reviewer Secret Passcode</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={reviewerSecret}
                  onChange={(e) => setReviewerSecret(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Peer Review Count Threshold</label>
                <input
                  type="number"
                  min={1}
                  value={reviewCount}
                  onChange={(e) => setReviewCount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {proofType === 'grant' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Grant Application ID</label>
                <input
                  type="text"
                  required
                  placeholder="NSF-2026-GRANT"
                  value={grantId}
                  onChange={(e) => setGrantId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Funding ($ USD)</label>
                <input
                  type="number"
                  min={1000}
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-start gap-2 text-xs text-purple-900">
            <Lock className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <p>
              <strong>Midnight ZK Guarantee:</strong> Title, author identity, and raw text remain inside your client-side private witness. Only the output boolean proof is published.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-900 via-blue-700 to-purple-600 hover:opacity-95 shadow-md shadow-blue-500/10 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <span>Generating ZK Circuit...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Generate Proof
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
