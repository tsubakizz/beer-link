'use client';

import { useState, useEffect } from 'react';
import {
  Beer,
  BeerStyle,
  beers,
  beerStyles,
} from '../../src/app/lib/beers-data';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BeersPage() {
  // State for filtering and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('rating');
  const [filteredBeers, setFilteredBeers] = useState<Beer[]>(beers);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...beers];

    // Apply style filter
    if (selectedStyle) {
      result = result.filter((beer) => beer.style === selectedStyle);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (beer) =>
          beer.name.toLowerCase().includes(query) ||
          beer.brewery.toLowerCase().includes(query) ||
          beer.description.toLowerCase().includes(query) ||
          beer.flavors.some((flavor) => flavor.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortOption) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'abv':
        result.sort((a, b) => b.abv - a.abv);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setFilteredBeers(result);
  }, [searchQuery, selectedStyle, sortOption]);

  // Get beer style name by ID
  const getBeerStyleName = (styleId: string): string => {
    const style = beerStyles.find((style) => style.id === styleId);
    return style ? style.name : styleId;
  };

  // Get color based on beer style
  const getStyleColor = (styleId: string): string => {
    const styleColors: { [key: string]: string } = {
      lager: 'bg-amber-200',
      ipa: 'bg-orange-200',
      stout: 'bg-stone-800',
      porter: 'bg-stone-700',
      pale_ale: 'bg-amber-300',
      wheat: 'bg-yellow-100',
      pilsner: 'bg-yellow-200',
      sour: 'bg-red-200',
    };
    return styleColors[styleId] || 'bg-amber-100';
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      {/* ヒーローセクション */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-repeat" style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")', 
            backgroundSize: '12px 12px' 
          }}></div>
        </div>
        
        <div className="relative z-10 px-6 py-16 md:py-20 text-center">
          <div className="inline-block mb-6">
            <svg className="w-16 h-16 mx-auto text-amber-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15 5.50002C15 5.23501 15.1054 4.98046 15.2929 4.7929C15.4804 4.60537 15.7348 4.50003 16 4.50003H19C19.2652 4.50003 19.5196 4.60537 19.7071 4.7929C19.8946 4.98046 20 5.23501 20 5.50002V7.50002C20 7.76503 19.8946 8.01958 19.7071 8.20711C19.5196 8.39464 19.2652 8.49998 19 8.49998H16C15.7348 8.49998 15.4804 8.39464 15.2929 8.20711C15.1054 8.01958 15 7.76503 15 7.50002V5.50002Z M11 4.50002C11 4.23501 11.1054 3.98046 11.2929 3.7929C11.4804 3.60537 11.7348 3.50003 12 3.50003H13C13.2652 3.50003 13.5196 3.60537 13.7071 3.7929C13.8946 3.98046 14 4.23501 14 4.50002V8.49998C14 8.76499 13.8946 9.01954 13.7071 9.20707C13.5196 9.3946 13.2652 9.49994 13 9.49994H12C11.7348 9.49994 11.4804 9.3946 11.2929 9.20707C11.1054 9.01954 11 8.76499 11 8.49998V4.50002Z M7 7.50002C7 7.23501 7.10536 6.98046 7.29289 6.7929C7.48043 6.60537 7.73478 6.50003 8 6.50003H9C9.26522 6.50003 9.51957 6.60537 9.70711 6.7929C9.89464 6.98046 10 7.23501 10 7.50002V8.49998C10 8.76499 9.89464 9.01954 9.70711 9.20707C9.51957 9.3946 9.26522 9.49994 9 9.49994H8C7.73478 9.49994 7.48043 9.3946 7.29289 9.20707C7.10536 9.01954 7 8.76499 7 8.49998V7.50002Z M8 2.0498C8.49445 2.0498 8.96141 2.28138 9.29471 2.66337C9.62801 3.04535 9.79737 3.5542 9.76938 4.06998H13.7694C13.7413 3.5542 13.9107 3.04535 14.244 2.66337C14.5773 2.28138 15.0442 2.0498 15.5387 2.0498C16.0332 2.0498 16.5001 2.28138 16.8334 2.66337C17.1667 3.04535 17.3361 3.5542 17.308 4.06998H20C20.5304 4.06998 21.0391 4.2825 21.4142 4.65919C21.7893 5.03587 22 5.55018 22 6.08498V8.08494C22 8.61974 21.7893 9.13405 21.4142 9.51073C21.0391 9.88742 20.5304 10.0999 20 10.0999H19.8294L19 19.9499C19 20.485 18.7893 20.9995 18.4142 21.3766C18.0391 21.7537 17.5304 21.9666 17 21.9666H7C6.46957 21.9666 5.96086 21.7537 5.58579 21.3766C5.21071 20.9995 5 20.485 5 19.9499L4.17062 10.0999H4C3.46957 10.0999 2.96086 9.88742 2.58579 9.51073C2.21071 9.13405 2 8.61974 2 8.08494V6.08498C2 5.55018 2.21071 5.03587 2.58579 4.65919C2.96086 4.2825 3.46957 4.06998 4 4.06998H6.69245C6.66438 3.5542 6.83374 3.04535 7.16704 2.66337C7.50034 2.28138 7.9673 2.0498 8.46175 2.0498H8ZM8.5 4.0498C8.36739 4.0498 8.24021 3.99714 8.14645 3.90338C8.05268 3.80962 8 3.68243 8 3.54983C8 3.41722 8.05268 3.29003 8.14645 3.19627C8.24021 3.10251 8.36739 3.04983 8.5 3.04983C8.63261 3.04983 8.75979 3.10251 8.85355 3.19627C8.94732 3.29003 9 3.41722 9 3.54983C9 3.68243 8.94732 3.80962 8.85355 3.90338C8.75979 3.99714 8.63261 4.0498 8.5 4.0498ZM15.5 4.0498C15.3674 4.0498 15.2402 3.99714 15.1464 3.90338C15.0527 3.80962 15 3.68243 15 3.54983C15 3.41722 15.0527 3.29003 15.1464 3.19627C15.2402 3.10251 15.3674 3.04983 15.5 3.04983C15.6326 3.04983 15.7598 3.10251 15.8536 3.19627C15.9473 3.29003 16 3.41722 16 3.54983C16 3.68243 15.9473 3.80962 15.8536 3.90338C15.7598 3.99714 15.6326 4.0498 15.5 4.0498Z M7 5.06998H4C3.73478 5.06998 3.48043 5.17534 3.29289 5.36288C3.10536 5.55041 3 5.80477 3 6.06998V8.06998C3 8.3352 3.10536 8.58955 3.29289 8.77709C3.48043 8.96462 3.73478 9.06998 4 9.06998H5.17062L6 18.9699C6 19.235 6.10536 19.4894 6.29289 19.6769C6.48043 19.8644 6.73478 19.9699 7 19.9699H17C17.2652 19.9699 17.5196 19.8644 17.7071 19.6769C17.8946 19.4894 18 19.235 18 18.9699L18.8294 9.06998H20C20.2652 9.06998 20.5196 8.96462 20.7071 8.77709C20.8946 8.58955 21 8.3352 21 8.06998V6.06998C21 5.80477 20.8946 5.55041 20.7071 5.36288C20.5196 5.17534 20.2652 5.06998 20 5.06998H17V7.06998C17 7.3352 16.8946 7.58955 16.7071 7.77709C16.5196 7.96462 16.2652 8.06998 16 8.06998H13C12.7348 8.06998 12.4804 7.96462 12.2929 7.77709C12.1054 7.58955 12 7.3352 12 7.06998V5.06998H11V8.06998C11 8.3352 10.8946 8.58955 10.7071 8.77709C10.5196 8.96462 10.2652 9.06998 10 9.06998H9C8.73478 9.06998 8.48043 8.96462 8.29289 8.77709C8.10536 8.58955 8 8.3352 8 8.06998V7.06998C8 7.06998 7.38 7.06998 7 7.06998V5.06998Z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-amber-900 drop-shadow-sm">ビール図鑑</h1>
          <p className="text-amber-900 max-w-2xl mx-auto text-lg">
            様々なクラフトビールの世界を探索しましょう。あなたの好みに合った一杯を見つけるための旅が、ここから始まります。
          </p>
        </div>
        
        {/* 装飾的な泡の要素 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-60" 
              style={{ 
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
              }}
            ></div>
          ))}
        </div>
      </motion.div>

      {/* フィルターと検索セクション */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl font-bold text-amber-900">探す</h2>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-sm bg-amber-100 text-amber-900 border-amber-300 gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            フィルター {isFilterOpen ? '閉じる' : '開く'}
          </button>
        </div>
        
        <div className={`bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl shadow-sm mb-8 transition-all duration-300 ${isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden p-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 検索ボックス */}
            <div>
              <label htmlFor="search" className="block mb-2 text-sm font-medium text-amber-900">
                検索
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-amber-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="ビール名、ブルワリー、または特徴を検索"
                  className="input input-bordered w-full pl-10 bg-white border-amber-200 focus:border-amber-400 text-amber-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* スタイルフィルター */}
            <div>
              <label htmlFor="style" className="block mb-2 text-sm font-medium text-amber-900">
                ビアスタイル
              </label>
              <select
                id="style"
                className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
              >
                <option value="">すべてのスタイル</option>
                {beerStyles.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 並び替え */}
            <div>
              <label htmlFor="sort" className="block mb-2 text-sm font-medium text-amber-900">
                並び替え
              </label>
              <select
                id="sort"
                className="select select-bordered w-full bg-white border-amber-200 focus:border-amber-400 text-amber-900"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="rating">評価順</option>
                <option value="name">名前順</option>
                <option value="abv">アルコール度数順</option>
                <option value="reviews">レビュー数順</option>
              </select>
            </div>
          </div>
          
          {/* フィルターリセットボタン */}
          <div className="mt-4 flex justify-end">
            <button 
              className="btn btn-sm bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100"
              onClick={() => {
                setSearchQuery('');
                setSelectedStyle('');
                setSortOption('rating');
              }}
            >
              フィルターをリセット
            </button>
          </div>
        </div>
      </motion.div>

      {/* ビールスタイルのクイックナビゲーション */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 overflow-x-auto pb-2"
      >
        <div className="flex gap-2 min-w-max px-1">
          {beerStyles.map((style) => (
            <button
              key={style.id}
              onClick={() =>
                setSelectedStyle(selectedStyle === style.id ? '' : style.id)
              }
              className={`btn btn-sm rounded-full transition-all duration-300 ${
                selectedStyle === style.id 
                ? `${getStyleColor(style.id)} text-amber-900 border-amber-400` 
                : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 結果の表示 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 flex items-center justify-between"
      >
        <p className="text-amber-800 font-medium">
          {filteredBeers.length} 件のビールが見つかりました
        </p>
        
        {/* 表示切り替え（将来的な拡張用） */}
        <div className="flex gap-2">
          <button className="btn btn-sm btn-square bg-amber-100 border-amber-200 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="btn btn-sm btn-square bg-white border-amber-200 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* ビールリスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBeers.map((beer, index) => (
          <motion.div
            key={beer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * (index % 8) }}
            className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <figure className="relative h-52">
              <div className={`absolute inset-0 ${getStyleColor(beer.style)} opacity-30`}></div>
              {beer.imageUrl ? (
                <Image
                  src={beer.imageUrl}
                  alt={beer.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-100 to-amber-200">
                  <svg className="w-16 h-16 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z" />
                  </svg>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <div className="badge badge-lg bg-amber-50 border-amber-200 text-amber-900 font-medium shadow-sm">
                  {getBeerStyleName(beer.style)}
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 bg-amber-50/90 backdrop-blur-sm text-amber-900 rounded-full px-2 py-1 shadow-sm">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold">{beer.rating.toFixed(1)}</span>
                </div>
              </div>
            </figure>
            
            <div className="card-body p-5">
              <div className="flex justify-between items-start mb-1">
                <h2 className="card-title text-xl text-amber-900 line-clamp-1">{beer.name}</h2>
              </div>
              <p className="text-sm text-amber-700 mb-2 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {beer.brewery}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="badge badge-sm bg-amber-100 border-amber-200 text-amber-900">
                  ABV {beer.abv}%
                </div>
                {beer.ibu && (
                  <div className="badge badge-sm bg-amber-100 border-amber-200 text-amber-900">
                    IBU {beer.ibu}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{beer.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {beer.flavors.slice(0, 3).map((flavor, index) => (
                  <span key={index} className="badge badge-sm bg-white border-amber-200 text-amber-800">
                    {flavor}
                  </span>
                ))}
                {beer.flavors.length > 3 && (
                  <span className="badge badge-sm bg-white border-amber-200 text-amber-800">
                    +{beer.flavors.length - 3}
                  </span>
                )}
              </div>
              
              <div className="card-actions justify-between items-center mt-auto">
                <div className="flex items-center gap-1 text-sm text-amber-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span>{beer.reviewCount}件</span>
                </div>
                <Link
                  href={`/beers/${beer.id}`}
                  className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 transition-all duration-300"
                >
                  詳細を見る
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 結果が0件の場合 */}
      {filteredBeers.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 bg-amber-50/50 rounded-xl border border-amber-100"
        >
          <svg className="w-16 h-16 mx-auto text-amber-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
          </svg>
          <h3 className="text-xl font-semibold mb-2 text-amber-900">
            条件に一致するビールが見つかりませんでした
          </h3>
          <p className="text-amber-700 mb-6">検索条件を変更してみてください</p>
          <button
            className="btn btn-outline border-amber-300 text-amber-800 hover:bg-amber-100 hover:border-amber-400"
            onClick={() => {
              setSearchQuery('');
              setSelectedStyle('');
              setSortOption('rating');
            }}
          >
            フィルターをリセット
          </button>
        </motion.div>
      )}
      
      {/* ページネーション（将来的な拡張用） */}
      {filteredBeers.length > 0 && (
        <div className="flex justify-center mt-12">
          <div className="join">
            <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">«</button>
            <button className="join-item btn btn-sm bg-amber-100 border-amber-300 text-amber-900">1</button>
            <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">2</button>
            <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">3</button>
            <button className="join-item btn btn-sm bg-white border-amber-200 text-amber-900">»</button>
          </div>
        </div>
      )}
      
      {/* アニメーション用のスタイルを追加 */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
      
      {/* 装飾的な要素 - 背景の泡 */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-amber-100 opacity-30" 
            style={{ 
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 30}s infinite ease-in-out`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
