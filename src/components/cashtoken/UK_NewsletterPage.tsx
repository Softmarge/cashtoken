import React, { useState, useEffect } from 'react';
import GoldCoin from './GoldCoin';

const CONFETTI_BG = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80';

const celebrities = [
  {
    name: 'James Whitfield',
    title: 'TV Presenter & Entrepreneur',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb1.jpg',
    quote: "CashToken is absolutely brilliant! I earn rewards on literally everything I buy. It's changed how I think about everyday spending — every coffee, every shop, it all adds up to something amazing.",
    followers: '2.4M',
    platform: 'ITV',
  },
  {
    name: 'Sophia Laurent',
    title: 'Fashion Icon & Influencer',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb2.jpg',
    quote: "I've told all my followers about CashToken. The fact that every single purchase gives you a chance at life-changing rewards? That's not just an app, that's a revolution in how we shop!",
    followers: '5.1M',
    platform: 'Instagram',
  },
  {
    name: 'Marcus Sterling',
    title: 'Premier League Legend',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb3.jpg',
    quote: "As someone who knows about winning, CashToken is a game-changer. Every purchase is like taking a shot at goal — and the rewards are absolutely world-class. The whole squad is on it!",
    followers: '8.7M',
    platform: 'Sky Sports',
  },
  {
    name: 'Amelia Rose',
    title: 'Award-Winning Actress',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb4.jpg',
    quote: "I was sceptical at first, but CashToken genuinely delivers. I've already earned incredible rewards just from my normal shopping. It feels like getting paid to live your life!",
    followers: '3.2M',
    platform: 'BBC',
  },
  {
    name: 'Daniel Okafor',
    title: 'Chart-Topping Music Artist',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb5.jpg',
    quote: "CashToken is the future, no cap! Every time I shop, eat out, or even grab a coffee — I'm stacking rewards. This is what innovation looks like. Big up the CashToken team!",
    followers: '6.3M',
    platform: 'Spotify',
  },
  {
    name: 'Charlotte Hughes',
    title: 'Celebrity Chef & Author',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb6.jpg',
    quote: "From Waitrose to my local farmers market, CashToken works everywhere. I love that it supports British businesses while rewarding customers. It's a win-win for everyone!",
    followers: '1.8M',
    platform: 'Channel 4',
  },
  {
    name: 'Oliver Bennett',
    title: "Tech Entrepreneur & Dragon",
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb7.jpg',
    quote: "In all my years of business, I've never seen anything quite like CashToken. The business model is genius — rewarding consumers while driving footfall for brands. I'm in!",
    followers: '4.5M',
    platform: "Dragon's Den",
  },
  {
    name: 'Kwame Asante',
    title: 'Grime MC & Philanthropist',
    image: 'https://d64gsuwffb70l.cloudfront.net/cashtoken/celeb8.jpg',
    quote: "CashToken is for the people, man. Everyone from my nan to my little cousin is using it. Shopping and getting rewarded? That's how it should be. London to Manchester, we're all on it!",
    followers: '3.9M',
    platform: 'BBC Radio 1',
  },
];

const brandPartnersRow1 = [
  { name: 'Tesco', color: '#FFFFFF', bg: '#00539F', icon: 'T' },
  { name: "Sainsbury's", color: '#FFFFFF', bg: '#F06C00', icon: 'S' },
  { name: 'ASDA', color: '#FFFFFF', bg: '#78BE20', icon: 'A' },
  { name: 'Boots', color: '#FFFFFF', bg: '#003DA5', icon: 'B' },
  { name: "Nando's", color: '#FFFFFF', bg: '#E31837', icon: 'N' },
  { name: 'Costa Coffee', color: '#FFFFFF', bg: '#6B0F34', icon: 'C' },
  { name: 'Greggs', color: '#FFFFFF', bg: '#004B8D', icon: 'G' },
  { name: 'Primark', color: '#FFFFFF', bg: '#004F9F', icon: 'P' },
  { name: 'JD Sports', color: '#FFFFFF', bg: '#000000', icon: 'JD' },
  { name: 'Barclays', color: '#FFFFFF', bg: '#00AEEF', icon: 'B' },
  { name: 'TfL', color: '#FFFFFF', bg: '#003DA5', icon: 'TfL' },
  { name: 'Deliveroo', color: '#FFFFFF', bg: '#00CCBC', icon: 'D' },
  { name: 'Uber Eats', color: '#FFFFFF', bg: '#142328', icon: 'UE' },
  { name: 'Vodafone', color: '#FFFFFF', bg: '#E60000', icon: 'V' },
  { name: 'Sky', color: '#FFFFFF', bg: '#0072C9', icon: 'S' },
];

