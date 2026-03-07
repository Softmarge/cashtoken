import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Header from './cashtoken/Header';
import Footer from './cashtoken/Footer';
import HomePage from './cashtoken/HomePage';
import GlobalPage from './cashtoken/GlobalPage';
import BrandsPage from './cashtoken/BrandsPage';
import BrandDetails from './cashtoken/BrandDetails';
import AirtimeDetails from './cashtoken/AirtimeDetails';
import ConsumerDashboard from './cashtoken/ConsumerDashboard';
import BusinessSignup from './cashtoken/BusinessSignup';
import BusinessDashboard from './cashtoken/BusinessDashboard';
import BusinessLanding from './cashtoken/BusinessLanding';
import BusinessAPIPage from './cashtoken/BusinessAPIPage';
import NewsletterPage from './cashtoken/NewsletterPage';
import OurTeam from './cashtoken/OurTeam';
import FAQsPage from './cashtoken/FAQsPage';
import Comingsoon from './cashtoken/Comingsoon';
import GlobalAboutUs from './cashtoken/GlobalAboutUs';
import AuthModal from './cashtoken/AuthModal';

type HomeTab = 'home' | 'business' | 'team';

interface UserProfile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  email: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  description: string;
  brand: string | null;
  created_at: string;
}

const AppLayout: React.FC = () => {
  // Global page is the index — default page is 'global'
  const [currentPage, setCurrentPage] = useState('global');
  const [walletBalance, setWalletBalance] = useState(1247.50);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [selectedAirtimeProvider, setSelectedAirtimeProvider] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [businessRegistered, setBusinessRegistered] = useState(false);
  const [businessView, setBusinessView] = useState<'landing' | 'signup' | 'api' | 'dashboard'>('landing');
  const [profileForm, setProfileForm] = useState({ full_name: '', saving: false, saved: false });
  const [homeTab, setHomeTab] = useState<HomeTab>('home');

  // ─── Auth listener ───
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserData(session.user.id, session.user.email || '');
      } else {
        setUser(null);
        setWalletBalance(1247.50);
        setTransactions([]);
      }
      setAuthLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserData(session.user.id, session.user.email || '');
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (userId: string, email: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        setUser({
          id: userId,
          full_name: profile.full_name || '',
          avatar_url: profile.avatar_url,
          email,
        });
        setProfileForm((prev) => ({ ...prev, full_name: profile.full_name || '' }));
      }

      const { data: wallet } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', userId)
        .single();

      if (wallet) setWalletBalance(Number(wallet.balance));

      await loadTransactions(userId);
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const loadTransactions = async (userId?: string) => {
    const uid = userId || user?.id;
    if (!uid) return;
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) setTransactions(data as Transaction[]);
  };

  const handleUpdateBalance = useCallback(async (amount: number, description: string = '', type: string = 'deposit', brand: string | null = null) => {
    const newBalance = Math.max(0, walletBalance + amount);
    setWalletBalance(newBalance);

    if (user) {
      await supabase
        .from('wallets')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);

      const txType = amount < 0 ? (type === 'gift_card' ? 'gift_card' : 'withdrawal') : type;
      await supabase.from('transactions').insert({
        user_id: user.id,
        type: txType,
        amount: Math.abs(amount),
        description: description || (amount < 0 ? 'Wallet debit' : 'Wallet credit'),
        brand,
      });

      await loadTransactions();
    }
  }, [walletBalance, user]);

  const handleSimpleBalanceUpdate = useCallback((amount: number) => {
    handleUpdateBalance(amount, amount < 0 ? 'Withdrawal' : 'Deposit', amount < 0 ? 'withdrawal' : 'deposit');
  }, [handleUpdateBalance]);

  const handleNavigate = (page: string) => {
    const tabMapping: Record<string, HomeTab> = {
      'merchant': 'business',
      'team': 'team',
    };

    if (tabMapping[page]) {
      setCurrentPage('home');
      setHomeTab(tabMapping[page]);
      setSelectedBrand(null);
      setSelectedAirtimeProvider(null);
      if (page === 'merchant') setBusinessView('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page);
    setSelectedBrand(null);
    setSelectedAirtimeProvider(null);
    if (page === 'home') setHomeTab('home');
    if (page === 'merchant') setBusinessView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeTabChange = (tab: HomeTab) => {
    setHomeTab(tab);
    setBusinessView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrand = (brand: any) => {
    setSelectedBrand(brand);
    setCurrentPage('brandDetails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAirtime = (provider: any) => {
    setSelectedAirtimeProvider(provider);
    setCurrentPage('airtimeDetails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {};

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setWalletBalance(1247.50);
    setTransactions([]);
    setCurrentPage('global');
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setProfileForm((prev) => ({ ...prev, saving: true, saved: false }));
    await supabase
      .from('profiles')
      .update({ full_name: profileForm.full_name, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    setUser((prev) => prev ? { ...prev, full_name: profileForm.full_name } : null);
    setProfileForm((prev) => ({ ...prev, saving: false, saved: true }));
    setTimeout(() => setProfileForm((prev) => ({ ...prev, saved: false })), 3000);
  };

  const handleBrandPayment = useCallback((amount: number, brandName?: string) => {
    handleUpdateBalance(amount, `Gift card purchase - ${brandName || 'Brand'}`, 'gift_card', brandName || null);
  }, [handleUpdateBalance]);

  const handleAirtimePayment = useCallback((amount: number, providerName?: string) => {
    handleUpdateBalance(amount, `Airtime top-up - ${providerName || 'Provider'}`, 'withdrawal', providerName || null);
  }, [handleUpdateBalance]);

  const BackButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <button onClick={onClick} className="flex items-center gap-2 text-gray-600 hover:text-[#7B0F14] transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="text-sm font-medium">{label}</span>
      </button>
    </div>
  );

  // ─── Determine if we show the shared Header/Footer ───
  // GlobalPage has its own nav bar built in, so skip shared Header for it
  const isGlobalPage = currentPage === 'global';
  const isNigeriaOrInner = currentPage !== 'global';

  const renderPage = () => {
    switch (currentPage) {
      case 'global':
        return <GlobalPage currentPage="global" onNavigate={handleNavigate} />;

      case 'comingsoon':
        return <ComingSoon onNavigate={handleNavigate} />;

      case 'globalaboutus':
        return <GlobalAboutUs onNavigate={handleNavigate} />;

      case 'nigeria':
        return (
          <div style={{ animation: 'fadeIn 0.35s ease-out' }}>
            <HomePage onNavigate={handleNavigate} walletBalance={walletBalance} />
          </div>
        );

      case 'home':
        return (
          <div key={homeTab} style={{ animation: 'fadeIn 0.35s ease-out' }}>
            {homeTab === 'business' && (
              <>
                {businessRegistered ? (
                  <BusinessDashboard />
                ) : businessView === 'signup' ? (
                  <>
                    <BackButton label="Back" onClick={() => { setBusinessView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                    <BusinessSignup
                      onSignupComplete={() => {
                        setBusinessRegistered(true);
                        setBusinessView('dashboard');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onSignIn={() => setAuthModalOpen(true)}
                    />
                  </>
                ) : businessView === 'api' ? (
                  <BusinessAPIPage onBack={() => { setBusinessView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                ) : (
                  <BusinessLanding
                    onGetStarted={() => { setBusinessView('signup'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    onChooseAPI={() => { setBusinessView('api'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  />
                )}
              </>
            )}
            {homeTab === 'customers' && (
              <ConsumerDashboard walletBalance={walletBalance} onUpdateBalance={handleSimpleBalanceUpdate} userName={user?.full_name} />
            )}
            {homeTab === 'home' && (
              <HomePage onNavigate={handleNavigate} walletBalance={walletBalance} />
            )}
            {homeTab === 'marketplace' && (
              <BrandsPage onSelectBrand={handleSelectBrand} onSelectAirtime={handleSelectAirtime} />
            )}
            {homeTab === 'team' && <OurTeam />}
          </div>
        );

      case 'brands':
        return <BrandsPage onSelectBrand={handleSelectBrand} onSelectAirtime={handleSelectAirtime} onBack={() => handleNavigate('home')} />;

      case 'brandDetails':
        return selectedBrand ? (
          <BrandDetails
            brand={selectedBrand}
            walletBalance={walletBalance}
            onUpdateBalance={(amt: number) => handleBrandPayment(amt, selectedBrand?.name)}
            onBack={() => handleNavigate('brands')}
            userName={user?.full_name}
          />
        ) : (
          <BrandsPage onSelectBrand={handleSelectBrand} onSelectAirtime={handleSelectAirtime} onBack={() => handleNavigate('home')} />
        );

      case 'airtimeDetails':
        return selectedAirtimeProvider ? (
          <AirtimeDetails
            provider={selectedAirtimeProvider}
            walletBalance={walletBalance}
            onUpdateBalance={(amt: number) => handleAirtimePayment(amt, selectedAirtimeProvider?.name)}
            onBack={() => handleNavigate('brands')}
            userName={user?.full_name}
          />
        ) : (
          <BrandsPage onSelectBrand={handleSelectBrand} onSelectAirtime={handleSelectAirtime} onBack={() => handleNavigate('home')} />
        );

      case 'consumer':
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            <ConsumerDashboard walletBalance={walletBalance} onUpdateBalance={handleSimpleBalanceUpdate} userName={user?.full_name} />
          </>
        );

      case 'merchant':
        if (businessRegistered) {
          return (
            <>
              <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
              <BusinessDashboard />
            </>
          );
        }
        if (businessView === 'signup') {
          return (
            <>
              <BackButton label="Back" onClick={() => { setBusinessView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
              <BusinessSignup
                onSignupComplete={() => { setBusinessRegistered(true); setBusinessView('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onSignIn={() => setAuthModalOpen(true)}
              />
            </>
          );
        }
        if (businessView === 'api') {
          return <BusinessAPIPage onBack={() => { setBusinessView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />;
        }
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            <BusinessLanding
              onGetStarted={() => { setBusinessView('signup'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              onChooseAPI={() => { setBusinessView('api'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            />
          </>
        );

      case 'newsletter':
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            <NewsletterPage />
          </>
        );

      case 'team':
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            <OurTeam />
          </>
        );

      case 'faqs':
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            <FAQsPage />
          </>
        );

      case 'profile':
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            {renderProfilePage()}
          </>
        );

      case 'transactions':
        return (
          <>
            <BackButton label="Back to Home" onClick={() => handleNavigate('home')} />
            {renderTransactionsPage()}
          </>
        );

      default:
        return <GlobalPage currentPage="global" onNavigate={handleNavigate} />;
    }
  };

  const getHeaderActivePage = () => {
    if (currentPage !== 'home') return currentPage;
    const tabToPage: Record<HomeTab, string> = { 'home': 'home', 'business': 'merchant', 'team': 'team' };
    return tabToPage[homeTab] || 'home';
  };

  // ─── Profile Settings Page ───
  const renderProfilePage = () => {
    if (!user) {
      return (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="1.5" strokeLinecap="round" className="mx-auto mb-4 opacity-40">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to view your profile</h2>
          <p className="text-gray-500 mb-6">Create an account or sign in to access your profile settings.</p>
          <button onClick={() => setAuthModalOpen(true)} className="bg-[#7B0F14] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors">Sign In</button>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex items-center gap-5 border-b border-gray-100" style={{ background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)' }}>
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold border-4 border-[#DAA520]">
                {user.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
              </div>
              <div>
                <p className="text-white font-bold text-lg">{user.full_name}</p>
                <p className="text-white/60 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" value={profileForm.full_name} onChange={(e) => setProfileForm((prev) => ({ ...prev, full_name: e.target.value }))} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={user.email} disabled className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed" />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Wallet Balance</label>
                <div className="p-3 rounded-xl bg-[#F4E6E6] border border-[#F4E6E6]">
                  <span className="text-lg font-bold text-[#7B0F14]">£{walletBalance.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button onClick={handleSaveProfile} disabled={profileForm.saving} className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${profileForm.saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg'}`}>
                  {profileForm.saving ? 'Saving...' : 'Save Changes'}
                </button>
                {profileForm.saved && (
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                    Saved!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Transaction History Page ───
  const renderTransactionsPage = () => {
    if (!user) {
      return (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="1.5" strokeLinecap="round" className="mx-auto mb-4 opacity-40">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to view transactions</h2>
          <p className="text-gray-500 mb-6">Your transaction history is saved securely in your account.</p>
          <button onClick={() => setAuthModalOpen(true)} className="bg-[#7B0F14] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5A0B10] transition-colors">Sign In</button>
        </div>
      );
    }

    const getTypeLabel = (type: string) => {
      switch (type) {
        case 'gift_card': return 'Gift Card';
        case 'withdrawal': return 'Withdrawal';
        case 'reward': return 'Reward';
        case 'deposit': return 'Deposit';
        default: return type;
      }
    };
    const getTypeColor = (type: string) => {
      switch (type) {
        case 'gift_card': return { text: '#7B0F14', bgLight: '#F4E6E6' };
        case 'withdrawal': return { text: '#E31837', bgLight: '#FEE2E2' };
        case 'reward': return { text: '#22C55E', bgLight: '#DCFCE7' };
        case 'deposit': return { text: '#DAA520', bgLight: '#FEF9C3' };
        default: return { text: '#6B7280', bgLight: '#F3F4F6' };
      }
    };

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-500 text-sm">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="bg-[#F4E6E6] rounded-2xl px-5 py-3 text-center">
              <p className="text-xs text-gray-500">Balance</p>
              <p className="text-xl font-bold text-[#7B0F14]">£{walletBalance.toFixed(2)}</p>
            </div>
          </div>
          {transactions.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
              <p className="text-gray-500">No transactions yet. Start shopping to earn CashTokens!</p>
              <button onClick={() => handleNavigate('brands')} className="mt-4 bg-[#7B0F14] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5A0B10] transition-colors">Browse Brands</button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-50">
                {transactions.map((tx) => {
                  const colors = getTypeColor(tx.type);
                  const isDebit = tx.type === 'gift_card' || tx.type === 'withdrawal';
                  return (
                    <div key={tx.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.bgLight }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round">
                          {tx.type === 'gift_card' && <><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /></>}
                          {tx.type === 'withdrawal' && <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></>}
                          {tx.type === 'reward' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>}
                          {tx.type === 'deposit' && <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>}
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{tx.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.bgLight, color: colors.text }}>{getTypeLabel(tx.type)}</span>
                          {tx.brand && <span className="text-xs text-gray-400">{tx.brand}</span>}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`font-bold text-sm ${isDebit ? 'text-red-600' : 'text-green-600'}`}>
                          {isDebit ? '-' : '+'}£{tx.amount.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {new Date(tx.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Global page has its own nav — skip shared Header for it */}
      {(
        <Header
          currentPage={getHeaderActivePage()}
          onNavigate={handleNavigate}
          user={user}
          onSignInClick={() => setAuthModalOpen(true)}
          onSignOut={handleSignOut}
          activeSite={currentPage}
          navOverride={currentPage === 'global' || currentPage === 'globalaboutus' ? [
            { label: 'Newsletter', page: 'newsletter' },
            { label: 'About Us',   page: 'globalaboutus' },
            { label: 'Contact Us', page: 'contact' },
          ] : undefined}
        />
      )}

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global page has its own footer */}
      {!isGlobalPage && <Footer onNavigate={handleNavigate} />}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <style>{`
        @keyframes glow {
          0% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes coin-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
        .coin-float { animation: coin-float 3s ease-in-out infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #7B0F14; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #5A0B10; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        main > div { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
