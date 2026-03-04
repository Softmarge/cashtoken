import React from 'react';

const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/6895f6bbeb00a8ae7951fdbf_1772008263967_8cbcbe4b.jpg';

interface GoldCoinProps {
  size?: number;
  animate?: boolean;
  className?: string;
  showNumber?: boolean;
  premium?: boolean;
}

const GoldCoin: React.FC<GoldCoinProps> = ({ size = 48, animate = false, className = '', showNumber = false, premium = false }) => {
  const glowClass = animate || premium ? 'coin-glow' : '';
  const floatClass = premium ? 'coin-premium' : '';
  const flashClass = premium ? 'coin-flash' : '';

  return (
    <div className={`relative inline-flex items-center justify-center ${floatClass} ${className}`}>
      <div className={`relative ${flashClass}`}>
        <img
          src={LOGO_URL}
          alt="CashToken"
          width={size}
          height={size}
          className={`rounded-full object-cover ${glowClass}`}
          style={{
            width: size,
            height: size,
            minWidth: size,
            minHeight: size,
          }}
          draggable={false}
        />
        {/* Subtle ambient glow behind coin */}
        {(animate || premium) && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)',
              transform: 'scale(1.3)',
              filter: 'blur(8px)',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GoldCoin;
