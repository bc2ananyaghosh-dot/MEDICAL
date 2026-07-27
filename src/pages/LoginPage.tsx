import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { laceWallet } from '../services/laceWallet';

export const LoginPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  const handleLaceConnect = async () => {
    setLoading(true);
    const success = await laceWallet.connect();
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Could not connect Lace Wallet.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-hero-glow">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-2xl glass-card relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-blue-600 to-purple-600" />

        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
            {isSignUp ? 'Create Academic Account' : 'Welcome back to ProofScholar'}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            {isSignUp ? 'Register to manage private research witness keys' : 'Sign in to access your Midnight research credentials'}
          </p>
        </div>

        {/* Lace Wallet Auth Button */}
        <button
          onClick={handleLaceConnect}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-semibold text-xs text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all shadow-xs"
        >
          <Wallet className="w-4 h-4 text-blue-700" />
          Connect with Lace Wallet
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider absolute">
            Or with email
          </span>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="researcher@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Reset link sent to academic email.'); }} className="text-blue-600 font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-blue-900 via-blue-700 to-purple-600 hover:opacity-95 shadow-md transition-all"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-slate-600 hover:text-blue-600 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};
