import { useMemo } from 'react';
import type { Internship } from '../types';

interface Props {
  data: Internship[];
}

export default function MetricCards({ data }: Props) {
  const metrics = useMemo(() => {
    const totalKuota = data.reduce((sum, d) => sum + d.kuota, 0);
    const avgSkor = data.length
      ? Math.round(data.reduce((sum, d) => sum + d.skorTotal, 0) / data.length)
      : 0;
    const priorityCounts = { S: 0, A: 0, B: 0, C: 0 };
    data.forEach(d => {
      if (d.prioritas in priorityCounts) {
        priorityCounts[d.prioritas as keyof typeof priorityCounts]++;
      }
    });
    const companyTypes = new Set(data.map(d => d.jenisPerusahaan)).size;

    return { total: data.length, totalKuota, avgSkor, priorityCounts, companyTypes };
  }, [data]);

  return (
    <div className="metric-cards">
      <div className="metric-card" style={{ animationDelay: '0.05s' }}>
        <div className="metric-label">Total Lowongan</div>
        <div className="metric-value">{metrics.total}</div>
        <div className="metric-sub">posisi unik tersedia</div>
      </div>

      <div className="metric-card" style={{ animationDelay: '0.1s' }}>
        <div className="metric-label">Total Kuota</div>
        <div className="metric-value">{metrics.totalKuota}</div>
        <div className="metric-sub">slot magang terbuka</div>
      </div>

      <div className="metric-card" style={{ animationDelay: '0.15s' }}>
        <div className="metric-label">Rata-rata Skor</div>
        <div className="metric-value">{metrics.avgSkor}</div>
        <div className="metric-sub">dari 90 poin</div>
      </div>
    </div>
  );
}
