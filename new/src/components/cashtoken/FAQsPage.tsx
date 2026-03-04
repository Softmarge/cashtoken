import React, { useState } from 'react';
import GoldCoin from './GoldCoin';

const FAQsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is CashToken Reward?',
          a: 'CashToken Reward is the UK\'s first universal reward wallet. You earn CashTokens by shopping at partner brands, which can be converted to cashback or entered into weekly draws worth up to £1,000,000.',
        },
        {
          q: 'How do I sign up?',
          a: 'Simply download the CashToken app or register on our website. Create your free account with your email and start earning rewards immediately from 500+ UK partner brands.',
        },
        {
          q: 'Is CashToken available across the UK?',
          a: 'Yes! CashToken is available nationwide across England, Scotland, Wales, and Northern Ireland. Our network of partner brands covers the entire United Kingdom.',
        },
      ],
    },
    {
      category: 'Earning Rewards',
      questions: [
        {
          q: 'How do I earn CashTokens?',
          a: 'You earn CashTokens automatically when you shop at any of our 500+ partner brands. Simply make a purchase of £50 or more and CashTokens are credited to your Universal Reward Wallet.',
        },
        {
          q: 'What is the weekly draw?',
          a: 'Every CashToken you earn automatically enters you into our weekly draw with prizes ranging from £100 to £1,000,000. The more you shop, the more entries you get!',
        },
        {
          q: 'Can I earn from multiple brands?',
          a: 'Absolutely! There\'s no limit to how many brands you can earn from. Shop across Lifestyle, Fashion, Foodie, and Groceries categories to maximise your CashToken earnings.',

        },
      ],
    },
    {
      category: 'Withdrawals',
      questions: [
        {
          q: 'How do I withdraw my rewards?',
          a: 'Go to your Consumer Dashboard, click "Withdraw", enter the amount, select your bank (HSBC, Barclays, Revolut, Tranzfa, or Volume), enter your account details and PIN to confirm.',
        },
        {
          q: 'How long do withdrawals take?',
          a: 'Most withdrawals are processed instantly. Bank transfers may take 1-2 business days depending on your bank. Revolut and Tranzfa transfers are typically instant.',
        },
        {
          q: 'Is there a minimum withdrawal amount?',
          a: 'The minimum withdrawal amount is £5.00. There is no maximum limit — withdraw as much as your balance allows!',
        },
      ],
    },
    {
      category: 'For Merchants',
      questions: [
        {
          q: 'How can my business join CashToken?',
          a: 'Visit our Merchant Dashboard and create an account. You can set up reward campaigns, define business rules, and start gifting CashTokens to your customers immediately.',
        },
        {
          q: 'What is the Success Metrics Engine?',
          a: 'Our proprietary analytics tool tracks your campaign performance in real-time. It monitors customer acquisition, transaction increases, and automatically alerts you when campaigns need attention.',
        },
        {
          q: 'Can I customise reward rules?',
          a: 'Yes! You can create custom business rules like "Complete 5 transactions → 1 CashToken" or "Create account → 1 CashToken". Add as many rules as you need for your campaign.',
        },
      ],
    },
  ];

  let globalIndex = 0;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-[#F4E6E6] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GoldCoin size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Everything you need to know about CashToken Reward. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {faqs.map((section) => (
          <div key={section.category} className="mb-8">
            <h2 className="text-lg font-bold text-[#7B0F14] mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#DAA520]" />
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((faq) => {
                const idx = globalIndex++;
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7B0F14"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div className="mt-12 bg-gradient-to-br from-[#7B0F14] to-[#4A0A0D] rounded-3xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-white/70 mb-6">Our support team is here to help you 24/7.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-[#7B0F14] px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
            <button className="bg-[#DAA520] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#B8860B] transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
