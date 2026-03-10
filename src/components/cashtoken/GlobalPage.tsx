import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';

interface GlobalPageProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

// ─── FLAG COMPONENTS (reused from Header) ───
const NigeriaFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <img src="/logos/nigeria_flag.webp" alt="Nigeria" style={{ width: w, height: h, objectFit: 'cover' }} className="rounded-sm shadow-sm flex-shrink-0" />
);
const UKFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" className="rounded-sm shadow-sm flex-shrink-0">
    <rect width="60" height="40" fill="#012169"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="12"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
  </svg>
);
const SouthAfricaFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" className="rounded-sm shadow-sm flex-shrink-0">
    <rect width="60" height="40" fill="#007A4D"/>
    <rect y="0" width="60" height="13.3" fill="#007A4D"/>
    <rect y="13.3" width="60" height="13.4" fill="#FFB81C"/>
    <rect y="26.7" width="60" height="13.3" fill="#007A4D"/>
    <rect y="0" width="60" height="13.3" fill="#fff"/>
    <rect y="26.7" width="60" height="13.3" fill="#DE3831"/>
    <polygon points="0,0 0,40 30,20" fill="#000"/>
    <polygon points="2,0 2,38 27,20" fill="#FFB81C"/>
  </svg>
);
const LiberiaFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" className="rounded-sm shadow-sm flex-shrink-0">
    {[0,1,2,3,4,5,6,7,8,9].map(i => (
      <rect key={i} y={i*4} width="60" height="4" fill={i%2===0 ? '#BF0A30' : '#fff'}/>
    ))}
    <rect width="24" height="20" fill="#002868"/>
    <polygon points="12,2 14.4,9 21.6,9 15.8,13.6 18.2,20.6 12,16 5.8,20.6 8.2,13.6 2.4,9 9.6,9" fill="#fff"/>
  </svg>
);
const CaribbeanFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" className="rounded-sm shadow-sm flex-shrink-0">
    <rect width="60" height="40" fill="#009E60"/>
    <polygon points="0,0 0,40 45,20" fill="#FCD116"/>
    <polygon points="0,0 0,40 38,20" fill="#CE1126"/>
    <circle cx="12" cy="20" r="7" fill="#000"/>
    <circle cx="12" cy="20" r="5" fill="#FCD116"/>
  </svg>
);

// ─── HERO SLIDES ───
const heroSlides = [
  {
    image: '/logos/HS1.webp',
    label: 'Your Universal Reward Partner',
    title: ['Drive Growth.', 'Lead with Rewards.'],
    subtitle: 'Transform every customer interaction into lasting impact. Boost revenue the socially smart way with ',
    highlight: 'CashToken Rewards',
    subtitleEnd: '.',
    bg: 'bg-[#F5EDD8]',
  },
  {
    image: '/logos/HS2.webp',
    label: null,
    title: ['Rewarding the World,', 'One Transaction at a Time.'],
    subtitle: 'Powering patronage, loyalty, and customer retention for businesses and governments worldwide.',
    highlight: null,
    subtitleEnd: '',
    bg: 'bg-[#F5EDD8]',
  },
];

// ─── MARKET DATA ───
const markets = [
  {
    name: 'Nigeria',
    image: '/logos/LM_NG.webp',
    Flag: NigeriaFlag,
    active: true,
    description: 'The birthplace of the Universal Cash Reward. Join millions experiencing life-changing rewards.',
    buttonLabel: 'Visit Nigeria Site',
    buttonAction: 'nigeria',
  },
  {
    name: 'United Kingdom',
    image: '/logos/LM_UK.webp',
    Flag: UKFlag,
    active: true,
    description: 'Bringing the power of CashToken to the UK market. Stay tuned for our European launch.',
    buttonLabel: 'Visit UK Site',
    buttonAction: 'uk',
  },
  {
    name: 'South Africa',
    image: '/logos/LM_SA.webp',
    Flag: SouthAfricaFlag,
    active: false,
    description: 'Expanding our African footprint. The universal reward infrastructure is arriving soon.',
    buttonLabel: 'Coming Soon',
    buttonAction: 'comingsoon',
  },
  {
    name: 'Liberia',
    image: '/logos/LM_LIB.webp',
    Flag: LiberiaFlag,
    active: false,
    description: 'Growing the CashToken ecosystem across West Africa. Liberia coming soon.',
    buttonLabel: 'Coming Soon',
    buttonAction: 'comingsoon',
  },
  {
    name: 'Caribbean',
    image: '/logos/LM_CARI.webp',
    Flag: CaribbeanFlag,
    active: false,
    description: 'Island-wide rewards across the Caribbean. A new era of customer engagement is on the horizon.',
    buttonLabel: 'Coming Soon',
    buttonAction: 'comingsoon',
  },
];

