import React, { useEffect, useRef, useState } from 'react';

// ─── IMAGES (5 diverse British people — no names shown) ───
const peopleImages = [
  { src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=700&fit=crop', caption: 'Building Partnerships' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=700&fit=crop', caption: 'Strategic Collaboration' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=700&fit=crop', caption: 'Trusted Alliances' },
  { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=700&fit=crop', caption: 'Sealing the Deal' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=700&fit=crop', caption: 'United for Success' },
];

const businessModelImages = {
  affiliate: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121334999_7e53e558.jpg',
  infrastructure: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121355438_6ae23fca.jpg',
  merchant: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121379453_e88dcc3e.jpg',
};

// ─── SCROLL REVEAL HOOK (improved reliability with multiple fallbacks) ───
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      // If no element, force visible after short delay to prevent stuck invisible state
      const fallback = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(fallback);
    }
    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > -50) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: Math.min(threshold, 0.01), rootMargin: '100px 0px 100px 0px' }
    );
    obs.observe(el);
    // Fallback 1: check on scroll in case observer misses
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Fallback 2: force visible after timeout to prevent permanently hidden content
    const forceTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); clearTimeout(forceTimer); };
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

// ─── ANIMATED WORD (flies in from a direction) ───
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

// ─── ANIMATED BLOCK (paragraphs, sections) ───
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

