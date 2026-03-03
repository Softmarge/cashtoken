import React, { useState } from 'react';
import GoldCoin from './GoldCoin';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  email: string;
}

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserProfile | null;
  onSignInClick: () => void;
  onSignOut: () => void;
}

// V1/MVP Header: Single nav bar with Business | Newsletter | About Us | Country Selector
// Removed: Customers (post-login only), Marketplace (deferred V2), Sign In button (deferred V2)
const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Business', page: 'merchant' },
    { label: 'Newsletter', page: 'newsletter' },
    { label: 'About Us', page: 'team' },
  ];

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const UKFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
    <svg width={w} height={h} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm">
      <rect width="60" height="40" fill="#00247D"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#CF142B" strokeWidth="4"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V40 M0,20 H60" stroke="#CF142B" strokeWidth="6"/>
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus:outline-none">
            <GoldCoin size={42} />
            <div className="flex flex-col leading-tight">
              <span className="text-sm lg:text-base font-bold tracking-wider text-[#7B0F14]">CASHTOKEN</span>
              <span className="text-[9px] lg:text-[11px] font-semibold tracking-[0.15em] text-[#B8860B]">REWARD INTERNATIONAL</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page ? 'bg-[#7B0F14] text-white' : 'text-gray-700 hover:bg-[#F4E6E6] hover:text-[#7B0F14]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-3 flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" title="Country Selector">
              <UKFlag w={28} h={20} />
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80" title="Country Selector">
              <UKFlag w={22} h={15} />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.page ? 'bg-[#7B0F14] text-white' : 'text-gray-700 hover:bg-[#F4E6E6]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-100 mt-2">
              <UKFlag w={24} h={16} />
              <span className="text-sm text-gray-600">United Kingdom</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
