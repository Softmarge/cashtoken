import React, { useState } from 'react';
import GoldCoin from './GoldCoin';
import UK_RewardCalculator as RewardCalculator from './UK_RewardCalculator';

interface ConsumerDashboardProps {
  walletBalance: number;
  onUpdateBalance: (amount: number) => void;
  userName?: string;
  onNavigate?: (page: string) => void;
}


type WithdrawStep = 'dashboard' | 'amount' | 'bank' | 'account' | 'pin' | 'success';

const UK_ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ walletBalance, onUpdateBalance, userName, onNavigate }) => {

  const [step, setStep] = useState<WithdrawStep>('dashboard');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  const displayName = userName || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const banks = [
    { name: 'HSBC', color: '#DB0011' },
    { name: 'Barclays', color: '#00AEEF' },
    { name: 'Revolut', color: '#0666EB' },
    { name: 'Tranzfa', color: '#7B0F14' },
    { name: 'Volume', color: '#000' },
  ];

  const bills = [
    { name: 'Phone', amount: 45.00, icon: 'phone', color: '#7B0F14' },
    { name: 'Electricity', amount: 89.50, icon: 'zap', color: '#DAA520' },
    { name: 'Gas', amount: 62.30, icon: 'flame', color: '#E31837' },
  ];

  const stats = [
    { label: 'Total CashTokens', value: '247', change: '+12 this month' },
    { label: 'Total Rewards', value: `£${walletBalance.toFixed(2)}`, change: '+£85.00 this week' },
    { label: 'Brands Used', value: '18', change: '+3 new' },
    { label: 'Weekly Draw Entries', value: '52', change: 'Next draw: Friday' },
  ];

  const handleWithdraw = () => {
    if (pin.length !== 4) {
      setPinError('Please enter a 4-digit PIN');
      return;
    }
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= walletBalance) {
      onUpdateBalance(-amount);
      setStep('success');
    }
  };

  const resetWithdraw = () => {
    setStep('dashboard');
    setWithdrawAmount('');
    setSelectedBank('');
    setAccountNumber('');
    setPin('');
    setPinError('');
  };

  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const spendData = [320, 450, 280, 520, 390, 610, 480, 350];
  const rewardData = [32, 45, 28, 52, 39, 61, 48, 35];
  const maxSpend = Math.max(...spendData);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'dashboard' && (
          <>
            {/* Profile & Balance */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7B0F14] to-[#4A0A0D] flex items-center justify-center text-white font-bold text-xl border-2 border-[#DAA520]">
                  {initials}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, {displayName.split(' ')[0]}</h1>
                  <p className="text-gray-500">My Universal Reward Balance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className="text-3xl font-bold text-[#7B0F14]">£{walletBalance.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setStep('amount')}
                  className="bg-[#7B0F14] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg"
                >
                  Withdraw
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Spending vs Rewards</h3>
                <div className="flex items-end gap-3 h-48">
                  {months.map((month, i) => (
                    <div key={month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center gap-1" style={{ height: '160px', justifyContent: 'flex-end' }}>
                        <div className="w-full bg-[#7B0F14] rounded-t-lg transition-all duration-500" style={{ height: `${(spendData[i] / maxSpend) * 100}%`, maxWidth: '24px' }} />
                        <div className="w-full bg-[#DAA520] rounded-t-lg transition-all duration-500" style={{ height: `${(rewardData[i] / maxSpend) * 100}%`, maxWidth: '24px' }} />
                      </div>
                      <span className="text-xs text-gray-500">{month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#7B0F14]" /><span className="text-xs text-gray-500">Spending</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#DAA520]" /><span className="text-xs text-gray-500">Rewards</span></div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Monthly Bills</h3>
                <div className="space-y-4">
                  {bills.map((bill) => (
                    <div key={bill.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bill.color + '20' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={bill.color} strokeWidth="2" strokeLinecap="round">
                            {bill.icon === 'phone' && <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>}
                            {bill.icon === 'zap' && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
                            {bill.icon === 'flame' && <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />}
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">{bill.name}</span>
                      </div>
                      <span className="font-bold text-gray-900">£{bill.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Total</span>
                    <span className="font-bold text-[#7B0F14]">£{bills.reduce((s, b) => s + b.amount, 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Withdrawal Flow */}
        {step === 'amount' && (
          <div className="max-w-md mx-auto">
            <button onClick={resetWithdraw} className="flex items-center gap-2 text-gray-600 hover:text-[#7B0F14] mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
            <p className="text-gray-500 mb-6">Available: £{walletBalance.toFixed(2)}</p>
            <input type="number" placeholder="Enter amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-2xl font-bold text-center" />
            <button
              onClick={() => parseFloat(withdrawAmount) > 0 && parseFloat(withdrawAmount) <= walletBalance && setStep('bank')}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > walletBalance}
              className={`w-full mt-6 py-4 rounded-2xl font-semibold text-white transition-all ${
                withdrawAmount && parseFloat(withdrawAmount) > 0 && parseFloat(withdrawAmount) <= walletBalance ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >Continue</button>
          </div>
        )}

        {step === 'bank' && (
          <div className="max-w-md mx-auto">
            <button onClick={() => setStep('amount')} className="flex items-center gap-2 text-gray-600 hover:text-[#7B0F14] mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Bank</h2>
            <div className="space-y-3">
              {banks.map((bank) => (
                <button key={bank.name} onClick={() => { setSelectedBank(bank.name); setStep('account'); }}
                  className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all hover:border-[#7B0F14] ${selectedBank === bank.name ? 'border-[#7B0F14] bg-[#F4E6E6]' : 'border-gray-200'}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: bank.color }}>{bank.name.substring(0, 2)}</div>
                  <span className="font-semibold text-gray-900">{bank.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'account' && (
          <div className="max-w-md mx-auto">
            <button onClick={() => setStep('bank')} className="flex items-center gap-2 text-gray-600 hover:text-[#7B0F14] mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Account Details</h2>
            <p className="text-gray-500 mb-6">Withdrawing to {selectedBank}</p>
            <input type="text" placeholder="Enter account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-lg tracking-wider text-center" />
            <button onClick={() => accountNumber.length >= 6 && setStep('pin')} disabled={accountNumber.length < 6}
              className={`w-full mt-6 py-4 rounded-2xl font-semibold text-white transition-all ${accountNumber.length >= 6 ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}>
              Continue
            </button>
          </div>
        )}

        {step === 'pin' && (
          <div className="max-w-md mx-auto">
            <button onClick={() => setStep('account')} className="flex items-center gap-2 text-gray-600 hover:text-[#7B0F14] mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
              <span className="text-sm font-medium">Back</span>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Enter PIN</h2>
            <p className="text-gray-500 mb-6">Confirm your 4-digit PIN</p>
            <input type="password" placeholder="****" value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(''); }}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-3xl tracking-[1em] text-center" maxLength={4} />
            {pinError && <p className="text-red-500 text-sm mt-2">{pinError}</p>}
            <button onClick={handleWithdraw} className="w-full mt-6 py-4 rounded-2xl font-semibold bg-[#7B0F14] text-white hover:bg-[#5A0B10] transition-colors shadow-lg">
              Confirm Withdrawal
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="max-w-md mx-auto text-center py-12">
            <div className="animate-bounce mb-6">
              <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto">
                <circle cx="40" cy="40" r="38" fill="#22C55E" />
                <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Withdrawal Successful</h2>
            <p className="text-gray-500 mt-2">£{withdrawAmount} sent to {selectedBank}</p>
            <div className="bg-[#F4E6E6] rounded-2xl p-6 mt-6">
              <p className="text-sm text-gray-600">New Balance</p>
              <p className="text-3xl font-bold text-[#7B0F14]">£{walletBalance.toFixed(2)}</p>
            </div>
            <button onClick={resetWithdraw} className="w-full mt-8 py-4 rounded-2xl font-semibold bg-[#7B0F14] text-white hover:bg-[#5A0B10] transition-colors shadow-lg">
              Back to Dashboard
            </button>
          </div>
        )}
      </div>

      {step === 'dashboard' && (
        <RewardCalculator onNavigate={onNavigate} />
      )}
    </div>
  );
};

export default UK_ConsumerDashboard;