// ─── ANIMATED COUNTER ───
const AnimatedCounter: React.FC<{ target: number; visible: boolean; suffix?: string; prefix?: string }> = ({ target, visible, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2200;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ─── SPLIT TEXT INTO ANIMATED LETTERS ───
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
const UK_WhoAreWe: React.FC = () => {
  const hero = useReveal(0.1);
  const slider = useReveal(0.05);
  const future = useReveal(0.1);
  const servicesHeader = useReveal(0.08);
  const servicesCards = useReveal(0.05);
  const wallet = useReveal(0.1);
  const walletFeatures = useReveal(0.08);
  const bizModel = useReveal(0.1);
  const bizCard1 = useReveal(0.08);
  const bizCard2 = useReveal(0.08);
  const bizCard3 = useReveal(0.08);
  const cta = useReveal(0.1);
  const stats = useReveal(0.1);
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
        @keyframes softBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes borderDraw {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes imageReveal {
          0% { clip-path: inset(100% 0 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes imageRevealRight {
          0% { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes imageRevealLeft {
          0% { clip-path: inset(0 0 0 100%); }
          100% { clip-path: inset(0 0 0 0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(123,15,20,0.1), 0 0 40px rgba(218,165,32,0.05); }
          50% { box-shadow: 0 0 40px rgba(123,15,20,0.2), 0 0 80px rgba(218,165,32,0.1); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes scaleBreath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes lineGrow {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .shimmer-wine {
          background: linear-gradient(90deg, #7B0F14 0%, #DAA520 25%, #7B0F14 50%, #DAA520 75%, #7B0F14 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 3s linear infinite;
        }
        .shimmer-gold-cta {
          background: linear-gradient(90deg, #DAA520 0%, #fff 20%, #DAA520 40%, #FFD700 60%, #fff 80%, #DAA520 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 3s linear infinite;
        }
        .shimmer-gold-title {
          background: linear-gradient(90deg, #DAA520 0%, #FFD700 25%, #DAA520 50%, #B8860B 75%, #DAA520 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 4s linear infinite;
        }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .text-glow { animation: textGlow 3s ease-in-out infinite; }
        .wiggle-anim { animation: wiggle 3s ease-in-out infinite; }
        .soft-bounce { animation: softBounce 3s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .scale-breath { animation: scaleBreath 4s ease-in-out infinite; }
        .gradient-bg-wine {
          background: linear-gradient(-45deg, #3D0C11, #7B0F14, #5A1018, #4A0E13);
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        .slide-track {
          animation: slideLeft 35s linear infinite;
          display: flex;
        }
        .slide-track:hover { animation-play-state: paused; }
      `}</style>


      {/* ═══════════════════════════════════════════ */}
      {/* BOLD HEADING - WHITE BACKGROUND */}
      {/* ═══════════════════════════════════════════ */}
      <div
        ref={hero.ref}
        className="bg-white pt-20 pb-14 relative"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#7B0F14]/[0.03] blur-3xl" />
        <div className="absolute bottom-0 right-20 w-72 h-72 rounded-full bg-[#DAA520]/[0.04] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#7B0F14]/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#DAA520]/[0.05]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          

          {/* Letter-by-letter animated heading */}
          <div className="overflow-hidden mb-4">
            <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight leading-none">
              <SplitText text="WHO" visible={hero.visible} baseDelay={100} letterDelay={80} className="text-gray-900 mr-4 sm:mr-8" />
              <SplitText text="ARE" visible={hero.visible} baseDelay={400} letterDelay={80} className="text-gray-700 mr-4 sm:mr-8" />
              <span className="shimmer-wine text-glow">
                <SplitText text="WE" visible={hero.visible} baseDelay={700} letterDelay={100} className="" />
              </span>
              <AnimatedWord visible={hero.visible} delay={950} direction="spiral" className="text-[#DAA520] ml-2 wiggle-anim">
                ?
              </AnimatedWord>
            </h2>
          </div>

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

          <AnimatedBlock visible={hero.visible} delay={1300} from="slideUp">
            <p className="text-gray-500 text-lg sm:text-xl mt-6 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Transforming every purchase into a <span className="text-[#7B0F14] font-semibold">life-changing</span> opportunity across the United Kingdom
            </p>
          </AnimatedBlock>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* SLIDING PEOPLE - 5 IMAGES, WHITE BG, NO NAMES */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={slider.ref} className="bg-white py-14 overflow-hidden relative">
        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Infinite sliding row */}
        <div className="overflow-hidden">
          <div className="slide-track" style={{ width: `calc(300px * ${peopleImages.length * 4})` }}>
            {[...peopleImages, ...peopleImages, ...peopleImages, ...peopleImages].map((person, i) => (
              <div
                key={`slide-${i}`}
                className="flex-shrink-0 w-[280px] mx-3 group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-[#7B0F14]/30 transition-all duration-500 shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-[#7B0F14]/10">
                  <img
                    src={person.src}
                    alt={`UK business partnership - ${person.caption}`}
                    className="w-full h-[340px] object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/70 via-[#7B0F14]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Caption that appears on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DAA520]" />
                      <span className="text-white text-sm font-bold tracking-wide">{person.caption}</span>
                    </div>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[#DAA520] to-transparent rounded-full" />
                  </div>

                  {/* Gold corner accents on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#DAA520]/60 rounded-tr-lg transition-colors duration-500" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#DAA520]/60 rounded-bl-lg transition-colors duration-500" />

                  {/* Handshake icon overlay */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Stats bar */}
        <div ref={stats.ref} className="max-w-5xl mx-auto px-4 mt-14 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: 500, suffix: '+', label: 'Partner Brands' },
              { num: 1000000, prefix: '£', label: 'Weekly Draws' },
              { num: 50000, suffix: '+', label: 'Active Users' },
              { num: 99, suffix: '%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <AnimatedBlock key={i} visible={stats.visible} delay={i * 150} from="zoom">
                <div className="text-center bg-[#7B0F14]/[0.03] rounded-2xl py-5 px-4 border border-[#7B0F14]/[0.06] hover:border-[#7B0F14]/20 transition-all duration-500 hover:bg-[#7B0F14]/[0.06] group cursor-default hover:shadow-lg hover:shadow-[#7B0F14]/5">
                  <div className="text-2xl sm:text-3xl font-black text-[#7B0F14] group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter target={stat.num} visible={stats.visible} suffix={stat.suffix} prefix={stat.prefix || ''} />
                  </div>
                  <div className="text-gray-400 text-xs mt-1.5 font-semibold tracking-wider uppercase">{stat.label}</div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* THE FUTURE OF REWARD TECHNOLOGY */}
      {/* ═══════════════════════════════════════════ */}
      <div className="bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#7B0F14]/[0.02] -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#DAA520]/[0.03] translate-y-1/3 -translate-x-1/4" />

        <div ref={future.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left - Text with playful animations */}
            <div>
              

              {/* Playful heading - words fly in from different directions */}
              <div className="mb-8">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
                  <AnimatedWord visible={future.visible} delay={100} direction="left" className="mr-3 block sm:inline">
                    The
                  </AnimatedWord>
                  <AnimatedWord visible={future.visible} delay={250} direction="up" className="text-[#7B0F14] mr-3">
                    Future
                  </AnimatedWord>
                  <AnimatedWord visible={future.visible} delay={400} direction="scale" className="mr-3">
                    of
                  </AnimatedWord>
                  <br className="hidden sm:block" />
                  <AnimatedWord visible={future.visible} delay={550} direction="right" className="text-[#7B0F14] mr-3">
                    Reward
                  </AnimatedWord>
                  <AnimatedWord visible={future.visible} delay={700} direction="flip" className="">
                    Technology
                  </AnimatedWord>
                </h3>
              </div>


              {/* Mission Statement */}
              



              {/* Animated divider */}
              <AnimatedBlock visible={future.visible} delay={850} from="left">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1.5 w-16 bg-gradient-to-r from-[#7B0F14] to-[#DAA520] rounded-full" />
                  <div className="h-1.5 w-4 bg-[#DAA520] rounded-full" />
                  <div className="h-1.5 w-2 bg-[#DAA520]/50 rounded-full" />
                </div>
              </AnimatedBlock>

              {/* Paragraph 1 */}
              <AnimatedBlock visible={future.visible} delay={950} from="slideUp">
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-6">
                  CashToken UK is a leading reward technology company aimed at transforming the relationship between businesses and consumers. Our mission is to{' '}
                  <span className="relative inline-block">
                    <span className="font-bold text-[#7B0F14]">democratize wealth</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DAA520]/60 rounded-full" />
                  </span>{' '}
                  by tying every purchase in the UK to a life-changing opportunity.
                </p>
              </AnimatedBlock>

                         </div>

            {/* Right Column - Universal Reward Wallet */}
            <div>


              {/* ── UNIVERSAL REWARD WALLET ── */}
              <AnimatedBlock visible={future.visible} delay={800} from="zoom">
                <div className="relative">
                  <div ref={wallet.ref} className="bg-gradient-to-br from-[#FDF6F6] via-white to-[#FEF9E7] rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#DAA520]/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <AnimatedBlock visible={wallet.visible} delay={0} from="fade">
                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] flex items-center justify-center shadow-lg">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <line x1="2" y1="10" x2="22" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-gray-900">CashToken Reward Offer Model</h4>
                          <p className="text-gray-500 text-sm font-medium">Your single, secure digital hub</p>
                        </div>
                      </div>
                    </AnimatedBlock>

                    <AnimatedBlock visible={wallet.visible} delay={200} from="fade">
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10">
                        Central to our platform is the CashToken Reward Offer Model; a single, secure digital hub for modern merchant incentivization. Unlike traditional loyalty schemes, the CRO Model offers total flexibility in how rewards are structured, funded, and delivered.{' '}
          
                      </p>
                    </AnimatedBlock>

                    <div ref={walletFeatures.ref} className="space-y-4 relative z-10">
                      {[
                        {
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                              <line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                          ),
                          title: 'Aggregate Your Rewards',
                          desc: 'Every CashToken from any partner merchant is instantly stored in your personal wallet.',
                        },
                        {
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          ),
                          title: 'Instant Cashback',
                          desc: 'Seamlessly move your cashback to your bank account anytime.',
                        },
                        {
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                          ),
                          title: 'A Rewarding Marketplace',
                          desc: 'Shop from our marketplace featuring UK airtime and gift cards.',
                        },
                        {
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ),
                          title: 'Life-Changing Potential',
                          desc: 'Every CashToken is a guaranteed entry into high-value cash draws.',
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex gap-3.5 group cursor-default"
                          style={{
                            opacity: walletFeatures.visible ? 1 : 0,
                            transform: walletFeatures.visible ? 'none' : `translateX(${i % 2 === 0 ? '-' : ''}50px) rotate(${i % 2 === 0 ? '-' : ''}3deg)`,
                            transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 180 + 100}ms`,
                          }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center group-hover:shadow-lg group-hover:scale-110 group-hover:bg-[#DAA520]/10 transition-all duration-300 border border-gray-100 group-hover:rotate-6">
                            {item.icon}
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-[#7B0F14] transition-colors">{item.title}</h5>
                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedBlock>
            </div>
          </div>
        </div>
      </div>


      {/* ═══════════════════════════════════════════ */}
      {/* OUR SERVICES - FULL WIDTH PROMINENT SECTION */}
      {/* ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F3F0EB 30%, #F8F4EE 70%, #FAFAFA 100%)' }}>
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7B0F14]/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#DAA520]/[0.04] blur-[80px]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#DAA520]/10 to-transparent" />

        {/* Animated grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle, #7B0F14 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36 relative z-10">
          {/* Section Header */}
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
                  className="inline-block shimmer-wine text-glow"
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
              <span
                className="inline-block"
                style={{
                  opacity: servicesHeader.visible ? 1 : 0,
                  transform: servicesHeader.visible ? 'translateX(0)' : 'translateX(-60px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
                }}
              >
                Comprehensive reward technology solutions designed to
              </span>{' '}
              <span
                className="inline-block font-semibold text-[#7B0F14]"
                style={{
                  opacity: servicesHeader.visible ? 1 : 0,
                  transform: servicesHeader.visible ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.85)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s',
                }}
              >
                transform businesses
              </span>{' '}
              <span
                className="inline-block"
                style={{
                  opacity: servicesHeader.visible ? 1 : 0,
                  transform: servicesHeader.visible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.75s',
                }}
              >
                and
              </span>{' '}
              <span
                className="inline-block font-semibold text-[#DAA520]"
                style={{
                  opacity: servicesHeader.visible ? 1 : 0,
                  transform: servicesHeader.visible ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.85)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s',
                }}
              >
                delight consumers
              </span>{' '}
              <span
                className="inline-block"
                style={{
                  opacity: servicesHeader.visible ? 1 : 0,
                  transform: servicesHeader.visible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.95s',
                }}
              >
                across the United Kingdom.
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

          {/* Services Cards - 4 large prominent cards */}
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
                      ? `translateX(-120px) translateY(40px) rotate(-4deg) scale(0.85)`
                      : `translateX(120px) translateY(40px) rotate(4deg) scale(0.85)`,
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
                  {/* Background glow effect */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle, ${service.bgGlow}10, transparent)`,
                      opacity: hoveredService === i ? 1 : 0,
                    }}
                  />

                  {/* Step number */}
                  <div
                    className="absolute top-6 right-6 text-6xl font-black text-gray-100 group-hover:text-[#7B0F14]/[0.06] transition-colors duration-500 select-none leading-none"
                    style={{
                      opacity: servicesCards.visible ? 1 : 0,
                      transform: servicesCards.visible ? 'translateX(0)' : 'translateX(40px)',
                      transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.18 + 0.3}s`,
                    }}
                  >
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
                    <div
                      className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                      style={{
                        boxShadow: `0 0 0 4px ${service.bgGlow}15`,
                        opacity: hoveredService === i ? 1 : 0,
                        animation: hoveredService === i ? 'pulseRing 2s ease-out infinite' : 'none',
                      }}
                    />
                  </div>

                  {/* Title - words from alternating directions */}
                  <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#7B0F14] transition-colors duration-300 relative z-10">
                    {service.titleWords.map((word, wi) => (
                      <span
                        key={wi}
                        className="inline-block"
                        style={{
                          opacity: servicesCards.visible ? 1 : 0,
                          transform: servicesCards.visible
                            ? 'translateX(0)'
                            : wi % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)',
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

                  {/* Feature list - alternating left/right */}
                  <div className="space-y-2.5 relative z-10">
                    {service.features.map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-2.5"
                        style={{
                          opacity: servicesCards.visible ? 1 : 0,
                          transform: servicesCards.visible
                            ? 'translateX(0)'
                            : fi % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)',
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


      {/* ═══════════════════════════════════════════ */}
      {/* STRATEGIC BUSINESS MODEL - WITH IMAGES */}
      {/* ═══════════════════════════════════════════ */}
      <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-[#7B0F14]/[0.02] blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-[#DAA520]/[0.03] blur-3xl" />

        <div ref={bizModel.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24">
            

            <div className="overflow-hidden">
              <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.05] mb-6">
                <span
                  className="inline-block"
                  style={{
                    opacity: bizModel.visible ? 1 : 0,
                    transform: bizModel.visible ? 'translateX(0) rotate(0deg)' : 'translateX(-130px) rotate(-5deg)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                  }}
                >
                  Our
                </span>{' '}
                <span
                  className="inline-block text-[#DAA520]"
                  style={{
                    opacity: bizModel.visible ? 1 : 0,
                    transform: bizModel.visible ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(130px) rotate(5deg) scale(0.7)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s',
                  }}
                >
                  Strategic
                </span>
                <br className="hidden sm:block" />
                <span
                  className="inline-block"
                  style={{
                    opacity: bizModel.visible ? 1 : 0,
                    transform: bizModel.visible ? 'translateX(0) rotate(0deg)' : 'translateX(-130px) rotate(-3deg)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s',
                  }}
                >
                  Business
                </span>{' '}
                <span
                  className="inline-block text-[#7B0F14]"
                  style={{
                    opacity: bizModel.visible ? 1 : 0,
                    transform: bizModel.visible ? 'translateX(0) scale(1)' : 'translateX(130px) scale(0.6)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s',
                  }}
                >
                  Model
                </span>
              </h3>
            </div>

            <p className="text-gray-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              <span
                className="inline-block"
                style={{
                  opacity: bizModel.visible ? 1 : 0,
                  transform: bizModel.visible ? 'translateX(0)' : 'translateX(-60px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s',
                }}
              >
                As a Universal Reward Partner, CashToken UK provides the infrastructure for a
              </span>{' '}
              <span
                className="inline-block font-bold text-[#7B0F14]"
                style={{
                  opacity: bizModel.visible ? 1 : 0,
                  transform: bizModel.visible ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.85)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
                }}
              >
                more connected economy
              </span>
              <span
                className="inline-block"
                style={{
                  opacity: bizModel.visible ? 1 : 0,
                  transform: bizModel.visible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s',
                }}
              >
                .
              </span>
            </p>
          </div>



          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* CARD 1 — MERCHANT GROWTH (image left, text right) */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div ref={bizCard1.ref} className="mb-24 lg:mb-36">
            {/* Section number badge */}
            <div
              className="flex items-center gap-4 mb-10"
              style={{
                opacity: bizCard1.visible ? 1 : 0,
                transform: bizCard1.visible ? 'translateX(0)' : 'translateX(-60px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B0F14] to-[#9B1B21] flex items-center justify-center shadow-lg shadow-[#7B0F14]/20">
                <span className="text-white font-black text-lg">01</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#7B0F14]/30 via-[#DAA520]/20 to-transparent" style={{
                transform: bizCard1.visible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
              }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* IMAGE — slides in from left with clip-path reveal */}
              <div
                className="relative group"
                style={{
                  opacity: bizCard1.visible ? 1 : 0,
                  transform: bizCard1.visible ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(-150px) rotate(-4deg) scale(0.85)',
                  transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                }}
              >
                {/* Decorative background frame */}
                <div
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#7B0F14]/10 via-[#DAA520]/5 to-transparent"
                  style={{
                    opacity: bizCard1.visible ? 1 : 0,
                    transform: bizCard1.visible ? 'rotate(0deg) scale(1)' : 'rotate(-6deg) scale(0.9)',
                    transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
                  }}
                />
                {/* Animated corner accents */}
                <div className="absolute -top-2 -left-2 w-16 h-16 border-t-3 border-l-3 border-[#7B0F14]/30 rounded-tl-2xl" style={{
                  opacity: bizCard1.visible ? 1 : 0,
                  transform: bizCard1.visible ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s',
                }} />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-3 border-r-3 border-[#DAA520]/30 rounded-br-2xl" style={{
                  opacity: bizCard1.visible ? 1 : 0,
                  transform: bizCard1.visible ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
                }} />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 glow-pulse">
                  <img
                    src={businessModelImages.merchant}
                    alt="Merchant Growth"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[440px] object-cover group-hover:scale-110 transition-transform duration-1000"
                    style={{
                      clipPath: bizCard1.visible ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)',
                      transition: 'clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, transform 1s ease',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/40 via-[#7B0F14]/10 to-transparent rounded-3xl" />
                  {/* Animated shimmer sweep on image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'skewX(-20deg) translateX(-100%)', animation: bizCard1.visible ? 'none' : 'none' }} />
                </div>

                {/* Floating badge — slides up from bottom */}
                <div
                  className="absolute -bottom-6 left-8 bg-white rounded-2xl px-6 py-4 shadow-2xl border border-gray-100 float-slow"
                  style={{
                    opacity: bizCard1.visible ? 1 : 0,
                    transform: bizCard1.visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.7)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B0F14] to-[#DAA520] flex items-center justify-center shadow-lg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-black text-sm text-gray-900 block">Emotional Equity</span>
                      <span className="text-xs text-gray-500 font-medium">Lasting Customer Bonds</span>
                    </div>
                  </div>
                </div>

                {/* Floating stat — top right */}
                <div
                  className="absolute -top-4 -right-4 lg:right-4 bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] rounded-2xl px-5 py-3 shadow-2xl float-anim"
                  style={{
                    opacity: bizCard1.visible ? 1 : 0,
                    transform: bizCard1.visible ? 'translateY(0) rotate(0deg) scale(1)' : 'translateY(-40px) rotate(12deg) scale(0.5)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1s',
                    animationDelay: '0.5s',
                  }}
                >
                  <span className="text-white font-black text-lg block leading-none">+340%</span>
                  <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Retention</span>
                </div>
              </div>

              {/* TEXT — slides in from right */}
              <div
                style={{
                  opacity: bizCard1.visible ? 1 : 0,
                  transform: bizCard1.visible ? 'translateX(0) rotate(0deg)' : 'translateX(150px) rotate(2deg)',
                  transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s',
                }}
              >
                <div className="bg-gradient-to-br from-[#FDF6F6] via-white to-[#FEF9E7] rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#7B0F14]/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#DAA520]/[0.04] rounded-full translate-y-1/2 -translate-x-1/2" />

                  {/* Animated accent bar */}
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div
                      className="w-1.5 rounded-full bg-gradient-to-b from-[#7B0F14] to-[#DAA520]"
                      style={{
                        height: bizCard1.visible ? '56px' : '0px',
                        transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
                      }}
                    />
                    <div>
                      {/* Letter-by-letter title */}
                      <div className="overflow-hidden">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 block leading-tight">
                          <SplitText text="Merchant" visible={bizCard1.visible} baseDelay={400} letterDelay={50} className="" />
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black block leading-tight shimmer-wine">
                          <SplitText text="Growth" visible={bizCard1.visible} baseDelay={800} letterDelay={60} className="" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description with word-by-word animation */}
                  <div className="mb-8 relative z-10">
                    {['We help businesses build', 'Consumer Emotional Equity.', 'By offering a reward that', 'could change a customer\'s life,', 'merchants move from a', 'transactional relationship to a', 'deep, lasting bond.'].map((phrase, pi) => (
                      <span
                        key={pi}
                        className={`inline text-base lg:text-lg leading-relaxed ${
                          phrase.includes('Consumer Emotional Equity') || phrase.includes('deep, lasting bond')
                            ? 'font-bold text-[#7B0F14]'
                            : 'text-gray-600'
                        }`}
                        style={{
                          opacity: bizCard1.visible ? 1 : 0,
                          transform: bizCard1.visible ? 'translateX(0)' : pi % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)',
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${pi * 0.08 + 0.9}s`,
                          display: 'inline',
                        }}
                      >
                        {phrase}{' '}
                      </span>
                    ))}
                  </div>

                  {/* Animated divider */}
                  <div className="flex items-center gap-2 mb-6 relative z-10" style={{
                    opacity: bizCard1.visible ? 1 : 0,
                    transform: bizCard1.visible ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s',
                  }}>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[#7B0F14] to-[#DAA520] rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DAA520]" />
                    <div className="h-0.5 w-6 bg-[#DAA520]/40 rounded-full" />
                  </div>

                  {/* Feature list with dramatic alternating animations */}
                  <div className="space-y-4 relative z-10">
                    {[
                      { text: 'Consumer Emotional Equity', icon: 'heart' },
                      { text: 'Deep lasting bonds', icon: 'link' },
                      { text: 'Life-changing rewards', icon: 'star' },
                    ].map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-4 group/feat cursor-default"
                        style={{
                          opacity: bizCard1.visible ? 1 : 0,
                          transform: bizCard1.visible
                            ? 'translateX(0) rotate(0deg)'
                            : fi % 2 === 0
                              ? 'translateX(-80px) rotate(-3deg)'
                              : 'translateX(80px) rotate(3deg)',
                          transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.15 + 1.4}s`,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-md border border-[#7B0F14]/10 group-hover/feat:shadow-lg group-hover/feat:scale-110 group-hover/feat:border-[#7B0F14]/30 transition-all duration-500"
                          style={{
                            opacity: bizCard1.visible ? 1 : 0,
                            transform: bizCard1.visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
                            transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.15 + 1.5}s`,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-semibold text-sm group-hover/feat:text-[#7B0F14] transition-colors duration-300">{feat.text}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#7B0F14]/10 to-transparent ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated connecting element between cards */}
          <div className="flex justify-center mb-8 lg:mb-12">
            <div
              className="flex flex-col items-center gap-2"
              style={{
                opacity: bizCard1.visible ? 1 : 0,
                transform: bizCard1.visible ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.8s',
              }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-[#7B0F14]/30 to-[#DAA520]/30" />
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#7B0F14] to-[#DAA520] shadow-lg" />
              <div className="w-px h-12 bg-gradient-to-b from-[#DAA520]/30 to-transparent" />
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* CARD 2 — AFFILIATE-LED ENTRY (text left, image right) */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div ref={bizCard2.ref} className="mb-24 lg:mb-36">
            {/* Section number badge */}
            <div
              className="flex items-center gap-4 mb-10 flex-row-reverse"
              style={{
                opacity: bizCard2.visible ? 1 : 0,
                transform: bizCard2.visible ? 'translateX(0)' : 'translateX(60px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] flex items-center justify-center shadow-lg shadow-[#7B0F14]/20">
                <span className="text-white font-black text-lg">02</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-[#7B0F14]/30 via-[#DAA520]/20 to-transparent" style={{
                transform: bizCard2.visible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'right',
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
              }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* IMAGE — slides in from right (order-2 on desktop) */}
              <div
                className="relative group lg:order-2"
                style={{
                  opacity: bizCard2.visible ? 1 : 0,
                  transform: bizCard2.visible ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(150px) rotate(4deg) scale(0.85)',
                  transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s',
                }}
              >
                {/* Decorative background frame */}
                <div
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-bl from-[#7B0F14]/10 via-[#DAA520]/5 to-transparent"
                  style={{
                    opacity: bizCard2.visible ? 1 : 0,
                    transform: bizCard2.visible ? 'rotate(0deg) scale(1)' : 'rotate(6deg) scale(0.9)',
                    transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s',
                  }}
                />
                {/* Animated corner accents */}
                <div className="absolute -top-2 -right-2 w-16 h-16 border-t-3 border-r-3 border-[#7B0F14]/30 rounded-tr-2xl" style={{
                  opacity: bizCard2.visible ? 1 : 0,
                  transform: bizCard2.visible ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s',
                }} />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-3 border-l-3 border-[#DAA520]/30 rounded-bl-2xl" style={{
                  opacity: bizCard2.visible ? 1 : 0,
                  transform: bizCard2.visible ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
                }} />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 glow-pulse">
                  <img
                    src={businessModelImages.affiliate}
                    alt="Affiliate-Led Entry"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[440px] object-cover group-hover:scale-110 transition-transform duration-1000"
                    style={{
                      clipPath: bizCard2.visible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                      transition: 'clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.35s, transform 1s ease',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/40 via-[#7B0F14]/10 to-transparent rounded-3xl" />
                </div>

                {/* Floating badge — slides up from bottom right */}
                <div
                  className="absolute -bottom-6 right-8 bg-white rounded-2xl px-6 py-4 shadow-2xl border border-gray-100 float-slow"
                  style={{
                    opacity: bizCard2.visible ? 1 : 0,
                    transform: bizCard2.visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.7)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s',
                    animationDelay: '1s',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] flex items-center justify-center shadow-lg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-black text-sm text-gray-900 block">Affiliate Network</span>
                      <span className="text-xs text-gray-500 font-medium">Rapid UK Expansion</span>
                    </div>
                  </div>
                </div>

                {/* Floating stat — top left */}
                <div
                  className="absolute -top-4 -left-4 lg:left-4 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-2xl px-5 py-3 shadow-2xl float-anim"
                  style={{
                    opacity: bizCard2.visible ? 1 : 0,
                    transform: bizCard2.visible ? 'translateY(0) rotate(0deg) scale(1)' : 'translateY(-40px) rotate(-12deg) scale(0.5)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.05s',
                    animationDelay: '1.5s',
                  }}
                >
                  <span className="text-white font-black text-lg block leading-none">10x</span>
                  <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Faster Scale</span>
                </div>
              </div>

              {/* TEXT — slides in from left (order-1 on desktop) */}
              <div
                className="lg:order-1"
                style={{
                  opacity: bizCard2.visible ? 1 : 0,
                  transform: bizCard2.visible ? 'translateX(0) rotate(0deg)' : 'translateX(-150px) rotate(-2deg)',
                  transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                }}
              >
                <div className="bg-gradient-to-br from-[#FDF6F6] via-white to-[#FEF9E7] rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-[#7B0F14]/[0.03] rounded-full -translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#DAA520]/[0.04] rounded-full translate-y-1/2 translate-x-1/2" />

                  {/* Animated accent bar */}
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div
                      className="w-1.5 rounded-full bg-gradient-to-b from-[#7B0F14] via-[#7B0F14] to-[#5A0B10]"
                      style={{
                        height: bizCard2.visible ? '56px' : '0px',
                        transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s',
                      }}
                    />
                    <div>
                      {/* Letter-by-letter title */}
                      <div className="overflow-hidden">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 block leading-tight">
                          <SplitText text="Affiliate" visible={bizCard2.visible} baseDelay={350} letterDelay={45} className="" />
                          <span style={{
                            opacity: bizCard2.visible ? 1 : 0,
                            transition: 'opacity 0.5s ease 0.8s',
                          }}>-</span>
                          <SplitText text="Led" visible={bizCard2.visible} baseDelay={750} letterDelay={60} className="" />
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black block leading-tight shimmer-wine">
                          <SplitText text="Entry" visible={bizCard2.visible} baseDelay={950} letterDelay={70} className="" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description with word-by-word animation */}
                  <div className="mb-8 relative z-10">
                    {['We lead our UK market', 'expansion through a robust', 'Affiliate Engagement model,', 'ensuring rapid scale', 'and high-impact partnerships.'].map((phrase, pi) => (
                      <span
                        key={pi}
                        className={`inline text-base lg:text-lg leading-relaxed ${
                          phrase.includes('rapid scale') || phrase.includes('Affiliate Engagement')
                            ? 'font-bold text-[#7B0F14]'
                            : 'text-gray-600'
                        }`}
                        style={{
                          opacity: bizCard2.visible ? 1 : 0,
                          transform: bizCard2.visible ? 'translateX(0)' : pi % 2 === 0 ? 'translateX(40px)' : 'translateX(-40px)',
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${pi * 0.08 + 1.0}s`,
                          display: 'inline',
                        }}
                      >
                        {phrase}{' '}
                      </span>
                    ))}
                  </div>

                  {/* Animated divider */}
                  <div className="flex items-center gap-2 mb-6 relative z-10 justify-end" style={{
                    opacity: bizCard2.visible ? 1 : 0,
                    transform: bizCard2.visible ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'right',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s',
                  }}>
                    <div className="h-0.5 w-6 bg-[#7B0F14]/40 rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7B0F14]" />
                    <div className="h-0.5 w-12 bg-gradient-to-l from-[#7B0F14] to-[#DAA520] rounded-full" />
                  </div>

                  {/* Feature list with dramatic alternating animations */}
                  <div className="space-y-4 relative z-10">
                    {[
                      { text: 'Rapid market scale' },
                      { text: 'High-impact partnerships' },
                      { text: 'Performance-based growth' },
                    ].map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-4 group/feat cursor-default"
                        style={{
                          opacity: bizCard2.visible ? 1 : 0,
                          transform: bizCard2.visible
                            ? 'translateX(0) rotate(0deg)'
                            : fi % 2 === 0
                              ? 'translateX(80px) rotate(3deg)'
                              : 'translateX(-80px) rotate(-3deg)',
                          transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.15 + 1.5}s`,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-md border border-[#7B0F14]/10 group-hover/feat:shadow-lg group-hover/feat:scale-110 group-hover/feat:border-[#7B0F14]/30 transition-all duration-500"
                          style={{
                            opacity: bizCard2.visible ? 1 : 0,
                            transform: bizCard2.visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(90deg)',
                            transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.15 + 1.6}s`,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-semibold text-sm group-hover/feat:text-[#7B0F14] transition-colors duration-300">{feat.text}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#7B0F14]/10 to-transparent ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animated connecting element between cards */}
          <div className="flex justify-center mb-8 lg:mb-12">
            <div
              className="flex flex-col items-center gap-2"
              style={{
                opacity: bizCard2.visible ? 1 : 0,
                transform: bizCard2.visible ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.9s',
              }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-[#7B0F14]/30 to-[#DAA520]/30" />
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#DAA520] to-[#7B0F14] shadow-lg" />
              <div className="w-px h-12 bg-gradient-to-b from-[#DAA520]/30 to-transparent" />
            </div>
          </div>


          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* CARD 3 — EMBEDDED INFRASTRUCTURE (image left, text right) */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div ref={bizCard3.ref}>
            {/* Section number badge */}
            <div
              className="flex items-center gap-4 mb-10"
              style={{
                opacity: bizCard3.visible ? 1 : 0,
                transform: bizCard3.visible ? 'translateX(0)' : 'translateX(-60px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
              }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center shadow-lg shadow-[#DAA520]/20">
                <span className="text-white font-black text-lg">03</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-[#DAA520]/30 via-[#7B0F14]/20 to-transparent" style={{
                transform: bizCard3.visible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
              }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* IMAGE — slides in from left with clip-path reveal from bottom */}
              <div
                className="relative group"
                style={{
                  opacity: bizCard3.visible ? 1 : 0,
                  transform: bizCard3.visible ? 'translateX(0) rotate(0deg) scale(1)' : 'translateX(-150px) rotate(-4deg) scale(0.85)',
                  transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                }}
              >
                {/* Decorative background frame */}
                <div
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#DAA520]/10 via-[#7B0F14]/5 to-transparent"
                  style={{
                    opacity: bizCard3.visible ? 1 : 0,
                    transform: bizCard3.visible ? 'rotate(0deg) scale(1)' : 'rotate(-6deg) scale(0.9)',
                    transition: 'all 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
                  }}
                />
                {/* Animated corner accents */}
                <div className="absolute -top-2 -left-2 w-16 h-16 border-t-3 border-l-3 border-[#DAA520]/30 rounded-tl-2xl" style={{
                  opacity: bizCard3.visible ? 1 : 0,
                  transform: bizCard3.visible ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s',
                }} />
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-3 border-r-3 border-[#7B0F14]/30 rounded-br-2xl" style={{
                  opacity: bizCard3.visible ? 1 : 0,
                  transform: bizCard3.visible ? 'scale(1)' : 'scale(0)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s',
                }} />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 glow-pulse">
                  <img
                    src={businessModelImages.infrastructure}
                    alt="Embedded Infrastructure"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[440px] object-cover group-hover:scale-110 transition-transform duration-1000"
                    style={{
                      clipPath: bizCard3.visible ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                      transition: 'clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.3s, transform 1s ease',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#DAA520]/30 via-[#7B0F14]/10 to-transparent rounded-3xl" />
                </div>

                {/* Floating badge — slides up from bottom */}
                <div
                  className="absolute -bottom-6 left-8 bg-white rounded-2xl px-6 py-4 shadow-2xl border border-gray-100 float-slow"
                  style={{
                    opacity: bizCard3.visible ? 1 : 0,
                    transform: bizCard3.visible ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.7)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s',
                    animationDelay: '2s',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center shadow-lg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-black text-sm text-gray-900 block">Payment Tech</span>
                      <span className="text-xs text-gray-500 font-medium">Seamless Integration</span>
                    </div>
                  </div>
                </div>

                {/* Floating stat — top right */}
                <div
                  className="absolute -top-4 -right-4 lg:right-4 bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-2xl px-5 py-3 shadow-2xl float-anim"
                  style={{
                    opacity: bizCard3.visible ? 1 : 0,
                    transform: bizCard3.visible ? 'translateY(0) rotate(0deg) scale(1)' : 'translateY(-40px) rotate(12deg) scale(0.5)',
                    transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.05s',
                    animationDelay: '2.5s',
                  }}
                >
                  <span className="text-white font-black text-lg block leading-none">99.9%</span>
                  <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Uptime</span>
                </div>
              </div>

              {/* TEXT — slides in from right */}
              <div
                style={{
                  opacity: bizCard3.visible ? 1 : 0,
                  transform: bizCard3.visible ? 'translateX(0) rotate(0deg)' : 'translateX(150px) rotate(2deg)',
                  transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s',
                }}
              >
                <div className="bg-gradient-to-br from-[#FEFCF3] via-white to-[#FDF6F6] rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#DAA520]/[0.04] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7B0F14]/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />

                  {/* Animated accent bar */}
                  <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div
                      className="w-1.5 rounded-full bg-gradient-to-b from-[#DAA520] to-[#B8860B]"
                      style={{
                        height: bizCard3.visible ? '56px' : '0px',
                        transition: 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
                      }}
                    />
                    <div>
                      {/* Letter-by-letter title */}
                      <div className="overflow-hidden">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 block leading-tight">
                          <SplitText text="Embedded" visible={bizCard3.visible} baseDelay={400} letterDelay={45} className="" />
                        </span>
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black block leading-tight shimmer-gold-title">
                          <SplitText text="Infrastructure" visible={bizCard3.visible} baseDelay={800} letterDelay={40} className="" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description with word-by-word animation */}
                  <div className="mb-8 relative z-10">
                    {['We engage with', 'payment gateways like', 'ERM Systems', 'and CRM platforms like', 'Loystar', 'to bake our reward technology', 'directly into the', 'point of sale.'].map((phrase, pi) => (
                      <span
                        key={pi}
                        className={`inline text-base lg:text-lg leading-relaxed ${
                          phrase === 'ERM Systems' || phrase === 'Loystar'
                            ? 'font-bold text-[#DAA520]'
                            : 'text-gray-600'
                        }`}
                        style={{
                          opacity: bizCard3.visible ? 1 : 0,
                          transform: bizCard3.visible ? 'translateX(0) translateY(0)' : pi % 2 === 0 ? 'translateX(-35px) translateY(10px)' : 'translateX(35px) translateY(-10px)',
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${pi * 0.07 + 0.9}s`,
                          display: 'inline',
                        }}
                      >
                        {phrase}{' '}
                      </span>
                    ))}
                  </div>

                  {/* Animated divider */}
                  <div className="flex items-center gap-2 mb-6 relative z-10" style={{
                    opacity: bizCard3.visible ? 1 : 0,
                    transform: bizCard3.visible ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s',
                  }}>
                    <div className="h-0.5 w-12 bg-gradient-to-r from-[#DAA520] to-[#7B0F14] rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7B0F14]" />
                    <div className="h-0.5 w-6 bg-[#7B0F14]/40 rounded-full" />
                  </div>

                  {/* Feature list with dramatic alternating animations */}
                  <div className="space-y-4 relative z-10">
                    {[
                      { text: 'Payment gateway integration' },
                      { text: 'CRM platform connectivity' },
                      { text: 'Point-of-sale embedding' },
                    ].map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-4 group/feat cursor-default"
                        style={{
                          opacity: bizCard3.visible ? 1 : 0,
                          transform: bizCard3.visible
                            ? 'translateX(0) rotate(0deg)'
                            : fi % 2 === 0
                              ? 'translateX(-80px) rotate(-3deg)'
                              : 'translateX(80px) rotate(3deg)',
                          transition: `all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.15 + 1.4}s`,
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-md border border-[#DAA520]/10 group-hover/feat:shadow-lg group-hover/feat:scale-110 group-hover/feat:border-[#DAA520]/30 transition-all duration-500"
                          style={{
                            opacity: bizCard3.visible ? 1 : 0,
                            transform: bizCard3.visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-90deg)',
                            transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 0.15 + 1.5}s`,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-semibold text-sm group-hover/feat:text-[#DAA520] transition-colors duration-300">{feat.text}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#DAA520]/10 to-transparent ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* JOIN THE REVOLUTION CTA */}
      {/* ═══════════════════════════════════════════ */}
      
    </section>
  );
};


export default UK_WhoAreWe;
