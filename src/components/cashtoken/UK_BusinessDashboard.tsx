import React, { useState, useEffect } from 'react';
import GoldCoin from './GoldCoin';

const UK_BusinessDashboard: React.FC = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [activityPeriod, setActivityPeriod] = useState('Today');
  const [referralCopied, setReferralCopied] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [walletBalance, setWalletBalance] = useState(494120.00);
  const [cashTokensApprox, setCashTokensApprox] = useState(14117);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showAdvisoryPopup, setShowAdvisoryPopup] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [objectives, setObjectives] = useState({ acquisition: true, mobile: false });
  const [acquisitionTarget, setAcquisitionTarget] = useState('10');
  const [mobileTarget, setMobileTarget] = useState('5');
  const [rules, setRules] = useState([
    { condition: 'Complete 5 transactions', reward: '1 CashToken', active: true },
    { condition: 'Create account', reward: '1 CashToken', active: true },
  ]);
  const [newRuleCondition, setNewRuleCondition] = useState('');
  const [newRuleReward, setNewRuleReward] = useState('');
  const [tokensGifted, setTokensGifted] = useState(1247);
  const [campaigns, setCampaigns] = useState([
    { name: 'Summer Rewards 2026', status: 'active', progress: 78, objective: 'acquisition', target: 10 },
    { name: 'Mobile Push Q1', status: 'active', progress: 42, objective: 'mobile', target: 5 },
    { name: 'Holiday Special', status: 'completed', progress: 100, objective: 'acquisition', target: 15 },
  ]);
  const [selectedApi, setSelectedApi] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [giftAmount, setGiftAmount] = useState('');
  const [giftRecipient, setGiftRecipient] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const stats = [
    { label: 'Total CashTokens Gifted', value: tokensGifted.toLocaleString(), icon: 'gift', color: '#DAA520' },
    { label: 'Total in Wallet', value: `£${walletBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, icon: 'wallet', color: '#7B0F14' },
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length.toString(), icon: 'target', color: '#22C55E' },
    { label: 'Success Rate', value: '87%', icon: 'trending', color: '#DAA520' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTokensGifted(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const paymentHistory = [
    { ref: '#CT-V3MGVK4E-1680115465235', amount: 500000.00, type: 'CashToken Wallet Funding', status: 'COMPLETED', date: '29-03-2023 07:02pm' },
    { ref: '#CT-K8NPWL2D-1685234567890', amount: 150000.00, type: 'CashToken Wallet Funding', status: 'COMPLETED', date: '15-05-2023 02:15pm' },
    { ref: '#CT-R4JMXT9B-1690345678901', amount: 75000.00, type: 'Campaign Top-up', status: 'COMPLETED', date: '22-07-2023 11:30am' },
  ];

  const copyReferralLink = () => {
    navigator.clipboard.writeText('https://platform.cashtokenreward.com/ref/BUSUK2026');
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const handleFund = () => {
    const amt = parseFloat(fundAmount);
    if (amt > 0) {
      setWalletBalance(prev => prev + amt);
      setCashTokensApprox(prev => prev + Math.floor(amt / 35));
      setFundAmount('');
      setShowFundModal(false);
      setActionSuccess('Account funded successfully!');
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const handleWithdraw = () => {
    const amt = parseFloat(withdrawAmount);
    if (amt > 0 && amt <= walletBalance) {
      setWalletBalance(prev => prev - amt);
      setCashTokensApprox(prev => Math.max(0, prev - Math.floor(amt / 35)));
      setWithdrawAmount('');
      setShowWithdrawModal(false);
      setActionSuccess('Withdrawal successful!');
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const handleTransfer = () => {
    const amt = parseFloat(transferAmount);
    if (amt > 0 && amt <= walletBalance && transferTo) {
      setWalletBalance(prev => prev - amt);
      setCashTokensApprox(prev => Math.max(0, prev - Math.floor(amt / 35)));
      setTransferAmount('');
      setTransferTo('');
      setShowTransferModal(false);
      setActionSuccess('Transfer successful!');
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const handleGiftTokens = () => {
    const amt = parseInt(giftAmount);
    if (amt > 0 && giftRecipient) {
      setTokensGifted(prev => prev + amt);
      setGiftAmount('');
      setGiftRecipient('');
      setShowGiftModal(false);
      setActionSuccess(`${amt} CashTokens gifted successfully!`);
      setTimeout(() => setActionSuccess(''), 3000);
    }
  };

  const addRule = () => {
    if (newRuleCondition && newRuleReward) {
      setRules([...rules, { condition: newRuleCondition, reward: newRuleReward, active: true }]);
      setNewRuleCondition('');
      setNewRuleReward('');
    }
  };

  const createCampaign = () => {
    if (campaignName) {
      setCampaigns([...campaigns, {
        name: campaignName,
        status: 'active',
        progress: 0,
        objective: objectives.acquisition ? 'acquisition' : 'mobile',
        target: objectives.acquisition ? parseInt(acquisitionTarget) : parseInt(mobileTarget),
      }]);
      setCampaignName('');
      setShowCreateCampaign(false);
    }
  };

  const graphData = [65, 72, 58, 80, 75, 88, 92, 78, 85, 90, 87, 95];
  const graphMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const maxGraph = Math.max(...graphData);

  const sidebarNav = [
    { id: 'overview', label: 'Overview', icon: 'overview' },
    { id: 'wallet', label: 'Wallet', icon: 'wallet' },
    { id: 'referrals', label: 'Referrals', icon: 'referrals' },
  ];

  const cashTokenNav = [
    { id: 'gift-cashtokens', label: 'Gift CashTokens', icon: 'gift' },
    { id: 'gift-history', label: 'View Gift History', icon: 'history' },
    { id: 'win-history', label: 'View Win History', icon: 'trophy' },
  ];

  const loyaltyNav = [
    { id: 'reward-campaigns', label: 'Reward Campaigns', icon: 'target' },
    { id: 'gift-points', label: 'Gift CashTokenPoints', icon: 'points' },
    { id: 'gift-tokens-loyalty', label: 'Gift CashTokens', icon: 'gift' },
    { id: 'view-gift-history', label: 'View Gift History', icon: 'history' },
  ];

  const handleSidebarClick = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    if (id === 'gift-cashtokens' || id === 'gift-tokens-loyalty') {
      setShowGiftModal(true);
    }
    if (id === 'reward-campaigns') {
      setShowCreateCampaign(true);
    }
  };

  const renderSidebarIcon = (icon: string) => {
    switch (icon) {
      case 'overview':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
      case 'wallet':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
      case 'referrals':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>;
      case 'gift':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/></svg>;
      case 'history':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
      case 'trophy':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;
      case 'target':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
      case 'points':
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F2F5]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar - Dark maroon brand color */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-[250px] bg-[#3D0C0E] text-white z-50 transform transition-transform duration-300 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-white/10">
          <GoldCoin size={32} />
          <div>
            <span className="text-sm font-bold tracking-wider">CashToken</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-white/60 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* User Info */}
        <div className="px-5 py-4 border-b border-white/10">
          <p className="font-bold text-sm">Business Account</p>
          <p className="text-xs text-white/50">Account Type: Brand</p>
        </div>

        {/* Main Nav */}
        <nav className="px-3 py-4">
          {sidebarNav.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                activeSection === item.id ? 'bg-white/10 text-[#DAA520]' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {renderSidebarIcon(item.icon)}
              {item.label}
            </button>
          ))}

          {/* CASHTOKEN Section */}
          <div className="mt-5 mb-2 px-3">
            <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">CashToken</p>
          </div>
          {cashTokenNav.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                activeSection === item.id ? 'bg-white/10 text-[#DAA520]' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {renderSidebarIcon(item.icon)}
              {item.label}
            </button>
          ))}

          {/* LOYALTY PROGRAM Section */}
          <div className="mt-5 mb-2 px-3">
            <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Loyalty Program</p>
          </div>
          {loyaltyNav.map(item => (
            <button
              key={item.id}
              onClick={() => handleSidebarClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                activeSection === item.id ? 'bg-white/10 text-[#DAA520]' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {renderSidebarIcon(item.icon)}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900 mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <h2 className="text-lg font-bold text-gray-800 hidden sm:block">Dashboard</h2>
          <div className="flex-1" />
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 text-sm text-[#7B0F14] hover:text-[#5A0B10] font-medium"
            >
              Business Account
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 w-48 py-1 z-50">
                <button onClick={() => { setActiveSection('overview'); setShowUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F4E6E6]">Overview</button>
                <button onClick={() => { setActiveSection('wallet'); setShowUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F4E6E6]">Wallet</button>
                <button onClick={() => { setShowCreateCampaign(true); setShowUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F4E6E6]">Create Campaign</button>
                <div className="border-t border-gray-100 my-1" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
              </div>
            )}
          </div>
        </header>

        {/* Success Toast */}
        {actionSuccess && (
          <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            {actionSuccess}
          </div>
        )}

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Row 1: Wallet Balances + Activity Summary + Refer & Earn */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
            {/* Wallet Balances */}
            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wallet Balances</h3>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-lg bg-[#F4E6E6] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider text-[#7B0F14] uppercase">Gifting Wallet</p>
                  <p className="text-2xl font-bold text-gray-900">£{walletBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 ml-[52px] mb-4">{cashTokensApprox.toLocaleString()} CashTokens (approx.)</p>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#FFF3E0] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                </div>
                <p className="text-2xl font-bold text-gray-900">£0.00</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowFundModal(true)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-[#F4E6E6] flex items-center justify-center transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Fund Account</span>
                </button>
                <button
                  onClick={() => setShowWithdrawModal(true)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-[#FFF3E0] flex items-center justify-center transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Withdraw</span>
                </button>
                <button
                  onClick={() => setShowTransferModal(true)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-[#E8F8E8] flex items-center justify-center transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">Transfer</span>
                </button>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border-2 border-[#7B0F14] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Activity Summary</h3>
                <select
                  value={activityPeriod}
                  onChange={(e) => setActivityPeriod(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 text-gray-700 focus:outline-none focus:border-[#7B0F14]"
                >
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>All Time</option>
                </select>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold tracking-wider text-[#7B0F14] uppercase mb-2">You Gifted</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-xs text-gray-500 font-medium uppercase">CashTokens</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-xs text-gray-500 font-medium uppercase">CashTokenPoints</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold tracking-wider text-[#DAA520] uppercase mb-2">You Received</p>
                <div className="flex gap-8">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-xs text-gray-500 font-medium uppercase">CashTokens</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">£ 0.00</p>
                    <p className="text-xs text-gray-500 font-medium uppercase">Instant Cashback</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refer and Earn */}
            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">REFER AND EARN</h3>
              <p className="text-xs text-gray-500 text-center mb-4 leading-relaxed">
                Refer friends, family or businesses to CashToken and earn commission perpetually on all their CashToken purchases and wins
              </p>

              <p className="text-xs font-bold text-gray-700 text-center mb-2">Your Referral Link:</p>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
                <div className="flex items-center gap-1.5 px-3 py-2 flex-1 min-w-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  <span className="text-xs text-gray-600 truncate">https://platform.cashtokenrewar...</span>
                </div>
                <button
                  onClick={copyReferralLink}
                  className={`px-4 py-2 text-xs font-medium border-l border-gray-300 transition-colors ${
                    referralCopied ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {referralCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mb-3 uppercase tracking-wider font-medium">Or Share On</p>
              <div className="flex justify-center gap-3">
                <a href="https://www.facebook.com/sharer/sharer.php?u=https://platform.cashtokenreward.com/ref/BUSUK2026" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#7B0F14] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/intent/tweet?url=https://platform.cashtokenreward.com/ref/BUSUK2026&text=Join%20CashToken" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#DAA520] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://platform.cashtokenreward.com/ref/BUSUK2026" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#5A0B10] flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Row 2: Recent Withdrawal History + Payment History */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
            {/* Recent Withdrawal History */}
            <div className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-gray-900">Recent Withdrawal History</h3>
                <button className="text-sm text-gray-500 border border-gray-300 rounded-lg px-4 py-1.5 hover:bg-gray-50 transition-colors">View More</button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Your withdrawals over the last 30 days</p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F4E6E6] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">Withdrawal Count</p>
                    <p className="text-xl font-bold text-gray-900">0</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FFF3E0] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">Total Withdrawn</p>
                    <p className="text-xl font-bold text-gray-900">£0.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F8E8] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">Balance</p>
                    <p className="text-xl font-bold text-gray-900">£{walletBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase">Date</th>
                      <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase">Reference</th>
                      <th className="text-left py-3 px-2 text-xs font-bold text-gray-500 uppercase">Account</th>
                      <th className="text-right py-3 px-2 text-xs font-bold text-gray-500 uppercase">Amount</th>
                      <th className="text-right py-3 px-2 text-xs font-bold text-gray-500 uppercase">Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-400 text-sm">No withdrawals in the last 30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment History */}
            <div className="lg:col-span-4 bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment History</h3>
              <div className="space-y-4">
                {paymentHistory.map((payment, i) => (
                  <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#F4E6E6] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">Payment Ref {payment.ref}</p>
                          <p className="text-[10px] text-gray-500">{payment.type}</p>
                          <p className="text-[10px] text-gray-400">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-900">£ {payment.amount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                        <p className="text-[10px] font-bold text-green-600">{payment.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full text-center text-sm text-[#7B0F14] hover:text-[#5A0B10] font-medium mt-3 py-2 hover:bg-[#F4E6E6] rounded-lg transition-colors">
                View All Transactions
              </button>
            </div>
          </div>

          {/* Row 3: Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="2" strokeLinecap="round">
                      {stat.icon === 'gift' && <><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>}
                      {stat.icon === 'wallet' && <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></>}
                      {stat.icon === 'target' && <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>}
                      {stat.icon === 'trending' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>}
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Row 4: Success Metrics Engine + Campaigns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900">Success Metrics Engine</h3>
                <button onClick={() => setShowCreateCampaign(true)} className="text-xs bg-[#7B0F14] text-white px-4 py-1.5 rounded-lg hover:bg-[#5A0B10] transition-colors font-medium">+ New Campaign</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">Campaign performance over time</p>
              <div className="relative h-48">
                <svg viewBox="0 0 480 160" className="w-full h-full" preserveAspectRatio="none">
                  {[0, 40, 80, 120, 160].map((y) => (
                    <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#f0f0f0" strokeWidth="1" />
                  ))}
                  <path
                    d={`M0,${160 - (graphData[0] / maxGraph) * 140} ${graphData.map((d, i) => `L${(i / (graphData.length - 1)) * 480},${160 - (d / maxGraph) * 140}`).join(' ')} L480,160 L0,160 Z`}
                    fill="url(#areaGradientBiz2)"
                    opacity="0.3"
                  />
                  <path
                    d={`M0,${160 - (graphData[0] / maxGraph) * 140} ${graphData.map((d, i) => `L${(i / (graphData.length - 1)) * 480},${160 - (d / maxGraph) * 140}`).join(' ')}`}
                    fill="none"
                    stroke="#7B0F14"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {graphData.map((d, i) => (
                    <circle key={i} cx={(i / (graphData.length - 1)) * 480} cy={160 - (d / maxGraph) * 140} r="4" fill="#7B0F14" stroke="white" strokeWidth="2" />
                  ))}
                  <defs>
                    <linearGradient id="areaGradientBiz2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7B0F14" />
                      <stop offset="100%" stopColor="#7B0F14" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between mt-2">
                  {graphMonths.map((m) => (
                    <span key={m} className="text-[10px] text-gray-400">{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaigns */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Campaigns</h3>
              <div className="space-y-4">
                {campaigns.map((campaign, i) => {
                  const isSuccess = campaign.progress >= campaign.target * 10;
                  const isUnderperforming = campaign.status === 'active' && campaign.progress < 30;
                  return (
                    <div key={i} className="p-3 rounded-xl bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm text-gray-900">{campaign.name}</p>
                        {isSuccess && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">SUCCESS</span>}
                        {campaign.status === 'completed' && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">COMPLETED</span>}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${Math.min(campaign.progress, 100)}%`, backgroundColor: isSuccess ? '#22C55E' : campaign.progress > 50 ? '#DAA520' : '#7B0F14' }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{campaign.progress}% of {campaign.target}% target</p>
                      {isUnderperforming && <p className="text-xs text-red-500 font-medium mt-1">Campaign underperforming. Increase engagement.</p>}
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setShowAdvisoryPopup(true)} className="w-full mt-4 py-3 rounded-xl font-semibold bg-[#DAA520] text-white hover:bg-[#B8860B] transition-colors">
                Advisory
              </button>
            </div>
          </div>



        </div>
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Fund Account Modal */}
      {showFundModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowFundModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Fund Account</h3>
              <button onClick={() => setShowFundModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Amount (£)</label>
            <input type="number" value={fundAmount} onChange={e => setFundAmount(e.target.value)} placeholder="Enter amount" className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm mb-4" />
            <button onClick={handleFund} disabled={!fundAmount || parseFloat(fundAmount) <= 0} className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${fundAmount && parseFloat(fundAmount) > 0 ? 'bg-[#7B0F14] hover:bg-[#5A0B10]' : 'bg-gray-300 cursor-not-allowed'}`}>
              Fund Account
            </button>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowWithdrawModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Withdraw Funds</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">Available: £{walletBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
            <label className="text-sm font-medium text-gray-700 block mb-2">Amount (£)</label>
            <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="Enter amount" className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 outline-none text-sm mb-4" />
            <button onClick={handleWithdraw} disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > walletBalance} className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${withdrawAmount && parseFloat(withdrawAmount) > 0 && parseFloat(withdrawAmount) <= walletBalance ? 'bg-[#DAA520] hover:bg-[#B8860B]' : 'bg-gray-300 cursor-not-allowed'}`}>
              Withdraw
            </button>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowTransferModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Transfer Funds</h3>
              <button onClick={() => setShowTransferModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Recipient</label>
            <input type="text" value={transferTo} onChange={e => setTransferTo(e.target.value)} placeholder="Email or account ID" className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm mb-3" />
            <label className="text-sm font-medium text-gray-700 block mb-2">Amount (£)</label>
            <input type="number" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} placeholder="Enter amount" className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm mb-4" />
            <button onClick={handleTransfer} disabled={!transferAmount || !transferTo || parseFloat(transferAmount) <= 0 || parseFloat(transferAmount) > walletBalance} className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${transferAmount && transferTo && parseFloat(transferAmount) > 0 && parseFloat(transferAmount) <= walletBalance ? 'bg-[#7B0F14] hover:bg-[#5A0B10]' : 'bg-gray-300 cursor-not-allowed'}`}>
              Transfer
            </button>
          </div>
        </div>
      )}

      {/* Gift CashTokens Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowGiftModal(false)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Gift CashTokens</h3>
              <button onClick={() => setShowGiftModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Recipient Email or Phone</label>
            <input type="text" value={giftRecipient} onChange={e => setGiftRecipient(e.target.value)} placeholder="recipient@email.com or +44..." className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 outline-none text-sm mb-3" />
            <label className="text-sm font-medium text-gray-700 block mb-2">Number of CashTokens</label>
            <input type="number" value={giftAmount} onChange={e => setGiftAmount(e.target.value)} placeholder="Enter amount" className="w-full p-3 rounded-lg border border-gray-300 focus:border-[#DAA520] focus:ring-2 focus:ring-[#DAA520]/20 outline-none text-sm mb-4" />
            <button onClick={handleGiftTokens} disabled={!giftAmount || !giftRecipient || parseInt(giftAmount) <= 0} className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${giftAmount && giftRecipient && parseInt(giftAmount) > 0 ? 'bg-[#DAA520] hover:bg-[#B8860B]' : 'bg-gray-300 cursor-not-allowed'}`}>
              Gift CashTokens
            </button>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateCampaign && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowCreateCampaign(false)}>
          <div className="bg-white rounded-xl p-6 lg:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Create Campaign</h2>
              <button onClick={() => setShowCreateCampaign(false)} className="text-gray-400 hover:text-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Campaign Name</label>
                <input type="text" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="e.g. Summer Rewards 2026" className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Objectives</label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={objectives.acquisition} onChange={e => setObjectives({ ...objectives, acquisition: e.target.checked })} className="w-5 h-5 rounded accent-[#7B0F14]" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Acquisition increase</span>
                      <input type="number" value={acquisitionTarget} onChange={e => setAcquisitionTarget(e.target.value)} className="ml-2 w-16 p-1 rounded-lg border text-sm text-center" />
                      <span className="text-sm text-gray-500 ml-1">%</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={objectives.mobile} onChange={e => setObjectives({ ...objectives, mobile: e.target.checked })} className="w-5 h-5 rounded accent-[#7B0F14]" />
                    <div className="flex-1">
                      <span className="text-sm font-medium">Mobile transaction increase</span>
                      <input type="number" value={mobileTarget} onChange={e => setMobileTarget(e.target.value)} className="ml-2 w-16 p-1 rounded-lg border text-sm text-center" />
                      <span className="text-sm text-gray-500 ml-1">%</span>
                    </div>
                  </label>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Business Rules</label>
                <div className="space-y-2">
                  {rules.map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <span className="text-sm">{rule.condition}</span>
                        <span className="text-sm text-[#DAA520] font-medium ml-2">&rarr; {rule.reward}</span>
                      </div>
                      <button onClick={() => setRules(rules.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <input type="text" value={newRuleCondition} onChange={e => setNewRuleCondition(e.target.value)} placeholder="Condition" className="flex-1 p-2 rounded-xl border border-gray-200 text-sm" />
                  <input type="text" value={newRuleReward} onChange={e => setNewRuleReward(e.target.value)} placeholder="Reward" className="w-32 p-2 rounded-xl border border-gray-200 text-sm" />
                  <button onClick={addRule} className="px-4 py-2 rounded-xl bg-[#DAA520] text-white text-sm font-medium hover:bg-[#B8860B]">Add</button>
                </div>
              </div>
              <button onClick={createCampaign} disabled={!campaignName} className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${campaignName ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}>
                Launch Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advisory Popup */}
      {showAdvisoryPopup && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowAdvisoryPopup(false)}>
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Request Received</h3>
            <p className="text-gray-600 text-sm">Our team has received your request. We will contact you in 5 minutes.</p>
            <button onClick={() => setShowAdvisoryPopup(false)} className="mt-6 w-full py-3 rounded-xl font-semibold bg-[#7B0F14] text-white hover:bg-[#5A0B10] transition-colors">
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UK_BusinessDashboard;