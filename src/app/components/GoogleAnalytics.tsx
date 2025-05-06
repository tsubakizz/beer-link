'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/src/app/lib/firebase';
import { logEvent } from 'firebase/analytics';

// SearchParamsを使用するコンポーネント
function AnalyticsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!analytics) return;

    const url =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // GA4でページビューを記録
    logEvent(analytics, 'page_view', {
      page_path: pathname,
      page_location: url,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export const GoogleAnalytics = () => {
  // クライアントサイドのみで実行されるようにチェック
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // サーバーサイドレンダリング時は何もレンダリングしない
  if (!isMounted) return null;

  // useSearchParamsを使用するコンポーネントをSuspenseでラップ
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
};

export default GoogleAnalytics;
