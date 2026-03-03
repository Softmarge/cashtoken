import React from 'react';
import GoldCoin from './GoldCoin';

const NewsletterPage: React.FC = () => {
  const articles = [
    {
      title: 'Barclays Bank launches CashToken Rewards',
      date: 'February 8, 2026',
      description: 'Barclays Bank has officially partnered with CashToken to bring universal rewards to millions of UK customers.',
      criteria: ['Spend £200 monthly', '3 mobile transactions', 'Maintain active account'],
      color: '#00AEEF',
      logo: 'BARCLAYS',
      featured: true,
    },
    {
      title: 'Enish Restaurant joins CashToken',
      date: 'February 5, 2026',
      description: 'Popular Nigerian restaurant chain Enish now offers CashToken rewards for loyal diners across London.',
      criteria: ['Spend £50 twice monthly', 'Dine-in or delivery', 'Register CashToken account'],
      color: '#8B4513',
      logo: 'ENISH',
      featured: false,
    },
    {
      title: 'Lebara launches CashToken Rewards',
      date: 'February 1, 2026',
      description: 'Mobile network Lebara brings CashToken rewards to their prepaid and contract customers.',
      criteria: ['Recharge £20+', 'Monthly active SIM', 'UK registered number'],
      color: '#E31837',
      logo: 'LEBARA',
      featured: false,
    },
    {
      title: 'ASDA Supermarket doubles CashToken earnings',
      date: 'January 28, 2026',
      description: 'ASDA shoppers can now earn double CashTokens on all grocery purchases above £50.',
      criteria: ['Spend £50+ per shop', 'Use ASDA app', 'Link CashToken wallet'],
      color: '#78BE20',
      logo: 'ASDA',
      featured: false,
    },
    {
      title: 'Nando\'s joins the CashToken family',
      date: 'January 22, 2026',
      description: 'Nando\'s customers can now earn CashTokens on every visit, with bonus rewards on weekends.',
      criteria: ['Spend £15+ per visit', 'Register loyalty card', 'Weekend bonus available'],
      color: '#E31837',
      logo: 'NANDO\'S',
      featured: false,
    },
    {
      title: 'TfL partners with CashToken for commuter rewards',
      date: 'January 15, 2026',
      description: 'Transport for London riders can now earn CashTokens on their daily commute using Oyster or contactless.',
      criteria: ['£50+ monthly travel spend', 'Registered Oyster card', 'Link to CashToken'],
      color: '#003DA5',
      logo: 'TfL',
      featured: false,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter</h1>
        <p className="text-gray-500 mb-8">Latest news and brand partnerships</p>

        {/* Featured Article */}
        {articles.filter(a => a.featured).map((article) => (
          <div key={article.title} className="rounded-3xl overflow-hidden shadow-lg mb-8" style={{ background: `linear-gradient(135deg, ${article.color}20 0%, white 100%)` }}>
            <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#7B0F14] bg-[#F4E6E6] px-3 py-1 rounded-full">FEATURED</span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-4">{article.title}</h2>
                <p className="text-gray-600 mt-3">{article.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Criteria:</p>
                  <ul className="space-y-1">
                    {article.criteria.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-400 mt-4">{article.date}</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-40 h-40 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl" style={{ backgroundColor: article.color }}>
                  {article.logo}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.filter(a => !a.featured).map((article) => (
            <div key={article.title} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-3" style={{ backgroundColor: article.color }} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: article.color }}>
                    {article.logo}
                  </div>
                  <GoldCoin size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{article.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{article.description}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">CRITERIA</p>
                  <ul className="space-y-1">
                    {article.criteria.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-xs text-gray-600">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-400 mt-4">{article.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prosperity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#7B0F14] to-[#4A0A0D] rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <GoldCoin size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">A Message of Prosperity</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              "CashToken represents a new era of financial inclusion and prosperity for every citizen of the United Kingdom. Together, we build a stronger economy through rewarding everyday commerce."
            </p>
            <p className="text-[#DAA520] font-semibold mt-4 text-sm">— In the spirit of national prosperity</p>
          </div>

          <div className="bg-gradient-to-br from-[#DAA520] to-[#B8860B] rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Economic Impact</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              "CashToken's universal reward system has the potential to significantly boost consumer spending and support local businesses across the United Kingdom, driving economic growth from the ground up."
            </p>
            <p className="text-white font-semibold mt-4 text-sm">— Supporting UK Economic Growth</p>
          </div>
        </div>

        {/* Subscribe */}
        <div className="bg-[#F4E6E6] rounded-3xl p-8 text-center">
          <GoldCoin size={48} className="mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900">Stay Updated</h3>
          <p className="text-gray-600 mt-2 mb-6">Subscribe to receive the latest CashToken news and brand partnerships.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-2xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm"
            />
            <button className="bg-[#7B0F14] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#5A0B10] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPage;
