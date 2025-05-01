import type { Metadata } from 'next';
import { Montserrat, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../src/app/lib/auth-context';
import BubbleAnimation from '../src/app/components/BubbleAnimation';
import Navigation from '../src/app/components/Navigation';
import Footer from '../src/app/components/Footer';
import DrawerMenu from '../src/app/components/DrawerMenu';

// Montserrat(英語)とNoto Sans JP(日本語)のフォントを組み合わせて使用
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
});

// メタデータのエクスポート
export const metadata: Metadata = {
  title: "Let's Beer - クラフトビールファンサイト",
  description:
    'クラフトビールの種類や味わい、ブルワリー情報を初心者から愛好家まで楽しめるファンサイト',
};

// サーバーコンポーネントとしてのRootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="beer">
      <body
        className={`${montserrat.variable} ${notoSansJP.variable} font-noto-sans-jp antialiased min-h-screen flex flex-col`}
      >
        {/* AuthProviderをドロワー全体にラップ */}
        <AuthProvider>
          {/* ドロワーコンポーネントでラップ */}
          <div className="drawer">
            <input id="beer-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* 通常コンテンツ */}
              {/* ヘッダー部分 - ビールのグラデーションカラーと泡のアニメーションを追加 */}
              <header className="relative bg-gradient-to-br from-amber-300 via-amber-400 to-amber-300 text-amber-900 shadow-lg overflow-hidden">
                <BubbleAnimation />
                <div className="container mx-auto relative z-10">
                  <Navigation />
                </div>
              </header>

              {/* メインコンテンツエリア */}
              <main className="flex-grow container mx-auto p-5 relative z-10">
                {children}
              </main>

              {/* フッター部分 */}
              <Footer />
            </div>

            {/* ドロワーサイド（ハンバーガーメニューの内容） */}
            <DrawerMenu />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
