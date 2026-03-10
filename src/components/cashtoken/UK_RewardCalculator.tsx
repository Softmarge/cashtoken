import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';

// ─── Category data with reward rates ───
const CATEGORIES = [
  { id: 'groceries', label: 'Groceries', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z', rate: 0.035, color: '#22C55E' },
  { id: 'fashion', label: 'Fashion', icon: 'M20.38 3.46L16 2 12 5.5 8 2l-4.38 1.46a1 1 0 00-.62.94V19a1 1 0 001 1h16a1 1 0 001-1V4.4a1 1 0 00-.62-.94z', rate: 0.05, color: '#EC4899' },
  { id: 'electronics', label: 'Electronics', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', rate: 0.03, color: '#3B82F6' },
  { id: 'dining', label: 'Dining', icon: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3', rate: 0.06, color: '#F59E0B' },
  { id: 'travel', label: 'Travel', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', rate: 0.04, color: '#8B5CF6' },
  { id: 'health', label: 'Health & Beauty', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', rate: 0.045, color: '#EF4444' },
  { id: 'fuel', label: 'Fuel & Auto', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', rate: 0.025, color: '#6366F1' },
  { id: 'entertainment', label: 'Entertainment', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z', rate: 0.055, color: '#14B8A6' },
];

// ─── Animated counter ───
const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }> = ({
  value, prefix = '', suffix = '', decimals = 0, duration = 1200,
}) => {
  const [display, setDisplay] = useState(0);
  const prevValue = useRef(0);

  useEffect(() => {
    const start = prevValue.current;
    const diff = value - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    prevValue.current = value;
  }, [value, duration]);

  return <span>{prefix}{display.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span>;
};

interface RewardCalculatorProps {
  onNavigate?: (page: string) => void;
}

const UK_RewardCalculator: React.FC<RewardCalculatorProps> = ({ onNavigate }) => {
  const [monthlySpend, setMonthlySpend] = useState(500);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['groceries', 'dining']);
  const [isCalculated, setIsCalculated] = useState(true);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setVisible(true);
      }
    };
    check();
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Toggle category
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Calculate results
  const avgRate = selectedCategories.length > 0
    ? selectedCategories.reduce((sum, id) => {
        const cat = CATEGORIES.find(c => c.id === id);
        return sum + (cat?.rate || 0);
      }, 0) / selectedCategories.length
    : 0.035;

  const monthlyTokens = Math.round(monthlySpend * avgRate * 100);
  const cashbackValue = monthlySpend * avgRate;
  const weeklyDrawEntries = Math.max(1, Math.floor(monthlyTokens / 10));
  const yearlyTokens = monthlyTokens * 12;
  const yearlyCashback = cashbackValue * 12;

  // Recalculate animation
  useEffect(() => {
    setIsCalculated(false);
    const t = setTimeout(() => {
      setIsCalculated(true);
    }, 300);
    return () => clearTimeout(t);
  }, [monthlySpend, selectedCategories]);


  // Spending presets
  const presets = [
    { label: '£200', value: 200 },
    { label: '£500', value: 500 },
    { label: '£1,000', value: 1000 },
    { label: '£2,000', value: 2000 },
    { label: '£5,000', value: 5000 },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-white via-[#FDFBF7] to-white">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[#DAA520]/[0.04] blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#7B0F14]/[0.03] blur-[100px]" />
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #DAA520 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-14 lg:mb-18"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div className="inline-flex items-center gap-2.5 bg-[#DAA520]/10 rounded-full px-6 py-3 mb-6 border border-[#DAA520]/20">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M2 7h20" />
              <path d="M12 17v4" />
              <path d="M8 21h8" />
            </svg>
            <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.2em]">Reward Calculator</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] mb-4">
            Estimate Your{' '}
            <span className="relative inline-block">
              <span className="text-[#DAA520]">Earnings</span>
              <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-[#DAA520]/30 rounded-full" />
            </span>
          </h2>
          <p className="text-gray-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            See how much you could earn in CashTokens, cashback, and weekly draw entries based on your spending habits.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* LEFT - Input Panel (3 cols) */}
          <div
            className="lg:col-span-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-60px)',
              transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 200ms',
            }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#DAA520]/5 to-transparent rounded-bl-full" />

              {/* Monthly Spending */}
              <div className="mb-10 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Monthly Spending
                  </label>
                  <div className="bg-[#7B0F14]/5 rounded-xl px-4 py-2 border border-[#7B0F14]/10">
                    <span className="text-2xl font-black text-[#7B0F14]">£{monthlySpend.toLocaleString()}</span>
                  </div>
                </div>

                {/* Slider */}
                <div className="relative mb-4">
                  <input
                    type="range"
                    min="50"
                    max="10000"
                    step="50"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #7B0F14 0%, #DAA520 ${((monthlySpend - 50) / (10000 - 50)) * 100}%, #E5E7EB ${((monthlySpend - 50) / (10000 - 50)) * 100}%, #E5E7EB 100%)`,
                    }}
                  />
                  <style>{`
                    input[type="range"]::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 28px;
                      height: 28px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #7B0F14, #DAA520);
                      cursor: pointer;
                      border: 4px solid white;
                      box-shadow: 0 4px 12px rgba(123,15,20,0.3);
                      transition: transform 0.2s;
                    }
                    input[type="range"]::-webkit-slider-thumb:hover {
                      transform: scale(1.15);
                    }
                    input[type="range"]::-moz-range-thumb {
                      width: 28px;
                      height: 28px;
                      border-radius: 50%;
                      background: linear-gradient(135deg, #7B0F14, #DAA520);
                      cursor: pointer;
                      border: 4px solid white;
                      box-shadow: 0 4px 12px rgba(123,15,20,0.3);
                    }
                  `}</style>
                  <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
                    <span>£50</span>
                    <span>£10,000</span>
                  </div>
                </div>

                {/* Quick presets */}
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setMonthlySpend(preset.value)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        monthlySpend === preset.value
                          ? 'bg-[#7B0F14] text-white shadow-lg shadow-[#7B0F14]/20'
                          : 'bg-gray-50 text-gray-600 hover:bg-[#7B0F14]/5 hover:text-[#7B0F14] border border-gray-200 hover:border-[#7B0F14]/20'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shopping Categories */}
              <div className="relative z-10">
                <label className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Shopping Categories
                  <span className="text-sm font-normal text-gray-400 ml-1">
                    ({selectedCategories.length} selected)
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 group ${
                          isSelected
                            ? 'border-[#7B0F14] bg-[#7B0F14]/5 shadow-lg shadow-[#7B0F14]/10'
                            : 'border-gray-200 bg-white hover:border-[#DAA520]/40 hover:bg-[#DAA520]/5'
                        }`}
                      >
                        {/* Selected indicator */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#7B0F14] flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}

                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            isSelected ? 'scale-110' : 'group-hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: isSelected ? `${cat.color}15` : '#F9FAFB',
                            border: `1.5px solid ${isSelected ? cat.color + '40' : '#E5E7EB'}`,
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isSelected ? cat.color : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d={cat.icon} />
                          </svg>
                        </div>
                        <span className={`text-xs font-semibold text-center leading-tight ${isSelected ? 'text-[#7B0F14]' : 'text-gray-500'}`}>
                          {cat.label}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {(cat.rate * 100).toFixed(1)}% back
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - Results Panel (2 cols) */}
          <div
            className="lg:col-span-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(60px)',
              transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 400ms',
            }}
          >
            <div className="bg-gradient-to-br from-[#7B0F14] via-[#5A0B10] to-[#3D0C11] rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#DAA520]/10 -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/[0.04]" />

              {/* Header */}
              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DAA520]/20 flex items-center justify-center">
                    <GoldCoin size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Your Estimated Rewards</h3>
                    <p className="text-white/50 text-xs">Based on your spending profile</p>
                  </div>
                </div>
              </div>

              {/* Results Cards */}
              <div className="space-y-4 relative z-10 flex-1">
                {/* Monthly CashTokens */}
                <div
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-500 ${
                    isCalculated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm font-medium">Monthly CashTokens</span>
                    <div className="w-8 h-8 rounded-lg bg-[#DAA520]/20 flex items-center justify-center">
                      <GoldCoin size={18} />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-[#DAA520]">
                    <AnimatedNumber value={monthlyTokens} />
                  </div>
                  <p className="text-white/40 text-xs mt-1">tokens earned per month</p>
                </div>

                {/* Cashback Value */}
                <div
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-500 ${
                    isCalculated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm font-medium">Cashback Value</span>
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">
                    <AnimatedNumber value={cashbackValue} prefix="£" decimals={2} />
                  </div>
                  <p className="text-white/40 text-xs mt-1">cashback per month</p>
                </div>

                {/* Weekly Draw Entries */}
                <div
                  className={`bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-500 ${
                    isCalculated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm font-medium">Weekly Draw Entries</span>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-white">
                    <AnimatedNumber value={weeklyDrawEntries} />
                  </div>
                  <p className="text-white/40 text-xs mt-1">entries into £1,000,000 weekly draw</p>
                </div>

                {/* Yearly Summary */}
                <div
                  className={`bg-[#DAA520]/15 backdrop-blur-sm rounded-2xl p-5 border border-[#DAA520]/20 transition-all duration-500 ${
                    isCalculated ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <div className="text-[#DAA520] text-xs font-bold uppercase tracking-wider mb-3">Yearly Projection</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-black text-white">
                        <AnimatedNumber value={yearlyTokens} />
                      </div>
                      <p className="text-white/40 text-[10px] mt-0.5">Total Tokens</p>
                    </div>
                    <div>
                      <div className="text-xl font-black text-[#DAA520]">
                        <AnimatedNumber value={yearlyCashback} prefix="£" decimals={0} />
                      </div>
                      <p className="text-white/40 text-[10px] mt-0.5">Total Cashback</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10 mt-6">
                <button
                  onClick={() => onNavigate?.('consumer')}
                  className="w-full group bg-[#DAA520] hover:bg-[#C4941A] text-white py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-[#DAA520]/30 hover:shadow-2xl hover:shadow-[#DAA520]/40 hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <span>Start Earning Now</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1.5 transition-transform duration-300">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
                <p className="text-white/30 text-xs text-center mt-3">
                  Free to join. No credit card required.
                </p>
              </div>

              {/* Floating coins */}
              <div className="absolute top-4 right-4 opacity-20" style={{ animation: 'float 4s ease-in-out infinite' }}>
                <GoldCoin size={20} />
              </div>
              <div className="absolute bottom-20 right-8 opacity-15" style={{ animation: 'float 4s ease-in-out infinite 1.5s' }}>
                <GoldCoin size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom info bar */}
        <div
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 600ms',
          }}
        >
          {[
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
              title: 'Secure & Transparent',
              desc: 'All calculations based on actual partner rates',
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
              title: 'Instant Rewards',
              desc: 'CashTokens credited immediately after purchase',
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
              title: '500+ Partner Brands',
              desc: 'Earn across groceries, fashion, dining & more',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UK_RewardCalculator;