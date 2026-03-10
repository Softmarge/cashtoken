import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';

const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772012085645_c38f19b0.jpg',
  shoppingWoman: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812572330_9fc98034.png',
  cardPayment: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812594998_da6b3e38.jpg',
  celebratingMan: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812627329_bb9886da.jpg',
  youngWoman: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812641412_5b36f5b5.jpg',
  elderlyCouple: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812655616_97f58e31.jpg',
  family: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812677509_82d598a9.jpg',
  student: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812700775_ae4dd1c5.png',
  professional: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812723204_0977bc7c.jpg',
  shoppingCouple: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812746232_40bad04f.jpg',
  promoMan: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1770812795410_6cfcd894.jpg',
};

interface HomePageProps {
  onNavigate: (page: string) => void;
  walletBalance?: number;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

const UK_Page: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [promoSlide, setPromoSlide] = useState(0);
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const consumerSection = useInView(0.12);
  const shopSection = useInView(0.15);
  const howItWorksSection = useInView(0.1);
  const promoSection = useInView(0.12);
  const carouselSection = useInView(0.12);

  const promoSlides = [
    {
      text: 'Receive CashTokens just by shopping from your favourite brands',
      subtext: 'Shop, earn, and win up to £1,000,000 weekly!',
    },
    {
      text: 'Unlock exclusive rewards when you shop with partner brands',
      subtext: 'Over 500+ brands across the UK',
    },
    {
      text: 'Your universal reward wallet for the entire United Kingdom',
      subtext: 'One wallet, unlimited rewards',
    },
  ];