const brandPartnersRow2 = [
  { name: 'Currys', color: '#FFFFFF', bg: '#2D2D6E', icon: 'C' },
  { name: 'Argos', color: '#FFFFFF', bg: '#D82128', icon: 'A' },
  { name: 'Halfords', color: '#FFFFFF', bg: '#003478', icon: 'H' },
  { name: 'Lebara', color: '#FFFFFF', bg: '#E31837', icon: 'L' },
  { name: 'Enish', color: '#FFFFFF', bg: '#8B4513', icon: 'E' },
  { name: 'Waitrose', color: '#FFFFFF', bg: '#5C8A3C', icon: 'W' },
  { name: 'M&S', color: '#FFFFFF', bg: '#000000', icon: 'M&S' },
  { name: 'John Lewis', color: '#FFFFFF', bg: '#1D3C34', icon: 'JL' },
  { name: 'Selfridges', color: '#FFFFFF', bg: '#CFB53B', icon: 'S' },
  { name: 'Harrods', color: '#FFFFFF', bg: '#006B3F', icon: 'H' },
  { name: 'Pret', color: '#FFFFFF', bg: '#6B2339', icon: 'P' },
  { name: 'Wagamama', color: '#FFFFFF', bg: '#E31837', icon: 'W' },
  { name: 'Zara', color: '#FFFFFF', bg: '#000000', icon: 'Z' },
  { name: 'H&M', color: '#FFFFFF', bg: '#E50010', icon: 'H&M' },
  { name: 'ASOS', color: '#FFFFFF', bg: '#2D2D2D', icon: 'A' },
];

const recentWinners = [
  { name: 'Sarah T.', location: 'London', amount: '£2,500', brand: 'Tesco' },
  { name: 'James M.', location: 'Manchester', amount: '£1,000', brand: 'ASDA' },
  { name: 'Priya K.', location: 'Birmingham', amount: '£5,000', brand: 'Barclays' },
  { name: 'David W.', location: 'Edinburgh', amount: '£750', brand: "Nando's" },
  { name: 'Fatima A.', location: 'Leeds', amount: '£3,200', brand: 'Boots' },
  { name: 'Tom H.', location: 'Bristol', amount: '£10,000', brand: 'Sky' },
  { name: 'Grace O.', location: 'Liverpool', amount: '£1,500', brand: 'Costa' },
  { name: 'Ryan P.', location: 'Glasgow', amount: '£4,000', brand: 'Deliveroo' },
  { name: 'Emma L.', location: 'Cardiff', amount: '£800', brand: 'Primark' },
  { name: 'Oluwaseun B.', location: 'London', amount: '£25,000', brand: 'Vodafone' },
];

