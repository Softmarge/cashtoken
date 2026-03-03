import React, { useState, useEffect } from 'react';
import GoldCoin from './GoldCoin';

const MerchantDashboard: React.FC = () => {
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

  const stats = [
    { label: 'Total CashTokens Gifted', value: tokensGifted.toLocaleString(), icon: 'gift', color: '#DAA520' },
    { label: 'Total in Wallet', value: '£24,580', icon: 'wallet', color: '#7B0F14' },
    { label: 'Active Campaigns', value: campaigns.filter(c => c.status === 'active').length.toString(), icon: 'target', color: '#22C55E' },
    { label: 'Success Rate', value: '87%', icon: 'trending', color: '#0666EB' },
  ];

  // Simulate token gifting
  useEffect(() => {
    const interval = setInterval(() => {
      setTokensGifted(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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

  // Graph data
  const graphData = [65, 72, 58, 80, 75, 88, 92, 78, 85, 90, 87, 95];
  const graphMonths = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  const maxGraph = Math.max(...graphData);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Merchant Dashboard</h1>
            <p className="text-gray-500">Manage campaigns and track rewards</p>
          </div>
          <button
            onClick={() => setShowCreateCampaign(true)}
            className="bg-[#7B0F14] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#5A0B10] transition-colors shadow-lg flex items-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Campaign
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
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

        {/* Success Metrics Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Graph */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-1">Success Metrics Engine</h3>
            <p className="text-sm text-gray-500 mb-4">Campaign performance over time</p>
            
            {/* SVG Line Chart */}
            <div className="relative h-48">
              <svg viewBox="0 0 480 160" className="w-full h-full" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 40, 80, 120, 160].map((y) => (
                  <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="#f0f0f0" strokeWidth="1" />
                ))}
                {/* Area fill */}
                <path
                  d={`M0,${160 - (graphData[0] / maxGraph) * 140} ${graphData.map((d, i) => `L${(i / (graphData.length - 1)) * 480},${160 - (d / maxGraph) * 140}`).join(' ')} L480,160 L0,160 Z`}
                  fill="url(#areaGradient)"
                  opacity="0.3"
                />
                {/* Line */}
                <path
                  d={`M0,${160 - (graphData[0] / maxGraph) * 140} ${graphData.map((d, i) => `L${(i / (graphData.length - 1)) * 480},${160 - (d / maxGraph) * 140}`).join(' ')}`}
                  fill="none"
                  stroke="#7B0F14"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Dots */}
                {graphData.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i / (graphData.length - 1)) * 480}
                    cy={160 - (d / maxGraph) * 140}
                    r="4"
                    fill="#7B0F14"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
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

          {/* Active Campaigns */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Campaigns</h3>
            <div className="space-y-4">
              {campaigns.map((campaign, i) => {
                const isSuccess = campaign.progress >= campaign.target * 10;
                const isUnderperforming = campaign.status === 'active' && campaign.progress < 30;
                return (
                  <div key={i} className="p-3 rounded-2xl bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm text-gray-900">{campaign.name}</p>
                      {isSuccess && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">SUCCESS</span>
                      )}
                      {campaign.status === 'completed' && (
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">COMPLETED</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(campaign.progress, 100)}%`,
                          backgroundColor: isSuccess ? '#22C55E' : campaign.progress > 50 ? '#DAA520' : '#7B0F14'
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{campaign.progress}% of {campaign.target}% target</p>
                    {isUnderperforming && (
                      <p className="text-xs text-red-500 font-medium mt-1">Campaign underperforming. Increase engagement.</p>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowAdvisoryPopup(true)}
              className="w-full mt-4 py-3 rounded-2xl font-semibold bg-[#DAA520] text-white hover:bg-[#B8860B] transition-colors"
            >
              Advisory
            </button>
          </div>
        </div>

        {/* Create Campaign Modal */}
        {showCreateCampaign && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateCampaign(false)}>
            <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Create Campaign</h2>
                <button onClick={() => setShowCreateCampaign(false)} className="text-gray-400 hover:text-gray-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g. Summer Rewards 2026"
                    className="w-full p-3 rounded-2xl border border-gray-200 focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Objectives</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={objectives.acquisition}
                        onChange={(e) => setObjectives({ ...objectives, acquisition: e.target.checked })}
                        className="w-5 h-5 rounded accent-[#7B0F14]"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium">Acquisition increase</span>
                        <input
                          type="number"
                          value={acquisitionTarget}
                          onChange={(e) => setAcquisitionTarget(e.target.value)}
                          className="ml-2 w-16 p-1 rounded-lg border text-sm text-center"
                        />
                        <span className="text-sm text-gray-500 ml-1">%</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={objectives.mobile}
                        onChange={(e) => setObjectives({ ...objectives, mobile: e.target.checked })}
                        className="w-5 h-5 rounded accent-[#7B0F14]"
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium">Mobile transaction increase</span>
                        <input
                          type="number"
                          value={mobileTarget}
                          onChange={(e) => setMobileTarget(e.target.value)}
                          className="ml-2 w-16 p-1 rounded-lg border text-sm text-center"
                        />
                        <span className="text-sm text-gray-500 ml-1">%</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Business Rules</label>
                  <div className="space-y-2">
                    {rules.map((rule, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
                        <div>
                          <span className="text-sm">{rule.condition}</span>
                          <span className="text-sm text-[#DAA520] font-medium ml-2">→ {rule.reward}</span>
                        </div>
                        <button
                          onClick={() => setRules(rules.filter((_, idx) => idx !== i))}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={newRuleCondition}
                      onChange={(e) => setNewRuleCondition(e.target.value)}
                      placeholder="Condition"
                      className="flex-1 p-2 rounded-xl border border-gray-200 text-sm"
                    />
                    <input
                      type="text"
                      value={newRuleReward}
                      onChange={(e) => setNewRuleReward(e.target.value)}
                      placeholder="Reward"
                      className="w-32 p-2 rounded-xl border border-gray-200 text-sm"
                    />
                    <button onClick={addRule} className="px-4 py-2 rounded-xl bg-[#DAA520] text-white text-sm font-medium hover:bg-[#B8860B]">
                      Add
                    </button>
                  </div>
                </div>

                <button
                  onClick={createCampaign}
                  disabled={!campaignName}
                  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all ${
                    campaignName ? 'bg-[#7B0F14] hover:bg-[#5A0B10] shadow-lg' : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  Launch Campaign
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Advisory Popup */}
        {showAdvisoryPopup && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAdvisoryPopup(false)}>
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Request Received</h3>
              <p className="text-gray-600 text-sm">Our team has received your request. We will contact you in 5 minutes.</p>
              <button
                onClick={() => setShowAdvisoryPopup(false)}
                className="mt-6 w-full py-3 rounded-2xl font-semibold bg-[#7B0F14] text-white hover:bg-[#5A0B10] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;
