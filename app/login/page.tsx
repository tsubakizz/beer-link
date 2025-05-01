import LoginForm from '../../src/app/components/LoginForm';

export const metadata = {
  title: "ログイン - Let's Beer",
  description:
    "Let's Beerにログインして、お気に入りのクラフトビール情報を管理しましょう。",
};

export default function LoginPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-amber-800 sm:text-4xl">
            ログイン
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg">
            アカウントにログインして、お気に入りのクラフトビールを記録したり、レビューを投稿したりしましょう。
          </p>
        </div>

        <LoginForm />

        <div className="mt-10 text-center">
          <div className="rounded-md p-4 bg-amber-50">
            <p className="text-sm text-gray-600">
              デモアカウント: <span className="font-mono">demo</span> /
              パスワード: <span className="font-mono">password</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ※このサイトは開発中のデモサイトです。実際の運用サービスではありません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
