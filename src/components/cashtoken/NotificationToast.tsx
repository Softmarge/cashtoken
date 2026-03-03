import React, { useState, useEffect } from 'react';
import GoldCoin from './GoldCoin';

const notifications = [
  { title: 'ASDA Double Cashback', message: 'Double CashTokens this weekend at ASDA!' },
  { title: 'Adidas Bonus Reward', message: 'Earn 3x CashTokens on Adidas today!' },
  { title: 'Lifestyle Weekend Promo', message: 'Limited time lifestyle campaign ending soon!' },
  { title: 'Tesco Reward Boost', message: 'Spend £50 at Tesco and earn 5 CashTokens!' },
  { title: 'New Brand Alert', message: 'Nando\'s just joined CashToken Rewards!' },
];

const NotificationToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => clearTimeout(showTimer);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;

    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        setVisible(true);
      }, 1000);
    }, 6000);

    return () => clearTimeout(hideTimer);
  }, [visible, currentIndex, dismissed]);

  if (dismissed || !visible) return null;

  const notif = notifications[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right duration-500">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#F4E6E6] p-4 max-w-xs flex items-start gap-3">
        <GoldCoin size={36} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-[#7B0F14] text-sm">{notif.title}</p>
          <p className="text-gray-600 text-xs mt-0.5">{notif.message}</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;