// ─── PARTNER LOGOS ───
const partners = [
  { name: 'MTN', src: '/logos/mtn_logo.png' },
  { name: 'Mastercard', src: '/logos/mastercard_logo_2.png' },
  { name: 'Glo', src: '/logos/glo_logo.png' },
  { name: 'Airtel', src: '/logos/airtel_logo.png' },
  { name: 'NNPC', src: '/logos/nnpc_logo.png' },
];

// ─── SCROLL REVEAL ───
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: '0px 0px -30px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── COUNTUP ───
function useCountUp(target: number, duration = 2000, suffix = '', prefix = '') {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); obs.unobserve(el); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return { ref, display: `${prefix}${count.toLocaleString()}${suffix}` };
}

const GlobalPage: React.FC<GlobalPageProps> = ({ currentPage, onNavigate }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);
  const [showAllMarkets, setShowAllMarkets] = useState(false);

  const featuresRef = useReveal(0.1);
  const marketsRef = useReveal(0.1);
  const statsRef = useReveal(0.1);
  const partnersRef = useReveal(0.1);
  const ctaRef = useReveal(0.1);

  const stat1 = useCountUp(100, 2000, 'M+');
  const stat2 = useCountUp(50, 2000, 'M+', '$');
  const stat3 = useCountUp(500, 2000, '+');
  const stat4 = useCountUp(3, 1500);

  // Auto-advance hero slides — slower than Nigeria (12s)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideVisible(false);
      setTimeout(() => {
        setSlideIndex(i => (i + 1) % heroSlides.length);
        setSlideVisible(true);
      }, 600);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx: number) => {
    if (idx === slideIndex) return;
    setSlideVisible(false);
    setTimeout(() => { setSlideIndex(idx); setSlideVisible(true); }, 600);
  };

  const slide = heroSlides[slideIndex];
  const displayedMarkets = showAllMarkets ? markets : markets.slice(0, 3);



  return (
    <div className="bg-white min-h-screen font-sans">



      {/* ── HERO ── */}
      <section className={`relative overflow-hidden min-h-[520px] lg:min-h-[600px] ${slide.bg} transition-colors duration-700`}>

        {/* HS1: full-width background image behind text */}
        {slideIndex === 0 && (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: slideVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay so text stays readable */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(245,237,216,0.92) 45%, rgba(245,237,216,0.3) 100%)' }} />
          </div>
        )}

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10"
          style={{
            opacity: slideVisible ? 1 : 0,
            transform: slideVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Text side */}
          <div className="flex-1 z-10">
            {slide.label && (
              <p className="text-[#DAA520] font-semibold text-sm mb-4 tracking-wide">{slide.label}</p>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#4A0A0D] leading-tight mb-5">
              {slide.title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <p className="text-gray-600 text-lg max-w-lg mb-8 leading-relaxed">
              {slide.subtitle}
              {slide.highlight && (
                <span className="text-[#DAA520] font-semibold">{slide.highlight}</span>
              )}
              {slide.subtitleEnd}
            </p>
            <button
              onClick={() => { const el = document.getElementById('choose-market'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)' }}
            >
              Explore Your Market
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </button>

            {/* Slide dots */}
            <div className="flex gap-2 mt-8">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === slideIndex ? 'w-6 h-2.5 bg-[#DAA520]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* HS2: image on the right */}
          {slideIndex === 1 && (
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                src={slide.image}
                alt="Hero"
                className="w-full max-w-sm lg:max-w-lg object-contain drop-shadow-2xl"
                style={{ maxHeight: 460 }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section ref={featuresRef.ref} className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                title: 'Performance-Based Rewards',
                desc: 'Drive measurable consumer behavior with our proprietary reward-as-a-service model. Only pay for results.',
              },
              {
                icon: 'M4 6h16M4 10h16M4 14h16M4 18h7',
                title: 'Enterprise-Grade Infrastructure',
                desc: 'Built for scale and security. Our API-first approach integrates seamlessly into your existing payment flows.',
              },
              {
                icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
                title: 'Global Reach, Local Impact',
                desc: 'Expanding across continents while empowering local communities through our Universal Reward Wallet.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#DAA520]/30 transition-all duration-400 group"
                style={{
                  opacity: featuresRef.visible ? 1 : 0,
                  transform: featuresRef.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#DAA520]/10 flex items-center justify-center mb-4 group-hover:bg-[#7B0F14] transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors duration-300">
                    <path d={card.icon}/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR MARKET ── */}
      <section id="choose-market" ref={marketsRef.ref} className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.25em] mb-3">Global Presence</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Choose Your Market</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Access our region-specific platforms to see how CashToken is transforming economies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedMarkets.map((market, i) => (
              <div
                key={market.name}
                className={`rounded-2xl overflow-hidden border transition-all duration-500 ${
                  market.active
                    ? 'bg-white border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1'
                    : 'bg-white border-gray-100 shadow-sm opacity-70'
                }`}
                style={{
                  opacity: marketsRef.visible ? (market.active ? 1 : 0.7) : 0,
                  transform: marketsRef.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={market.image}
                    alt={market.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${market.active ? 'hover:scale-105' : 'grayscale'}`}
                  />
                  {/* Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                    market.active
                      ? 'bg-[#DAA520] text-white'
                      : 'bg-gray-600/80 text-white'
                  }`}>
                    {market.active ? 'ACTIVE MARKET' : 'COMING SOON'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <market.Flag w={24} h={16} />
                    <h3 className={`font-bold text-lg ${market.active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {market.name}
                    </h3>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${market.active ? 'text-gray-600' : 'text-gray-400'}`}>
                    {market.description}
                  </p>
                  {market.active ? (
                    <button
                      onClick={() => market.buttonAction && onNavigate(market.buttonAction)}
                      className="w-full py-2.5 rounded-xl border-2 border-[#7B0F14] text-[#7B0F14] text-sm font-semibold hover:bg-[#7B0F14] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {market.buttonLabel}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  ) : (
                    <div className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 text-sm font-medium text-center">
                      Launch Pending
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* See More / See Less */}
          {!showAllMarkets && markets.length > 3 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAllMarkets(true)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-[#DAA520] text-[#DAA520] font-semibold text-sm hover:bg-[#DAA520] hover:text-white transition-all duration-300"
              >
                See More Markets
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>
          )}
          {showAllMarkets && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAllMarkets(false)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-500 font-semibold text-sm hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
              >
                See Less
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { hook: stat1, label: 'TRANSACTIONS' },
              { hook: stat2, label: 'REWARDS DISTRIBUTED' },
              { hook: stat3, label: 'BUSINESS PARTNERS' },
              { hook: stat4, label: 'CONTINENTS' },
            ].map(({ hook, label }, i) => (
              <div
                key={label}
                ref={hook.ref}
                className="text-center"
                style={{
                  opacity: statsRef.visible ? 1 : 0,
                  transform: statsRef.visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                }}
              >
                <div className="text-4xl lg:text-5xl font-black text-[#DAA520] mb-2">{hook.display}</div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-[0.15em]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUSTED PARTNERS ── */}
      <section ref={partnersRef.ref} className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.25em] mb-10">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {partners.map((p, i) => (
              <img
                key={p.name}
                src={p.src}
                alt={p.name}
                className="h-8 object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                style={{
                  opacity: partnersRef.visible ? 0.6 : 0,
                  transform: partnersRef.visible ? 'translateY(0)' : 'translateY(10px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section ref={ctaRef.ref} className="py-20" style={{
        background: 'radial-gradient(circle at 30% 50%, #A52228 0%, #7B0F14 50%, #4A0A0D 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div
            style={{
              opacity: ctaRef.visible ? 1 : 0,
              transform: ctaRef.visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Ready to transform your customer engagement?
            </h2>
            <p className="text-white/70 text-base max-w-xl">
              Join the world's fastest-growing reward infrastructure and start growing your business today.
            </p>
          </div>
          <div
            style={{
              opacity: ctaRef.visible ? 1 : 0,
              transform: ctaRef.visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <button
              onClick={() => onNavigate('merchant')}
              className="px-8 py-4 rounded-xl font-bold text-[#7B0F14] text-sm whitespace-nowrap hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
              style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', color: '#fff' }}
            >
              Partner With Us
            </button>
          </div>
        </div>

        {/* ══════════════════════════
          5. ARE YOU A CUSTOMER — App Download
         ══════════════════════════ */}
      <section className="py-8 lg:py-12 relative overflow-hidden"
        style={{ background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)' }}>
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #DAA520 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-3 border border-white/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em]">For Customers</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
                Are You a <span className="text-[#DAA520]">Customer?</span>
              </h2>

              <p className="text-white/70 text-base leading-relaxed mb-4">
                Turn every transaction into a Cash Reward. Download the CashToken app and start earning instantly — wherever you shop.
              </p>

              <ul className="space-y-2 mb-6">
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
                <a href="#" className="group flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
                  <svg width="22" height="22" viewBox="0 0 512 512" fill="white">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l246.7-246L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c17.1-9.7 17.1-34.9.8-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-white/50 text-xs leading-none mb-0.5">GET IT ON</p>
                    <p className="font-bold text-sm">Google Play</p>
                  </div>
                </a>
                {/* App Store */}
                <a href="#" className="group flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
                  <svg width="22" height="22" viewBox="0 0 814 1000" fill="white">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.3-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-317.9 266.8-317.9 99.8 0 162.6 55.2 219.1 55.2 54.1 0 126.9-58.8 238.8-58.8 18.6 0 124.3 2.9 191.1 84.9zm-201.4-201.5c-43.2 50.8-114.3 90.3-183.4 90.3-2.6 0-5.2-.1-7.8-.3 3.9-60.3 30.3-130.5 77.6-178.7 48.4-49.3 122.8-88.1 188.5-88.8 2 9.3 2.9 18.5 2.9 28.4 0 59.7-23.3 122.2-77.8 149.1z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-white/50 text-xs leading-none mb-0.5">DOWNLOAD ON THE</p>
                    <p className="font-bold text-sm">App Store</p>
                  </div>
                </a>
              </div>
              <p className="text-white/30 text-xs mt-3">Free to download. Available on iOS and Android.</p>
            </div>

            {/* Right — real app mockup */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src="/logos/app_mockup.webp"
                  alt="CashToken App"
                  className="w-56 sm:w-64 lg:w-[280px] drop-shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 coin-float" style={{ animationDelay: '0s' }}>
                  <GoldCoin size={36} animate />
                </div>
                <div className="absolute -bottom-4 -left-4 coin-float" style={{ animationDelay: '1s' }}>
                  <GoldCoin size={28} animate />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#2D0507] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GoldCoin size={36} />
                <div>
                  <div className="font-bold tracking-wider text-white text-sm">CASHTOKEN</div>
                  <div className="text-[10px] tracking-[0.15em] text-[#DAA520]">REWARDS</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                The universal reward infrastructure empowering businesses and delighting customers across the globe.
              </p>
              <div className="flex gap-3 mt-5">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((s) => (
                  <button key={s} className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#DAA520] transition-colors flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" opacity="0.8">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-[#DAA520] mb-4 text-sm tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Careers', 'News & Media', 'Contact'].map(item => (
                  <li key={item}>
                    <button className="text-gray-400 hover:text-[#DAA520] transition-colors text-sm">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="font-semibold text-[#DAA520] mb-4 text-sm tracking-wider">Solutions</h4>
              <ul className="space-y-2.5">
                {['For Enterprise', 'For SMEs', 'Developers (API)', 'Consumer App'].map(item => (
                  <li key={item}>
                    <button className="text-gray-400 hover:text-[#DAA520] transition-colors text-sm">{item}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-[#DAA520] mb-4 text-sm tracking-wider">Legal</h4>
              <ul className="space-y-2.5">
                {['Privacy Policy', 'Terms of Service', 'Compliance'].map(item => (
                  <li key={item}>
                    <button className="text-gray-400 hover:text-[#DAA520] transition-colors text-sm">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">&copy; 2026 CashToken Rewards International. All rights reserved.</p>
            <div className="flex gap-6 text-gray-600 text-xs">
              {['Lagos', 'London', 'Cape Town'].map(city => (
                <span key={city} className="hover:text-[#DAA520] cursor-pointer transition-colors">{city}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default GlobalPage;