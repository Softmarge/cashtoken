import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';
import WhoAreWe from './WhoAreWe';

// ── ANIMATED COUNTER ──
const AnimatedCounter: React.FC<{ target: number; prefix?: string; suffix?: string; visible: boolean }> = ({ target, prefix = '', suffix = '', visible }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  const fmt = (n: number) =>
    target >= 1000000 ? `₦${(n / 1000000).toFixed(0)},000,000` : `${n.toLocaleString()}`;
  return <>{prefix}{fmt(count)}{suffix}</>;
};

// ── SCROLL REVEAL ──
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

interface HomePageProps {
  onNavigate: (page: string) => void;
  walletBalance?: number;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [heroSlide, setHeroSlide]         = useState(0);
  const [heroAnimating, setHeroAnimating] = useState(false);
  const statsReveal = useReveal();

  const heroSlides = [
    {
      line1: 'Your Universal',
      line2: 'Rewards Partner',
      subtext: 'CashToken Rewards Africa is the Global Foundational Reward Infrastructure provider built on a simple principle: every qualifying transaction activates a CashToken Reward.',
      img: '/logos/SL1.webp',
    },
    {
      line1: 'One Universal Cash Reward,',
      line2: 'Every Transaction Pays',
      subtext: 'Every qualifying transaction activates a CashToken; turning everyday spending into measurable, life-enhancing value for businesses and customers alike.',
      img: '/logos/SL2.webp',
    },
    {
      line1: 'Powering the Future of',
      line2: 'Cash Rewards',
      subtext: 'Every qualifying transaction activates a CashToken; turning everyday spending into measurable, life-enhancing value for businesses and customers alike.',
      img: '/logos/sl3.webp',
    },
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setHeroAnimating(true);
      setTimeout(() => { setHeroSlide(p => (p + 1) % heroSlides.length); setHeroAnimating(false); }, 1200);
    }, 9000);
    return () => clearInterval(t);
  }, []);

  const goToSlide = (i: number) => {
    setHeroAnimating(true);
    setTimeout(() => { setHeroSlide(i); setHeroAnimating(false); }, 1200);
  };

  const cur = heroSlides[heroSlide];

  return (
    <div className="bg-white">

      {/* ══════════════════════════
          1. HERO SECTION
         ══════════════════════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-8 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left */}
            <div className="order-2 lg:order-1">
              <div className="flex justify-start mb-6 lg:mb-8">
                <div className="relative">
                  <GoldCoin size={100} premium animate />
                  <div className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: '0 0 50px 16px rgba(218,165,32,0.18), 0 0 80px 32px rgba(218,165,32,0.08)' }} />
                </div>
              </div>

              <div style={{
                opacity: heroAnimating ? 0 : 1,
                transform: heroAnimating ? 'translateY(12px)' : 'translateY(0)',
                transition: 'opacity 1.2s ease, transform 1.2s ease',
              }}>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-gray-900 leading-snug lg:leading-tight">
                  {cur.line1}<br />
                  <span className="text-[#7B0F14]">{cur.line2}</span>
                </h1>
                <p className="text-gray-500 text-base lg:text-lg mt-5 leading-relaxed text-justify max-w-xl">
                  {cur.subtext}
                </p>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2 mt-6">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => goToSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === heroSlide ? 'bg-[#7B0F14] w-6' : 'bg-gray-300 w-2.5'}`} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button onClick={() => onNavigate('merchant')}
                  className="bg-[#7B0F14] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg hover:shadow-xl">
                  Get Started
                </button>
                <button onClick={() => onNavigate('brands')}
                  className="border-2 border-[#DAA520] text-[#7B0F14] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#DAA520]/10 transition-colors">
                  Explore Brands
                </button>
              </div>
            </div>

            {/* Right — sliding image */}
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden bg-gray-50 flex items-center justify-center" style={{ minHeight: '320px' }}>
                <img src={cur.img} alt="CashToken hero"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[520px] object-contain"
                  style={{ opacity: heroAnimating ? 0 : 1, transition: 'opacity 1.2s ease' }} />
              </div>
              <div className="absolute -top-5 -right-3 lg:-right-6 coin-float" style={{ animationDelay: '0s' }}><GoldCoin size={44} animate /></div>
              <div className="absolute bottom-8 -left-3 lg:-left-6 coin-float" style={{ animationDelay: '1.5s' }}><GoldCoin size={34} animate /></div>
              <div className="absolute -top-2 left-10 lg:left-20 coin-float hidden sm:block" style={{ animationDelay: '0.8s' }}><GoldCoin size={26} animate /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          2. TRUSTED PARTNERS
          (logo slider lives in WhoAreWe — we only render the WHO ARE WE heading + slider + stats here)
         ══════════════════════════ */}
      <WhoAreWe />

      {/* ══════════════════════════
          3. THE SMART BRANDS ALREADY SWITCHED
         ══════════════════════════ */}
      <section className="bg-[#FAF7F2] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — headline + copy */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05] mb-6">
                The Smart Brands<br />Already Switched.<br />
                <span className="text-[#7B0F14]">CashToken<br />Rewards</span>
              </h2>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-10 bg-[#7B0F14] rounded-full" />
                <div className="h-1.5 w-4 bg-[#DAA520] rounded-full" />
                <div className="h-1.5 w-2 bg-[#DAA520]/50 rounded-full" />
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 text-justify">
                Smart businesses know that real growth doesn't just come from transactions; it comes from{' '}
                <span className="font-bold text-[#7B0F14]">emotional connection and consistent patronage.</span>
              </p>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                Our Reward Infrastructure powers companies that wish to{' '}
                <span className="font-bold text-[#7B0F14]">embed meaningful value into every customer interaction,</span>
                {' '}without adding operational complexity.
              </p>
              <div className="mt-8">
                <button onClick={() => onNavigate('team')}
                  className="inline-flex items-center gap-2 bg-[#7B0F14] hover:bg-[#5A0B10] text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    className="group-hover:translate-x-1 transition-transform duration-200"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>

            {/* Right — Why Partner card */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#7B0F14] flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">Why Partner With Us</h3>
                  <p className="text-gray-400 text-sm">You get access to:</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                CashToken Rewards Africa is Africa's pioneer RewardTech company and the Global Foundational Reward Infrastructure built on a simple principle:{' '}
                <span className="font-bold text-[#7B0F14]">every transaction ends with Cash Rewards.</span>
              </p>
              <div className="space-y-5">
                {[
                  { icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z', title: 'Transaction-Based Reward Activation', desc: 'CashToken Rewards are system-triggered only when verified transactions occur.' },
                  { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', title: 'Revenue Expansion', desc: 'Activate Transaction-Linked Revenue Growth. Embedded CashToken Rewards increase verified transaction volume across integrated systems.' },
                  { icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0', title: 'A Rewarding Marketplace', desc: 'Shop from our marketplace featuring airtime and gift cards.' },
                  { icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', title: 'Engagement & Retention', desc: 'Every qualifying transaction automatically triggers a CashToken Reward, reinforcing consistent usage across platforms.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#DAA520]/10 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          4. STATS
         ══════════════════════════ */}
      <section className="bg-white py-12 lg:py-16">
        <div ref={statsReveal.ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { target: 500,     suffix: '+', label: 'PARTNER BRANDS' },
              { target: 1000000, suffix: '',  label: 'WEEKLY DRAWS'   },
              { target: 50000,   suffix: '+', label: 'ACTIVE USERS'   },
              { target: 99,      suffix: '%', label: 'SATISFACTION'   },
            ].map((stat, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl py-8 px-4 text-center border border-gray-100 hover:border-[#7B0F14]/20 hover:shadow-lg transition-all duration-300 group">
                <div className="text-3xl sm:text-4xl font-black text-[#7B0F14] group-hover:scale-105 transition-transform duration-300">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} visible={statsReveal.visible} />
                </div>
                <div className="text-gray-400 text-xs mt-2 font-bold tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════
          5. ARE YOU A CUSTOMER — App Download
         ══════════════════════════ */}
      <section className="py-16 lg:py-24 relative overflow-hidden"
        style={{ background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)' }}>
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #DAA520 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6 border border-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">For Customers</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
                Are You a <span className="text-[#DAA520]">Customer?</span>
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Turn every transaction into a Cash Reward. Download the CashToken app and start earning instantly — wherever you shop.
              </p>

              <ul className="space-y-3 mb-10">
                {[
                  'Earn Cash Rewards on every qualifying transaction',
                  'Enter weekly draws for up to £1,000,000',
                  'Instant cashback to your bank account',
                  'Works across 500+ partner brands',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#DAA520]/20 border border-[#DAA520]/40 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* App Store buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Google Play */}
                <a href="#" className="group flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
                  <svg width="24" height="24" viewBox="0 0 512 512" fill="white">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l246.7-246L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c17.1-9.7 17.1-34.9.8-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-white/50 text-xs leading-none mb-0.5">GET IT ON</p>
                    <p className="font-bold text-sm">Google Play</p>
                  </div>
                </a>
                {/* App Store */}
                <a href="#" className="group flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
                  <svg width="24" height="24" viewBox="0 0 814 1000" fill="white">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.3-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-317.9 266.8-317.9 99.8 0 162.6 55.2 219.1 55.2 54.1 0 126.9-58.8 238.8-58.8 18.6 0 124.3 2.9 191.1 84.9zm-201.4-201.5c-43.2 50.8-114.3 90.3-183.4 90.3-2.6 0-5.2-.1-7.8-.3 3.9-60.3 30.3-130.5 77.6-178.7 48.4-49.3 122.8-88.1 188.5-88.8 2 9.3 2.9 18.5 2.9 28.4 0 59.7-23.3 122.2-77.8 149.1z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-white/50 text-xs leading-none mb-0.5">DOWNLOAD ON THE</p>
                    <p className="font-bold text-sm">App Store</p>
                  </div>
                </a>
              </div>
              <p className="text-white/30 text-xs mt-4">Free to download. Available on iOS and Android.</p>
            </div>

            {/* Right — real app mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/logos/app_mockup.webp"
                  alt="CashToken App"
                  className="w-72 sm:w-80 lg:w-[340px] drop-shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 coin-float" style={{ animationDelay: '0s' }}>
                  <GoldCoin size={40} animate />
                </div>
                <div className="absolute -bottom-4 -left-4 coin-float" style={{ animationDelay: '1s' }}>
                  <GoldCoin size={32} animate />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════
          6. FOOTER — rendered by Footer component
         ══════════════════════════ */}

    </div>
  );
};

export default HomePage;