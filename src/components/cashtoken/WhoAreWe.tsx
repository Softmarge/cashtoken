import React, { useEffect, useRef, useState } from 'react';

// ─── PARTNER LOGOS ───
const peopleImages = [
  { src: '/logos/mtn_logo.png', name: 'MTN' },
  { src: '/logos/mastercard_logo_2.png', name: 'Mastercard' },
  { src: '/logos/glo_logo.png', name: 'Glo' },
  { src: '/logos/nnpc_logo.png', name: 'NNPC' },
  { src: '/logos/temu_logo.png', name: 'Temu' },
  { src: '/logos/parallex_logo.png', name: 'Parallex' },
  { src: '/logos/lagos_state_government_logo.png', name: 'Lagos State Government' },
  { src: '/logos/squareme_logo_2.png', name: 'SquareMe' },
  { src: '/logos/ekedc_logo_2.png', name: 'EKEDC' },
  { src: '/logos/airtel_logo.png', name: 'Airtel' },
  { src: '/logos/firstbank_logo.png', name: 'FirstBank' },
];

// ─── SCROLL REVEAL HOOK ───
function useReveal(threshold = 0.12) {
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

// ─── ANIMATED LETTER ───
const AnimatedLetter: React.FC<{
  children: string;
  delay: number;
  visible: boolean;
  className?: string;
}> = ({ children, delay, visible, className = '' }) => {
  const directions = ['translateY(80px)', 'translateY(-60px)', 'translateX(-50px)', 'translateX(50px)', 'scale(0.2) rotate(180deg)', 'rotate(-90deg) translateY(40px)'];
  const dir = directions[Math.floor(delay / 40) % directions.length];
  return (
    <span
      className={`inline-block transition-all ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : dir,
        transitionDuration: '0.9s',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children === ' ' ? '\u00A0' : children}
    </span>
  );
};

// ─── ANIMATED WORD ───
const AnimatedWord: React.FC<{
  children: string;
  delay: number;
  visible: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate' | 'flip' | 'spiral';
  className?: string;
}> = ({ children, delay, visible, direction = 'up', className = '' }) => {
  const transforms: Record<string, string> = {
    up: 'translateY(80px) rotate(3deg)',
    down: 'translateY(-80px) rotate(-3deg)',
    left: 'translateX(-120px) rotate(-5deg)',
    right: 'translateX(120px) rotate(5deg)',
    scale: 'scale(0.1) rotate(20deg)',
    rotate: 'rotate(25deg) translateY(50px)',
    flip: 'rotateX(90deg) translateY(30px)',
    spiral: 'rotate(-180deg) scale(0.3) translateY(60px)',
  };
  return (
    <span
      className={`inline-block transition-all ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transitionDuration: '1s',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: `${delay}ms`,
        perspective: '600px',
      }}
    >
      {children}
    </span>
  );
};

