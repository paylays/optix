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

export default function ProvinceChart({ data }: Props) {
  const chartData = useMemo(() => {
    const provinces = getProvinceDistribution(data);
    const colors = [
      'rgba(129, 140, 248, 0.7)',
      'rgba(52, 211, 153, 0.7)',
      'rgba(251, 191, 36, 0.7)',
      'rgba(244, 114, 182, 0.7)',
      'rgba(56, 189, 248, 0.7)',
      'rgba(167, 139, 250, 0.7)',
      'rgba(251, 146, 60, 0.7)',
      'rgba(232, 121, 249, 0.7)',
      'rgba(148, 163, 184, 0.5)',
    ];
    return {
      labels: provinces.map(p => p.province),
      datasets: [
        {
          data: provinces.map(p => p.count),
          backgroundColor: provinces.map((_, i) => colors[i % colors.length]),
          borderColor: 'rgba(12, 14, 20, 0.8)',
          borderWidth: 2,
          hoverOffset: 6,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(18, 20, 28, 0.95)',
        titleFont: { family: 'Outfit', size: 12, weight: 300 as const },
        bodyFont: { family: 'Outfit', size: 13, weight: 400 as const },
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

  const provinces = getProvinceDistribution(data);

  return (
    <div className="chart-panel">
      <h3 className="chart-title">Distribusi per Provinsi</h3>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ width: '180px', height: '180px', flexShrink: 0 }}>
          <Doughnut data={chartData} options={options} />
        </div>
        <div className="province-legend">
          {provinces.map((p, i) => {
            const colors = [
              '#818cf8', '#34d399', '#fbbf24', '#f472b6',
              '#38bdf8', '#a78bfa', '#fb923c', '#e879f9', '#94a3b8',
            ];
            return (
              <div key={p.province} className="province-legend-item">
                <span
                  className="province-legend-dot"
                  style={{ background: colors[i % colors.length] }}
                />
                <span className="province-legend-label">{p.province}</span>
                <span className="province-legend-count">{p.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
