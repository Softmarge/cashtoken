import React from 'react';

interface ComingSoonProps {
  onNavigate: (page: string) => void;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8E5E0]">
      <div className="flex flex-col items-center">
        <img
          src="/logos/Comingsoon.webp"
          alt="Coming Soon"
          className="w-64 sm:w-80 lg:w-96 object-contain"
        />
        <button
          onClick={() => onNavigate('global')}
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Global
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
