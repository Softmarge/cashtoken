import React from 'react';
import GoldCoin from './GoldCoin';

interface BusinessLandingProps {
  onGetStarted: () => void;
  onChooseAPI: () => void;
}

const BusinessLanding: React.FC<BusinessLandingProps> = ({ onGetStarted, onChooseAPI }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 text-center">
        {/* Gold Coin Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#DAA520]/20 rounded-full blur-3xl scale-150" />
            <GoldCoin size={80} />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D0C0E] mb-4 leading-tight">
          Are you a business owner?
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-[#7B0F14] font-semibold mb-12">
          Start your CashToken Loyalty reward program in{' '}
          <span className="inline-block bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-transparent bg-clip-text font-extrabold">
            1 MINUTE
          </span>
        </p>

        {/* Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Get Started Card */}
          <button
            onClick={onGetStarted}
            className="group bg-white rounded-2xl shadow-lg border-2 border-[#7B0F14]/10 hover:border-[#7B0F14] p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3D0C0E] mb-3">
              Get Started
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create your business account and start rewarding your customers with CashTokens in minutes.
            </p>
            <div className="flex items-center gap-2 mt-6 text-[#7B0F14] font-semibold text-sm group-hover:gap-3 transition-all">
              <span>Create Account</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </button>

          {/* Choose Your API Integration Card */}
          <button
            onClick={onChooseAPI}
            className="group bg-white rounded-2xl shadow-lg border-2 border-[#DAA520]/10 hover:border-[#DAA520] p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="4" x2="10" y2="20" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#3D0C0E] mb-3">
              Choose Your API Integration
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Seamless integration with your existing systems.
            </p>
            <div className="flex items-center gap-2 mt-6 text-[#DAA520] font-semibold text-sm group-hover:gap-3 transition-all">
              <span>View APIs</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom decorative section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-8 text-center text-sm text-gray-400 mt-8">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>FCA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>UK GDPR Protected</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Setup in 1 Minute</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLanding;