const articles = [
  {
    title: 'Barclays Bank launches CashToken Rewards',
    date: 'February 8, 2026',
    description: 'Barclays Bank has officially partnered with CashToken to bring universal rewards to millions of UK customers.',
    criteria: ['Spend £200 monthly', '3 mobile transactions', 'Maintain active account'],
    color: '#00AEEF',
    logo: 'BARCLAYS',
    featured: true,
    tag: 'BANKING',
  },
  {
    title: 'Enish Restaurant joins CashToken',
    date: 'February 5, 2026',
    description: 'Popular Nigerian restaurant chain Enish now offers CashToken rewards for loyal diners across London.',
    criteria: ['Spend £50 twice monthly', 'Dine-in or delivery', 'Register CashToken account'],
    color: '#8B4513',
    logo: 'ENISH',
    featured: false,
    tag: 'DINING',
  },
  {
    title: 'Lebara launches CashToken Rewards',
    date: 'February 1, 2026',
    description: 'Mobile network Lebara brings CashToken rewards to their prepaid and contract customers.',
    criteria: ['Recharge £20+', 'Monthly active SIM', 'UK registered number'],
    color: '#E31837',
    logo: 'LEBARA',
    featured: false,
    tag: 'TELECOM',
  },
  {
    title: 'ASDA Supermarket doubles CashToken earnings',
    date: 'January 28, 2026',
    description: 'ASDA shoppers can now earn double CashTokens on all grocery purchases above £50.',
    criteria: ['Spend £50+ per shop', 'Use ASDA app', 'Link CashToken wallet'],
    color: '#78BE20',
    logo: 'ASDA',
    featured: false,
    tag: 'GROCERY',
  },
  {
    title: "Nando's joins the CashToken family",
    date: 'January 22, 2026',
    description: "Nando's customers can now earn CashTokens on every visit, with bonus rewards on weekends.",
    criteria: ['Spend £15+ per visit', 'Register loyalty card', 'Weekend bonus available'],
    color: '#E31837',
    logo: "NANDO'S",
    featured: false,
    tag: 'DINING',
  },
  {
    title: 'TfL partners with CashToken for commuter rewards',
    date: 'January 15, 2026',
    description: 'Transport for London riders can now earn CashTokens on their daily commute using Oyster or contactless.',
    criteria: ['£50+ monthly travel spend', 'Registered Oyster card', 'Link to CashToken'],
    color: '#003DA5',
    logo: 'TfL',
    featured: false,
    tag: 'TRANSPORT',
  },
];

const stats = [
  { value: '2M+', label: 'Active Users', icon: 'users', color: 'from-[#7B0F14] to-[#9B1B20]' },
  { value: '500+', label: 'Brand Partners', icon: 'store', color: 'from-[#DAA520] to-[#B8860B]' },
  { value: '£12M', label: 'Rewards Given', icon: 'gift', color: 'from-[#7B0F14] to-[#DAA520]' },
  { value: '98%', label: 'Happy Customers', icon: 'heart', color: 'from-[#DAA520] to-[#7B0F14]' },
];

