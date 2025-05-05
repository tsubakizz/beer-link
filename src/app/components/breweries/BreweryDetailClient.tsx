'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  breweries,
  breweryTypeNames,
  regionNames,
} from '@/src/app/lib/breweries-data';
import { beers } from '@/src/app/lib/beers-data';
import { beerStyles } from '@/src/app/lib/beer-styles-data';
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/src/app/lib/firebase';

// レビュー情報の型定義
interface ReviewData {
  count: number;
  averageRating: number | null; // nullの場合はレビューがない
}

interface BreweryDetailClientProps {
  id: string;
}

export default function BreweryDetailClient({ id }: BreweryDetailClientProps) {
  // IDに一致するブルワリーを検索
  const brewery = breweries.find((b) => b.id === id);

  // ブルワリーが見つからない場合は404ページを表示
  if (!brewery) {
    notFound();
  }

  // このブルワリーが製造するビールを検索
  const breweryBeers = beers.filter((beer) => beer.brewery === brewery.name);

  // ソートオプション
  const [sortBy, setSortBy] = useState<string>('name');

  // レビューデータ
  const [reviewData, setReviewData] = useState<{
    [beerId: string]: ReviewData;
  }>({});

  // レビュー情報を取得
  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const data: { [beerId: string]: ReviewData } = {};

        // ブルワリーのビールIDのレビュー件数と平均評価を取得
        for (const beer of breweryBeers) {
          const reviewQuery = query(
            collection(db, 'reviews'),
            where('beerId', '==', beer.id)
          );

          // レビュー件数を取得
          const countSnapshot = await getCountFromServer(reviewQuery);
          const count = countSnapshot.data().count;

          // 平均評価を取得（レビューがある場合のみ）
          let averageRating: number | null = null;
          if (count > 0) {
            // レビュースナップショットを取得してスコアの平均を計算
            const reviewsSnapshot = await getDocs(reviewQuery);
            let totalScore = 0;

            reviewsSnapshot.forEach((doc) => {
              const reviewData = doc.data();
              totalScore += reviewData.rating || 0;
            });

            averageRating = count > 0 ? totalScore / count : null;
          }

          data[beer.id] = {
            count,
            averageRating,
          };
        }

        setReviewData(data);
      } catch (error) {
        console.error('レビュー情報の取得中にエラーが発生しました:', error);
      }
    };

    fetchReviewData();
  }, [breweryBeers]);

  // ビールをソート
  const sortedBeers = [...breweryBeers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      // Firestoreのレビューデータでソート。レビューがない場合は評価-1として扱う
      const aRating = reviewData[a.id]?.averageRating ?? -1;
      const bRating = reviewData[b.id]?.averageRating ?? -1;
      return bRating - aRating;
    } else if (sortBy === 'abv') {
      return b.abv - a.abv;
    }
    return 0;
  });

  // ブルワリーが得意とするスタイルの名前を取得
  const getSpecialtyNames = (specialties?: string[]) => {
    if (!specialties || specialties.length === 0) return [];

    return specialties.map((styleId) => {
      const style = beerStyles.find((s) => s.id === styleId);
      return { id: styleId, name: style ? style.name : styleId };
    });
  };

  // スタイル別ビール数を集計
  const styleCountMap: Record<string, number> = {};
  breweryBeers.forEach((beer) => {
    const styleId = beer.style;
    if (styleCountMap[styleId]) {
      styleCountMap[styleId]++;
    } else {
      styleCountMap[styleId] = 1;
    }
  });

  // 上位3つのスタイルを取得
  const topStyles = Object.entries(styleCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([styleId, count]) => {
      const style = beerStyles.find((s) => s.id === styleId);
      return { id: styleId, name: style ? style.name : styleId, count };
    });

  return (
    <div className="container mx-auto py-8">
      {/* ブルワリー基本情報 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-amber-100 p-8">
          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{brewery.name}</h1>
              {brewery.nameEn && (
                <p className="text-gray-600 mb-1">{brewery.nameEn}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="badge badge-outline">
                  {breweryTypeNames[brewery.type]}
                </div>
                {brewery.featured && (
                  <div className="badge badge-secondary">注目のブルワリー</div>
                )}
                {topStyles.length > 0 && (
                  <div className="badge badge-primary">
                    {topStyles[0].name}専門
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 md:mt-0 text-right">
              <div className="text-sm">
                <span className="font-medium">創業:</span> {brewery.foundedYear}
                年
              </div>
              <div className="text-sm">
                <span className="font-medium">所在地:</span>{' '}
                {brewery.prefecture ? `${brewery.prefecture} ` : ''}
                {brewery.country}
              </div>
              <div className="text-sm">
                <span className="font-medium">地域:</span>{' '}
                {regionNames[brewery.region]}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ブルワリー説明 */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">紹介</h2>
              <div className="prose max-w-none">
                <p>{brewery.description}</p>
              </div>

              <div className="divider"></div>

              {/* 特徴情報 */}
              <h2 className="text-xl font-bold mb-4">特徴</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">基本情報</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>タイプ:</span>
                      <span className="font-medium">
                        {breweryTypeNames[brewery.type]}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>タップルーム:</span>
                      <span className="font-medium">
                        {brewery.taproom ? 'あり' : 'なし'}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>工場見学:</span>
                      <span className="font-medium">
                        {brewery.tours ? '可能' : '不可'}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>ウェブサイト:</span>
                      {brewery.website ? (
                        <a
                          href={brewery.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:underline font-medium"
                        >
                          公式サイト
                        </a>
                      ) : (
                        <span>なし</span>
                      )}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">得意とするスタイル</h3>
                  {brewery.specialties && brewery.specialties.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {getSpecialtyNames(brewery.specialties).map(
                        (specialty) => (
                          <Link
                            key={specialty.id}
                            href={`/beers?style=${specialty.id}`}
                            className="badge badge-outline hover:bg-amber-50"
                          >
                            {specialty.name}
                          </Link>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      特定のスタイルの記載はありません
                    </p>
                  )}

                  <h3 className="font-medium mt-4 mb-2">製造ビール数</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="font-medium">{breweryBeers.length}</span>{' '}
                      種類のビール
                    </p>
                    {topStyles.map((style) => (
                      <p key={style.id}>
                        <span className="font-medium">{style.name}</span>:{' '}
                        {style.count}種
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* サイドバー情報 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">おすすめビール</h2>
              {sortedBeers.length > 0 ? (
                breweryBeers
                  .sort((a, b) => {
                    const aRating = reviewData[a.id]?.averageRating ?? -1;
                    const bRating = reviewData[b.id]?.averageRating ?? -1;
                    return bRating - aRating;
                  })
                  .slice(0, 3)
                  .map((beer) => (
                    <Link
                      key={beer.id}
                      href={`/beers/${beer.id}`}
                      className="block p-3 bg-white rounded-md mb-3 hover:shadow-md transition-shadow"
                    >
                      <div className="font-medium">{beer.name}</div>
                      <div className="text-xs text-gray-500 mb-1">
                        {beerStyles.find((s) => s.id === beer.style)?.name}
                      </div>
                      <div className="flex items-center">
                        <div className="rating rating-xs">
                          {[1, 2, 3, 4, 5].map((star) => {
                            // nullまたはundefinedの場合は0として扱う
                            const rating = reviewData[beer.id]?.averageRating;
                            const roundedRating =
                              rating != null ? Math.round(rating) : 0;

                            return (
                              <input
                                key={star}
                                type="radio"
                                name={`rating-${beer.id}`}
                                className="mask mask-star-2 bg-amber-400"
                                checked={roundedRating === star}
                                readOnly
                              />
                            );
                          })}
                        </div>
                        <span className="text-xs ml-1">
                          (
                          {reviewData[beer.id]?.averageRating != null
                            ? reviewData[beer.id].averageRating?.toFixed(1)
                            : '未評価'}
                          )
                        </span>
                      </div>
                    </Link>
                  ))
              ) : (
                <p className="text-sm text-gray-500">ビール情報がありません</p>
              )}

              <div className="divider my-6"></div>

              <h2 className="text-lg font-bold mb-4">アクセス</h2>
              {brewery.address ? (
                <>
                  <p className="text-sm mb-2">{brewery.address}</p>
                  {/* ここに地図を表示する予定 */}
                  <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
                    地図表示予定
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500">
                  詳細な所在地情報はありません
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ブルワリーのビール一覧 */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{brewery.name}のビール</h2>

          <div className="flex items-center">
            <span className="text-sm mr-2">並び替え:</span>
            <select
              className="select select-bordered select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">名前順</option>
              <option value="rating">評価順</option>
              <option value="abv">アルコール度数順</option>
            </select>
          </div>
        </div>

        {sortedBeers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBeers.map((beer) => (
              <Link
                key={beer.id}
                href={`/beers/${beer.id}`}
                className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-32 bg-amber-100 flex items-center justify-center">
                  <span className="text-4xl">🍺</span>
                </div>
                <div className="card-body p-4">
                  <h3 className="card-title text-lg">{beer.name}</h3>

                  <div className="mt-1">
                    <div className="badge badge-sm badge-outline">
                      {beerStyles.find((s) => s.id === beer.style)?.name}
                    </div>
                  </div>

                  <p className="text-sm line-clamp-2 mt-2">
                    {beer.description}
                  </p>

                  <div className="flex justify-between items-center mt-3 text-sm">
                    <div>
                      <span className="font-medium">ABV:</span> {beer.abv}%
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">評価:</span>
                      <span className="badge">
                        {reviewData[beer.id]?.averageRating != null
                          ? reviewData[beer.id].averageRating?.toFixed(1)
                          : '未評価'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">
              ビール情報がありません
            </h3>
            <p className="text-gray-600">
              このブルワリーのビール情報はまだ登録されていません
            </p>
          </div>
        )}

        {sortedBeers.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/beers" className="btn btn-outline">
              すべてのビールを見る
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
