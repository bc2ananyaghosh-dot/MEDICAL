import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Wallet, Activity, CheckCircle2, ChevronRight } from 'lucide-react';
import { laceWallet, LaceWalletState } from '../services/laceWallet';

export const Navbar: React.FC = () => {
  const [walletState, setWalletState] = useState<LaceWalletState>(laceWallet.getState());
  const location = useLocation();

  useEffect(() => {
    return laceWallet.subscribe(setWalletState);
  }, []);

  const handleConnect = async () => {
    if (walletState.isConnected) {
      laceWallet.disconnect();
    } else {
      await laceWallet.connect();
    }
  };

  const isCurrent = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-1">
              Med<span className="text-gradient">Vault</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 block">
              Midnight ZK Health Network
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-medium text-sm transition-colors ${
              isCurrent('/') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`font-medium text-sm transition-colors ${
              isCurrent('/dashboard') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/verify"
            className={`font-medium text-sm transition-colors ${
              isCurrent('/verify') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            Verify Proof
          </Link>
          <Link
            to="/ledger"
            className={`font-medium text-sm transition-colors ${
              isCurrent('/ledger') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            Public Ledger
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Network Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Midnight Localnet
          </div>

          {/* Connect Lace Wallet Button */}
          <button
            onClick={handleConnect}
            disabled={walletState.isConnecting}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm ${
              walletState.isConnected
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                : 'bg-gradient-to-r from-blue-900 via-blue-700 to-purple-600 text-white hover:opacity-95 hover:shadow-md hover:shadow-blue-500/20 active:scale-95'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {walletState.isConnecting ? (
              <span>Connecting Lace...</span>
            ) : walletState.isConnected ? (
              <span className="flex items-center gap-1.5 font-mono text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {walletState.address?.slice(0, 8)}...{walletState.address?.slice(-4)}
              </span>
            ) : (
              <span>Connect Lace Wallet</span>
            )}
          </button>

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-xl border border-blue-100 transition-colors"
          >
            Login
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