const UK_NewsletterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeCelebrity, setActiveCelebrity] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCelebrity((prev) => (prev + 1) % celebrities.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setShowConfetti(true);
      setEmail('');
      setTimeout(() => setShowConfetti(false), 4000);
      setTimeout(() => setSubscribed(false), 8000);
    }
  };

  const StatIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'users':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'store':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'gift':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        );
      case 'heart':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const BrandTile = ({ brand }: { brand: { name: string; color: string; bg: string; icon: string } }) => (
    <div className="flex-shrink-0 group cursor-pointer">
      <div
        className="flex items-center gap-3 rounded-2xl px-5 py-3 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
        style={{ backgroundColor: brand.bg, minWidth: '150px' }}
      >
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
          <span className="font-black text-xs" style={{ color: brand.color }}>{brand.icon}</span>
        </div>
        <span className="font-bold text-sm whitespace-nowrap" style={{ color: brand.color }}>
          {brand.name}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen overflow-hidden">

      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden bg-white">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #DAA520 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-rose-50/30" />

        {/* Animated sparkle dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#DAA520] sparkle-anim"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#DAA520]/10 backdrop-blur-md px-5 py-2.5 rounded-full mb-8 border border-[#DAA520]/20">
              <GoldCoin size={22} animate />
              <span className="text-[#7B0F14] text-sm font-bold tracking-wide">The UK's #1 Rewards Platform</span>
              <GoldCoin size={22} animate />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-[0.95] tracking-tight">
              <span className="text-[#7B0F14]">Cash</span>
              <span className="text-[#DAA520]">Token</span>
              <br />
              Newsletter
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Brand partnerships, celebrity buzz, and the latest from the
              <span className="font-bold text-[#DAA520]"> UK's fastest-growing </span>
              rewards revolution
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="relative group cursor-default">
                  <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-[#DAA520]/30">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <StatIcon type={stat.icon} />
                    </div>
                    <div className="text-3xl md:text-4xl font-black text-[#7B0F14]">{stat.value}</div>
                    <div className="text-[#DAA520] text-xs mt-1 font-bold uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating coins */}
        <div className="absolute top-12 left-8 coin-float opacity-40" style={{ animationDelay: '0s' }}>
          <GoldCoin size={50} />
        </div>
        <div className="absolute top-24 right-12 coin-float opacity-30" style={{ animationDelay: '1s' }}>
          <GoldCoin size={36} />
        </div>
        <div className="absolute bottom-20 left-1/4 coin-float opacity-20" style={{ animationDelay: '2s' }}>
          <GoldCoin size={60} />
        </div>
        <div className="absolute bottom-12 right-1/3 coin-float opacity-30" style={{ animationDelay: '0.5s' }}>
          <GoldCoin size={28} />
        </div>
      </div>

      {/* ===== RECENT WINNERS TICKER ===== */}
      <div className="bg-gradient-to-r from-[#DAA520] via-[#FFD700] to-[#DAA520] py-3 overflow-hidden">
        <div className="flex items-center ticker-scroll" style={{ width: 'max-content' }}>
          {[...recentWinners, ...recentWinners].map((winner, idx) => (
            <div key={idx} className="flex items-center gap-3 mx-6 whitespace-nowrap">
              <div className="w-2 h-2 rounded-full bg-[#7B0F14] animate-pulse" />
              <span className="text-[#7B0F14] font-bold text-sm">
                {winner.name} from {winner.location} won <span className="font-black">{winner.amount}</span> at {winner.brand}!
              </span>
              <GoldCoin size={18} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== BRAND PARTNERS SHOWCASE ===== */}
      <div className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#DAA520]/10 px-4 py-2 rounded-full mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-[#DAA520] text-sm font-bold">500+ Partners & Growing</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">
              Our <span className="text-[#DAA520]">Brand</span> Partners
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The biggest names in the UK are already on CashToken. Shop at any of these brands and earn rewards instantly.
            </p>
          </div>
        </div>

        {/* Row 1 */}
        <div className="relative mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="marquee-left flex gap-4" style={{ width: 'max-content' }}>
            {[...brandPartnersRow1, ...brandPartnersRow1].map((brand, idx) => (
              <BrandTile key={`r1-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="marquee-right flex gap-4" style={{ width: 'max-content' }}>
            {[...brandPartnersRow2, ...brandPartnersRow2].map((brand, idx) => (
              <BrandTile key={`r2-${idx}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* "And many more" badge */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-lg border-2 border-[#DAA520]/20">
            <span className="text-gray-600 text-sm font-medium">And</span>
            <span className="text-[#DAA520] font-black text-lg">470+</span>
            <span className="text-gray-600 text-sm font-medium">more brands across the UK</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>

      {/* ===== CELEBRITY TESTIMONIALS ===== */}
      <div className="relative overflow-hidden bg-white">
        {/* Subtle diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #7B0F14 0px, #7B0F14 2px, transparent 2px, transparent 40px, #DAA520 40px, #DAA520 42px, transparent 42px, transparent 80px)',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DAA520]/15 to-[#7B0F14]/10 px-5 py-2.5 rounded-full mb-5 border border-[#DAA520]/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#DAA520" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-[#7B0F14] text-sm font-black uppercase tracking-wider">Celebrity Endorsements</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#DAA520" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What <span className="text-[#DAA520]">UK Celebrities</span> Are Saying
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The biggest names in entertainment, sport, and business are already CashToken fans
            </p>
          </div>

          {/* Featured Celebrity Spotlight */}
          <div className="mb-12">
            <div className="bg-white rounded-[2rem] shadow-2xl border-2 border-[#DAA520]/15 overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Celebrity Image */}
                <div className="relative lg:col-span-2">
                  <img
                    src={celebrities[activeCelebrity].image}
                    alt={celebrities[activeCelebrity].name}
                    className="w-full h-80 lg:h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.classList.add('bg-gradient-to-br', 'from-[#7B0F14]', 'to-[#4A0A0D]');
                      target.parentElement!.innerHTML = `<div class="w-full h-80 lg:h-full flex items-center justify-center text-6xl font-black text-white/90">${celebrities[activeCelebrity].name.split(' ').map(n => n[0]).join('')}</div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/5" />
                  {/* "As Seen On" badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#7B0F14" stroke="none">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" stroke="#7B0F14" fill="none" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10px] font-black text-[#7B0F14] uppercase tracking-wider">As Seen On {celebrities[activeCelebrity].platform}</span>
                    </div>
                  </div>
                  {/* Followers badge */}
                  <div className="absolute bottom-4 left-4 bg-[#7B0F14]/80 backdrop-blur-sm rounded-xl px-3 py-1.5">
                    <span className="text-white text-xs font-bold">{celebrities[activeCelebrity].followers} followers</span>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center relative">
                  {/* Big decorative quote mark */}
                  <svg className="absolute top-4 right-6 opacity-[0.04]" width="120" height="120" viewBox="0 0 24 24" fill="#7B0F14">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 bg-[#7B0F14]/10 text-[#7B0F14] px-3 py-1.5 rounded-full text-xs font-bold border border-[#7B0F14]/20">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#7B0F14" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="9 12 11.5 14.5 16 9" />
                      </svg>
                      Verified Celebrity
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#DAA520]/10 text-[#DAA520] px-3 py-1.5 rounded-full text-xs font-bold border border-[#DAA520]/20">
                      <GoldCoin size={14} />
                      CashToken Ambassador
                    </span>
                  </div>

                  <p className="text-gray-600 text-xl lg:text-2xl leading-relaxed italic mb-8 font-medium">
                    "{celebrities[activeCelebrity].quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-black text-gray-900 text-xl">{celebrities[activeCelebrity].name}</h3>
                      <p className="text-[#DAA520] font-semibold text-sm">{celebrities[activeCelebrity].title}</p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-1.5 mt-4">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="#DAA520" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    <span className="text-gray-400 text-sm ml-2 font-medium">5.0 rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {celebrities.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCelebrity(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === activeCelebrity
                      ? 'w-10 h-3 bg-gradient-to-r from-[#7B0F14] to-[#DAA520]'
                      : 'w-3 h-3 bg-[#DAA520]/30 hover:bg-[#DAA520]/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Celebrity Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {celebrities.map((celeb, idx) => (
              <button
                key={celeb.name}
                onClick={() => setActiveCelebrity(idx)}
                className={`text-left rounded-2xl overflow-hidden transition-all duration-300 group relative ${
                  idx === activeCelebrity
                    ? 'ring-3 ring-[#DAA520] shadow-xl shadow-[#DAA520]/20 scale-[1.02]'
                    : 'hover:shadow-lg hover:scale-[1.02] shadow-md border-2 border-[#DAA520]/10'
                }`}
              >
                <div className="relative">
                  <img
                    src={celeb.image}
                    alt={celeb.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const initials = celeb.name.split(' ').map(n => n[0]).join('');
                      const gradients = ['from-[#7B0F14] to-[#4A0A0D]', 'from-[#DAA520] to-[#B8860B]', 'from-[#1a1a2e] to-[#16213e]', 'from-[#9B1B20] to-[#7B0F14]', 'from-[#2d2d2d] to-[#1a1a1a]', 'from-[#B8860B] to-[#8B6914]', 'from-[#4A0A0D] to-[#2D0508]', 'from-[#1a1a2e] to-[#0f3460]'];
                      target.parentElement!.innerHTML = `<div class="w-full h-48 bg-gradient-to-br ${gradients[idx % gradients.length]} flex items-center justify-center text-3xl font-black text-white/90 relative overflow-hidden"><div class="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/5"></div><div class="absolute bottom-8 left-6 w-14 h-14 rounded-full bg-white/5"></div><span class="relative z-10">${initials}</span></div><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>${idx === activeCelebrity ? '<div class="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#DAA520] flex items-center justify-center shadow-lg"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : ''}<div class="absolute bottom-0 left-0 right-0 p-3"><div class="flex items-center gap-1.5 mb-0.5"><h4 class="font-bold text-white text-sm truncate">${celeb.name}</h4><svg width="14" height="14" viewBox="0 0 24 24" fill="#DAA520" stroke="white" stroke-width="2" class="flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><polyline points="9 12 11.5 14.5 16 9"></polyline></svg></div><p class="text-white/70 text-[11px] truncate">${celeb.title}</p></div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {idx === activeCelebrity && (
                    <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[#DAA520] flex items-center justify-center shadow-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-bold text-white text-sm truncate">{celeb.name}</h4>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#DAA520" stroke="white" strokeWidth="2" className="flex-shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="9 12 11.5 14.5 16 9" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-[11px] truncate">{celeb.title}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== NEWS ARTICLES ===== */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#7B0F14]/5 px-4 py-2 rounded-full mb-4 border border-[#7B0F14]/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-[#7B0F14] text-sm font-bold">Latest News & Partnerships</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
              Fresh Off The <span className="text-[#DAA520]">Press</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              The latest brand partnerships and CashToken news from across the UK
            </p>
          </div>

          {/* Featured Article */}
          {articles.filter(a => a.featured).map((article) => (
            <div key={article.title} className="rounded-3xl overflow-hidden shadow-xl mb-12 bg-white border-2 border-[#DAA520]/15 hover:shadow-2xl transition-all duration-500 group">
              <div className="h-1.5 bg-gradient-to-r from-[#7B0F14] via-[#DAA520] to-[#7B0F14]" />
              <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-xs font-black tracking-wider text-white bg-gradient-to-r from-[#7B0F14] to-[#DAA520] px-4 py-1.5 rounded-full shadow-md">FEATURED</span>
                    <span className="text-xs font-bold tracking-wider text-[#7B0F14] bg-[#7B0F14]/5 px-3 py-1.5 rounded-full">{article.tag}</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-gray-900 group-hover:text-[#DAA520] transition-colors">{article.title}</h2>
                  <p className="text-gray-500 mt-3 leading-relaxed text-lg">{article.description}</p>
                  <div className="mt-6 bg-[#DAA520]/5 rounded-2xl p-5 border border-[#DAA520]/10">
                    <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Earning Criteria
                    </p>
                    <ul className="space-y-2.5">
                      {article.criteria.map((c) => (
                        <li key={c} className="flex items-center gap-2.5 text-sm text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-[#DAA520]/15 flex items-center justify-center flex-shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-400 mt-5 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {article.date}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div
                      className="w-48 h-48 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl pulse-glow transform group-hover:rotate-3 transition-transform duration-500"
                      style={{ backgroundColor: article.color }}
                    >
                      {article.logo}
                    </div>
                    <div className="absolute -top-4 -right-4 coin-float">
                      <GoldCoin size={40} animate />
                    </div>
                    <div className="absolute -bottom-3 -left-3 coin-float" style={{ animationDelay: '1s' }}>
                      <GoldCoin size={28} animate />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.filter(a => !a.featured).map((article, idx) => (
              <div
                key={article.title}
                className="bg-white rounded-3xl shadow-md border-2 border-[#DAA520]/10 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                onClick={() => setExpandedArticle(expandedArticle === idx ? null : idx)}
              >
                <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${article.color}, #DAA520)` }} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all"
                        style={{ backgroundColor: article.color }}
                      >
                        {article.logo}
                      </div>
                      <span className="text-[10px] font-bold tracking-wider text-[#7B0F14] bg-[#7B0F14]/5 px-2.5 py-1 rounded-full">{article.tag}</span>
                    </div>
                    <GoldCoin size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#DAA520] transition-colors">{article.title}</h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">{article.description}</p>

                  {expandedArticle === idx && (
                    <div className="mt-4 bg-[#DAA520]/5 rounded-xl p-3 slide-in-up border border-[#DAA520]/10">
                      <p className="text-[10px] font-bold text-[#DAA520] mb-2 tracking-wider">EARNING CRITERIA</p>
                      <ul className="space-y-1.5">
                        {article.criteria.map((c) => (
                          <li key={c} className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-4 h-4 rounded-full bg-[#DAA520]/15 flex items-center justify-center flex-shrink-0">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#DAA520]/10">
                    <p className="text-xs text-gray-400">{article.date}</p>
                    <button className="text-xs font-bold text-[#7B0F14] hover:text-[#DAA520] transition-colors flex items-center gap-1 group/btn">
                      {expandedArticle === idx ? 'Show Less' : 'Read More'}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        className={`transition-transform ${expandedArticle === idx ? 'rotate-90' : 'group-hover/btn:translate-x-1'}`}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROSPERITY SECTION ===== */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wine card */}
            <div className="bg-gradient-to-br from-[#7B0F14] to-[#4A0A0D] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DAA520]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <GoldCoin size={36} animate />
                </div>
                <h3 className="text-2xl font-black mb-3">A Message of Prosperity</h3>
                <p className="text-white/80 leading-relaxed">
                  "CashToken represents a new era of financial inclusion and prosperity for every citizen of the United Kingdom. Together, we build a stronger economy through rewarding everyday commerce."
                </p>
                <p className="text-[#DAA520] font-bold mt-5">— In the spirit of national prosperity</p>
              </div>
            </div>

            {/* Gold card */}
            <div className="bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-3">Economic Impact</h3>
                <p className="text-white/90 leading-relaxed">
                  "CashToken's universal reward system has the potential to significantly boost consumer spending and support local businesses across the United Kingdom, driving economic growth from the ground up."
                </p>
                <p className="text-white font-bold mt-5">— Supporting UK Economic Growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FUN SUBSCRIBE SECTION ===== */}
      <div className="relative overflow-hidden bg-white">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #DAA520 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Decorative blurs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#DAA520]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#7B0F14]/5 rounded-full blur-3xl" />

        {/* Animated sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#DAA520] sparkle-anim"
              style={{
                width: Math.random() * 8 + 3,
                height: Math.random() * 8 + 3,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: ['#DAA520', '#FFD700', '#7B0F14', '#FF6B6B', '#4ECDC4', '#45B7D1', '#E31837'][Math.floor(Math.random() * 7)],
                  animation: `confettiFall ${Math.random() * 2 + 2}s linear forwards`,
                  animationDelay: `${Math.random() * 1}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          {/* Floating coins */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="coin-float" style={{ animationDelay: '0s' }}>
              <GoldCoin size={44} animate />
            </div>
            <div className="coin-float" style={{ animationDelay: '0.5s' }}>
              <GoldCoin size={64} animate premium />
            </div>
            <div className="coin-float" style={{ animationDelay: '1s' }}>
              <GoldCoin size={44} animate />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Don't Miss Out on the
            <br />
            <span className="text-[#DAA520]">Revolution!</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join over <span className="text-[#DAA520] font-bold">2 million people</span> who are already earning rewards on every purchase. Get exclusive updates, early access, and insider tips.
          </p>

          {subscribed ? (
            <div className="slide-in-up">
              <div className="bg-white rounded-3xl p-8 max-w-md mx-auto border-2 border-[#DAA520]/30 shadow-xl">
                <div className="w-20 h-20 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-gray-900 font-black text-2xl mb-2">Welcome to the Family!</h3>
                <p className="text-gray-500 text-sm">You'll receive our next newsletter with all the latest updates, exclusive offers, and celebrity news.</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <GoldCoin size={20} animate />
                  <span className="text-[#DAA520] text-sm font-bold">+50 CashTokens bonus for subscribing!</span>
                  <GoldCoin size={20} animate />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DAA520]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full p-4 pl-12 rounded-2xl border-2 border-gray-200 focus:border-[#DAA520] focus:ring-0 outline-none text-sm bg-white shadow-lg placeholder:text-gray-400 text-gray-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#7B0F14] to-[#9B1B20] hover:from-[#DAA520] hover:to-[#B8860B] text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap text-base"
                >
                  Subscribe Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-xs">
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  <span>No Spam, Ever</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Unsubscribe Anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <GoldCoin size={14} />
                  <span className="text-[#DAA520] font-semibold">+50 Bonus CashTokens</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UK_NewsletterPage;