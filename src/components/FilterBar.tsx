import type { Filters, SortConfig, SortField, ViewMode } from '../types';
import type { Internship } from '../types';
import { getUniqueValues } from '../utils/helpers';

interface Props {
  filters: Filters;
  sort: SortConfig;
  viewMode: ViewMode;
  data: Internship[];
  onFiltersChange: (filters: Filters) => void;
  onSortChange: (sort: SortConfig) => void;
  onViewModeChange: (mode: ViewMode) => void;
  resultCount: number;
}

export default function FilterBar({
  filters,
  sort,
  viewMode,
  data,
  onFiltersChange,
  onSortChange,
  onViewModeChange,
  resultCount,
}: Props) {
  const toggleFilter = (key: keyof Omit<Filters, 'search'>, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const clearAll = () => {
    onFiltersChange({
      search: '',
      jenisPerusahaan: [],
      provinsi: [],
      pendidikan: [],
    });
  };

  const hasFilters =
    filters.search ||
    filters.jenisPerusahaan.length > 0 ||
    filters.provinsi.length > 0 ||
    filters.pendidikan.length > 0;

  const companyTypes = getUniqueValues(data, 'jenisPerusahaan');
  const provinces = getUniqueValues(data, 'provinsi');
  const educations = getUniqueValues(data, 'pendidikan');

  const handleSortFieldChange = (field: SortField) => {
    if (sort.field === field) {
      onSortChange({ field, direction: sort.direction === 'desc' ? 'asc' : 'desc' });
    } else {
      onSortChange({ field, direction: 'desc' });
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-row-top">
        <div className="search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Cari perusahaan, posisi, atau skill..."
            value={filters.search}
            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
          />
          {filters.search && (
            <button className="search-clear" onClick={() => onFiltersChange({ ...filters, search: '' })}>
              ×
            </button>
          )}
        </div>

        <div className="filter-actions">
          <div className="sort-group">
            {([
              ['skorTotal', 'Skor'],
              ['kuota', 'Kuota'],
              ['perusahaan', 'Nama'],
            ] as [SortField, string][]).map(([field, label]) => (
              <button
                key={field}
                className={`sort-btn ${sort.field === field ? 'active' : ''}`}
                onClick={() => handleSortFieldChange(field)}
              >
                {label}
                {sort.field === field && (
                  <span className="sort-arrow">{sort.direction === 'desc' ? '↓' : '↑'}</span>
                )}
              </button>
            ))}
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => onViewModeChange('card')}
              title="Card View"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => onViewModeChange('table')}
              title="Table View"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="2" rx="1" />
                <rect x="3" y="11" width="18" height="2" rx="1" />
                <rect x="3" y="18" width="18" height="2" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="filter-chips-area">
        <div className="filter-group">
          <span className="filter-group-label">Tipe</span>
          {companyTypes.map(t => (
            <button
              key={t}
              className={`filter-chip ${filters.jenisPerusahaan.includes(t) ? 'active' : ''}`}
              onClick={() => toggleFilter('jenisPerusahaan', t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-group-label">Provinsi</span>
          {provinces.map(p => (
            <button
              key={p}
              className={`filter-chip ${filters.provinsi.includes(p) ? 'active' : ''}`}
              onClick={() => toggleFilter('provinsi', p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-group-label">Pendidikan</span>
          {educations.map(e => (
            <button
              key={e}
              className={`filter-chip ${filters.pendidikan.includes(e) ? 'active' : ''}`}
              onClick={() => toggleFilter('pendidikan', e)}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-status-bar">
        <span className="result-count">
          {resultCount} hasil ditemukan
        </span>
        {hasFilters && (
          <button className="clear-all-btn" onClick={clearAll}>
            Hapus semua filter
          </button>
        )}
      </div>
    </div>
  );
}
