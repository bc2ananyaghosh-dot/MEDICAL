import React from 'react';
import { ShieldCheck, Github, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">MedVault</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Privacy-preserving medical records and patient health credential verification platform built on the Midnight zero-knowledge blockchain.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono bg-white p-2 rounded-lg border border-slate-200 w-fit">
              <Lock className="w-3.5 h-3.5 text-purple-600" />
              <span>HIPAA / ZK Encrypted Proofs</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#features" className="hover:text-blue-600 transition-colors">ZK Record Verification</a></li>
              <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a></li>
              <li><a href="#privacy" className="hover:text-blue-600 transition-colors">HIPAA & Privacy Model</a></li>
              <li><a href="#benefits" className="hover:text-blue-600 transition-colors">Patient Benefits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="https://docs.midnight.network" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">Documentation <ExternalLink className="w-3 h-3"/></a></li>
              <li><a href="https://github.com/bc2ananyaghosh-dot/MEDICAL" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">GitHub Repository <Github className="w-3 h-3"/></a></li>
              <li><a href="https://midnight.network" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">Midnight Network <ExternalLink className="w-3 h-3"/></a></li>
              <li><a href="https://lace.io" target="_blank" rel="noreferrer" className="hover:text-blue-600 flex items-center gap-1">Lace Wallet <ExternalLink className="w-3 h-3"/></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal & Security</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><a href="#privacy" className="hover:text-blue-600 transition-colors">Patient Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#security" className="hover:text-blue-600 transition-colors">HIPAA Compliance</a></li>
              <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MedVault. Built on Midnight ZK Smart Contracts.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[11px] text-slate-400">Network ID: 0x4d69646e69676874</p>
        </div>
      </div>
    </footer>
  );
};
