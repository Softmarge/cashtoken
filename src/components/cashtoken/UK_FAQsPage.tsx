import React, { useState, useEffect, useRef } from 'react';
import GoldCoin from './GoldCoin';

// Scroll-triggered visibility hook
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1 && rect.bottom > -50) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { threshold: Math.min(threshold, 0.05), rootMargin: '80px 0px 80px 0px' }
    );
    observer.observe(el);
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) { setIsVisible(true); window.removeEventListener('scroll', onScroll); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const fallback = setTimeout(() => setIsVisible(true), 4000);
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); clearTimeout(fallback); };
  }, [threshold]);
  return { ref, isVisible };
}

const UK_FAQsPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const heroSection = useInView(0.1);
  const faqSection0 = useInView(0.08);
  const faqSection1 = useInView(0.08);
  const faqSection2 = useInView(0.08);
  const faqSection3 = useInView(0.08);
  const contactSection = useInView(0.1);

  const faqSections = [faqSection0, faqSection1, faqSection2, faqSection3];

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="bg-white min-h-screen overflow-hidden">
      {/* Hero */}
      <div className="bg-[#F4E6E6] py-12 lg:py-16 relative overflow-hidden" ref={heroSection.ref}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#7B0F14]/[0.04] -translate-y-1/3 translate-x-1/4 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#DAA520]/[0.06] translate-y-1/3 -translate-x-1/4 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'scale(1) rotate(0deg)' : 'scale(0.3) rotate(-15deg)',
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <GoldCoin size={48} className="mx-auto mb-4" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            <span
              className="inline-block"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateX(0)' : 'translateX(-100px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
              }}
            >
              Frequently
            </span>{' '}
            <span
              className="inline-block"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateX(0)' : 'translateX(100px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s',
              }}
            >
              Asked
            </span>{' '}
            <span
              className="inline-block text-[#7B0F14]"
              style={{
                opacity: heroLoaded ? 1 : 0,
                transform: heroLoaded ? 'translateX(0) scale(1)' : 'translateX(-80px) scale(0.8)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
              }}
            >
              Questions
            </span>
          </h1>

          <p
            className="text-gray-600 mt-3 max-w-xl mx-auto"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.65s',
            }}
          >
            Everything you need to know about CashToken Reward. Can't find what you're looking for? Contact our support team.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {faqs.map((section, sectionIdx) => {
          const sectionAnim = faqSections[sectionIdx];
          return (
            <div key={section.category} className="mb-8" ref={sectionAnim?.ref}>
              {/* Category heading - alternating left/right */}
              <h2
                className="text-lg font-bold text-[#7B0F14] mb-4 flex items-center gap-2"
                style={{
                  opacity: sectionAnim?.isVisible ? 1 : 0,
                  transform: sectionAnim?.isVisible
                    ? 'translateX(0)'
                    : sectionIdx % 2 === 0 ? 'translateX(-80px)' : 'translateX(80px)',
                  transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s`,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full bg-[#DAA520]"
                  style={{
                    opacity: sectionAnim?.isVisible ? 1 : 0,
                    transform: sectionAnim?.isVisible ? 'scale(1)' : 'scale(0)',
                    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
                  }}
                />
                {section.category}
              </h2>

              <div className="space-y-3">
                {section.questions.map((faq, qIdx) => {
                  const idx = globalIndex++;
                  const isOpen = openIndex === idx;
                  // Alternate each FAQ item from left/right
                  const fromLeft = qIdx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                      style={{
                        opacity: sectionAnim?.isVisible ? 1 : 0,
                        transform: sectionAnim?.isVisible
                          ? 'translateX(0) scale(1)'
                          : fromLeft ? 'translateX(-60px) scale(0.97)' : 'translateX(60px) scale(0.97)',
                        transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.15 + qIdx * 0.12}s`,
                      }}
                    >
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
                      <div
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{
                          maxHeight: isOpen ? '300px' : '0px',
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <div className="px-5 pb-5">
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Contact */}
        <div className="mt-12" ref={contactSection.ref}>
          <div
            className="bg-gradient-to-br from-[#7B0F14] to-[#4A0A0D] rounded-3xl p-8 text-center text-white relative overflow-hidden"
            style={{
              opacity: contactSection.isVisible ? 1 : 0,
              transform: contactSection.isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
              transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s',
            }}
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#DAA520]/10 translate-y-1/3 -translate-x-1/4" />

            <h3 className="text-xl font-bold mb-2 relative z-10">
              <span
                className="inline-block"
                style={{
                  opacity: contactSection.isVisible ? 1 : 0,
                  transform: contactSection.isVisible ? 'translateX(0)' : 'translateX(-60px)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                }}
              >
                Still have
              </span>{' '}
              <span
                className="inline-block text-[#DAA520]"
                style={{
                  opacity: contactSection.isVisible ? 1 : 0,
                  transform: contactSection.isVisible ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.8)',
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.45s',
                }}
              >
                questions?
              </span>
            </h3>
            <p
              className="text-white/70 mb-6 relative z-10"
              style={{
                opacity: contactSection.isVisible ? 1 : 0,
                transform: contactSection.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.55s',
              }}
            >
              Our support team is here to help you 24/7.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center relative z-10"
              style={{
                opacity: contactSection.isVisible ? 1 : 0,
                transform: contactSection.isVisible ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.95)',
                transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s',
              }}
            >
              <button className="bg-white text-[#7B0F14] px-6 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-colors hover:-translate-y-0.5 hover:shadow-lg duration-300">
                Contact Support
              </button>
              <button className="bg-[#DAA520] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#B8860B] transition-colors hover:-translate-y-0.5 hover:shadow-lg duration-300">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UK_FAQsPage;