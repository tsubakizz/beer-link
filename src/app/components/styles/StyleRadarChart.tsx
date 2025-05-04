'use client';

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface StyleRadarChartProps {
  characteristics: {
    bitterness: number;
    sweetness: number;
    body: number;
    aroma: number;
    sourness: number;
  };
}

export default function StyleRadarChart({
  characteristics,
}: StyleRadarChartProps) {
  const data = {
    labels: ['苦味', '甘み', 'ボディ感', '香り', '酸味'],
    datasets: [
      {
        label: 'スタイルの特性',
        data: [
          characteristics.bitterness,
          characteristics.sweetness,
          characteristics.body,
          characteristics.aroma,
          characteristics.sourness,
        ],
        backgroundColor: 'rgba(217, 119, 6, 0.2)',
        borderColor: 'rgba(217, 119, 6, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(217, 119, 6, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(217, 119, 6, 1)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: '#713f12',
          font: {
            size: 14,
            family: 'var(--font-noto-sans-jp)',
          },
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#713f12',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: { label: string; raw: number }) {
            return `${context.label}: ${context.raw}/5`;
          },
        },
      },
    },
    maintainAspectRatio: true,
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
}
