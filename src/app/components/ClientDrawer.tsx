'use client';

import { Suspense, lazy } from 'react';

// DrawerMenuを動的インポート
const DrawerMenu = lazy(() => import('./DrawerMenu'));

export default function ClientDrawer() {
  return (
    <Suspense fallback={null}>
      <DrawerMenu />
    </Suspense>
  );
}
