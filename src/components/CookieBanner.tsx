import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const [prefs, setPrefs] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const hasConsent = localStorage.getItem('ailabs_cookie_consent');
    if (hasConsent) {
      try {
        setPrefs(JSON.parse(hasConsent));
      } catch (e) {
        console.error('Error parsing cookie consent', e);
      }
    } else {
      setShow(true);
    }

    const openListener = () => {
      setShow(true);
      setShowDetails(true);
    };
    window.addEventListener('open-cookie-banner', openListener);
    return () => window.removeEventListener('open-cookie-banner', openListener);
  }, []);

  if (!show) return null;

  const handleSave = (newPrefs: typeof prefs) => {
    localStorage.setItem('ailabs_cookie_consent', JSON.stringify(newPrefs));
    setPrefs(newPrefs);
    setShow(false);
  };

  const acceptAll = () => {
    handleSave({ essential: true, analytics: true, marketing: true });
  };

  const rejectOptional = () => {
    handleSave({ essential: true, analytics: false, marketing: false });
  };

  const savePreferences = () => {
    handleSave(prefs);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 flex justify-center pointer-events-none animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="w-full max-w-3xl bg-bg border border-border shadow-md rounded-[20px] p-6 lg:p-8 pointer-events-auto">
        {!showDetails ? (
          <div>
            <h3 className="text-[18px] font-semibold text-ink-900 mb-2">Cookie Preferences</h3>
            <p className="text-[14px] text-text-secondary mb-6 leading-relaxed">
              We use cookies to ensure the platform works properly and for analytics to improve your experience. You can read more in our <Link to="/cookie-policy" className="text-accent hover:underline">Cookie Policy</Link>.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={acceptAll} variant="primary">Accept All</Button>
              <Button onClick={rejectOptional} variant="secondary">Essential Only</Button>
              <Button onClick={() => setShowDetails(true)} variant="ghost" className="ml-auto">Settings</Button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-[18px] font-semibold text-ink-900 mb-6">Cookie Settings</h3>
            
            <div className="flex flex-col gap-5 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-border">
                <div>
                  <div className="font-semibold text-[15px] text-ink-900">Essential Cookies</div>
                  <div className="text-[13px] text-text-tertiary max-w-lg mt-1">Required for the site to function properly (sessions, themes). Cannot be disabled.</div>
                </div>
                <div className="bg-bg-subtle px-3 py-1.5 rounded-lg text-[12px] font-semibold text-text-secondary border border-border">Always Active</div>
              </div>
              
              <label className="flex justify-between items-center cursor-pointer pb-4 border-b border-border group">
                <div>
                  <div className="font-semibold text-[15px] text-ink-900">Analytics</div>
                  <div className="text-[13px] text-text-tertiary max-w-lg mt-1">Helps us understand how you use the platform through anonymous data.</div>
                </div>
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-border-strong rounded bg-bg checked:bg-accent checked:border-accent transition-colors cursor-pointer"
                    checked={prefs.analytics}
                    onChange={e => setPrefs({...prefs, analytics: e.target.checked})}
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 placeholder:transition-opacity" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </label>
              
              <label className="flex justify-between items-center cursor-pointer group">
                <div>
                  <div className="font-semibold text-[15px] text-ink-900">Marketing</div>
                  <div className="text-[13px] text-text-tertiary max-w-lg mt-1">Used for personalized advertisements through third parties.</div>
                </div>
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-border-strong rounded bg-bg checked:bg-accent checked:border-accent transition-colors cursor-pointer"
                    checked={prefs.marketing}
                    onChange={e => setPrefs({...prefs, marketing: e.target.checked})}
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 placeholder:transition-opacity" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </label>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button onClick={savePreferences} variant="primary">Save Preferences</Button>
              <Button onClick={() => setShowDetails(false)} variant="ghost">Back</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
