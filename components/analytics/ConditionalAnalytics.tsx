'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';

export function ConditionalAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    setHasConsent(consent === 'accepted');
  }, []);

  if (!hasConsent) return null;

  return <Analytics />;
}
