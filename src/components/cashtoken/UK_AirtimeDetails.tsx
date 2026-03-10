import React, { useState } from 'react';
import GoldCoin from './GoldCoin';

interface AirtimeDetailsProps {
  provider: any;
  walletBalance: number;
  onUpdateBalance: (amount: number) => void;
  onBack: () => void;
  userName?: string;
}

type Step = 'phone' | 'amount' | 'preview' | 'payment' | 'success' | 'rate';

const UK_AirtimeDetails: React.FC<AirtimeDetailsProps> = ({ provider, walletBalance, onUpdateBalance, onBack, userName }) => {
  const [step, setStep] = useState<Step>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | null>(null);
  const [showBounce, setShowBounce] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const amounts = [5, 10, 15, 20, 30, 50];

  const handlePayment = () => {
    if (paymentMethod === 'wallet' && selectedAmount) {
      onUpdateBalance(-selectedAmount);
    }
    setStep('success');
    setShowBounce(true);
    setTimeout(() => setShowBounce(false), 2000);
  };

  const isValidPhone = phoneNumber.replace(/\s/g, '').length >= 10;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Back button */}
        <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-[#7B0F14] transition-colors mb-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="text-sm font-medium">Back to Airtime</span>
        </button>

        {/* Provider Header */}
        <div className="rounded-3xl overflow-hidden mb-8" style={{ backgroundColor: provider.color }}>
          <div className="p-8 text-center">
            <span className="text-4xl font-bold" style={{ color: provider.textColor }}>{provider.logo}</span>
            <p className="text-white/80 mt-2 text-sm">{provider.name} Top Up</p>
          </div>
        </div>

        {/* STEP: Phone Number */}
        {step === 'phone' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Enter Phone Number</h2>
            <p className="text-gray-500 text-sm mb-6">Enter the {provider.name} number to top up</p>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-lg">🇬🇧</span>
                <span className="text-gray-500 font-medium">+44</span>
              </div>
              <input
                type="tel"
                placeholder="7XXX XXX XXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d\s]/g, '').slice(0, 13))}
                className="w-full pl-24 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-lg tracking-wider"
              />
            </div>
            <button
              onClick={() => isValidPhone && setStep('amount')}
              disabled={!isValidPhone}
              className={`w-full mt-6 py-4 rounded-2xl font-semibold text-white transition-all ${
                isValidPhone ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP: Amount Selection */}
        {step === 'amount' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Select Top Up Amount</h2>
            <p className="text-gray-500 text-sm mb-6">Topping up: +44 {phoneNumber}</p>
            <div className="grid grid-cols-3 gap-3">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-4 rounded-2xl text-lg font-bold transition-all ${
                    selectedAmount === amt
                      ? 'bg-[#7B0F14] text-white shadow-lg scale-105'
                      : 'bg-[#F4E6E6] text-[#7B0F14] hover:bg-[#E8D4D4]'
                  }`}
                >
                  £{amt}
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep('phone')} className="flex-1 py-4 rounded-2xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Back
              </button>
              <button
                onClick={() => selectedAmount && setStep('preview')}
                disabled={!selectedAmount}
                className={`flex-1 py-4 rounded-2xl font-semibold text-white transition-all ${
                  selectedAmount ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg' : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue — £{selectedAmount || 0}
              </button>
            </div>
          </div>
        )}

        {/* STEP: Preview */}
        {step === 'preview' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Confirm Top Up</h2>
            <div className="bg-[#F4E6E6] rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Provider</span>
                <span className="font-semibold text-gray-900">{provider.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone Number</span>
                <span className="font-semibold text-gray-900">+44 {phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center border-t border-[#E8D4D4] pt-4">
                <span className="text-gray-600 font-medium">Amount</span>
                <span className="text-2xl font-bold text-[#7B0F14]">£{selectedAmount}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep('amount')} className="flex-1 py-4 rounded-2xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Back
              </button>
              <button
                onClick={() => setStep('payment')}
                className="flex-1 py-4 rounded-2xl font-semibold bg-[#7B0F14] text-white hover:bg-[#5A0B10] transition-colors shadow-lg"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {/* STEP: Payment */}
        {step === 'payment' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
            <p className="text-gray-600 mb-6">Total: <span className="text-2xl font-bold text-[#7B0F14]">£{selectedAmount}</span></p>

            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  paymentMethod === 'card' ? 'border-[#7B0F14] bg-[#F4E6E6]' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#7B0F14] flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Saved Debit Card</p>
                  <p className="text-sm text-gray-500">**** **** **** 4582</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  paymentMethod === 'wallet' ? 'border-[#7B0F14] bg-[#F4E6E6]' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#DAA520] flex items-center justify-center">
                  <GoldCoin size={28} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Reward Wallet</p>
                  <p className="text-sm text-gray-500">Balance: £{walletBalance.toFixed(2)}</p>
                </div>
              </button>
            </div>

            {paymentMethod === 'wallet' && selectedAmount && walletBalance < selectedAmount && (
              <p className="text-red-500 text-sm mt-3 font-medium">Insufficient wallet balance. Please top up or use a debit card.</p>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep('preview')} className="flex-1 py-4 rounded-2xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={!paymentMethod || (paymentMethod === 'wallet' && selectedAmount !== null && walletBalance < selectedAmount)}
                className={`flex-1 py-4 rounded-2xl font-semibold text-white transition-all ${
                  paymentMethod && !(paymentMethod === 'wallet' && selectedAmount !== null && walletBalance < selectedAmount)
                    ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Pay £{selectedAmount}
              </button>
            </div>
          </div>
        )}

        {/* STEP: Success */}
        {step === 'success' && (
          <div className="text-center py-8">
            <div className={`text-6xl mb-4 ${showBounce ? 'animate-bounce' : ''}`}>
              <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto">
                <circle cx="40" cy="40" r="38" fill="#22C55E" />
                <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Top Up Successful!</h2>
            <p className="text-gray-500 mt-2">Your {provider.name} top up has been processed!</p>
            <div className="bg-[#F4E6E6] rounded-2xl p-6 mt-6 inline-block">
              <p className="text-sm text-gray-600">Amount topped up</p>
              <p className="text-3xl font-bold text-[#7B0F14]">£{selectedAmount}</p>
              <p className="text-sm text-gray-500 mt-1">to +44 {phoneNumber}</p>
              <p className="text-sm text-gray-500 mt-1">via {paymentMethod === 'wallet' ? 'Reward Wallet' : 'Debit Card'}</p>
            </div>
            <button
              onClick={() => setStep('rate')}
              className="w-full mt-8 py-4 rounded-2xl font-semibold bg-[#7B0F14] text-white hover:bg-[#5A0B10] transition-colors shadow-lg"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP: Rate */}
        {step === 'rate' && (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Rate your experience</h2>
            <p className="text-gray-500 mb-8">How was your airtime purchase?</p>
            <div className="flex justify-center gap-6">
              {[
                { label: 'Terrible', value: 1, icon: 'frown' },
                { label: 'Okay', value: 2, icon: 'meh' },
                { label: 'Good', value: 3, icon: 'smile' },
                { label: 'Amazing', value: 4, icon: 'heart' },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRating(r.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    rating === r.value ? 'bg-[#F4E6E6] scale-110 shadow-lg' : 'hover:bg-gray-50'
                  }`}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto">
                    <circle cx="20" cy="20" r="18" fill={rating === r.value ? '#7B0F14' : '#E5E7EB'} />
                    {r.icon === 'frown' && (
                      <>
                        <circle cx="14" cy="16" r="2" fill="white" />
                        <circle cx="26" cy="16" r="2" fill="white" />
                        <path d="M13 28C15 24 25 24 27 28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </>
                    )}
                    {r.icon === 'meh' && (
                      <>
                        <circle cx="14" cy="16" r="2" fill="white" />
                        <circle cx="26" cy="16" r="2" fill="white" />
                        <line x1="13" y1="26" x2="27" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </>
                    )}
                    {r.icon === 'smile' && (
                      <>
                        <circle cx="14" cy="16" r="2" fill="white" />
                        <circle cx="26" cy="16" r="2" fill="white" />
                        <path d="M13 24C15 28 25 28 27 24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </>
                    )}
                    {r.icon === 'heart' && (
                      <>
                        <circle cx="14" cy="16" r="2" fill="white" />
                        <circle cx="26" cy="16" r="2" fill="white" />
                        <path d="M13 23C15 29 25 29 27 23" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </>
                    )}
                  </svg>
                  <span className="text-xs text-gray-600">{r.label}</span>
                </button>
              ))}
            </div>
            {rating && (
              <div className="mt-8">
                <p className="text-[#7B0F14] font-semibold mb-4">Thank you for your feedback!</p>
                <button
                  onClick={onBack}
                  className="w-full py-4 rounded-2xl font-semibold bg-[#DAA520] text-white hover:bg-[#B8860B] transition-colors shadow-lg"
                >
                  Continue life-changing experience
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UK_AirtimeDetails;