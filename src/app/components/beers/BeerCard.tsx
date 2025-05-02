import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Beer } from '../../../app/lib/beers-data';
import { getBeerStyleName, getStyleColor } from './BeerUtils';

interface BeerCardProps {
  beer: Beer;
  index: number;
}

export default function BeerCard({ beer, index }: BeerCardProps) {
  return (
    <motion.div
      key={beer.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * (index % 8) }}
      className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <figure className="relative h-52">
        <div
          className={`absolute inset-0 ${getStyleColor(beer.style)} opacity-30`}
        ></div>
        {beer.imageUrl ? (
          <Image
            src={beer.imageUrl}
            alt={beer.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-100 to-amber-200">
            <svg
              className="w-16 h-16 text-amber-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
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
            <svg
              className="w-4 h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold">{beer.rating.toFixed(1)}</span>
          </div>
        </div>
      </figure>

      <div className="card-body p-5">
        <div className="flex justify-between items-start mb-1">
          <h2 className="card-title text-xl text-amber-900 line-clamp-1">
            {beer.name}
          </h2>
        </div>
        <p className="text-sm text-amber-700 mb-2 flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
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

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {beer.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {beer.flavors.slice(0, 3).map((flavor, index) => (
            <span
              key={index}
              className="badge badge-sm bg-white border-amber-200 text-amber-800"
            >
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
