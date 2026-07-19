interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  onInfoClick: () => void;
}

export default function DashboardHeader({ theme, toggleTheme, onInfoClick }: Props) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-brand">
          <span className="header-logo">◈</span>
          <div>
            <h1 className="header-title">OPTIX</h1>
            <p className="header-subtitle">
              Observasi Prioritas & Tracking Internship Index
            </p>
          </div>
        </div>
        <div className="header-right">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={
              theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"
            }
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          <button
            className="theme-toggle-btn"
            onClick={onInfoClick}
            title="Panduan OPTIX"
            aria-label="Buka panduan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </button>
          <div className="header-meta">
            <span className="header-badge">MagangHub</span>
            <span className="header-date">
              40 Lowongan · Data Observasi 2026
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
