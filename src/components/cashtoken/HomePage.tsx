import React, { useState, useEffect } from 'react';
import GoldCoin from './GoldCoin';
import OurTeam from './OurTeam';
import WhoAreWe from './WhoAreWe';



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

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {

  const [promoSlide, setPromoSlide] = useState(0);
  const [carouselSlide, setCarouselSlide] = useState(0);


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

  // Auto-slide promo
  useEffect(() => {
    const timer = setInterval(() => {
      setPromoSlide((prev) => (prev + 1) % promoSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselSlide((prev) => (prev + 1) % carouselPeople.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">

      {/* HERO SECTION - White background, side-by-side layout */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-16 pb-8 lg:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT SIDE - Gold Coin + Hero Text */}
            <div className="order-2 lg:order-1">
              {/* Gold Coin with premium animation + glow */}
              <div className="flex justify-start mb-6 lg:mb-8">
                <div className="relative">
                  <GoldCoin size={100} premium animate />
                  {/* Outer soft ring glow */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: '0 0 50px 16px rgba(218,165,32,0.18), 0 0 80px 32px rgba(218,165,32,0.08)',
                    }}
                  />
                </div>
              </div>

              {/* Hero Text */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-gray-900 leading-snug lg:leading-tight">
                Welcome to the Universal Reward Platform for all patronages in the{' '}
                <span className="text-[#7B0F14]">United Kingdom.</span>
              </h1>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => onNavigate('consumer')}
                  className="bg-[#7B0F14] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
                <button
                  onClick={() => onNavigate('brands')}
                  className="border-2 border-[#DAA520] text-[#7B0F14] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#DAA520]/10 transition-colors"
                >
                  Explore Brands
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGES.hero}
                  alt="Happy British man with CashToken wallet at Tower Bridge London"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[520px] object-cover"
                />
              </div>
              {/* Floating decorative coins */}
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

      {/* WHO ARE WE - Corporate section with sliding people images */}
      <WhoAreWe />


      {/* ARE YOU A CONSUMER? */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle decorative elements for white background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7B0F14]/[0.03] -translate-y-1/3 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#DAA520]/[0.04] translate-y-1/3 -translate-x-1/4 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gray-100" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#DAA520]/[0.08]" />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #7B0F14 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#7B0F14]/5 rounded-full px-5 py-2.5 mb-8 border border-[#7B0F14]/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-[#7B0F14]/70 text-xs font-bold uppercase tracking-[0.2em]">For Consumers</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] mb-6">
            Are you a{' '}
            <span className="relative inline-block">
              <span className="text-[#DAA520]">Consumer</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#DAA520]/40 rounded-full" />
            </span>
            ?
          </h2>

          <p className="text-gray-500 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Join thousands of smart shoppers across the UK who are turning everyday purchases into{' '}
            <span className="text-[#DAA520] font-semibold">life-changing rewards</span>. Shop as usual, earn CashTokens, and win big.
          </p>

          {/* Benefits grid */}
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

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('consumer')}
              className="group bg-[#DAA520] hover:bg-[#C4941A] text-white px-8 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-[#DAA520]/20 hover:shadow-2xl hover:shadow-[#DAA520]/30 hover:-translate-y-1 inline-flex items-center gap-3"
            >
              <span>Start Earning Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="group-hover:translate-x-1.5 transition-transform duration-300">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button
              onClick={() => onNavigate('brands')}
              className="group bg-[#7B0F14]/5 hover:bg-[#7B0F14]/10 text-[#7B0F14] px-8 py-4 rounded-2xl font-bold text-base transition-all border border-[#7B0F14]/15 hover:border-[#7B0F14]/30 hover:-translate-y-1 inline-flex items-center gap-3"
            >
              <span>View Partner Brands</span>
            </button>
          </div>
        </div>
      </section>




      {/* WHERE DO YOU SHOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#F4E6E6] rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Where do you shop?</h3>
            <p className="text-gray-700 mt-1">
              Get CashToken and win up to <span className="font-bold text-[#7B0F14]">£1,000,000</span> weekly!
            </p>
            <button
              onClick={() => onNavigate('brands')}
              className="mt-4 bg-[#7B0F14] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg"
            >
              Click to see Brands
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="animate-bounce" style={{ animationDuration: '2s' }}>
              <GoldCoin size={40} />
            </div>
            <div className="animate-bounce" style={{ animationDuration: '2.2s', animationDelay: '0.3s' }}>
              <GoldCoin size={32} />
            </div>
            <div className="animate-bounce" style={{ animationDuration: '1.8s', animationDelay: '0.6s' }}>
              <GoldCoin size={28} />
            </div>
            {/* Gift box icon */}
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

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">How it works</h2>
        <p className="text-gray-600 mb-8">Receive CashToken Universal Rewards in 3 easy steps</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              img: IMAGES.shoppingWoman,
              title: 'Choose your',
              highlight: 'Favourite Brand',
              desc: 'Browse 500+ partner brands across the UK',
            },
            {
              img: IMAGES.cardPayment,
              title: 'Patronise Brands to receive',
              highlight: 'CashToken Rewards.',
              desc: 'Shop as usual and earn tokens automatically',
            },
            {
              img: IMAGES.celebratingMan,
              title: 'CashToken Reward',
              highlight: 'Instant Cashback + the weekly draw £1,000,000',
              desc: 'Instant rewards plus weekly million pound draws',
            },
          ].map((card, i) => (
            <div key={i} className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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

      {/* PROMO SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-3xl overflow-hidden relative" style={{
          background: 'linear-gradient(135deg, #7B0F14 0%, #4A0A0D 100%)'
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 lg:p-12 text-white">
              <p className="text-xs tracking-wider text-[#DAA520] font-semibold mb-3">SPECIAL OFFER</p>
              <h3 className="text-2xl lg:text-3xl font-bold leading-tight">
                {promoSlides[promoSlide].text.split('CashTokens').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="text-[#DAA520]">CashTokens</span>}
                  </React.Fragment>
                ))}
              </h3>
              <p className="text-white/70 mt-3 text-sm">{promoSlides[promoSlide].subtext}</p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-6">
                {['f', 'x', 'ig'].map((s) => (
                  <div key={s} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{s}</span>
                  </div>
                ))}
                <span className="text-white/60 text-xs ml-1">@cashtokenuk</span>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-6">
                {promoSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoSlide(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === promoSlide ? 'bg-[#DAA520] w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative h-64 md:h-80 lg:h-96">
              <img
                src={IMAGES.promoMan}
                alt="Excited man celebrating CashToken rewards"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 right-4">
                <GoldCoin size={56} animate />
              </div>
              {/* Floating gold circle */}
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-[#DAA520]/30" />
            </div>
          </div>
        </div>
      </section>

      {/* PEOPLE CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-2">
          Your gateway to exclusive rewards across the UK
        </h2>
        <p className="text-gray-500 text-center mb-10">Trusted by thousands of happy customers</p>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            {carouselPeople.map((person, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  i === carouselSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                {i === carouselSlide && (
                  <div className="flex flex-col md:flex-row items-center gap-6 bg-[#F4E6E6] rounded-3xl p-6 lg:p-8">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg border-4 border-white"
                    />
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

          {/* Carousel dots */}
          <div className="flex justify-center gap-2 mt-6">
            {carouselPeople.map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === carouselSlide ? 'bg-[#7B0F14] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OUR TEAM - placed after "Your gateway to exclusive rewards across the UK" */}
      <OurTeam />


      {/* LIFE-CHANGING DEALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-64 lg:h-96">
            <img
              src={IMAGES.shoppingCouple}
              alt="Excited couple shopping with bags"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 lg:px-12 max-w-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Looking for <span className="text-[#DAA520]">life-changing</span> deals?
                </h2>
                <p className="text-white/80 mt-3">
                  Discover exclusive rewards and cashback offers from hundreds of UK brands.
                </p>
                <button
                  onClick={() => onNavigate('brands')}
                  className="mt-6 bg-[#DAA520] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#B8860B] transition-colors shadow-lg"
                >
                  Explore Brands
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
