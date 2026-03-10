import React, { useState } from 'react';
import GoldCoin from './GoldCoin';

const TEAM_IMAGES = {
  ceo: 'https://d64gsuwffb70l.cloudfront.net/6895f6bbeb00a8ae7951fdbf_1772015416550_b9a313fd.jfif',
  operations: 'https://d64gsuwffb70l.cloudfront.net/6895f6bbeb00a8ae7951fdbf_1772015424299_0f3c670d.jfif',
  partnerships: 'https://d64gsuwffb70l.cloudfront.net/6895f6bbeb00a8ae7951fdbf_1772015440235_d0c75b32.jpeg',
  yemisi: 'https://d64gsuwffb70l.cloudfront.net/698c74038d655b8d24d48fd8_1772116519924_d0c956b6.jpg',
};


const UK_OurTeam: React.FC = () => {
  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  const leadership = [
    {
      name: 'Simileoluwa Adeoye',
      role: 'Chief Executive Officer',
      image: TEAM_IMAGES.ceo,
      bio: `Simileoluwa Adeoye is an accomplished Business Development Leader with expertise in scaling operations and securing strategic partnerships across key markets. She is proficient in Project Management, Payment System Integrations, and Implementation of Compliance Frameworks. She is currently the Acting Managing Director, CashToken Rewards International, UK.`,
      linkedin: 'https://www.linkedin.com/in/simi-daphne-adeoye-5939a31b7/',
    },
    {
      name: 'Job Precious',
      role: 'Head of Operations',
      image: TEAM_IMAGES.operations,
      bio: `Job Precious Chikaike brings a unique blend of financial expertise, product leadership, and data-driven innovation to the organization.\n\nWith a strong foundation in the financial services sector, he began his career in banking, where he gained valuable experience in operations, compliance, and customer-centric financial solutions. His transition into financial technology and digital product environments has enabled him to play key roles in building and scaling technology-driven platforms, including contributing to international expansion initiatives and leading end-to-end product testing and integration across multiple markets.\n\nPrecious is a certified Data Analyst with expertise in Excel, SQL, Power BI, and Tableau, bringing analytical rigor to strategic decision-making and product optimization. His ability to bridge the gap between business needs and technical execution has been instrumental in delivering reliable, scalable, and customer-focused solutions.\n\nBeyond his work in finance and technology, he is also an entrepreneur and creative business leader, demonstrating versatility, resilience, and a deep commitment to excellence across industries.\n\nAt his core, Precious is passionate about leveraging technology, data, and strategic partnerships to drive innovation, expand access to financial opportunities, and deliver meaningful value to customers globally.`,
      linkedin: 'https://www.linkedin.com/in/precious-job-a37a7b101/',
    },
    {
      name: 'Happiness Louis',
      role: 'Strategic Partnerships Lead',
      image: TEAM_IMAGES.partnerships,
      bio: `Happiness Louis is a result-driven Business Development Executive with over 2 years of experience. She specializes in driving business growth through strategic partnerships and effective project management.\n\nFluent in English and conversational in French, she thrives in diverse environments and excels in developing strong relationships with clients and partners. Her expertise includes merchant acquisition, account management, and territory expansion. She is passionate about creating value in any setting she finds herself in and always eager to explore new opportunities.`,
      linkedin: 'https://www.linkedin.com/in/happinesslouisemeh/',
    },
    {
      name: 'Yemisi',
      role: 'Senior Business Development Manager',
      image: TEAM_IMAGES.yemisi,
      bio: `Yemisi is a dynamic Senior Business Development Manager with a proven track record in identifying growth opportunities, forging strategic partnerships, and driving revenue across diverse markets. With deep expertise in stakeholder engagement, market analysis, and commercial strategy, she plays a pivotal role in expanding CashToken's footprint and strengthening relationships with key partners.\n\nHer passion for building meaningful business connections and delivering measurable results makes her an invaluable asset to the CashToken leadership team.`,
      linkedin: '#',
    },
  ];


  const boardMembers = [
    {
      name: 'Owolabi Awosan',
      role: 'Board Chairman',
      initials: 'OA',
      image: null,
      bio: `Owolabi Awosan is commercially astute and an innovative strategist capable of implementing effective controls to ensure that project progress remains in line with defined timeframes, quality standards, and in line with business objectives.\n\nMr. Owolabi up until recently was the Chief Inspection Officer to the Greater Group.`,
    },
    {
      name: 'Lai Labode',
      role: 'Director',
      initials: 'LL',
      image: null,
      bio: `Lai Labode is the Founder and MD of CashToken Rewards Africa and Principal Partner at SaltinGStein Limited, a technology and business consulting firm. A business logic expert with deep knowledge of African emerging markets, he also represents SaltinGStein and initiated the idea for CeLD Innovations Limited.\n\nLai studied Corporate Restructuring, Mergers and Acquisitions at Harvard Business School, and holds a degree in Accounting and a Diploma in Law from the University of Abuja.`,
    },
    {
      name: 'Simileoluwa Adeoye',
      role: 'Managing Director',
      initials: 'SA',
      image: TEAM_IMAGES.ceo,
      bio: `Simileoluwa Adeoye is an accomplished Business Development Leader with expertise in scaling operations and securing strategic partnerships across key markets. She is proficient in Project Management, Payment System Integrations, and Implementation of Compliance Frameworks.\n\nShe is currently the Acting Managing Director, CashToken Rewards International, UK.`,
    },
    {
      name: 'Rachel Odunuga',
      role: 'Director',
      initials: 'RO',
      image: null,
      bio: `Rachel Odunuga, an accomplished business leader, is the CEO/MD of Fitcare Health, a premium wellness brand with operations in London, UK and Lagos, Nigeria, serving clients locally and shipping products worldwide.\n\nShe is a graduate of Accounting & Finance from the University of Essex. She has years of UK experience as a Business Analyst for both luxury brands and startups, delivering operational excellence and strategic growth.`,
    },
    {
      name: 'Ehianeta Ebhohimhen',
      role: 'Director',
      initials: 'EE',
      image: null,
      bio: `Ehianeta Mondritz Ebhohimhen has worked as Head of Construction & Telecommunications in the Banking and Oil & Gas sectors. The group leverages on his wealth of experience in business and development in these sectors.`,
    },
    {
      name: 'Michael Terungwa',
      role: 'Director',
      initials: 'MT',
      image: null,
      bio: `Michael Terungwa is the Chief Technology Officer of CeLD Innovations Limited. He is a strategic technology leader with experience in Digital Architecture, Cloud Infrastructure, Software Engineering, and Supply Chain Operations.\n\nHe has a background in Food Science and Supply Chain Management.`,
    },
  ];


  const toggleBio = (name: string) => {
    setExpandedBio(expandedBio === name ? null : name);
  };

  const truncateBio = (bio: string, maxLength: number = 200) => {
    if (bio.length <= maxLength) return bio;
    return bio.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative py-16 lg:py-24" style={{
        background: 'radial-gradient(circle at 30% 20%, #A52228 0%, #7B0F14 40%, #4A0A0D 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <GoldCoin size={56} className="mx-auto mb-4" />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">About Us</h1>

          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Meet the passionate leaders driving CashToken's mission to revolutionise rewards across the United Kingdom.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{
          background: 'radial-gradient(circle, white 0%, transparent 70%)',
          transform: 'translate(30%, -30%)'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Leadership Team */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FDF2F2] text-[#7B0F14] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Leadership Team
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            The People Behind <span className="text-[#7B0F14]">CashToken</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our leadership team brings together decades of experience in fintech, business development, and strategic partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">

          {leadership.map((member) => {
            const isExpanded = expandedBio === member.name;
            const bioText = isExpanded ? member.bio : truncateBio(member.bio);
            const needsTruncation = member.bio.length > 200;

            return (
              <div key={member.name} className="group">
                <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <GoldCoin size={20} />
                        <span className="text-[#7B0F14] text-xs font-semibold uppercase tracking-wider">
                          {member.role}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {bioText}
                      </p>

                      {needsTruncation && (
                        <button
                          onClick={() => toggleBio(member.name)}
                          className="mt-3 text-[#7B0F14] text-sm font-semibold hover:underline inline-flex items-center gap-1 transition-colors"
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#7B0F14] text-sm font-semibold hover:text-[#A52228] transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Board of Directors */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Board of Directors
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Governance & <span className="text-[#7B0F14]">Oversight</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our board provides strategic guidance and ensures the highest standards of corporate governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {boardMembers.map((member) => {
            const bioKey = `board-${member.name}`;
            const isExpanded = expandedBio === bioKey;
            const bioText = isExpanded ? member.bio : truncateBio(member.bio);
            const needsTruncation = member.bio.length > 200;

            return (
              <div key={bioKey} className="group">
                <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 h-full flex flex-col">
                  {/* Image or Placeholder */}
                  <div className="relative h-72 overflow-hidden bg-gray-100">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#7B0F14] to-[#A52228] flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                        <span className="text-white text-5xl font-bold opacity-80">{member.initials}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <GoldCoin size={20} />
                        <span className="text-[#7B0F14] text-xs font-semibold uppercase tracking-wider">
                          {member.role}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {bioText}
                      </p>

                      {needsTruncation && (
                        <button
                          onClick={() => toggleBio(bioKey)}
                          className="mt-3 text-[#7B0F14] text-sm font-semibold hover:underline inline-flex items-center gap-1 transition-colors"
                        >
                          {isExpanded ? 'Read Less' : 'Read More'}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


        {/* Values */}
        <div className="bg-gradient-to-br from-[#FDF2F2] to-[#FFF8F0] rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
            <p className="text-gray-500 mt-2">The principles that guide everything we do at CashToken.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Innovation',
                desc: 'Pioneering the future of universal rewards in the UK with cutting-edge fintech solutions.',
                icon: 'lightbulb',
              },
              {
                title: 'Integrity',
                desc: 'Building trust through transparency, fairness, and ethical business practices.',
                icon: 'shield',
              },
              {
                title: 'Inclusion',
                desc: 'Rewards for every citizen, every community, every day — no one left behind.',
                icon: 'users',
              },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B0F14] to-[#A52228] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-900/20">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    {value.icon === 'lightbulb' && (
                      <>
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                      </>
                    )}
                    {value.icon === 'shield' && (
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    )}
                    {value.icon === 'users' && (
                      <>
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{value.title}</h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UK_OurTeam;