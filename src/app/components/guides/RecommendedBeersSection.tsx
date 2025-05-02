import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Beer } from '../../../app/lib/beers-data';
import BeerCard from '../beers/BeerCard';

interface RecommendedBeersSectionProps {
  title: string;
  beers: Beer[];
  ctaLink?: string;
  ctaText?: string;
}

export default function RecommendedBeersSection({
  title,
  beers,
  ctaLink,
  ctaText,
}: RecommendedBeersSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-900">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {beers.map((beer, index) => (
          <BeerCard key={beer.id} beer={beer} index={index} />
        ))}
      </div>

      {ctaLink && ctaText && (
        <div className="text-center mt-8">
          <Link
            href={ctaLink}
            className="btn btn-outline border-amber-300 text-amber-800 hover:bg-amber-100 hover:border-amber-400"
          >
            {ctaText}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
