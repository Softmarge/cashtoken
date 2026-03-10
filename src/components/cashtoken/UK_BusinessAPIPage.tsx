import React, { useState } from 'react';
import GoldCoin from './GoldCoin';

const GOLD_GIFT_IMAGE = 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772038848046_90490021.jpg';

interface BusinessAPIPageProps {
  onBack: () => void;
}

const UK_BusinessAPIPage: React.FC<BusinessAPIPageProps> = ({ onBack }) => {
  const [selectedApi, setSelectedApi] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSelectApi = () => {
    setSelectedApi(true);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] to-white">
      {/* Top Bar */}
      <div className="bg-[#7B0F14] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <GoldCoin size={36} />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wider text-white">CASHTOKEN</span>
            <span className="text-[9px] font-semibold tracking-[0.15em] text-[#DAA520]">REWARD INTERNATIONAL</span>
          </div>
          <button
            onClick={onBack}
            className="ml-auto flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showConfirmation && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-pulse">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          API Selected Successfully!
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D0C0E] mb-2">Choose Your API Integration</h1>
          <p className="text-gray-500 text-base">Seamless integration with your existing systems</p>
        </div>

        {/* API Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
          {/* Gold Gift Box Image */}
          <div className="p-8 sm:p-10 flex justify-center bg-gradient-to-b from-[#FDF8E8] via-[#FFF9E6] to-white">
            <div className="relative">
              <div className="absolute inset-0 bg-[#DAA520]/10 rounded-full blur-3xl scale-125" />
              <img
                src={GOLD_GIFT_IMAGE}
                alt="CashToken Gifting API"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-2xl relative z-10"
              />
              {/* Brand Logo Overlay */}
              <div className="absolute bottom-2 right-2 z-20">
                <GoldCoin size={40} />
              </div>
            </div>
          </div>

          {/* API Info */}
          <div className="px-8 sm:px-10 pb-8 sm:pb-10 text-center">
            <h2 className="text-2xl font-bold text-[#3D0C0E] mb-3">CashToken Gifting API</h2>
            <p className="text-gray-500 text-base mb-8 leading-relaxed">
              Complete gifting and loyalty rewards integration for your platform
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSelectApi}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold text-base transition-all ${
                  selectedApi
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                    : 'bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white hover:from-[#C49B1A] hover:to-[#9A7209] shadow-md hover:shadow-lg'
                }`}
              >
                {selectedApi ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    API Selected
                  </span>
                ) : (
                  'Select API'
                )}
              </button>
              <a
                href="https://documenter.getpostman.com/view/2336411/VUjLKmmB"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 px-6 rounded-xl font-semibold text-base bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-white hover:from-[#C49B1A] hover:to-[#9A7209] shadow-md hover:shadow-lg transition-all text-center inline-flex items-center justify-center gap-2"
              >
                View Documentation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 rounded-lg bg-[#F4E6E6] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">RESTful API</h3>
            <p className="text-xs text-gray-500">Simple REST endpoints for easy integration</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 rounded-lg bg-[#FFF3E0] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Secure</h3>
            <p className="text-xs text-gray-500">OAuth 2.0 authentication & encryption</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="w-10 h-10 rounded-lg bg-[#E8F8E8] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">Scalable</h3>
            <p className="text-xs text-gray-500">Built to handle millions of transactions</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">&copy; 2026 CASHTOKEN</p>
          <div className="flex items-center gap-6">
            <a href="https://ng.cashtoken.africa/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#7B0F14] font-medium">
              TERMS
            </a>
            <a href="https://ng.cashtoken.africa/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#7B0F14] font-medium">
              PRIVACY POLICY
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-[#7B0F14] font-medium">
              SUPPORT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UK_BusinessAPIPage;