import React, { useState, useEffect, useRef } from 'react';

// V1/MVP tabs: Home | Business | About Us
// Removed: Customers (post-login only), Marketplace (deferred to V2)
export type HomeTab = 'home' | 'business' | 'team';

interface HomeTabBarProps {
  activeTab: HomeTab;
  onTabChange: (tab: HomeTab) => void;
}

const tabs: { key: HomeTab; label: string; icon: React.ReactNode; desc: string; color: string }[] = [
  {
    key: 'home',
    label: 'Home',
    desc: 'Welcome to CashToken',
    color: '#7B0F14',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: 'business',
    label: 'Business',
    desc: 'For Business Owners',
    color: '#DAA520',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  // Customers tab removed (post-login only, V2)
  // Marketplace tab removed (deferred to V2)
  {
    key: 'team',
    label: 'About Us',
    desc: 'Our Story & Team',
    color: '#5514B4',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];


const HomeTabBar: React.FC<HomeTabBarProps> = ({ activeTab, onTabChange }) => {
  const [hoveredTab, setHoveredTab] = useState<HomeTab | null>(null);
  const [mounted, setMounted] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl) {
      const parent = activeEl.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - parentRect.left,
          width: elRect.width,
        });
      }
    }
  }, [activeTab]);

  return (
    <>
      <style>{`
        @keyframes tabSlideIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tabGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(123, 15, 20, 0); }
          50% { box-shadow: 0 0 20px 4px rgba(123, 15, 20, 0.15); }
        }
        @keyframes tabIconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes tabPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideIndicator {
          0% { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        .tab-enter {
          animation: tabSlideIn 0.5s ease-out forwards;
          opacity: 0;
        }
        .tab-active-glow {
          animation: tabGlow 2s ease-in-out infinite;
        }
        .tab-icon-bounce {
          animation: tabIconBounce 0.6s ease-in-out;
        }
      `}</style>

      <div className="relative">
        {/* Background gradient bar */}
        <div className="bg-gradient-to-r from-[#F9F0F0] via-white to-[#FFF8E7] border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <div className="relative flex items-center justify-center gap-1 py-3">
                {/* Sliding active indicator (bottom line) */}
                <div
                  className="absolute bottom-0 h-[3px] rounded-full bg-gradient-to-r from-[#7B0F14] to-[#DAA520] transition-all duration-500 ease-out"
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`,
                  }}
                />

                {tabs.map((tab, i) => {
                  const isActive = activeTab === tab.key;
                  const isHovered = hoveredTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      ref={(el) => { tabRefs.current[tab.key] = el; }}
                      onClick={() => onTabChange(tab.key)}
                      onMouseEnter={() => setHoveredTab(tab.key)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`tab-enter relative flex items-center gap-3 px-5 xl:px-7 py-3.5 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? 'bg-white shadow-lg tab-active-glow'
                          : isHovered
                          ? 'bg-white/70 shadow-md'
                          : 'hover:bg-white/50'
                      }`}
                      style={{
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 transition-all duration-300 ${
                          isActive ? 'tab-icon-bounce' : ''
                        } ${isHovered && !isActive ? 'scale-110' : ''}`}
                        style={{ color: isActive ? tab.color : isHovered ? tab.color : '#9CA3AF' }}
                      >
                        {tab.icon}
                      </div>

                      {/* Label + description */}
                      <div className="text-left">
                        <p
                          className={`text-sm font-bold transition-colors duration-300 ${
                            isActive ? 'text-gray-900' : isHovered ? 'text-gray-800' : 'text-gray-600'
                          }`}
                        >
                          {tab.label}
                        </p>
                        <p
                          className={`text-[10px] transition-all duration-300 ${
                            isActive || isHovered ? 'opacity-100 max-h-4' : 'opacity-0 max-h-0'
                          } overflow-hidden`}
                          style={{ color: isActive ? tab.color : '#9CA3AF' }}
                        >
                          {tab.desc}
                        </p>
                      </div>

                      {/* Active dot indicator */}
                      {isActive && (
                        <div
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: tab.color,
                            boxShadow: `0 0 8px ${tab.color}40`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Tabs - Scrollable */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4">
                {tabs.map((tab, i) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => onTabChange(tab.key)}
                      className={`tab-enter flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-[#7B0F14] text-white shadow-lg shadow-[#7B0F14]/25'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? 'white' : tab.color }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {tab.key === 'home' && <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>}
                          {tab.key === 'business' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>}
                          {tab.key === 'team' && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}

                        </svg>
                      </div>
                      <span className="text-xs font-bold whitespace-nowrap">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTabBar;
