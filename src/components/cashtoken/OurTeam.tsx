import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';

const TEAM_IMAGES = {
  aare:    '/logos/Aare.webp',
  simi:    '/logos/Simi.webp',
  habeeb:  '/logos/Habeeb.webp',
  stanley: '/logos/Stanley.webp',
  mzer:    '/logos/Mzer.webp',
  stella:  '/logos/Stella.webp',
  chinny:  '/logos/Chinny.webp',
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

// ─── ANIMATED WORD ───
const AnimatedWord: React.FC<{
  children: string;
  delay: number;
  visible: boolean;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale' | 'flip';
}> = ({ children, delay, visible, className = '', direction = 'up' }) => {
  const transforms: Record<string, string> = {
    up: 'translateY(60px)',
    left: 'translateX(-60px)',
    right: 'translateX(60px)',
    scale: 'scale(0.3) rotate(15deg)',
    flip: 'rotateX(90deg) translateY(30px)',
  };
  return (
    <span
      className={`inline-block transition-all ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : transforms[direction],
        transitionDuration: '0.8s',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {children}
    </span>
  );
};

const OurTeam: React.FC = () => {
  const whoWeAre = useReveal(0.1);
  const overview = useReveal(0.1);
  const visionMission = useReveal(0.1);
  const services = useReveal(0.1);
  const leadership = useReveal(0.1);

  const leadershipData = [
    {
      name: 'Aare Lai Labode Ph.D',
      role: 'Chief Executive Officer',
      image: TEAM_IMAGES.aare,
      bio: `Aare Lai Labode Ph.D is the Founder and Chief Executive Officer of CashToken Rewards Africa. He is the Principal Partner at SaltinGStein Limited, a technology and business consulting firm, and a business logic expert with deep knowledge of African emerging markets. He studied Corporate Restructuring, Mergers and Acquisitions at Harvard Business School, and holds a degree in Accounting and a Diploma in Law from the University of Abuja.`,
      linkedin: '#',
    },
    {
      name: 'Simileoluwa Adeoye',
      role: 'Chief Expansion Officer / CashToken UK CEO',
      image: TEAM_IMAGES.simi,
      bio: `Simileoluwa Adeoye is an accomplished Business Development Leader with expertise in scaling operations and securing strategic partnerships across key markets. She is proficient in Project Management, Payment System Integrations, and Implementation of Compliance Frameworks. She is currently the Acting Managing Director, CashToken Rewards International, UK.`,
      linkedin: 'https://www.linkedin.com/in/simi-daphne-adeoye-5939a31b7/',
    },
    {
      name: 'Habeeb Shodunke',
      role: 'Chief Operating Officer',
      image: TEAM_IMAGES.habeeb,
      bio: `Habeeb Shodunke is a seasoned operations executive with deep expertise in building and scaling fintech and reward infrastructure businesses. He brings a strategic and execution-focused approach to managing CashToken's operational ecosystem across multiple markets.`,
      linkedin: '#',
    },
    {
      name: 'Stanley Emurotu',
      role: 'Chief Financial Officer',
      image: TEAM_IMAGES.stanley,
      bio: `Stanley Emurotu is a results-driven finance professional with strong expertise in financial planning, reporting, and corporate governance. He oversees CashToken's financial strategy, ensuring sustainable growth and fiscal discipline across all business units.`,
      linkedin: '#',
    },
    {
      name: 'Michael Mzer Terungwa',
      role: 'Chief Technology Officer',
      image: TEAM_IMAGES.mzer,
      bio: `Michael Mzer Terungwa leads CashToken's technology vision and product infrastructure. With deep expertise in software architecture, fintech systems, and digital transformation, he drives the development and scalability of the CashToken rewards platform.`,
      linkedin: '#',
    },
    {
      name: 'Stella Oshorinde',
      role: 'Chief Growth Officer',
      image: TEAM_IMAGES.stella,
      bio: `Stella Oshorinde is a dynamic growth strategist with a strong track record in market expansion, customer acquisition, and revenue generation. She leads CashToken's growth initiatives across Africa and international markets.`,
      linkedin: '#',
    },
    {
      name: 'Chinaenyenwa Nwokedi',
      role: 'Chief Marketing Officer',
      image: TEAM_IMAGES.chinny,
      bio: `Chinaenyenwa Nwokedi is a creative and data-driven marketing leader with expertise in brand positioning, digital marketing, and consumer engagement. She shapes CashToken's marketing strategy to build brand awareness and drive platform adoption.`,
      linkedin: '#',
    },
  ];


  const servicesList = [
    {
      num: '01',
      title: 'Cash Rewards as a Service (CRaaS)',
      desc: 'Custom-built Reward Infrastructure that enables businesses and institutions to incentivise patronage with cash-based rewards.',
      icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    },
    {
      num: '02',
      title: 'CashToken Reward Offer',
      desc: 'Cash Reward Infrastructure is integrated directly into transaction flows for seamless value return.',
      icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    },
    {
      num: '03',
      title: 'API-Based Reward Integrations',
      desc: 'CashToken Rewards Africa connects businesses and institutions to a smarter way of rewarding consumer patronage. We integrate with platforms whose APIs are already whitelisted within the CashToken app, enabling customers to transact and automatically earn Cash Rewards.',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    },
    {
      num: '04',
      title: 'Gamified & Product Rewards',
      desc: 'Structured engagement models that turn everyday transactions into rewarding journeys. Bundle products or services with instant cash-value incentives, scalable point-based systems, and secure transparent draw services.',
      icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    },
    {
      num: '05',
      title: 'Advisory & Strategy',
      desc: 'End-to-end design and structuring of reward systems for public and private sector clients.',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
    {
      num: '06',
      title: 'Value-Added Services',
      desc: 'Bill payments, airtime, electricity, and essential services are made rewardable within our ecosystem.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
  ];

  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO BANNER ── */}
      <div className="relative py-16 lg:py-24" style={{
        background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <GoldCoin size={56} className="mx-auto mb-4" />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">About Us</h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Reinventing Reward for a Changing World
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-24">

        {/* ── 1. WHO ARE WE ── */}
        <div ref={whoWeAre.ref} className="text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-8">
            <AnimatedWord visible={whoWeAre.visible} delay={0} direction="left" className="text-gray-900 mr-4">WHO</AnimatedWord>
            <AnimatedWord visible={whoWeAre.visible} delay={180} direction="up" className="text-gray-900 mr-4">ARE</AnimatedWord>
            <AnimatedWord visible={whoWeAre.visible} delay={360} direction="right" className="text-[#7B0F14]">WE?</AnimatedWord>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[2px] w-12 bg-[#7B0F14] rounded-full" />
            <div className="w-2 h-2 rounded-full bg-[#7B0F14]" />
            <div className="h-[2px] w-12 bg-[#7B0F14] rounded-full" />
          </div>
          <p className="text-gray-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-justify">
            CashToken Rewards Africa is Africa's pioneer RewardTech company and the{' '}
            <span className="font-bold text-[#7B0F14]">Global Foundational Reward Infrastructure</span>{' '}
            built on a simple principle: every transaction ends with Cash Rewards. We power systems that enable businesses,
            governments, institutions, and individuals to transform patronage into measurable, life-enhancing value from
            data-driven rewards. We are shaping a culture of rewards where no transaction is complete without the CashToken Reward.
          </p>
        </div>

        {/* ── 2. COMPANY OVERVIEW ── */}
        <div ref={overview.ref}>
          <div className="inline-flex items-center gap-2 bg-[#7B0F14]/5 rounded-full px-5 py-2 mb-6 border border-[#7B0F14]/10">
            <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.2em]">Company Overview</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-6">
                We operate a {' '}
                <span className="text-[#7B0F14]">Cash Reward Offer </span> Model
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6 text-justify">
                Central to our platform is the CashToken Reward Offer Model; a single, secure digital hub for modern merchant incentivization. Unlike traditional loyalty schemes, the CRO Model offers total flexibility in how rewards are structured, funded, and delivered.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🏛️', text: 'Aggregate Your Rewards; Every CashToken from any partner merchant is instantly stored in your personal wallet' },
                { icon: '🏢', text: 'Instant CashBack, Seamlessly move your cashback to your bank account anytime.' },
                { icon: '👥', text: 'Life-Changing Potential; Every CashToken, a guaranteed entry into life changing rewards' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#7B0F14]/[0.03] border border-[#7B0F14]/[0.06]">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. VISION & MISSION ── */}
        <div ref={visionMission.ref}>
          <div className="inline-flex items-center gap-2 bg-[#7B0F14]/5 rounded-full px-5 py-2 mb-6 border border-[#7B0F14]/10">
            <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.2em]">Vision & Mission</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden" style={{
              background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)'
            }}>
              <div className="absolute top-4 right-4 opacity-10">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.2em] mb-3">Vision</p>
              <p className="text-white text-lg lg:text-xl font-semibold leading-relaxed">
                To power a global economy where every transaction automatically delivers Cash Rewards by 2030.
              </p>
            </div>
            <div className="rounded-3xl p-8 lg:p-10 bg-[#7B0F14]/[0.03] border border-[#7B0F14]/[0.08] relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-5">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="#7B0F14">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#7B0F14]/10 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <p className="text-[#DAA520] text-xs font-bold uppercase tracking-[0.2em] mb-3">Mission</p>
              <p className="text-gray-700 text-lg lg:text-xl font-semibold leading-relaxed">
                To engineer socio-economic growth through reward-driven technology that transforms engagement and fuels sustainable value.
              </p>
            </div>
          </div>
        </div>

        {/* ── 4. OUR SERVICES ── */}
        <div ref={services.ref}>
          <div className="inline-flex items-center gap-2 bg-[#7B0F14]/5 rounded-full px-5 py-2 mb-6 border border-[#7B0F14]/10">
            <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.2em]">Our Services</span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              What We <span className="text-[#7B0F14]">Offer</span>
            </h2>
            <p className="text-gray-500 max-w-xl text-base leading-relaxed">
              Comprehensive reward technology solutions adaptable to any sector or audience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#7B0F14]/20 transition-all duration-500 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#DAA520]/10 flex items-center justify-center group-hover:bg-[#7B0F14] transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors duration-300">
                      <path d={service.icon} />
                    </svg>
                  </div>
                  <span className="text-4xl font-black text-gray-100 group-hover:text-[#7B0F14]/10 transition-colors">{service.num}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. LEADERSHIP TEAM ── */}
        <div ref={leadership.ref}>
          <div className="inline-flex items-center gap-2 bg-[#7B0F14]/5 rounded-full px-5 py-2 mb-6 border border-[#7B0F14]/10">
            <span className="text-[#7B0F14] text-xs font-bold uppercase tracking-[0.2em]">Leadership & Governance</span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
              The People Behind <span className="text-[#7B0F14]">CashToken</span>
            </h2>
            <p className="text-gray-500 max-w-2xl text-base leading-relaxed">
              Operational Strategic Bureaucracy sits at the core of our growth, a governance model that combines AI-driven intelligence with disciplined execution. It allows us to scale globally, adapt locally, and create lasting impact across markets.
            </p>
          </div>

          {/* 3-3-1 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {leadershipData.map((member, idx) => {
              const isLast = idx === leadershipData.length - 1 && leadershipData.length % 3 === 1;
              return (
                <div key={member.name} className={`group${isLast ? ' lg:col-start-2' : ''}`}>
                  <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                    <div className="relative h-80 overflow-hidden bg-gray-100">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-1">
                        <GoldCoin size={18} />
                        <span className="text-[#7B0F14] text-xs font-semibold uppercase tracking-wider">{member.role}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};

export default OurTeam;
