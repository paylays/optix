import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';
import type { Internship } from '../../types';
import { getProvinceDistribution } from '../../utils/helpers';

ChartJS.register(ArcElement, Tooltip);

interface Props {
  data: Internship[];
}

const COLORS = [
  '#818cf8', '#34d399', '#fbbf24', '#f472b6',
  '#38bdf8', '#a78bfa', '#fb923c', '#e879f9', '#94a3b8',
];

export default function ProvinceChart({ data }: Props) {
  const provinces = useMemo(() => getProvinceDistribution(data), [data]);

  const chartData = useMemo(() => ({
    labels: provinces.map(p => p.province),
    datasets: [
      {
        data: provinces.map(p => p.count),
        backgroundColor: provinces.map((_, i) => COLORS[i % COLORS.length].replace('#', 'rgba(').replace(/^rgba\((..)(..)(..)/, (_m, r, g, b) =>
          `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`
        ) + ', 0.7)'),
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  }), [provinces]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '62%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(18, 20, 28, 0.92)',
        titleFont: { family: 'Outfit', size: 11, weight: 300 as const },
        bodyFont: { family: 'Outfit', size: 12, weight: 400 as const },
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        callbacks: {
          label: (ctx: unknown) => {
            const item = ctx as { label: string; parsed: number };
            return ` ${item.label}: ${item.parsed} lowongan`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-panel">
      <h3 className="chart-title">Distribusi per Provinsi</h3>
      <div className="province-chart-layout">
        <div className="province-donut-wrap">
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="province-legend">
          {provinces.map((p, i) => (
            <div key={p.province} className="province-legend-item">
              <span
                className="province-legend-dot"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span className="province-legend-label">{p.province}</span>
              <span className="province-legend-count">{p.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