  const carouselPeople = [
    { img: IMAGES.youngWoman, name: 'Sarah, London', quote: 'CashToken changed how I shop!' },
    { img: IMAGES.elderlyCouple, name: 'John & Mary, Bristol', quote: 'We love earning rewards together.' },
    { img: IMAGES.family, name: 'The Okafor Family, Manchester', quote: 'Rewards for the whole family!' },
    { img: IMAGES.student, name: 'James, Edinburgh', quote: 'Perfect for student budgets.' },
    { img: IMAGES.professional, name: 'David, Birmingham', quote: 'Professional rewards made simple.' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromoSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselSlide((prev) => (prev + 1) % carouselPeople.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white overflow-hidden">

      {/* ============ HERO SECTION ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-8 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT SIDE */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-gray-900 leading-snug lg:leading-tight">
                <span className="inline-block" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0)' : 'translateX(-80px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s' }}>
                  Welcome to
                </span>{' '}
                <span className="inline-block" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0)' : 'translateX(80px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s' }}>
                  the Universal
                </span>{' '}
                <span className="inline-block" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0)' : 'translateX(-80px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s' }}>
                  Reward Platform
                </span>{' '}
                <span className="inline-block" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0)' : 'translateX(80px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s' }}>
                  for all patronages
                </span>{' '}
                <span className="inline-block" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0)' : 'translateX(-80px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s' }}>
                  in the{' '}
                </span>
                <span className="inline-block text-[#7B0F14]" style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0) scale(1)' : 'translateX(80px) scale(0.8)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.95s' }}>
                  United Kingdom.
                </span>
              </h1>

              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-4 mt-8"
                style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s' }}
              >
                {/* FIX: Get Started → ukbusiness */}
                <button
                  onClick={() => onNavigate('ukbusiness')}
                  className="bg-[#7B0F14] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
                {/* FIX: Explore Brands → ukbrands */}
                <button
                  onClick={() => onNavigate('ukbrands')}
                  className="border-2 border-[#DAA520] text-[#7B0F14] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#DAA520]/10 transition-colors"
                >
                  Explore Brands
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - Hero Image */}
            <div
              className="order-1 lg:order-2 relative"
              style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.95)', transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s' }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.hero}
                  alt="Happy British man with CashToken wallet at Tower Bridge London"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[520px] object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-3 lg:-right-6 coin-float" style={{ animationDelay: '0s' }}>
                <GoldCoin size={44} animate />
              </div>
              <div className="absolute bottom-8 -left-3 lg:-left-6 coin-float" style={{ animationDelay: '1.5s' }}>
                <GoldCoin size={34} animate />
              </div>
              <div className="absolute -top-2 left-10 lg:left-20 coin-float hidden sm:block" style={{ animationDelay: '0.8s' }}>
                <GoldCoin size={26} animate />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ ARE YOU A CONSUMER? ============ */}
      <section className="relative overflow-hidden bg-white" ref={consumerSection.ref}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7B0F14]/[0.03] -translate-y-1/3 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#DAA520]/[0.04] translate-y-1/3 -translate-x-1/4 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#DAA520]/[0.08]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #7B0F14 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div
            className="inline-flex items-center gap-2 bg-[#7B0F14]/5 rounded-full px-5 py-2.5 mb-8 border border-[#7B0F14]/10"
            style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)', transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[#7B0F14]/70 text-xs font-bold uppercase tracking-[0.2em]">For Consumers</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] mb-6">
            <span className="inline-block" style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'translateX(0)' : 'translateX(-100px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s' }}>
              Are you a
            </span>{' '}
            <span className="relative inline-block" style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'translateX(0) scale(1)' : 'translateX(100px) scale(0.8)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s' }}>
              <span className="text-[#DAA520]">Consumer</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#DAA520]/40 rounded-full" />
            </span>
            <span className="inline-block" style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'scale(1)' : 'scale(0)', transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s' }}>?</span>
          </h2>

          <p
            className="text-gray-500 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'translateY(0)' : 'translateY(25px)', transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.45s' }}
          >
            Join thousands of smart shoppers across the UK who are turning everyday purchases into{' '}
            <span className="text-[#DAA520] font-semibold">life-changing rewards</span>. Shop as usual, earn CashTokens, and win big.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12 max-w-2xl mx-auto text-left">
            {[
              { text: 'Earn CashTokens from 500+ partner brands', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
              { text: 'Instant cashback directly to your bank', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
              { text: 'Weekly draws up to £1,000,000', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
              { text: 'One universal wallet for all rewards', icon: 'M2 5h20v14H2zM2 10h20' },
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 group cursor-default"
                style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'translateX(0)' : i % 2 === 0 ? 'translateX(-60px)' : 'translateX(60px)', transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.55 + i * 0.12}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#7B0F14]/5 border border-[#7B0F14]/10 flex items-center justify-center group-hover:bg-[#DAA520]/10 group-hover:border-[#DAA520]/30 transition-all duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={benefit.icon} />
                  </svg>
                </div>
                <span className="text-gray-600 text-sm lg:text-base font-medium group-hover:text-gray-900 transition-colors duration-300">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap gap-4 justify-center"
            style={{ opacity: consumerSection.isVisible ? 1 : 0, transform: consumerSection.isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.85s' }}
          >
            <button
              onClick={() => onNavigate('ukconsumer')}
              className="group bg-[#DAA520] hover:bg-[#C4941A] text-white px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-[#DAA520]/20 hover:shadow-2xl hover:shadow-[#DAA520]/30 hover:-translate-y-1 inline-flex items-center gap-3"
            >
              <span>Start Earning Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1.5 transition-transform duration-300">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            {/* FIX: View Partner Brands → ukbrands */}
            <button
              onClick={() => onNavigate('ukbrands')}
              className="group bg-[#7B0F14]/5 hover:bg-[#7B0F14]/10 text-[#7B0F14] px-8 py-4 rounded-2xl font-bold text-base transition-all border border-[#7B0F14]/15 hover:border-[#7B0F14]/30 hover:-translate-y-1 inline-flex items-center gap-3"
            >
              <span>View Partner Brands</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============ WHERE DO YOU SHOP ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" ref={shopSection.ref}>
        <div className="bg-[#F4E6E6] rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div>
            <h3
              className="text-xl lg:text-2xl font-bold text-gray-900"
              style={{ opacity: shopSection.isVisible ? 1 : 0, transform: shopSection.isVisible ? 'translateX(0)' : 'translateX(-80px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' }}
            >
              Where do you shop?
            </h3>
            <p
              className="text-gray-700 mt-1"
              style={{ opacity: shopSection.isVisible ? 1 : 0, transform: shopSection.isVisible ? 'translateX(0)' : 'translateX(80px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s' }}
            >
              Get CashToken and win up to <span className="font-bold text-[#7B0F14]">£1,000,000</span> weekly!
            </p>
            <div style={{ opacity: shopSection.isVisible ? 1 : 0, transform: shopSection.isVisible ? 'translateX(0)' : 'translateX(-60px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s' }}>
              {/* FIX: Click to see Brands → ukbrands */}
              <button
                onClick={() => onNavigate('ukbrands')}
                className="mt-4 bg-[#7B0F14] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg"
              >
                Click to see Brands
              </button>
            </div>
          </div>
          <div
            className="flex items-center gap-2"
            style={{ opacity: shopSection.isVisible ? 1 : 0, transform: shopSection.isVisible ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.8)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s' }}
          >
            <div className="animate-bounce" style={{ animationDuration: '2s' }}><GoldCoin size={40} /></div>
            <div className="animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.3s' }}><GoldCoin size={32} /></div>
            <div className="animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.6s' }}><GoldCoin size={28} /></div>
            <div className="ml-2">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="20" width="40" height="24" rx="4" fill="#7B0F14"/>
                <rect x="8" y="12" width="32" height="12" rx="3" fill="#A52228"/>
                <rect x="21" y="12" width="6" height="32" fill="#DAA520"/>
                <path d="M24 12C24 12 18 6 14 8C10 10 14 14 24 12Z" fill="#DAA520"/>
                <path d="M24 12C24 12 30 6 34 8C38 10 34 14 24 12Z" fill="#DAA520"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" ref={howItWorksSection.ref}>
        <h2
          className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2"
          style={{ opacity: howItWorksSection.isVisible ? 1 : 0, transform: howItWorksSection.isVisible ? 'translateX(0)' : 'translateX(-100px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' }}
        >
          How it works
        </h2>
        <p
          className="text-gray-600 mb-8"
          style={{ opacity: howItWorksSection.isVisible ? 1 : 0, transform: howItWorksSection.isVisible ? 'translateX(0)' : 'translateX(100px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s' }}
        >
          Receive CashToken Universal Rewards in 3 easy steps
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: IMAGES.shoppingWoman, title: 'Choose your', highlight: 'Favourite Brand', desc: 'Browse 500+ partner brands across the UK' },
            { img: IMAGES.cardPayment, title: 'Patronise Brands to receive', highlight: 'CashToken Rewards.', desc: 'Shop as usual and earn tokens automatically' },
            { img: IMAGES.celebratingMan, title: 'CashToken Reward', highlight: 'Instant Cashback + the weekly draw £1,000,000', desc: 'Instant rewards plus weekly million pound draws' },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              style={{
                opacity: howItWorksSection.isVisible ? 1 : 0,
                transform: howItWorksSection.isVisible ? 'translateY(0) scale(1)' : i === 0 ? 'translateX(-80px) scale(0.9)' : i === 1 ? 'translateY(60px) scale(0.9)' : 'translateX(80px) scale(0.9)',
                transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.15}s`,
              }}
            >
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm">{card.title}</p>
                  <p className="font-bold text-[#DAA520]">{card.highlight}</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PROMO SLIDER ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" ref={promoSection.ref}>
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #7B0F14 0%, #4A0A0D 100%)',
            opacity: promoSection.isVisible ? 1 : 0,
            transform: promoSection.isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 lg:p-12 text-white">
              <p className="text-xs tracking-wider text-[#DAA520] font-semibold mb-3" style={{ opacity: promoSection.isVisible ? 1 : 0, transform: promoSection.isVisible ? 'translateX(0)' : 'translateX(-60px)', transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s' }}>
                SPECIAL OFFER
              </p>
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight" style={{ opacity: promoSection.isVisible ? 1 : 0, transform: promoSection.isVisible ? 'translateX(0)' : 'translateX(60px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s' }}>
                {promoSlides[promoSlide].text.split('CashTokens').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-[#DAA520]">CashTokens</span>}
                  </React.Fragment>
                ))}
              </h3>
              <p className="text-white/70 mt-3 text-sm" style={{ opacity: promoSection.isVisible ? 1 : 0, transform: promoSection.isVisible ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s' }}>
                {promoSlides[promoSlide].subtext}
              </p>
              <div className="flex items-center gap-3 mt-6" style={{ opacity: promoSection.isVisible ? 1 : 0, transform: promoSection.isVisible ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.6s' }}>
                {['f', 'x', 'ig'].map((s) => (
                  <div key={s} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{s}</span>
                  </div>
                ))}
                <span className="text-white/60 text-xs ml-1">@cashtokenuk</span>
              </div>
              <div className="flex gap-2 mt-6">
                {promoSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === promoSlide ? 'bg-[#DAA520] w-6' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
            <div className="relative h-64 md:h-80 lg:h-96">
              <img src={IMAGES.promoMan} alt="Excited man celebrating CashToken rewards" className="w-full h-full object-cover object-top" />
              <div className="absolute top-4 right-4"><GoldCoin size={56} animate /></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-[#DAA520]/30" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PEOPLE CAROUSEL ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" ref={carouselSection.ref}>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-2">
          <span className="inline-block" style={{ opacity: carouselSection.isVisible ? 1 : 0, transform: carouselSection.isVisible ? 'translateX(0)' : 'translateX(-100px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' }}>Your gateway to</span>{' '}
          <span className="inline-block" style={{ opacity: carouselSection.isVisible ? 1 : 0, transform: carouselSection.isVisible ? 'translateX(0)' : 'translateX(100px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s' }}>exclusive rewards</span>{' '}
          <span className="inline-block" style={{ opacity: carouselSection.isVisible ? 1 : 0, transform: carouselSection.isVisible ? 'translateX(0)' : 'translateX(-80px)', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s' }}>across the UK</span>
        </h2>
        <p className="text-gray-500 text-center mb-10" style={{ opacity: carouselSection.isVisible ? 1 : 0, transform: carouselSection.isVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.5s' }}>
          Trusted by thousands of happy customers
        </p>

        <div className="relative max-w-2xl mx-auto" style={{ opacity: carouselSection.isVisible ? 1 : 0, transform: carouselSection.isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)', transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.55s' }}>
          <div className="overflow-hidden rounded-3xl">
            {carouselPeople.map((person, i) => (
              <div key={i} className={`transition-all duration-700 ${i === carouselSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
                {i === carouselSlide && (
                  <div className="flex flex-col md:flex-row items-center gap-6 bg-[#F4E6E6] rounded-3xl p-6 lg:p-8">
                    <img src={person.img} alt={person.name} className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg border-4 border-white" />
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-[#7B0F14] italic">"{person.quote}"</p>
                      <p className="text-gray-600 mt-2 font-medium">{person.name}</p>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#DAA520">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {carouselPeople.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === carouselSlide ? 'bg-[#7B0F14] w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>
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

    </div>
  );
};

export default UK_Page;