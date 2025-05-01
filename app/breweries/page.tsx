'use client';

import { useState, useEffect } from 'react';
import {
  breweries,
  breweryTypeNames,
  regionNames,
  type BreweryType,
  type Region,
} from '../../src/app/lib/breweries-data';
import { beers, beerStyles } from '../../src/app/lib/beers-data';
import Link from 'next/link';

export default function BreweriesPage() {
  // フィルターステート
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');

  // フィルター適用されたブルワリーリスト
  const filteredBreweries = breweries.filter((brewery) => {
    // 検索クエリでフィルタリング
    if (
      searchQuery &&
      !brewery.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(
        brewery.nameEn &&
        brewery.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      !brewery.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(brewery.prefecture && brewery.prefecture.includes(searchQuery)) &&
      !brewery.country.includes(searchQuery)
    ) {
      return false;
    }

    // 地域でフィルタリング
    if (selectedRegion !== 'all' && brewery.region !== selectedRegion) {
      return false;
    }

    // タイプでフィルタリング
    if (selectedType !== 'all' && brewery.type !== selectedType) {
      return false;
    }

    // 特徴でフィルタリング
    if (selectedFeatures.includes('taproom') && !brewery.taproom) {
      return false;
    }
    if (selectedFeatures.includes('tours') && !brewery.tours) {
      return false;
    }
    if (selectedFeatures.includes('domestic') && brewery.country !== '日本') {
      return false;
    }
    if (selectedFeatures.includes('overseas') && brewery.country === '日本') {
      return false;
    }

    return true;
  });

  // ソート
  const sortedBreweries = [...filteredBreweries].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'year-old') {
      return a.foundedYear - b.foundedYear;
    } else if (sortBy === 'year-new') {
      return b.foundedYear - a.foundedYear;
    } else if (sortBy === 'country') {
      return a.country.localeCompare(b.country) || a.name.localeCompare(b.name);
    }
    return 0;
  });

  // ブルワリーの製造しているビールの数を計算
  const getBeerCount = (breweryId: string) => {
    // ビールのデータからブルワリー名と一致するものを検索
    return beers.filter((beer) => {
      const breweryName = breweries.find(
        (brewery) => brewery.id === breweryId
      )?.name;
      return breweryName && beer.brewery === breweryName;
    }).length;
  };

  // 選択可能な地域リスト（重複なし）
  const regions = ['all', ...Object.keys(regionNames)] as ('all' | Region)[];

  // 選択可能なブルワリータイプリスト
  const types = ['all', ...Object.keys(breweryTypeNames)] as (
    | 'all'
    | BreweryType
  )[];

  // 各ブルワリーが得意とするスタイルの名前を取得
  const getSpecialtyNames = (specialties?: string[]) => {
    if (!specialties || specialties.length === 0) return '';

    return specialties
      .map((styleId) => {
        const style = beerStyles.find((s) => s.id === styleId);
        return style ? style.name : styleId;
      })
      .join(', ');
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ブルワリー一覧</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          世界中の醸造所の情報を探索しましょう。伝統ある大手メーカーからユニークな小規模醸造所まで、様々なブルワリーを紹介します。
        </p>
      </div>

      {/* フィルターセクション */}
      <div className="bg-amber-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">ブルワリーを探す</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* 検索ボックス */}
          <div>
            <label htmlFor="search" className="block mb-2 text-sm font-medium">
              検索
            </label>
            <input
              type="text"
              id="search"
              placeholder="ブルワリー名、地域など"
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 地域フィルター */}
          <div>
            <label htmlFor="region" className="block mb-2 text-sm font-medium">
              地域
            </label>
            <select
              id="region"
              className="select select-bordered w-full"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">すべての地域</option>
              {regions
                .filter((r) => r !== 'all')
                .map((region) => (
                  <option key={region} value={region}>
                    {regionNames[region as Region]}
                  </option>
                ))}
            </select>
          </div>

          {/* タイプフィルター */}
          <div>
            <label htmlFor="type" className="block mb-2 text-sm font-medium">
              タイプ
            </label>
            <select
              id="type"
              className="select select-bordered w-full"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">すべてのタイプ</option>
              {types
                .filter((t) => t !== 'all')
                .map((type) => (
                  <option key={type} value={type}>
                    {breweryTypeNames[type as BreweryType]}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* 特徴フィルターとソート */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
          <div className="mb-4 md:mb-0">
            <span className="block mb-2 text-sm font-medium">特徴</span>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedFeatures.includes('taproom')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFeatures([...selectedFeatures, 'taproom']);
                    } else {
                      setSelectedFeatures(
                        selectedFeatures.filter((f) => f !== 'taproom')
                      );
                    }
                  }}
                />
                <span>直営タップルームあり</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedFeatures.includes('tours')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFeatures([...selectedFeatures, 'tours']);
                    } else {
                      setSelectedFeatures(
                        selectedFeatures.filter((f) => f !== 'tours')
                      );
                    }
                  }}
                />
                <span>工場見学可能</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedFeatures.includes('domestic')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFeatures([
                        ...selectedFeatures.filter((f) => f !== 'overseas'),
                        'domestic',
                      ]);
                    } else {
                      setSelectedFeatures(
                        selectedFeatures.filter((f) => f !== 'domestic')
                      );
                    }
                  }}
                />
                <span>国内</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedFeatures.includes('overseas')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFeatures([
                        ...selectedFeatures.filter((f) => f !== 'domestic'),
                        'overseas',
                      ]);
                    } else {
                      setSelectedFeatures(
                        selectedFeatures.filter((f) => f !== 'overseas')
                      );
                    }
                  }}
                />
                <span>海外</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="sort" className="block mb-2 text-sm font-medium">
              並び替え
            </label>
            <select
              id="sort"
              className="select select-bordered"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">名前順</option>
              <option value="year-old">創業年（古い順）</option>
              <option value="year-new">創業年（新しい順）</option>
              <option value="country">国・地域順</option>
            </select>
          </div>
        </div>
      </div>

      {/* 結果件数 */}
      <div className="mb-6">
        <p className="text-gray-600">
          {sortedBreweries.length}件のブルワリーが見つかりました
        </p>
      </div>

      {/* ブルワリーリスト */}
      {sortedBreweries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBreweries.map((brewery) => (
            <Link
              key={brewery.id}
              href={`/breweries/${brewery.id}`}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                {brewery.featured && (
                  <div className="badge badge-accent mb-2">
                    注目のブルワリー
                  </div>
                )}
                <h2 className="card-title">
                  {brewery.name}
                  {brewery.nameEn && (
                    <span className="text-sm font-normal text-gray-500">
                      {brewery.nameEn}
                    </span>
                  )}
                </h2>

                <div className="mb-2">
                  <div className="badge badge-outline">
                    {breweryTypeNames[brewery.type]}
                  </div>
                  {brewery.specialties && brewery.specialties.length > 0 && (
                    <div className="mt-1 text-xs text-gray-600">
                      <span className="font-medium">得意スタイル:</span>{' '}
                      {getSpecialtyNames(brewery.specialties)}
                    </div>
                  )}
                </div>

                <p className="text-sm line-clamp-2 mb-2">
                  {brewery.description}
                </p>

                <div className="grid grid-cols-2 gap-1 text-xs mt-auto">
                  <div>
                    <span className="font-medium">所在地:</span>{' '}
                    {brewery.prefecture || ''} {brewery.country}
                  </div>
                  <div>
                    <span className="font-medium">創業年:</span>{' '}
                    {brewery.foundedYear}年
                  </div>
                  <div>
                    <span className="font-medium">タップルーム:</span>{' '}
                    {brewery.taproom ? 'あり' : 'なし'}
                  </div>
                  <div>
                    <span className="font-medium">工場見学:</span>{' '}
                    {brewery.tours ? '可能' : '不可'}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm">
                    <span className="font-medium">取扱ビール:</span>{' '}
                    {getBeerCount(brewery.id)}種類
                  </div>
                  <span className="btn btn-sm btn-primary">詳細を見る</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">
            条件に一致するブルワリーがありません
          </h3>
          <p className="text-gray-600">検索条件を変更してみてください</p>
          <button
            className="btn btn-outline mt-6"
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedType('all');
              setSelectedFeatures([]);
            }}
          >
            フィルターをリセット
          </button>
        </div>
      )}

      {/* ブルワリーについての説明 */}
      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">ブルワリーについて</h2>

        <div className="prose max-w-none">
          <p>
            ブルワリー（醸造所）は、ビールの生産を行う施設です。大量生産を行う大手メーカーから、
            小規模で個性的なビールを作るクラフトブルワリーまで、様々な種類があります。
          </p>

          <h3>ブルワリーの種類</h3>
          <ul>
            <li>
              <strong>クラフトブルワリー</strong>:
              小規模で伝統的な製法を重視し、独創的で個性的なビールを製造する醸造所。
              多様な原料や製法を用いて、独自のフレーバーやスタイルを追求しています。
            </li>
            <li>
              <strong>大手ビールメーカー</strong>:
              大規模な設備を持ち、大量生産を行うビール会社。品質の安定性に優れ、
              広い市場に流通させることができます。
            </li>
            <li>
              <strong>ブリューパブ</strong>:
              自家製ビールを提供するレストランやパブ。醸造設備とレストランが一体になっており、
              できたての新鮮なビールを食事と共に楽しむことができます。
            </li>
            <li>
              <strong>委託醸造</strong>:
              自社の醸造設備を持たず、他のブルワリーの設備を借りてビールを製造するスタイル。
              レシピや監修は自社で行いますが、製造は他社に委託します。
            </li>
            <li>
              <strong>特殊/伝統的醸造所</strong>:
              修道院ビールなど、特殊な歴史や伝統を持つ醸造所。何世紀にもわたる伝統的な製法で
              ビールを作り続けているところもあります。
            </li>
          </ul>

          <h3>ブルワリー見学について</h3>
          <p>
            多くのブルワリーでは工場見学を実施しており、ビールの製造工程を間近で見学できます。
            また、直営のタップルームを併設しているブルワリーでは、その場で新鮮なビールを楽しむことができます。
            ブルワリー見学は、ビールの製造方法や歴史を学ぶ絶好の機会です。
          </p>

          <h3>日本のクラフトブルワリー</h3>
          <p>
            日本では1994年の酒税法改正（地ビール解禁）以降、全国各地で多くのクラフトブルワリーが誕生しました。
            当初は約100社ほどでしたが、現在では400社以上のブルワリーが活動しており、日本各地の水や原料を
            活かした個性的なビールを製造しています。
          </p>

          <h3>世界のブルワリー</h3>
          <p>
            世界にはベルギー、ドイツ、チェコなど、長い歴史を持つビール大国があります。
            また、アメリカは1980年代以降のクラフトビールムーブメントにより、現在では世界最大のクラフトブルワリー数を誇ります。
            各国の文化や気候、原料によって、そこで作られるビールの特徴も大きく異なります。
          </p>
        </div>
      </div>
    </div>
  );
}