// ─── ANIMATED BLOCK ───
const AnimatedBlock: React.FC<{
  children: React.ReactNode;
  delay: number;
  visible: boolean;
  from?: 'left' | 'right' | 'bottom' | 'fade' | 'zoom' | 'slideUp';
  className?: string;
}> = ({ children, delay, visible, from = 'bottom', className = '' }) => {
  const styles: Record<string, string> = {
    left: 'translateX(-100px) rotate(-2deg)',
    right: 'translateX(100px) rotate(2deg)',
    bottom: 'translateY(60px)',
    fade: 'translateY(20px)',
    zoom: 'scale(0.8) translateY(30px)',
    slideUp: 'translateY(100px) rotate(1deg)',
  };
  return (
    <div
      className={`transition-all ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : styles[from],
        transitionDuration: '1s',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─── SPLIT TEXT ───
const SplitText: React.FC<{
  text: string;
  visible: boolean;
  baseDelay?: number;
  letterDelay?: number;
  className?: string;
}> = ({ text, visible, baseDelay = 0, letterDelay = 30, className = '' }) => (
  <span className={className}>
    {text.split('').map((char, i) => (
      <AnimatedLetter key={i} delay={baseDelay + i * letterDelay} visible={visible}>
        {char}
      </AnimatedLetter>
    ))}
  </span>
);

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
const WhoAreWe: React.FC = () => {
  const hero        = useReveal(0.1);
  const slider      = useReveal(0.05);
  const servicesHeader = useReveal(0.08);
  const servicesCards  = useReveal(0.05);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden">
      {/* ═══ CSS ANIMATIONS ═══ */}
      <style>{`
        @keyframes shimmerGold {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(123,15,20,0.15); }
          50% { text-shadow: 0 0 40px rgba(123,15,20,0.3), 0 0 80px rgba(218,165,32,0.15); }
        }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ng-shimmer-wine {
          background: linear-gradient(90deg, #7B0F14 0%, #DAA520 25%, #7B0F14 50%, #DAA520 75%, #7B0F14 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 3s linear infinite;
        }
        .ng-text-glow { animation: textGlow 3s ease-in-out infinite; }
        .ng-wiggle { animation: wiggle 3s ease-in-out infinite; }
        .ng-slide-track {
          animation: slideLeft 35s linear infinite;
          display: flex;
        }
        .ng-slide-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ═══════════════════════════════════════════ */}
      {/* WHO ARE WE — HEADING                       */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={hero.ref} className="bg-white pt-20 pb-14 relative">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#7B0F14]/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-72 h-72 rounded-full bg-[#DAA520]/[0.04] blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#7B0F14]/[0.04] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          {/* Big animated heading */}
          <div className="overflow-hidden mb-4">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight leading-none">
              <SplitText text="WHO" visible={hero.visible} baseDelay={100} letterDelay={80} className="text-gray-900 mr-3 sm:mr-8" />
              <SplitText text="ARE" visible={hero.visible} baseDelay={400} letterDelay={80} className="text-gray-700 mr-3 sm:mr-8" />
              <span className="ng-shimmer-wine ng-text-glow">
                <SplitText text="WE" visible={hero.visible} baseDelay={700} letterDelay={100} />
              </span>
              <AnimatedWord visible={hero.visible} delay={950} direction="spiral" className="text-[#DAA520] ml-2 ng-wiggle">
                ?
              </AnimatedWord>
            </h2>
          </div>

          {/* Divider dots */}
          <AnimatedBlock visible={hero.visible} delay={1100} from="fade">
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#7B0F14] rounded-full" />
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-[#7B0F14]" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#7B0F14]" style={{ animation: 'pulseRing 2s ease-out infinite' }} />
              </div>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#7B0F14] rounded-full" />
            </div>
          </AnimatedBlock>

          {/* Secondary text */}
          <AnimatedBlock visible={hero.visible} delay={1300} from="slideUp">
            <p className="text-gray-500 text-lg sm:text-xl mt-6 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Africa's pioneer RewardTech company - transforming every qualifying transaction into a{' '}
              <span className="text-[#7B0F14] font-semibold">life-changing Cash Reward</span>{' '}
              across Nigeria and beyond.
            </p>
          </AnimatedBlock>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* OUR TRUSTED PARTNERS - LOGO SLIDER        */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={slider.ref} className="bg-white py-14 overflow-hidden relative">
        <div className="text-center mb-10 px-4">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
            Our Trusted <span className="text-[#7B0F14]">Partners</span>
          </h3>
          <p className="text-gray-400 text-lg">Partnering with leading brands to deliver rewards that matter</p>
        </div>

        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div className="ng-slide-track" style={{ width: `calc(200px * ${peopleImages.length * 4})` }}>
            {[...peopleImages, ...peopleImages, ...peopleImages, ...peopleImages].map((partner, i) => (
              <div key={`slide-${i}`} className="flex-shrink-0 w-[180px] mx-3 group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-[#DAA520]/40 transition-all duration-500 shadow-md shadow-black/5 group-hover:shadow-xl group-hover:shadow-[#DAA520]/10 bg-white flex items-center justify-center p-4" style={{ height: '120px' }}>
                  <img
                    src={partner.src}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-xs text-gray-400 font-medium mt-2 tracking-wide">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* OUR SERVICES                               */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F3F0EB 30%, #F8F4EE 70%, #FAFAFA 100%)' }}
      >
        {/* Decorative background */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7B0F14]/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#DAA520]/[0.04] blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, #7B0F14 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 relative z-10">

          {/* Section header */}
          <div ref={servicesHeader.ref} className="text-center mb-16 lg:mb-20">
            <div className="overflow-hidden mb-6">
              <h3 className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-900 leading-[1.05]">
                <span
                  className="inline-block"
                  style={{
                    opacity: servicesHeader.visible ? 1 : 0,
                    transform: servicesHeader.visible ? 'translateX(0) rotate(0deg)' : 'translateX(-140px) rotate(-6deg)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s',
                  }}
                >
                  Our
                </span>{' '}
                <span
                  className="inline-block ng-shimmer-wine ng-text-glow"
                  style={{
                    opacity: servicesHeader.visible ? 1 : 0,
                    transform: servicesHeader.visible ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(140px) rotate(6deg) scale(0.7)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s',
                  }}
                >
                  Services
                </span>
              </h3>
            </div>

            <p className="text-gray-500 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              <span className="inline-block" style={{ opacity: servicesHeader.visible ? 1 : 0, transform: servicesHeader.visible ? 'none' : 'translateX(-60px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s' }}>
                Comprehensive reward technology solutions designed to
              </span>{' '}
              <span className="inline-block font-semibold text-[#7B0F14]" style={{ opacity: servicesHeader.visible ? 1 : 0, transform: servicesHeader.visible ? 'none' : 'translateX(60px) scale(0.85)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s' }}>
                transform businesses
              </span>{' '}
              <span className="inline-block" style={{ opacity: servicesHeader.visible ? 1 : 0, transform: servicesHeader.visible ? 'none' : 'translateX(-40px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.75s' }}>
                and
              </span>{' '}
              <span className="inline-block font-semibold text-[#DAA520]" style={{ opacity: servicesHeader.visible ? 1 : 0, transform: servicesHeader.visible ? 'none' : 'translateX(60px) scale(0.85)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s' }}>
                delight consumers
              </span>{' '}
              <span className="inline-block" style={{ opacity: servicesHeader.visible ? 1 : 0, transform: servicesHeader.visible ? 'none' : 'translateX(-40px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.95s' }}>
                across Nigeria and Africa.
              </span>
            </p>

            {/* Decorative divider */}
            <div
              className="flex items-center justify-center gap-3 mt-8"
              style={{
                opacity: servicesHeader.visible ? 1 : 0,
                transform: servicesHeader.visible ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 1.05s',
              }}
            >
              <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#7B0F14]/40 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-[#7B0F14]/40" />
              <div className="h-0.5 w-20 bg-gradient-to-r from-[#7B0F14] to-[#DAA520] rounded-full" />
              <div className="w-2 h-2 rounded-full bg-[#DAA520]/40" />
              <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#DAA520]/40 rounded-full" />
            </div>
          </div>

          {/* Services cards */}
          <div ref={servicesCards.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                num: '01',
                title: 'Cash Reward as a Service',
                titleWords: ['Cash Reward', 'as a Service'],
                desc: 'End-to-end cash reward infrastructure for businesses of all sizes. We handle everything from token generation to distribution, so you can focus on growth.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                gradient: 'from-[#7B0F14] via-[#9B1B21] to-[#5A0B10]',
                bgGlow: '#7B0F14',
                features: ['Token generation', 'Automated distribution', 'Real-time tracking'],
              },
              {
                num: '02',
                title: 'Points System',
                titleWords: ['Points', 'System'],
                desc: 'Flexible, universal points that work seamlessly across all partner merchants. One system, infinite possibilities for customer engagement.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ),
                gradient: 'from-[#DAA520] via-[#E8B830] to-[#B8860B]',
                bgGlow: '#DAA520',
                features: ['Cross-merchant points', 'Flexible redemption', 'Engagement analytics'],
              },
              {
                num: '03',
                title: 'Draw Infrastructure',
                titleWords: ['Draw', 'Infrastructure'],
                desc: 'Fully managed prize draw systems with transparent, auditable results. From weekly draws to special events, we power life-changing moments.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                ),
                gradient: 'from-[#7B0F14] via-[#A52228] to-[#DAA520]',
                bgGlow: '#7B0F14',
                features: ['Weekly mega draws', 'Transparent auditing', 'Instant notifications'],
              },
              {
                num: '04',
                title: 'Advisory',
                titleWords: ['Strategic', 'Advisory'],
                desc: 'Strategic consulting on loyalty programmes, reward mechanics, and consumer engagement. We help you design systems that truly resonate.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                ),
                gradient: 'from-[#DAA520] via-[#C4941A] to-[#7B0F14]',
                bgGlow: '#DAA520',
                features: ['Loyalty strategy', 'Reward design', 'Market insights'],
              },
            ].map((service, i) => (
              <div
                key={i}
                style={{
                  opacity: servicesCards.visible ? 1 : 0,
                  transform: servicesCards.visible
                    ? 'translateX(0) translateY(0) rotate(0deg) scale(1)'
                    : i % 2 === 0
                      ? 'translateX(-120px) translateY(40px) rotate(-4deg) scale(0.85)'
                      : 'translateX(120px) translateY(40px) rotate(4deg) scale(0.85)',
                  transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.18 + 0.1}s`,
                }}
              >
                <div
                  className="group relative bg-white rounded-3xl p-7 lg:p-8 border border-gray-100 hover:border-transparent transition-all duration-700 cursor-default h-full"
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    transform: hoveredService === i ? 'translateY(-12px)' : 'none',
                    boxShadow: hoveredService === i
                      ? `0 25px 60px -12px ${service.bgGlow}20, 0 0 0 1px ${service.bgGlow}15`
                      : '0 4px 20px -4px rgba(0,0,0,0.06)',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {/* Background glow */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${service.bgGlow}10, transparent)`, opacity: hoveredService === i ? 1 : 0 }}
                  />

                  {/* Step number */}
                  <div className="absolute top-6 right-6 text-6xl font-black text-gray-100 group-hover:text-[#7B0F14]/[0.06] transition-colors duration-500 select-none leading-none">
                    {service.num}
                  </div>

                  {/* Icon */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}
                    style={{
                      opacity: servicesCards.visible ? 1 : 0,
                      transform: servicesCards.visible ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-30deg)',
                      transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.18 + 0.2}s`,
                    }}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#7B0F14] transition-colors duration-300 relative z-10">
                    {service.titleWords.map((word, wi) => (
                      <span
                        key={wi}
                        className="inline-block"
                        style={{
                          opacity: servicesCards.visible ? 1 : 0,
                          transform: servicesCards.visible ? 'translateX(0)' : wi % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)',
                          transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.18 + 0.35 + wi * 0.12}s`,
                        }}
                      >
                        {word}{wi < service.titleWords.length - 1 ? '\u00A0' : ''}
                      </span>
                    ))}
                  </h4>

                  {/* Description */}
                  <p
                    className="text-gray-500 text-sm leading-relaxed mb-6 relative z-10"
                    style={{
                      opacity: servicesCards.visible ? 1 : 0,
                      transform: servicesCards.visible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.18 + 0.5}s`,
                    }}
                  >
                    {service.desc}
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 relative z-10">
                    {service.features.map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-2.5"
                        style={{
                          opacity: servicesCards.visible ? 1 : 0,
                          transform: servicesCards.visible ? 'translateX(0)' : fi % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)',
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.1 + i * 0.18 + 0.6}s`,
                        }}
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7B0F14]/10 to-[#DAA520]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#7B0F14]/20 group-hover:to-[#DAA520]/20 transition-all duration-300">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-600 text-xs font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default WhoAreWe;
