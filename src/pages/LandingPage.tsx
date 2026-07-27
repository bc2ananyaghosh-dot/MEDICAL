import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  UserCheck,
  Building2,
  FileCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Award,
  Users,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { laceWallet } from '../services/laceWallet';
import { ProofGeneratorModal } from '../components/ProofGeneratorModal';
import { ZeroKnowledgeProofBlob } from '../witness';

export const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedProof, setGeneratedProof] = useState<ZeroKnowledgeProofBlob | null>(null);

  const handleConnectWallet = async () => {
    await laceWallet.connect();
  };

  return (
    <div className="relative overflow-hidden space-y-24 pb-16">
      {/* ─── Hero Section ────────────────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-hero-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold mb-8 animate-fade-in shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            Built on Midnight Zero-Knowledge Blockchain
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Privacy-first Research Credential <span className="text-gradient">Verification</span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Verify academic contributions without exposing confidential research records. Protect sensitive discoveries while proving authorship, institutional affiliation, and reviewer status.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-blue-900 via-blue-700 to-purple-600 hover:shadow-xl hover:shadow-blue-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleConnectWallet}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-sm text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Connect Lace Wallet
            </button>
          </div>

          {/* Animated Illustration: Researcher -> Midnight Proof -> Verified Institution */}
          <div className="mt-16 max-w-4xl mx-auto p-8 rounded-3xl glass-card border border-slate-200/80 relative shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Box 1: Researcher */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-3 group hover:border-blue-300 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Researcher</h4>
                  <p className="text-xs text-slate-500 mt-1">Holds confidential paper drafts & identity</p>
                </div>
              </div>

              {/* Box 2: Midnight ZK Proof */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white shadow-lg flex flex-col items-center text-center space-y-3 relative overflow-hidden animate-pulse-slow">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-purple-300">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Midnight Proof</h4>
                  <p className="text-xs text-blue-200 mt-1">Zero-Knowledge Witness computation</p>
                </div>
              </div>

              {/* Box 3: Verified Institution */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center text-center space-y-3 group hover:border-emerald-300 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Verified Institution</h4>
                  <p className="text-xs text-slate-500 mt-1">Verifies validity without seeing raw data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ────────────────────────────────────────────────────── */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Privacy-Preserving Features
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Everything needed for researchers and institutions to verify credentials privately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: 'Zero-Knowledge Verification',
              desc: 'Prove research claims with mathematical certainty without exposing underlying text, data, or credentials.',
              color: 'text-blue-600 bg-blue-50',
            },
            {
              icon: Lock,
              title: 'Private Academic Credentials',
              desc: 'Store ORCID profiles, degree transcripts, and grant eligibility credentials in encrypted private witnesses.',
              color: 'text-purple-600 bg-purple-50',
            },
            {
              icon: Building2,
              title: 'Institution Verification',
              desc: 'University and lab validation without public exposure of employment contracts or internal IDs.',
              color: 'text-indigo-600 bg-indigo-50',
            },
            {
              icon: UserCheck,
              title: 'Reviewer Verification',
              desc: 'Prove peer-review credentials for top journals while maintaining complete double-blind anonymity.',
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              icon: FileCheck,
              title: 'Research Contribution Proof',
              desc: 'Verify co-authorship and publication eligibility before official journal submission.',
              color: 'text-blue-600 bg-blue-50',
            },
            {
              icon: Sparkles,
              title: 'Secure Blockchain Storage',
              desc: 'Immutable public ledger records only verification status timestamps powered by Midnight Compact.',
              color: 'text-purple-600 bg-purple-50',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 glass-card"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-6`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ───────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50/70 py-16 rounded-3xl border border-slate-200/60">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How ProofScholar Works</h2>
          <p className="mt-3 text-slate-600 text-sm">5 Simple steps to generate and verify academic proofs privately</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Login', desc: 'Sign in to ProofScholar platform' },
            { step: '02', title: 'Connect Lace', desc: 'Link Lace Wallet for ZK state keys' },
            { step: '03', title: 'Upload Credential', desc: 'Enter private research witness' },
            { step: '04', title: 'Generate Proof', desc: 'Execute Midnight Compact circuit' },
            { step: '05', title: 'Verify Privately', desc: 'Share proof blob with verifier' },
          ].map((s, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
              <span className="text-2xl font-black text-blue-900/20 block mb-2 font-mono">{s.step}</span>
              <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Privacy Section (Visible vs Hidden Matrix) ─────────────────────────── */}
      <section id="privacy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold tracking-widest text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800">
              Midnight ZK Privacy Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Selective Disclosure: What is Visible vs. What Remains Hidden
            </h2>
            <p className="mt-3 text-slate-300 text-sm">
              ProofScholar strictly enforces zero-knowledge boundaries. Only proof validity is disclosed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Visible */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-emerald-500/30">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base mb-4">
                <Eye className="w-5 h-5" />
                Visible on Public Ledger
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Proof Validity Result (True / False)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Credential Status (Active / Revoked)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Verification Timestamp
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Anonymized Public Identifier Hash
                </li>
              </ul>
            </div>

            {/* Hidden */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-500/30">
              <div className="flex items-center gap-2.5 text-purple-300 font-bold text-base mb-4">
                <EyeOff className="w-5 h-5" />
                Strictly Hidden in Private Witness
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-300 shrink-0" />
                  Confidential Research Manuscripts & Manuscripts
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-300 shrink-0" />
                  Unpublished Publication Drafts & Data Sets
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-300 shrink-0" />
                  Researcher Real Name & Personal Details
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-300 shrink-0" />
                  Internal Institutional Employee & Student Records
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits Section ──────────────────────────────────────────────────── */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Built for the Entire Academic Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Building2, target: 'Universities', desc: 'Instantly verify researcher affiliations without maintaining public database APIs.' },
            { icon: BookOpen, target: 'Journals', desc: 'Verify reviewer credentials and contribution history while maintaining double-blind integrity.' },
            { icon: FlaskConical, target: 'Research Labs', desc: 'Protect intellectual property and unpatented scientific findings before publication.' },
            { icon: Award, target: 'Funding Agencies', desc: 'Confirm grant eligibility and institutional backing privately.' },
            { icon: GraduationCap, target: 'Students', desc: 'Prove degree progress and co-authorship to future advisors safely.' },
            { icon: Users, target: 'Researchers', desc: 'Maintain complete sovereignty over academic records and credentials.' },
          ].map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4 hover:border-blue-300 transition-colors">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                <b.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{b.target}</h4>
                <p className="text-xs text-slate-600 mt-1">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProofGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProofGenerated={setGeneratedProof}
      />
    </div>
  );
};
