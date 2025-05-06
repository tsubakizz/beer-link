'use client';

import { Suspense, lazy } from 'react';

// GoogleAnalyticsを動的インポート
const GoogleAnalytics = lazy(() => import('./GoogleAnalytics'));

export default function ClientAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalytics />
    </Suspense>
  );
}
