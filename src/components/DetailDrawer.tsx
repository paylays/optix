import type { Internship } from '../types';
import { getPriorityColor } from '../utils/helpers';
import { getEstimatedSalary } from '../utils/salaryHelper';

interface Props {
  item: Internship | null;
  onClose: () => void;
}

export default function DetailDrawer({ item, onClose }: Props) {
  if (!item) return null;



  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="detail-drawer">
        <div className="drawer-header">
          <button className="drawer-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {/* Company & Position */}
          <h2 className="drawer-company" style={{ marginTop: '10px' }}>{item.perusahaan}</h2>
          <p className="drawer-position">{item.posisi}</p>

          {/* Website */}
          {item.websitePerusahaan && item.websitePerusahaan !== 'Belum dicatat' && (
            <a
              href={item.websitePerusahaan}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-website"
            >
              {item.websitePerusahaan.replace(/^https?:\/\//, '')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
              </svg>
            </a>
          )}

          {/* Info Grid */}
          <div className="drawer-info-grid">
            <div className="drawer-info-item">
              <span className="drawer-info-label">Lokasi</span>
              <span className="drawer-info-value">{item.kotaKabupaten}, {item.provinsi}</span>
            </div>
            <div className="drawer-info-item">
              <span className="drawer-info-label">Tipe Perusahaan</span>
              <span className="drawer-info-value">{item.jenisPerusahaan}</span>
            </div>
            <div className="drawer-info-item">
              <span className="drawer-info-label">Pendidikan</span>
              <span className="drawer-info-value">{item.pendidikan}</span>
            </div>
            <div className="drawer-info-item">
              <span className="drawer-info-label">Kuota</span>
              <span className="drawer-info-value">{item.kuota} orang</span>
            </div>
            <div className="drawer-info-item" style={{ gridColumn: 'span 2' }}>
              <span className="drawer-info-label">Perkiraan Uang Saku (UMK/UMP 2026)</span>
              <span className="drawer-info-value" style={{ color: 'var(--priority-s)', fontWeight: 'var(--font-weight-medium)' }}>
                {getEstimatedSalary(item.kotaKabupaten, item.provinsi)}
              </span>
            </div>
          </div>

          {/* Jurusan */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Jurusan Diterima</h3>
            <div className="drawer-chip-list">
              {item.jurusanDiterima.map(j => (
                <span key={j} className="drawer-chip">{j}</span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Skill Dibutuhkan</h3>
            <div className="drawer-chip-list">
              {item.skillDibutuhkan.map(s => (
                <span key={s} className="drawer-chip drawer-chip--skill">{s}</span>
              ))}
            </div>
          </div>

          {/* Catatan Persiapan */}
          <div className="drawer-section">
            <h3 className="drawer-section-title">Catatan Persiapan</h3>
            <ul className="drawer-checklist">
              {item.catatanPersiapan.map(c => (
                <li key={c} className="drawer-check-item">
                  <span className="drawer-check-icon">○</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
