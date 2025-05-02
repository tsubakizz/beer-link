import React from 'react';

interface GlossaryCardProps {
  title: string;
  description: string;
}

export default function GlossaryCard({
  title,
  description,
}: GlossaryCardProps) {
  return (
    <div className="card glass backdrop-blur-sm bg-white/70 rounded-xl overflow-hidden shadow-md">
      <div className="card-body p-5">
        <h3 className="card-title text-amber-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
