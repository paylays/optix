import { useState } from 'react';

const SKILLS = ['PHP', 'JavaScript', 'Laravel', 'MySQL', 'HTML5', 'CSS3', 'Figma', 'Git'];

const TARGETS = [
  { label: 'Software Engineer', tier: 'S' },
  { label: 'Backend Developer', tier: 'S' },
  { label: 'Full Stack Developer', tier: 'A' },
  { label: 'Web Developer', tier: 'A' },
  { label: 'System Developer', tier: 'A' },
];

export default function ProfileCard() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('optix-profile-collapsed');
    return saved === 'true';
  });

  const toggle = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('optix-profile-collapsed', String(next));
      return next;
    });
  };

  return (
    <div className={`profile-card ${collapsed ? 'profile-card--collapsed' : ''}`}>
      <div
        className="profile-card-bar"
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && toggle()}
      >
        <div className="profile-bar-left">
          <span className="profile-avatar">👨‍💻</span>
          <div className="profile-bar-info">
            <span className="profile-bar-name">Profil Pelamar</span>
            <span className="profile-bar-summary">
              {collapsed
                ? 'S1 Sistem Informasi · Software Engineer · PHP / JavaScript / Laravel'
                : 'S1 Sistem Informasi · Sertifikasi UI/UX · HKI'}
            </span>
          </div>
        </div>

        <div className="profile-bar-right">
          {!collapsed && (
            <div className="profile-bar-chips">
              {TARGETS.slice(0, 3).map(t => (
                <span
                  key={t.label}
                  className={`profile-target-chip profile-target-chip--${t.tier.toLowerCase()}`}
                >
                  {t.label}
                </span>
              ))}
            </div>
          )}
          <button
            className="profile-collapse-btn"
            aria-label={collapsed ? 'Expand profil' : 'Collapse profil'}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease',
              }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="profile-card-body">
          <div className="profile-content-row">
            <div className="profile-col">
              <span className="profile-col-label">Skill</span>
              <div className="profile-chip-row">
                {SKILLS.map(s => (
                  <span key={s} className="profile-skill-chip">{s}</span>
                ))}
              </div>
            </div>

            <div className="profile-col-sep" />

            <div className="profile-col">
              <span className="profile-col-label">Target Posisi</span>
              <div className="profile-chip-row">
                {TARGETS.map(t => (
                  <span
                    key={t.label}
                    className={`profile-target-chip profile-target-chip--${t.tier.toLowerCase()}`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
