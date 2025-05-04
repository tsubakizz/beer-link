import React from 'react';

interface GlossaryCardProps {
  title: string;
  description: string;
}

// ビール用語に対応するアイコンを返す関数
const getTermIcon = (title: string) => {
  // タイトルに含まれるキーワードでアイコンを決定
  if (title.includes('ABV') || title.includes('アルコール')) {
    return (
      <svg
        className="w-5 h-5 text-amber-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17A3 3 0 015 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        />
        <path d="M9 11H3a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1v-2a1 1 0 00-1-1z" />
      </svg>
    );
  } else if (title.includes('IBU') || title.includes('苦味')) {
    return (
      <svg
        className="w-5 h-5 text-amber-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707L15.414 4a1 1 0 01.707 1.707l-7 7a1 1 0 01-1.414 0l-3-3A1 1 0 015 8.414l2.293 2.293 6.293-6.293a1 1 0 01.707-.293z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (title.includes('ホップ')) {
    return (
      <svg
        className="w-5 h-5 text-green-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (title.includes('モルト')) {
    return (
      <svg
        className="w-5 h-5 text-amber-700"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (title.includes('エール')) {
    return (
      <svg
        className="w-5 h-5 text-amber-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 118 4a7.998 7.998 0 015.316 2.014c.3.376.267.93-.074 1.275L11.5 9 14 7.5l.742.742z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (title.includes('ラガー')) {
    return (
      <svg
        className="w-5 h-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5 3a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-.5c0 1.5.5 3 2.5 3v2c-4.667 0-6.5-2-7.5-4h-1A4.5 4.5 0 0111 17.5V12h1.423a5.977 5.977 0 01.615 1.006c.765 1.58 2.248 2.994 4.962 2.994v-1c-2.083 0-3-1.5-3-3h.5A2.5 2.5 0 0018 9.5V5a2 2 0 01-2-2H7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      </svg>
    );
  } else {
    // デフォルトのアイコン
    return (
      <svg
        className="w-5 h-5 text-amber-600"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
};

export default function GlossaryCard({
  title,
  description,
}: GlossaryCardProps) {
  return (
    <div className="bg-white rounded-lg border-l-3 border-amber-400 hover:shadow-sm transition-all duration-300">
      <div className="p-3">
        <div className="flex items-center mb-1.5">
          <span className="bg-amber-50 p-1 rounded-full mr-2 flex-shrink-0">
            {getTermIcon(title)}
          </span>
          <h3 className="text-base sm:text-lg font-medium text-amber-800 line-clamp-1">
            {title}
          </h3>
        </div>

        <div className="text-gray-600 leading-relaxed text-sm">
          {description}
        </div>

        {/* タイトルに応じた補足情報やビジュアル要素 */}
        {title.includes('ABV') && (
          <div className="mt-2 bg-amber-50 p-2 rounded-md text-xs">
            <div className="flex justify-between items-center mb-1">
              <span>ライト</span>
              <span>ストロング</span>
            </div>
            <div className="w-full h-1.5 bg-gradient-to-r from-green-300 via-amber-300 to-red-400 rounded-full"></div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>3-4%</span>
              <span>5-7%</span>
              <span>8%+</span>
            </div>
          </div>
        )}

        {title.includes('IBU') && (
          <div className="mt-2 bg-amber-50 p-2 rounded-md text-xs">
            <div className="flex justify-between items-center mb-1">
              <span>穏やか</span>
              <span>苦め</span>
            </div>
            <div className="w-full h-1.5 bg-gradient-to-r from-green-300 via-amber-300 to-red-400 rounded-full"></div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>5-20</span>
              <span>20-40</span>
              <span>40+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
