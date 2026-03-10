import React, { useState } from 'react';
import GoldCoin from './GoldCoin';

interface BusinessSignupProps {
  onSignupComplete: () => void;
  onSignIn: () => void;
}

const UK_BusinessSignup: React.FC<BusinessSignupProps> = ({ onSignupComplete, onSignIn }) => {
  const [signupMethod, setSignupMethod] = useState<'phone' | 'email'>('phone');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    referrerCode: '',
    companyName: '',
    companyRegNumber: '',
    registeredAddress: '',
    city: '',
    contactPersonName: '',
    contactPersonPhone: '',
    termsAccepted: false,
    dataProtectionAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (signupMethod === 'phone') {
      if (!formData.phone) e.phone = 'Phone number is required';
      else if (!/^0[0-9]{10}$/.test(formData.phone.replace(/\s/g, '')))
        e.phone = 'Please enter a valid UK phone number (e.g. 07123 456789)';
    } else {
      if (!formData.email) e.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = 'Please enter a valid email address';
    }
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      e.password = 'Password must contain uppercase, lowercase and a number';
    if (!formData.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!formData.companyName) e.companyName = 'Business name is required';
    if (formData.companyRegNumber && !/^[0-9]{8}$/.test(formData.companyRegNumber))
      e.companyRegNumber = 'Must be 8 digits (Companies House number)';
    if (!formData.registeredAddress) e.registeredAddress = 'Registered address is required';
    if (!formData.city) e.city = 'City is required';
    if (!formData.contactPersonName) e.contactPersonName = 'Contact person name is required';
    if (!formData.contactPersonPhone) e.contactPersonPhone = 'Contact person phone number is required';
    else if (!/^0[0-9]{10}$/.test(formData.contactPersonPhone.replace(/\s/g, '')))
      e.contactPersonPhone = 'Please enter a valid UK phone number';
    if (!formData.termsAccepted) e.termsAccepted = 'You must accept the terms of service';
    if (!formData.dataProtectionAccepted) e.dataProtectionAccepted = 'You must accept the data protection policy';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateStep2()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    onSignupComplete();
  };

  const ic = (field: string) =>
    `w-full p-3 rounded-md border ${errors[field] ? 'border-red-400 bg-red-50/30' : 'border-gray-300'} focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm transition-colors`;
  const lc = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#7B0F14] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <GoldCoin size={36} />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wider text-white">CASHTOKEN</span>
            <span className="text-[9px] font-semibold tracking-[0.15em] text-[#DAA520]">REWARD INTERNATIONAL</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 sm:px-10 pt-8 pb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create Your New CashToken Business Account</h1>
            {step === 2 && <p className="text-sm text-gray-500 mt-1">Step 2 of 2 — Business Details</p>}
          </div>

          <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-8">
            {step === 1 && (
              <>
                <div className="flex rounded-md border border-gray-300 overflow-hidden mb-6">
                  <button type="button" onClick={() => setSignupMethod('phone')} className={`flex-1 py-2.5 text-sm font-medium transition-colors ${signupMethod === 'phone' ? 'bg-white text-[#7B0F14] border-b-2 border-[#7B0F14]' : 'bg-[#F4E6E6] text-gray-600 hover:bg-gray-200'}`}>Sign up with Phone</button>
                  <button type="button" onClick={() => setSignupMethod('email')} className={`flex-1 py-2.5 text-sm font-medium transition-colors ${signupMethod === 'email' ? 'bg-white text-[#7B0F14] border-b-2 border-[#7B0F14]' : 'bg-[#F4E6E6] text-gray-600 hover:bg-gray-200'}`}>Sign up with Email</button>
                </div>

                {signupMethod === 'phone' ? (
                  <div className="mb-5">
                    <label className={lc}>Phone number</label>
                    <p className="text-xs text-gray-500 mb-2">Please ensure to enter a valid phone number. We will attempt to verify this phone number in the next step.</p>
                    <div className="flex">
                      <div className="flex items-center gap-2 px-3 py-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 min-w-[110px]">
                        <svg width="20" height="14" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm flex-shrink-0"><rect width="60" height="40" fill="#00247D"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#CF142B" strokeWidth="4"/><path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10"/><path d="M30,0 V40 M0,20 H60" stroke="#CF142B" strokeWidth="6"/></svg>
                        <span className="text-sm text-gray-700 font-medium">+44</span>
                      </div>
                      <input type="tel" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="07123 456789" className={`flex-1 p-3 rounded-r-md border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-gray-300'} focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm`} />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                ) : (
                  <div className="mb-5">
                    <label className={lc}>Business Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="business@company.co.uk" className={ic('email')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className={lc}>Choose Your Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => updateField('password', e.target.value)} placeholder="Enter your password" className={ic('password')} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}</svg>
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    {formData.password && (
                      <div className="flex gap-1 mt-2">
                        {[1,2,3,4].map(i => <div key={i} className="h-1 flex-1 rounded-full transition-colors" style={{ backgroundColor: formData.password.length >= i*3 ? (formData.password.length >= 12 ? '#22C55E' : formData.password.length >= 8 ? '#DAA520' : '#EF4444') : '#E5E7EB' }} />)}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className={lc}>Confirm Password</label>
                    <div className="relative">
                      <input type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} placeholder="Confirm your password" className={ic('confirmPassword')} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{showConfirmPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}</svg>
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className={lc}>Referrer Code <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input type="text" value={formData.referrerCode} onChange={(e) => updateField('referrerCode', e.target.value)} placeholder="Enter referrer code if any" className={ic('referrerCode')} />
                </div>

                <button type="button" onClick={handleNextStep} className="w-full py-3 rounded-md bg-[#7B0F14] text-white font-semibold text-sm hover:bg-[#5A0B10] transition-colors">Continue to Business Details</button>
              </>
            )}

            {step === 2 && (
              <>
                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-[#7B0F14] hover:text-[#5A0B10] font-medium mb-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  Back to Step 1
                </button>

                <div className="mb-4">
                  <label className={lc}>Business Name *</label>
                  <input type="text" value={formData.companyName} onChange={(e) => updateField('companyName', e.target.value)} placeholder="e.g. Acme Ltd" className={ic('companyName')} />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>

                <div className="mb-4">
                  <label className={lc}>Company Registration Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                  <input type="text" value={formData.companyRegNumber} onChange={(e) => updateField('companyRegNumber', e.target.value)} placeholder="8-digit Companies House number" maxLength={8} className={ic('companyRegNumber')} />
                  {errors.companyRegNumber && <p className="text-red-500 text-xs mt-1">{errors.companyRegNumber}</p>}
                  <p className="text-xs text-gray-400 mt-1">Optional — enter if your business is registered with Companies House</p>
                </div>

                <div className="mb-4">
                  <label className={lc}>Registered Business Address *</label>
                  <input type="text" value={formData.registeredAddress} onChange={(e) => updateField('registeredAddress', e.target.value)} placeholder="Street address" className={ic('registeredAddress')} />
                  {errors.registeredAddress && <p className="text-red-500 text-xs mt-1">{errors.registeredAddress}</p>}
                </div>

                <div className="mb-4">
                  <label className={lc}>City *</label>
                  <input type="text" value={formData.city} onChange={(e) => updateField('city', e.target.value)} placeholder="e.g. London" className={ic('city')} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={lc}>Contact Person Name *</label>
                    <input type="text" value={formData.contactPersonName} onChange={(e) => updateField('contactPersonName', e.target.value)} placeholder="Full name" className={ic('contactPersonName')} />
                    {errors.contactPersonName && <p className="text-red-500 text-xs mt-1">{errors.contactPersonName}</p>}
                  </div>
                  <div>
                    <label className={lc}>Contact Person Phone Number *</label>
                    <div className="flex">
                      <div className="flex items-center gap-1.5 px-2.5 py-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 min-w-[90px]">
                        <svg width="18" height="12" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="rounded-sm flex-shrink-0"><rect width="60" height="40" fill="#00247D"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="6"/><path d="M0,0 L60,40 M60,0 L0,40" stroke="#CF142B" strokeWidth="4"/><path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="10"/><path d="M30,0 V40 M0,20 H60" stroke="#CF142B" strokeWidth="6"/></svg>
                        <span className="text-xs text-gray-700 font-medium">+44</span>
                      </div>
                      <input type="tel" value={formData.contactPersonPhone} onChange={(e) => updateField('contactPersonPhone', e.target.value)} placeholder="07123 456789" className={`flex-1 p-3 rounded-r-md border ${errors.contactPersonPhone ? 'border-red-400 bg-red-50/30' : 'border-gray-300'} focus:border-[#7B0F14] focus:ring-2 focus:ring-[#7B0F14]/20 outline-none text-sm`} />
                    </div>
                    {errors.contactPersonPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPersonPhone}</p>}
                  </div>
                </div>

                <div className="bg-[#F4E6E6] border border-[#D4A0A0] rounded-md p-4 mb-5">
                  <div className="flex gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B0F14" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    <div className="text-xs text-[#5A0B10]">
                      <p className="font-semibold mb-1">UK Regulatory Compliance</p>
                      <p>By registering, your business agrees to comply with the Financial Conduct Authority (FCA) regulations, UK Anti-Money Laundering (AML) requirements, and the Data Protection Act 2018 (UK GDPR). We may require additional KYB (Know Your Business) documentation for verification.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.termsAccepted} onChange={(e) => updateField('termsAccepted', e.target.checked)} className="w-4 h-4 rounded accent-[#7B0F14] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">I agree to the <a href="https://ng.cashtoken.africa/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#7B0F14] hover:underline font-medium">terms of service</a> and <a href="https://ng.cashtoken.africa/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[#7B0F14] hover:underline font-medium">privacy policy</a>.</span>
                  </label>
                  {errors.termsAccepted && <p className="text-red-500 text-xs ml-7">{errors.termsAccepted}</p>}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.dataProtectionAccepted} onChange={(e) => updateField('dataProtectionAccepted', e.target.checked)} className="w-4 h-4 rounded accent-[#7B0F14] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">I consent to the processing of business data in accordance with the UK GDPR and Data Protection Act 2018.</span>
                  </label>
                  {errors.dataProtectionAccepted && <p className="text-red-500 text-xs ml-7">{errors.dataProtectionAccepted}</p>}
                </div>

                <button type="submit" disabled={submitting} className={`w-full py-3 rounded-md font-semibold text-sm text-white transition-colors ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7B0F14] hover:bg-[#5A0B10]'}`}>
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating Account...
                    </span>
                  ) : 'Submit'}
                </button>
              </>
            )}

            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">Already have an account? <button type="button" onClick={onSignIn} className="text-[#7B0F14] hover:underline font-medium">Sign In</button></p>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">&copy; 2026 CASHTOKEN</p>
          <div className="flex items-center gap-6">
            <a href="https://ng.cashtoken.africa/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#7B0F14] font-medium">TERMS</a>
            <a href="https://ng.cashtoken.africa/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#7B0F14] font-medium">PRIVACY POLICY</a>
            <a href="#" className="text-xs text-gray-500 hover:text-[#7B0F14] font-medium">SUPPORT</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UK_BusinessSignup;