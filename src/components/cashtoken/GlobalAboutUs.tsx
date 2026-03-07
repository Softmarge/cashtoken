import React, { useEffect, useRef, useState } from 'react';
import GoldCoin from './GoldCoin';

interface GlobalAboutUsProps {
  onNavigate: (page: string) => void;
}

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

const GlobalAboutUs: React.FC<GlobalAboutUsProps> = ({ onNavigate }) => {
  const heroRef    = useReveal(0.05);
  const missionRef = useReveal(0.1);
  const scaleRef   = useReveal(0.1);
  const powerRef   = useReveal(0.1);
  const solutionsRef = useReveal(0.1);
  const govRef     = useReveal(0.1);
  const ctaRef     = useReveal(0.1);

  const stat1 = useCountUp(188, 2000, '+');
  const stat2 = useCountUp(70, 2000, 'M+');
  const stat3 = useCountUp(3, 1500);

  const regions = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      ),
      region: 'Africa',
      tag: 'Our Foundation',
      color: '#DAA520',
      desc: 'Market leader where we have partnered with 188+ businesses to reward over 70 million users, integrating rewards into the fabric of national commerce.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
      region: 'Europe & The UK',
      tag: 'Active Expansion',
      color: '#7B0F14',
      desc: 'Bringing Universal Reward Technology to a new generation of retail, lifestyle, and utility brands in sophisticated modern economies.',
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
          <path d="M13 13l6 6"/>
        </svg>
      ),
      region: 'Emerging Markets',
      tag: 'Scaling Next',
      color: '#4A7C59',
      desc: 'Deepening loyalty and customer value at every touchpoint across high-growth economies poised for reward-driven transformation.',
    },
  ];

  const solutions = [
    {
      title: 'Cash Rewards as a Service (CRaaS)',
      desc: 'Custom-built infrastructure for institutionalized rewarding at scale.',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    },
    {
      title: 'API-Based Integrations',
      desc: 'Seamless connection to digital platforms for automated reward earning.',
      icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    },
    {
      title: 'Gamified Reward Experiences',
      desc: 'Secure, transparent reward draws and incentive campaigns that turn transactions into rewarding journeys.',
      icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v4l3 3',
    },
    {
      title: 'Strategic Advisory',
      desc: 'Data-driven intelligence to help public and private sectors design high-impact reward systems.',
      icon: 'M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z',
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        ref={heroRef.ref}
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(218,165,32,0.12) 0%, transparent 60%), radial-gradient(ellipse at 0% 80%, rgba(123,15,20,0.08) 0%, transparent 60%), #FAFAF8' }}
      >
        {/* Decorative rings */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-[#DAA520]/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-[#DAA520]/15 translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-[#7B0F14]/8 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl"
            style={{
              opacity: heroRef.visible ? 1 : 0,
              transform: heroRef.visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#DAA520]" />
              <span className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em]">About CashToken Rewards</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#1A0608] leading-[0.95] mb-6 tracking-tight">
              Your Universal<br />
              <span className="text-[#DAA520]">Rewards</span> Partner
            </h1>
            <p className="text-gray-600 text-lg lg:text-xl max-w-2xl leading-relaxed mb-4">
              CashToken Rewards is the world's Foundational Reward Infrastructure provider. Built in Africa and scaling globally, we have pioneered a <span className="font-semibold text-[#7B0F14]">"RewardTech"</span> ecosystem that redefines the relationship between businesses and their customers.
            </p>
            <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
              Our mission is simple: <span className="font-semibold text-gray-700">no transaction should be complete without a reward.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="bg-[#2D0507] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { hook: stat1, label: 'Business Partners', sublabel: 'across Africa' },
              { hook: stat2, label: 'Users Rewarded', sublabel: 'and growing' },
              { hook: stat3, label: 'Continents', sublabel: 'of active operations' },
            ].map(({ hook, label, sublabel }, i) => (
              <div
                key={label}
                ref={hook.ref}
                className="text-center py-6 md:py-0"
                style={{
                  opacity: 1,
                  transition: `opacity 0.6s ease ${i * 150}ms`,
                }}
              >
                <div className="text-5xl lg:text-6xl font-black text-[#DAA520] mb-2">{hook.display}</div>
                <div className="text-white font-semibold text-base">{label}</div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-widest">{sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section ref={missionRef.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-14"
            style={{
              opacity: missionRef.visible ? 1 : 0,
              transform: missionRef.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em] mb-3">Our Global Vision</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Direction & Purpose</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                label: 'Vision',
                title: 'A Rewarded World by 2030',
                body: 'To power a global economy where every qualifying transaction automatically delivers Cash Rewards — transforming commerce into a force for everyday financial empowerment.',
                accent: '#DAA520',
                delay: 0,
              },
              {
                label: 'Mission',
                title: 'Engineer Socio-Economic Growth',
                body: 'To engineer socio-economic growth through reward-driven technology that transforms customer engagement and fuels sustainable value for businesses, governments, and citizens alike.',
                accent: '#7B0F14',
                delay: 150,
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="relative rounded-2xl p-8 overflow-hidden border border-gray-100"
                style={{
                  opacity: missionRef.visible ? 1 : 0,
                  transform: missionRef.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.7s ease ${item.delay}ms, transform 0.7s ease ${item.delay}ms`,
                  background: `linear-gradient(135deg, ${item.accent}08 0%, white 60%)`,
                }}
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5"
                  style={{ background: item.accent }}
                />
                <span
                  className="inline-block text-xs font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full mb-5"
                  style={{ background: `${item.accent}15`, color: item.accent }}
                >
                  {item.label}
                </span>
                <h3 className="text-2xl font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCALING IMPACT ── */}
      <section ref={scaleRef.ref} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-14"
            style={{
              opacity: scaleRef.visible ? 1 : 0,
              transform: scaleRef.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em] mb-3">Global Presence</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Scaling Impact Across Borders</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From Africa to Europe and beyond — building a universal reward corridor one market at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regions.map((r, i) => (
              <div
                key={r.region}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-400 group"
                style={{
                  opacity: scaleRef.visible ? 1 : 0,
                  transform: scaleRef.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:scale-110"
                  style={{ background: `${r.color}12`, color: r.color }}
                >
                  {r.icon}
                </div>
                <span
                  className="text-[10px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full mb-3 inline-block"
                  style={{ background: `${r.color}12`, color: r.color }}
                >
                  {r.tag}
                </span>
                <h3 className="text-xl font-black text-gray-900 mb-3">{r.region}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POWER OF REWARD INFRASTRUCTURE ── */}
      <section ref={powerRef.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              style={{
                opacity: powerRef.visible ? 1 : 0,
                transform: powerRef.visible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Architecture</p>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                The Power of Reward Infrastructure
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Traditional loyalty systems often fall short because they lack immediate, liquid value. CashToken Rewards changes the architecture of loyalty by offering <span className="font-semibold text-[#7B0F14]">Cash Rewards as a Service (CRaaS)</span>.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                By partnering with global leaders like MTN, MasterCard, and major financial institutions, we help organizations achieve measurable, compounding results.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'Revenue Expansion', desc: 'Activating transaction-linked growth through embedded incentives.' },
                  { label: 'Consistent Patronage', desc: 'Institutionalizing repeat behavior by rewarding every verified transaction.' },
                  { label: 'System Integration', desc: 'API-based deployment that plugs directly into existing payment flows.' },
                ].map((item, i) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#DAA520] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{item.label}: </span>
                      <span className="text-gray-500 text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-4"
              style={{
                opacity: powerRef.visible ? 1 : 0,
                transform: powerRef.visible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
              }}
            >
              {[
                { num: '188+', label: 'Business Partners', bg: '#7B0F14' },
                { num: '70M+', label: 'Users Rewarded', bg: '#DAA520' },
                { num: 'CRaaS', label: 'Proprietary Model', bg: '#2D0507' },
                { num: 'API', label: 'First Architecture', bg: '#4A0A0D' },
              ].map((box, i) => (
                <div
                  key={box.label}
                  className="rounded-2xl p-6 flex flex-col justify-between min-h-[140px]"
                  style={{ background: box.bg }}
                >
                  <div className="text-3xl font-black text-white">{box.num}</div>
                  <div className="text-white/60 text-xs font-semibold uppercase tracking-wider">{box.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULAR SOLUTIONS ── */}
      <section ref={solutionsRef.ref} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center mb-14"
            style={{
              opacity: solutionsRef.visible ? 1 : 0,
              transform: solutionsRef.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Offer</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our Modular Solutions</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A diverse suite of solutions designed for a borderless economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, i) => (
              <div
                key={sol.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#DAA520]/30 transition-all duration-400 group flex gap-5"
                style={{
                  opacity: solutionsRef.visible ? 1 : 0,
                  transform: solutionsRef.visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`,
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#DAA520]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#7B0F14] transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors duration-300">
                    <path d={sol.icon}/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-2 text-base">{sol.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVERNANCE ── */}
      <section ref={govRef.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{
              opacity: govRef.visible ? 1 : 0,
              transform: govRef.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Governance Model</p>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">Excellence at Scale</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              At the core of our global scale is <span className="font-bold text-[#7B0F14]">Operational Strategic Bureaucracy</span> — a unique governance model that combines AI-driven intelligence with disciplined execution.
            </p>
            <p className="text-gray-500 leading-relaxed mb-12">
              This allows us to scale globally, adapt locally, and create lasting socio-economic impact across every market we enter.
            </p>

            {/* Pull Quote */}
            <div className="relative bg-[#2D0507] rounded-2xl p-10 text-left overflow-hidden">
              <div className="absolute top-4 left-6 text-[#DAA520]/20 text-8xl font-black leading-none select-none">"</div>
              <blockquote className="relative z-10 text-white text-xl lg:text-2xl font-semibold leading-relaxed italic mb-6">
                At CashToken Rewards, we turn every transaction into a moment of appreciation, connection, and measurable growth.
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/20" />
                <span className="text-[#DAA520] text-xs font-bold uppercase tracking-widest">CashToken Rewards</span>
                <div className="h-px flex-1 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef.ref} className="py-20" style={{
        background: 'radial-gradient(circle at 30% 50%, #A52228 0%, #7B0F14 50%, #4A0A0D 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            style={{
              opacity: ctaRef.visible ? 1 : 0,
              transform: ctaRef.visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.3em] mb-4">Get Started</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Ready to reward your customers?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10">
              Join the world's fastest-growing reward infrastructure and start driving measurable growth today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('merchant')}
                className="px-8 py-4 rounded-xl font-bold text-white text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)' }}
              >
                Partner With Us Today
              </button>
              <button
                onClick={() => onNavigate('global')}
                className="px-8 py-4 rounded-xl font-bold text-white text-sm border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
              >
                Explore the CashToken App
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GlobalAboutUs;