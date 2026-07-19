import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const priorities = [
  {
    tier: 'S',
    label: 'Supreme',
    color: 'var(--priority-s)',
    bg: 'var(--priority-s-bg)',
    border: 'var(--priority-s-border)',
    desc: 'Prioritas tertinggi — sangat layak dilamar. Skor ≥ 75.',
  },
  {
    tier: 'A',
    label: 'High',
    color: 'var(--priority-a)',
    bg: 'var(--priority-a-bg)',
    border: 'var(--priority-a-border)',
    desc: 'Prioritas tinggi — cocok dan kompetitif. Skor 60–74.',
  },
  {
    tier: 'B',
    label: 'Medium',
    color: 'var(--priority-b)',
    bg: 'var(--priority-b-bg)',
    border: 'var(--priority-b-border)',
    desc: 'Prioritas sedang — bisa dipertimbangkan. Skor 45–59.',
  },
  {
    tier: 'C',
    label: 'Low',
    color: 'var(--priority-c)',
    bg: 'var(--priority-c-bg)',
    border: 'var(--priority-c-border)',
    desc: 'Prioritas rendah — perlu lebih banyak persiapan. Skor < 45.',
  },
];

const scoreBreakdown = [
  { label: 'Posisi', max: 30, icon: '🎯', desc: 'Seberapa relevan posisinya dengan bidang studi' },
  { label: 'Jurusan', max: 25, icon: '📚', desc: 'Apakah jurusanmu termasuk yang diterima' },
  { label: 'Perusahaan', max: 15, icon: '🏢', desc: 'Reputasi & tipe perusahaan (Startup, BUMN, dll.)' },
  { label: 'Portofolio', max: 15, icon: '💼', desc: 'Apakah posisi ini membutuhkan portofolio kuat' },
  { label: 'Kuota', max: 10, icon: '👥', desc: 'Semakin banyak kuota, semakin besar peluang diterima' },
];

export default function InfoModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="info-modal-backdrop" onClick={onClose} />
      <div className="info-modal" role="dialog" aria-modal="true" aria-label="Panduan Pengguna OPTIX">
        {/* Header */}
        <div className="info-modal-header">
          <div className="info-modal-brand">
            <span className="info-modal-logo">◈</span>
            <div>
              <h2 className="info-modal-title">Panduan OPTIX</h2>
              <p className="info-modal-subtitle">Cara membaca dashboard ini</p>
            </div>
          </div>
          <button className="info-modal-close" onClick={onClose} aria-label="Tutup panduan">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="info-modal-body">

          {/* Intro */}
          <div className="info-section">
            <p className="info-intro-text">
              OPTIX adalah dashboard riset lowongan magang dari <strong>MagangHub</strong>.
              Setiap lowongan diberi <strong>skor prioritas</strong> berdasarkan beberapa faktor
              agar kamu bisa fokus melamar ke tempat yang paling sesuai.
            </p>
          </div>

          {/* Score Badge Example */}
          <div className="info-section">
            <h3 className="info-section-title">
              <span className="info-section-icon">🏅</span>
              Apa itu badge "S · 86"?
            </h3>
            <div className="info-badge-example">
              <div className="info-badge-demo">
                <span className="info-badge-pill" style={{ color: 'var(--priority-s)', background: 'var(--priority-s-bg)', border: '1px solid var(--priority-s-border)' }}>
                  S · 86
                </span>
                <div className="info-badge-anatomy">
                  <div className="info-anatomy-row">
                    <div className="info-anatomy-arrow info-anatomy-arrow--left" />
                    <span className="info-anatomy-label">Tier prioritas (S/A/B/C)</span>
                  </div>
                  <div className="info-anatomy-row">
                    <div className="info-anatomy-arrow info-anatomy-arrow--right" />
                    <span className="info-anatomy-label">Total skor (maks. 95)</span>
                  </div>
                </div>
              </div>
              <p className="info-note">
                Skor dihitung dari 5 kategori penilaian. Klik kartu lowongan untuk melihat breakdown lengkap.
              </p>
            </div>
          </div>

          {/* Priority Tiers */}
          <div className="info-section">
            <h3 className="info-section-title">
              <span className="info-section-icon">⚡</span>
              Tier Prioritas
            </h3>
            <div className="info-tier-list">
              {priorities.map(p => (
                <div key={p.tier} className="info-tier-item">
                  <span
                    className="info-tier-badge"
                    style={{ color: p.color, background: p.bg, border: `1px solid ${p.border}` }}
                  >
                    {p.tier}
                  </span>
                  <div className="info-tier-content">
                    <span className="info-tier-label" style={{ color: p.color }}>{p.label}</span>
                    <span className="info-tier-desc">{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="info-section">
            <h3 className="info-section-title">
              <span className="info-section-icon">📊</span>
              Komponen Skor (Total maks. 95)
            </h3>
            <div className="info-score-list">
              {scoreBreakdown.map(s => (
                <div key={s.label} className="info-score-item">
                  <div className="info-score-item-top">
                    <span className="info-score-icon">{s.icon}</span>
                    <span className="info-score-label">{s.label}</span>
                    <span className="info-score-max">/{s.max} poin</span>
                    <div className="info-score-bar-track">
                      <div
                        className="info-score-bar-fill"
                        style={{ width: `${(s.max / 95) * 100}%` }}
                      />
                    </div>
                  </div>
                  <p className="info-score-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="info-section">
            <h3 className="info-section-title">
              <span className="info-section-icon">💡</span>
              Tips Penggunaan
            </h3>
            <ul className="info-tips-list">
              <li>Gunakan <strong>Filter</strong> di atas untuk menyaring berdasarkan provinsi, jenis perusahaan, atau pendidikan.</li>
              <li>Klik <strong>kartu lowongan</strong> untuk melihat detail lengkap termasuk catatan persiapan &amp; perkiraan uang saku.</li>
              <li>Urutkan berdasarkan <strong>Skor</strong> untuk lihat prioritas tertinggi di atas, atau <strong>Kuota</strong> untuk peluang terbesar.</li>
              <li>Gunakan <strong>view tabel</strong> untuk perbandingan cepat antar lowongan.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="info-modal-footer">
          <button className="info-modal-cta" onClick={onClose}>
            Mulai Eksplorasi
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
