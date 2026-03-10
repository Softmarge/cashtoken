import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';

// Scroll-triggered visibility hook
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > -50) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: Math.min(threshold, 0.05), rootMargin: '80px 0px 80px 0px' }
    );
    observer.observe(el);
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) { setIsVisible(true); window.removeEventListener('scroll', onScroll); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = setTimeout(() => setIsVisible(true), 4000);
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); clearTimeout(fallback); };
  }, [threshold]);
  return { ref, isVisible };
}

interface BusinessLandingProps {
  onGetStarted: () => void;
  onChooseAPI: () => void;
}

const UK_BusinessLanding: React.FC<BusinessLandingProps> = ({ onGetStarted, onChooseAPI }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const cardsSection = useInView(0.1);
  const bottomSection = useInView(0.1);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDF8F0] to-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 text-center">
        {/* Gold Coin Animation */}
        <div className="flex justify-center mb-8">
          <div
            className="relative"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-20deg)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="absolute inset-0 bg-[#DAA520]/20 rounded-full blur-3xl scale-150" />
            <GoldCoin size={80} />
          </div>
        </div>

        {/* Hero heading - words from alternating directions */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3D0C0E] mb-4 leading-tight">
          <span
            className="inline-block"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateX(0)' : 'translateX(-100px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s',
            }}
          >
            Are you a
          </span>{' '}
          <span
            className="inline-block"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.85)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
            }}
          >
            business
          </span>{' '}
          <span
            className="inline-block"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateX(0)' : 'translateX(-80px)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s',
            }}
          >
            owner?
          </span>
        </h1>

        {/* Subtitle - words from alternating directions */}
        <p className="text-lg sm:text-xl lg:text-2xl text-[#7B0F14] font-semibold mb-12">
          <span
            className="inline-block"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateX(0)' : 'translateX(80px)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s',
            }}
          >
            Start your CashToken
          </span>{' '}
          <span
            className="inline-block"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateX(0)' : 'translateX(-80px)',
              transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s',
            }}
          >
            Loyalty reward program in
          </span>{' '}
          <span
            className="inline-block bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-transparent bg-clip-text font-extrabold"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateX(0) scale(1)' : 'translateX(80px) scale(0.7)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
            }}
          >
            1 MINUTE
          </span>
        </p>

        {/* Two Cards - animated from left and right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto" ref={cardsSection.ref}>
          {/* Get Started Card - from left */}
          <button
            onClick={onGetStarted}
            className="group bg-white rounded-2xl shadow-lg border-2 border-[#7B0F14]/10 hover:border-[#7B0F14] p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left"
            style={{
              opacity: cardsSection.isVisible ? 1 : 0,
              transform: cardsSection.isVisible ? 'translateX(0) scale(1)' : 'translateX(-100px) scale(0.9)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              style={{
                opacity: cardsSection.isVisible ? 1 : 0,
                transform: cardsSection.isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-15deg) scale(0.5)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#3D0C0E] mb-3"
              style={{
                opacity: cardsSection.isVisible ? 1 : 0,
                transform: cardsSection.isVisible ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s',
              }}
            >
              Get Started
            </h2>
            <p
              className="text-gray-500 text-sm leading-relaxed"
              style={{
                opacity: cardsSection.isVisible ? 1 : 0,
                transform: cardsSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.45s',
              }}
            >
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

          {/* Choose Your API Integration Card - from right */}
          <button
            onClick={onChooseAPI}
            className="group bg-white rounded-2xl shadow-lg border-2 border-[#DAA520]/10 hover:border-[#DAA520] p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 text-left"
            style={{
              opacity: cardsSection.isVisible ? 1 : 0,
              transform: cardsSection.isVisible ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.9)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              style={{
                opacity: cardsSection.isVisible ? 1 : 0,
                transform: cardsSection.isVisible ? 'rotate(0deg) scale(1)' : 'rotate(15deg) scale(0.5)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
                <line x1="14" y1="4" x2="10" y2="20" />
              </svg>
            </div>
            <h2
              className="text-xl sm:text-2xl font-bold text-[#3D0C0E] mb-3"
              style={{
                opacity: cardsSection.isVisible ? 1 : 0,
                transform: cardsSection.isVisible ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s',
              }}
            >
              Choose Your API Integration
            </h2>
            <p
              className="text-gray-500 text-sm leading-relaxed"
              style={{
                opacity: cardsSection.isVisible ? 1 : 0,
                transform: cardsSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.55s',
              }}
            >
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" ref={bottomSection.ref}>
        <div className="flex flex-wrap items-center justify-center gap-8 text-center text-sm text-gray-400 mt-8">
          {[
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              label: 'FCA Compliant',
            },
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
              label: 'UK GDPR Protected',
            },
            {
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>,
              label: 'Setup in 1 Minute',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{
                opacity: bottomSection.isVisible ? 1 : 0,
                transform: bottomSection.isVisible
                  ? 'translateX(0) scale(1)'
                  : i === 0 ? 'translateX(-60px) scale(0.9)' : i === 1 ? 'translateY(30px) scale(0.9)' : 'translateX(60px) scale(0.9)',
                transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + i * 0.15}s`,
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UK_BusinessLanding;