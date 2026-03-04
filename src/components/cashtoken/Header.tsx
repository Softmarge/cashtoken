import React, { useState, useRef, useEffect } from 'react';
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

const NigeriaFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <img src="/logos/nigeria_flag.webp" alt="Nigeria" style={{ width: w, height: h, objectFit: 'cover' }} className="rounded-sm shadow-sm flex-shrink-0" />
);

const UKFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm flex-shrink-0">
    <rect width="60" height="40" fill="#00247D"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#CF142B" strokeWidth="4"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V40 M0,20 H60" stroke="#CF142B" strokeWidth="6"/>
  </svg>
);

const SouthAfricaFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm flex-shrink-0">
    <rect width="60" height="40" fill="#007A4D"/>
    <rect y="0"    width="60" height="13.3" fill="#007A4D"/>
    <rect y="13.3" width="60" height="13.4" fill="#fff"/>
    <rect y="15"   width="60" height="10"   fill="#DE3831"/>
    <rect y="26.7" width="60" height="13.3" fill="#007A4D"/>
    <polygon points="0,0 28,20 0,40" fill="#FFB612"/>
    <polygon points="0,2 24,20 0,38" fill="#000"/>
    <polygon points="0,7 18,20 0,33" fill="#FFB612"/>
  </svg>
);

const LiberiaFlag = ({ w = 28, h = 20 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shadow-sm flex-shrink-0">
    <rect width="60" height="40" fill="#BF0A30"/>
    {[1,3,5,7,9].map(i => <rect key={i} y={i * 4} width="60" height="4" fill="#fff"/>)}
    <rect width="22" height="20" fill="#00369F"/>
    <polygon points="11,2 13,8 19,8 14,12 16,18 11,14 6,18 8,12 3,8 9,8" fill="#fff"/>
  </svg>
);

const COUNTRIES = [
  { name: 'Nigeria',        code: 'NG', Flag: NigeriaFlag },
  { name: 'United Kingdom', code: 'UK', Flag: UKFlag },
  { name: 'South Africa',   code: 'ZA', Flag: SouthAfricaFlag },
  { name: 'Liberia',        code: 'LR', Flag: LiberiaFlag },
];

// Shared dropdown list
const CountryDropdown: React.FC<{
  selected: typeof COUNTRIES[0];
  onSelect: (c: typeof COUNTRIES[0]) => void;
}> = ({ selected, onSelect }) => (
  <div
    className="absolute top-full right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
    style={{ zIndex: 9999 }}
  >
    <div className="px-4 pt-4 pb-3">
      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">Select Country</p>
      <div className="space-y-0.5">
        {COUNTRIES.map((country) => {
          const isSelected = country.code === selected.code;
          const { Flag } = country;
          return (
            <button
              key={country.code}
              onClick={() => onSelect(country)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                isSelected ? 'bg-[#FAF0EE]' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flag w={28} h={19} />
                <span className={`text-sm font-medium ${isSelected ? 'text-[#7B0F14]' : 'text-gray-700'}`}>
                  {country.name}
                </span>
              </div>
              {isSelected && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [countryOpen, setCountryOpen]         = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = [
   
    { label: 'Business',   page: 'merchant' },
    { label: 'Newsletter', page: 'newsletter' },
    { label: 'About Us',   page: 'team' },
  ];

  const handleNav = (page: string) => { onNavigate(page); setMobileOpen(false); };
  const handleSelect = (c: typeof COUNTRIES[0]) => { setSelectedCountry(c); setCountryOpen(false); };
  const { Flag: SelectedFlag } = selectedCountry;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Single wrapper ref so outside-click works for both desktop + mobile trigger */}
      <div ref={wrapperRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus:outline-none">
              <GoldCoin size={42} />
              <div className="flex flex-col leading-tight">
                <span className="text-sm lg:text-base font-bold tracking-wider text-[#7B0F14]">CASHTOKEN</span>
                <span className="text-[9px] lg:text-[11px] font-semibold tracking-[0.15em] text-[#B8860B]">REWARDS AFRICA</span>
              </div>
            </button>

            {/* Desktop nav */}
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

              {/* Country trigger — desktop */}
              <div className="relative ml-3">
                <button
                  onClick={() => setCountryOpen(v => !v)}
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <SelectedFlag w={28} h={19} />
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: countryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {countryOpen && <CountryDropdown selected={selectedCountry} onSelect={handleSelect} />}
              </div>
            </nav>

            {/* Mobile right */}
            <div className="flex items-center gap-3 lg:hidden">
              {/* Country trigger — mobile */}
              <div className="relative">
                <button
                  onClick={() => setCountryOpen(v => !v)}
                  className="flex items-center gap-1 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  <SelectedFlag w={22} h={15} />
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round"
                    style={{ transform: countryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {countryOpen && <CountryDropdown selected={selectedCountry} onSelect={handleSelect} />}
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

        {/* Mobile menu */}
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
                <SelectedFlag w={24} h={16} />
                <span className="text-sm text-gray-600">{selectedCountry.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;