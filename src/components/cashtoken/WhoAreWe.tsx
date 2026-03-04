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
      {/* JOIN THE REVOLUTION CTA */}
      {/* ═══════════════════════════════════════════ */}
      
    </section>
  );
};

export default WhoAreWe;
