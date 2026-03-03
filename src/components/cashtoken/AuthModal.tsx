import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import GoldCoin from './GoldCoin';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    resetForm();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else if (data.user) {
        // Check if email confirmation is required
        if (data.session) {
          onAuthSuccess();
          onClose();
        } else {
          setSuccess('Account created! Please check your email to verify your account, then sign in.');
          setMode('login');
          setEmail(email);
          setPassword('');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) {
        setError(loginError.message);
      } else if (data.session) {
        onAuthSuccess();
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fadeIn 0.25s ease-out' }}
      >
        {/* Header */}
        <div
          className="relative px-8 pt-8 pb-6 text-center"
          style={{
            background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)',
          }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <GoldCoin size={48} className="mx-auto mb-3" />
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Join CashToken'}
          </h2>
          <p className="text-white/60 text-sm mt-1">
            {mode === 'login'
              ? 'Sign in to your Universal Reward Wallet'
              : 'Create your account and start earning rewards'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => switchMode('login')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'login'
                ? 'text-[#7B0F14] border-b-2 border-[#7B0F14]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              mode === 'signup'
                ? 'text-[#7B0F14] border-b-2 border-[#7B0F14]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={mode === 'login' ? handleLogin : handleSignUp}
          className="px-8 py-6 space-y-4"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
              {success}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Michael Johnson"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Enter your password'}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all shadow-lg ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#7B0F14] hover:bg-[#5A0B10] active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : mode === 'login' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button type="button" onClick={() => switchMode('signup')} className="text-[#7B0F14] font-semibold hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-[#7B0F14] font-semibold hover:underline">
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
