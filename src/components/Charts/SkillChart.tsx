import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import type { Internship } from '../../types';
import { getTopSkills } from '../../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface Props {
  data: Internship[];
}

export default function SkillChart({ data }: Props) {
  const chartData = useMemo(() => {
    const skills = getTopSkills(data, 12);
    return {
      labels: skills.map(s => s.skill),
      datasets: [
        {
          data: skills.map(s => s.count),
          backgroundColor: skills.map((_, i) => {
            const colors = [
              'rgba(129, 140, 248, 0.65)',
              'rgba(52, 211, 153, 0.65)',
              'rgba(251, 191, 36, 0.65)',
              'rgba(244, 114, 182, 0.65)',
              'rgba(56, 189, 248, 0.65)',
              'rgba(167, 139, 250, 0.65)',
              'rgba(251, 146, 60, 0.65)',
              'rgba(232, 121, 249, 0.65)',
            ];
            return colors[i % colors.length];
          }),
          borderColor: 'transparent',
          borderRadius: 4,
          barThickness: 12,
        },
      ],
    };
  }, [data]);

  const style = getComputedStyle(document.documentElement);
  const tickColor = style.getPropertyValue('--text-muted').trim() || '#8b8fa4';
  const gridColor = style.getPropertyValue('--chart-grid-color').trim() || 'rgba(0,0,0,0.05)';

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
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
          label: (ctx: unknown) => ` ${(ctx as { parsed: { x: number } }).parsed.x} lowongan`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: {
          font: { family: 'Outfit', size: 10, weight: 300 as const },
          color: tickColor,
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: { display: false },
        ticks: {
          font: { family: 'Outfit', size: 10, weight: 300 as const },
          color: tickColor,
        },
      },
    },
  };

  return (
    <div className="chart-panel">
      <h3 className="chart-title">Top Skills yang Dibutuhkan</h3>
      <div className="chart-canvas-wrap">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
