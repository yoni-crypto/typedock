'use client';

import { useState, useEffect } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    window.location.reload();
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-2xl z-50 animate-slideUp">
      <button
        onClick={() => setShow(false)}
        className="absolute top-3 right-3 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="p-5">
        <p className="text-sm text-stone-600 dark:text-stone-400 pr-6">
          We use cookies for analytics. 
          <a href="/privacy" className="underline hover:text-stone-900 dark:hover:text-stone-100">Privacy</a>
        </p>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={decline}
            className="flex-1 px-4 py-2 text-sm border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 px-4 py-2 text-sm bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
