import React, { useEffect, useRef, useState } from 'react';

// ─── IMAGES (5 diverse British people — no names shown) ───
const peopleImages = [
  { src: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121172404_8700059b.jpg' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121191901_761e34db.jpg' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121208684_3fc7e19b.jpg' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121226819_262d4b75.jpg' },
  { src: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121247022_f2bd2dab.jpg' },
];

const businessModelImages = {
  affiliate: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121334999_7e53e558.jpg',
  infrastructure: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121355438_6ae23fca.jpg',
  merchant: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772121379453_e88dcc3e.jpg',
};

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
const WhoAreWe: React.FC = () => {
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
        .float-anim { animation: float 4s ease-in-out infinite; }
        .text-glow { animation: textGlow 3s ease-in-out infinite; }
        .wiggle-anim { animation: wiggle 3s ease-in-out infinite; }
        .soft-bounce { animation: softBounce 3s ease-in-out infinite; }
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
          <AnimatedBlock visible={hero.visible} delay={0} from="fade">
            <div className="inline-flex items-center gap-2 bg-[#7B0F14]/[0.06] backdrop-blur-sm rounded-full px-6 py-2.5 mb-8 border border-[#7B0F14]/10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#7B0F14] animate-pulse" />
              <span className="text-[#7B0F14]/70 text-xs font-semibold tracking-[0.25em] uppercase">About CashToken UK</span>
            </div>
          </AnimatedBlock>

          {/* Letter-by-letter animated heading */}
          <div className="overflow-hidden mb-4">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight leading-none">
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
          <div className="slide-track" style={{ width: `calc(280px * ${peopleImages.length * 4})` }}>
            {[...peopleImages, ...peopleImages, ...peopleImages, ...peopleImages].map((person, i) => (
              <div
                key={`slide-${i}`}
                className="flex-shrink-0 w-[260px] mx-3 group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-100 group-hover:border-[#7B0F14]/30 transition-all duration-500 shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-[#7B0F14]/10">
                  <img
                    src={person.src}
                    alt="CashToken community"
                    className="w-full h-[320px] object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Subtle wine-tinted overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Gold corner accents on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#DAA520]/60 rounded-tr-lg transition-colors duration-500" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#DAA520]/60 rounded-bl-lg transition-colors duration-500" />
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
              <AnimatedBlock visible={future.visible} delay={0} from="left">
                <div className="inline-flex items-center gap-2 bg-[#7B0F14]/10 rounded-full px-5 py-2 mb-8">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.15em]">Our Vision</span>
                </div>
              </AnimatedBlock>

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

              {/* Paragraph 2 */}
              <AnimatedBlock visible={future.visible} delay={1150} from="right">
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                  By moving beyond traditional, restrictive loyalty points, we have created a{' '}
                  <span className="font-bold text-[#7B0F14] bg-gradient-to-r from-[#7B0F14]/10 to-[#DAA520]/10 px-2.5 py-1 rounded-lg border-b-2 border-[#DAA520]/30">
                    Universal Reward ecosystem
                  </span>{' '}
                  that provides tangible value to every stakeholder.
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
                          <h4 className="text-xl font-black text-gray-900">Universal Reward Wallet</h4>
                          <p className="text-gray-500 text-sm font-medium">Your single, secure digital hub</p>
                        </div>
                      </div>
                    </AnimatedBlock>

                    <AnimatedBlock visible={wallet.visible} delay={200} from="fade">
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10">
                        Central to our technology is the Universal Reward Wallet—a single, secure digital hub designed for the modern consumer. Unlike traditional loyalty schemes where points are trapped within a single store, the Universal Reward Wallet offers{' '}
                        <span className="font-bold text-[#7B0F14]">total flexibility</span>.
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
            <AnimatedBlock visible={servicesHeader.visible} delay={0} from="fade">
              <div className="inline-flex items-center gap-2.5 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-[#DAA520]/20 shadow-lg shadow-[#DAA520]/5">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-[#DAA520]" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#DAA520]" style={{ animation: 'pulseRing 2s ease-out infinite' }} />
                </div>
                <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.2em]">What We Offer</span>
              </div>
            </AnimatedBlock>

            <div className="overflow-hidden mb-6">
              <h3 className="text-5xl sm:text-6xl lg:text-8xl font-black text-gray-900 leading-[1.05]">
                <AnimatedWord visible={servicesHeader.visible} delay={100} direction="down" className="mr-3 sm:mr-4">
                  Our
                </AnimatedWord>
                <span className="shimmer-wine text-glow">
                  <AnimatedWord visible={servicesHeader.visible} delay={350} direction="spiral" className="">
                    Services
                  </AnimatedWord>
                </span>
              </h3>
            </div>

            <AnimatedBlock visible={servicesHeader.visible} delay={600} from="slideUp">
              <p className="text-gray-500 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
                Comprehensive reward technology solutions designed to{' '}
                <span className="font-semibold text-[#7B0F14]">transform businesses</span> and{' '}
                <span className="font-semibold text-[#DAA520]">delight consumers</span> across the United Kingdom.
              </p>
            </AnimatedBlock>

            {/* Decorative divider */}
            <AnimatedBlock visible={servicesHeader.visible} delay={800} from="zoom">
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#7B0F14]/40 rounded-full" />
                <div className="w-2 h-2 rounded-full bg-[#7B0F14]/40" />
                <div className="h-0.5 w-20 bg-gradient-to-r from-[#7B0F14] to-[#DAA520] rounded-full" />
                <div className="w-2 h-2 rounded-full bg-[#DAA520]/40" />
                <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#DAA520]/40 rounded-full" />
              </div>
            </AnimatedBlock>
          </div>

          {/* Services Cards - 4 large prominent cards */}
          <div ref={servicesCards.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                num: '01',
                title: 'Cash Reward as a Service',
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
            ].map((service, i) => {
              const directions: Array<'left' | 'right' | 'bottom' | 'zoom'> = ['left', 'right', 'bottom', 'zoom'];
              return (
                <AnimatedBlock
                  key={i}
                  visible={servicesCards.visible}
                  delay={i * 200 + 100}
                  from={directions[i]}
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
                    <div className="absolute top-6 right-6 text-6xl font-black text-gray-100 group-hover:text-[#7B0F14]/[0.06] transition-colors duration-500 select-none leading-none">
                      {service.num}
                    </div>

                    {/* Icon */}
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl`}>
                      <div className="text-white">{service.icon}</div>
                      {/* Pulse ring on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                        style={{
                          boxShadow: `0 0 0 4px ${service.bgGlow}15`,
                          opacity: hoveredService === i ? 1 : 0,
                          animation: hoveredService === i ? 'pulseRing 2s ease-out infinite' : 'none',
                        }}
                      />
                    </div>

                    {/* Title */}
                    <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#7B0F14] transition-colors duration-300 relative z-10">
                      {service.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">
                      {service.desc}
                    </p>

                    {/* Feature list */}
                    <div className="space-y-2.5 relative z-10">
                      {service.features.map((feat, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-2.5"
                          style={{
                            opacity: servicesCards.visible ? 1 : 0,
                            transform: servicesCards.visible ? 'none' : 'translateX(-20px)',
                            transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 100 + i * 200 + 400}ms`,
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
                </AnimatedBlock>
              );
            })}
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
            <AnimatedBlock visible={bizModel.visible} delay={0} from="fade">
              <div className="inline-flex items-center gap-2 bg-[#DAA520]/10 rounded-full px-5 py-2 mb-8">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.15em]">How We Operate</span>
              </div>
            </AnimatedBlock>

            <div className="overflow-hidden">
              <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.05] mb-6">
                <AnimatedWord visible={bizModel.visible} delay={100} direction="rotate" className="mr-3">
                  Our
                </AnimatedWord>
                <AnimatedWord visible={bizModel.visible} delay={300} direction="spiral" className="text-[#DAA520] mr-3">
                  Strategic
                </AnimatedWord>
                <br className="hidden sm:block" />
                <AnimatedWord visible={bizModel.visible} delay={500} direction="flip" className="mr-3">
                  Business
                </AnimatedWord>
                <AnimatedWord visible={bizModel.visible} delay={700} direction="scale" className="text-[#7B0F14]">
                  Model
                </AnimatedWord>
              </h3>
            </div>

            <AnimatedBlock visible={bizModel.visible} delay={900} from="slideUp">
              <p className="text-gray-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                As a Universal Reward Partner, CashToken UK provides the infrastructure for a{' '}
                <span className="font-bold text-[#7B0F14]">more connected economy</span>.
              </p>
            </AnimatedBlock>
          </div>


          {/* Business Model Card 1 - Merchant Growth */}
          <div ref={bizCard1.ref} className="mb-20 lg:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedBlock visible={bizCard1.visible} delay={0} from="left">
                <div className="relative group">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={businessModelImages.merchant}
                      alt="Merchant Growth"
                      className="w-full h-[300px] sm:h-[360px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/30 via-transparent to-transparent rounded-3xl" />
                  </div>
                  <div className="absolute -bottom-5 left-6 bg-white rounded-2xl px-6 py-3.5 shadow-xl border border-gray-100 float-anim" style={{ animationDelay: '0.5s' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B0F14] to-[#DAA520] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">Emotional Equity</span>
                        <span className="text-xs text-gray-500">Lasting Customer Bonds</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBlock>

              <AnimatedBlock visible={bizCard1.visible} delay={300} from="right">
                <div className="bg-gradient-to-br from-[#FDF6F6] to-white rounded-3xl p-8 lg:p-10 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-14 rounded-full bg-gradient-to-b from-[#7B0F14] to-[#DAA520]" />
                    <div>
                      <AnimatedWord visible={bizCard1.visible} delay={400} direction="up" className="text-2xl sm:text-3xl font-black text-gray-900 block">
                        Merchant
                      </AnimatedWord>
                      <AnimatedWord visible={bizCard1.visible} delay={550} direction="scale" className="text-2xl sm:text-3xl font-black text-[#7B0F14]">
                        Growth
                      </AnimatedWord>
                    </div>
                  </div>

                  <AnimatedBlock visible={bizCard1.visible} delay={650} from="slideUp">
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                      We help businesses build <span className="font-bold text-[#7B0F14]">Consumer Emotional Equity</span>. By offering a reward that could change a customer's life, merchants move from a transactional relationship to a{' '}
                      <span className="font-bold text-[#7B0F14]">deep, lasting bond</span>.
                    </p>
                  </AnimatedBlock>

                  <div className="space-y-3">
                    {['Consumer Emotional Equity', 'Deep lasting bonds', 'Life-changing rewards'].map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-3 group/feat"
                        style={{
                          opacity: bizCard1.visible ? 1 : 0,
                          transform: bizCard1.visible ? 'none' : `translateY(20px) scale(0.9)`,
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 120 + 800}ms`,
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-[#7B0F14]/20 group-hover/feat:shadow-md group-hover/feat:scale-110 transition-all duration-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedBlock>
            </div>
          </div>

          {/* Business Model Card 2 - Affiliate-Led Entry (reversed layout) */}
          <div ref={bizCard2.ref} className="mb-20 lg:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedBlock visible={bizCard2.visible} delay={300} from="left" className="lg:order-2">
                <div className="relative group">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={businessModelImages.affiliate}
                      alt="Affiliate-Led Entry"
                      className="w-full h-[300px] sm:h-[360px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/30 via-transparent to-transparent rounded-3xl" />
                  </div>
                  <div className="absolute -bottom-5 right-6 bg-white rounded-2xl px-6 py-3.5 shadow-xl border border-gray-100 float-anim">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7B0F14] to-[#5A0B10] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">Affiliate Network</span>
                        <span className="text-xs text-gray-500">Rapid UK Expansion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBlock>

              <AnimatedBlock visible={bizCard2.visible} delay={0} from="right" className="lg:order-1">
                <div className="bg-gradient-to-br from-[#FDF6F6] to-white rounded-3xl p-8 lg:p-10 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-14 rounded-full bg-[#7B0F14]" />
                    <div>
                      <AnimatedWord visible={bizCard2.visible} delay={100} direction="left" className="text-2xl sm:text-3xl font-black text-gray-900 block">
                        Affiliate-Led
                      </AnimatedWord>
                      <AnimatedWord visible={bizCard2.visible} delay={250} direction="right" className="text-2xl sm:text-3xl font-black text-[#7B0F14]">
                        Entry
                      </AnimatedWord>
                    </div>
                  </div>

                  <AnimatedBlock visible={bizCard2.visible} delay={400} from="slideUp">
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                      We lead our UK market expansion through a robust Affiliate Engagement model, ensuring{' '}
                      <span className="font-bold text-[#7B0F14]">rapid scale</span> and high-impact partnerships.
                    </p>
                  </AnimatedBlock>

                  <div className="space-y-3">
                    {['Rapid market scale', 'High-impact partnerships', 'Performance-based growth'].map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-3 group/feat"
                        style={{
                          opacity: bizCard2.visible ? 1 : 0,
                          transform: bizCard2.visible ? 'none' : `translateX(-30px) rotate(-2deg)`,
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 120 + 550}ms`,
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-[#7B0F14]/20 group-hover/feat:shadow-md group-hover/feat:scale-110 transition-all duration-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedBlock>
            </div>
          </div>

          {/* Business Model Card 3 - Embedded Infrastructure */}
          <div ref={bizCard3.ref}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <AnimatedBlock visible={bizCard3.visible} delay={0} from="left">
                <div className="relative group">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                    <img
                      src={businessModelImages.infrastructure}
                      alt="Embedded Infrastructure"
                      className="w-full h-[300px] sm:h-[360px] lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7B0F14]/30 via-transparent to-transparent rounded-3xl" />
                  </div>
                  <div className="absolute -bottom-5 left-6 bg-white rounded-2xl px-6 py-3.5 shadow-xl border border-gray-100 float-anim" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-gray-900 block">Payment Tech</span>
                        <span className="text-xs text-gray-500">Seamless Integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBlock>

              <AnimatedBlock visible={bizCard3.visible} delay={300} from="right">
                <div className="bg-gradient-to-br from-[#FEFCF3] to-white rounded-3xl p-8 lg:p-10 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-14 rounded-full bg-[#DAA520]" />
                    <div>
                      <AnimatedWord visible={bizCard3.visible} delay={400} direction="right" className="text-2xl sm:text-3xl font-black text-gray-900 block">
                        Embedded
                      </AnimatedWord>
                      <AnimatedWord visible={bizCard3.visible} delay={550} direction="left" className="text-2xl sm:text-3xl font-black text-[#DAA520]">
                        Infrastructure
                      </AnimatedWord>
                    </div>
                  </div>

                  <AnimatedBlock visible={bizCard3.visible} delay={650} from="slideUp">
                    <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
                      We engage with payment gateways like <span className="font-bold text-[#DAA520]">ERM Systems</span> and CRM platforms like <span className="font-bold text-[#DAA520]">Loystar</span> to bake our reward technology directly into the point of sale.
                    </p>
                  </AnimatedBlock>

                  <div className="space-y-3">
                    {['Payment gateway integration', 'CRM platform connectivity', 'Point-of-sale embedding'].map((feat, fi) => (
                      <div
                        key={fi}
                        className="flex items-center gap-3 group/feat"
                        style={{
                          opacity: bizCard3.visible ? 1 : 0,
                          transform: bizCard3.visible ? 'none' : `translateX(30px) rotate(2deg)`,
                          transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${fi * 120 + 800}ms`,
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white shadow-sm border border-[#DAA520]/20 group-hover/feat:shadow-md group-hover/feat:scale-110 transition-all duration-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium text-sm">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedBlock>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* JOIN THE REVOLUTION CTA */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={cta.ref} className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-wine" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#DAA520]/5 -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/[0.05]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <AnimatedBlock visible={cta.visible} delay={0} from="fade">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2.5 mb-10 border border-white/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="text-white/80 text-xs font-semibold tracking-[0.25em] uppercase">Get Started Today</span>
            </div>
          </AnimatedBlock>

          {/* Playful CTA heading */}
          <div className="overflow-hidden mb-8">
            <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05]">
              <AnimatedWord visible={cta.visible} delay={100} direction="rotate" className="text-white mr-3">
                Join
              </AnimatedWord>
              <AnimatedWord visible={cta.visible} delay={250} direction="up" className="text-white mr-3">
                the
              </AnimatedWord>
              <AnimatedWord visible={cta.visible} delay={450} direction="spiral" className="text-[#DAA520] mr-3">
                Universal
              </AnimatedWord>
              <br className="hidden sm:block" />
              <AnimatedWord visible={cta.visible} delay={650} direction="flip" className="text-white mr-3">
                Reward
              </AnimatedWord>
              <span className="shimmer-gold-cta text-glow">
                <AnimatedWord visible={cta.visible} delay={850} direction="scale" className="">
                  Revolution
                </AnimatedWord>
              </span>
            </h3>
          </div>

          <AnimatedBlock visible={cta.visible} delay={1050} from="slideUp">
            <p className="text-white/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              Whether you are a merchant looking to drive performance-based growth or a consumer looking for rewards that actually matter, CashToken UK is your{' '}
              <span className="text-[#DAA520] font-semibold">partner in progress</span>.
            </p>
          </AnimatedBlock>

          <AnimatedBlock visible={cta.visible} delay={1250} from="zoom">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="group bg-[#DAA520] hover:bg-[#C4941A] text-white px-10 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-[#DAA520]/20 hover:shadow-2xl hover:shadow-[#DAA520]/30 hover:-translate-y-1 inline-flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                <span>For Merchants</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1.5 transition-transform duration-300">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-2xl font-bold text-base transition-all border border-white/20 hover:border-white/40 hover:-translate-y-1 inline-flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>For Consumers</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1.5 transition-transform duration-300">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
