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
      {/* OUR TRUSTED PARTNERS - LOGO SLIDER        */}
      {/* ═══════════════════════════════════════════ */}
      <div ref={slider.ref} className="bg-white py-14 overflow-hidden relative">

        {/* Section heading */}
        <div className="text-center mb-10 px-4">
          
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
            Our Trusted <span className="text-[#7B0F14]">Partners</span>
          </h3>
          <p className="text-gray-400 text-lg sm:text-l">Partnering with leading brands to deliver rewards that matter</p>
        </div>

        {/* Soft edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Infinite sliding logo row */}
        <div className="overflow-hidden">
          <div className="slide-track" style={{ width: `calc(200px * ${peopleImages.length * 4})` }}>
            {[...peopleImages, ...peopleImages, ...peopleImages, ...peopleImages].map((partner, i) => (
              <div
                key={`slide-${i}`}
                className="flex-shrink-0 w-[180px] mx-3 group cursor-pointer"
              >
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
                
              </AnimatedBlock>

              {/* Playful heading - words fly in from different directions */}
              <div className="mb-8">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
                  <AnimatedWord visible={future.visible} delay={100} direction="left" className="mr-3 block sm:inline">
  The
</AnimatedWord>
<AnimatedWord visible={future.visible} delay={250} direction="up" className="mr-3">
  Smart
</AnimatedWord>
<AnimatedWord visible={future.visible} delay={400} direction="scale" className="mr-3">
  Brands
</AnimatedWord>
<AnimatedWord visible={future.visible} delay={550} direction="right" className="mr-3">
  Already
</AnimatedWord>
<AnimatedWord visible={future.visible} delay={700} direction="flip" className="mr-3">
  Switched.
</AnimatedWord>
<br />
<AnimatedWord visible={future.visible} delay={850} direction="up" className="text-[#7B0F14] mr-1">
  CashToken
</AnimatedWord>
<AnimatedWord visible={future.visible} delay={1000} direction="up" className="text-[#7B0F14]">
  Rewards
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
                <p className="text-gray-600 text-lg leading-relaxed text-justify">
  Smart businesses know that real growth doesn't just come from transactions; it comes from{' '}
  <span className="font-bold text-[#7B0F14]">emotional connection and consistent patronage.</span>
</p>

<p className="text-gray-600 text-lg leading-relaxed text-justify mt-4">
  Our Reward Infrastructure powers companies that wish to{' '}
  <span className="font-bold text-[#7B0F14]">embed meaningful value into every customer interaction,</span>
  {' '}without adding operational complexity.
</p>
              </AnimatedBlock>

              {/* Paragraph 2 */}
              
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
                          <h4 className="text-xl font-black text-gray-900">Why Partner With Us</h4>
                          <p className="text-gray-500 text-sm font-medium">Your single, secure digital hub</p>
                        </div>
                      </div>
                    </AnimatedBlock>

                    <AnimatedBlock visible={wallet.visible} delay={200} from="fade">
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 relative z-10">
                        CashToken Rewards Africa is Africa’s pioneer RewardTech company and the Global Foundational Reward Infrastructure built on a simple principle: {' '}
                        <span className="font-bold text-[#7B0F14]">every transaction ends with Cash Rewards</span>.
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
                          title: 'Transaction-Based Reward Activation',
                          desc: 'CashToken Rewards are system-triggered only when verified transactions occur.',
                        },
                        {
                          icon: (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          ),
                          title: 'Revenue Expansion',
                          desc: 'Activate Transaction-Linked Revenue Growth. Embedded CashToken Rewards increase verified transaction volume and frequency across integrated systems.',
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
                          title: 'Engagement & Retention',
                          desc: 'Institutionalise Repeat Transaction Behaviour; every qualifying transaction automatically triggers a CashToken Reward, reinforcing consistent usage across platforms.',
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

     

     /*
      {/* ═══════════════════════════════════════════ */}
      {/* JOIN THE REVOLUTION CTA */}
      {/* ═══════════════════════════════════════════ */}
      
    </section>
  );
};

export default WhoAreWe;
