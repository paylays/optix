import type { Internship } from '../types';
import { getPriorityColor, getPriorityBg, getPriorityBorder } from '../utils/helpers';

interface Props {
  item: Internship;
  index: number;
  onClick: () => void;
}

export default function InternshipCard({ item, index, onClick }: Props) {
  const maxSkills = 5;
  const visibleSkills = item.skillDibutuhkan.slice(0, maxSkills);
  const remaining = item.skillDibutuhkan.length - maxSkills;

  return (
    <div
      className="internship-card"
      onClick={onClick}
      style={{ animationDelay: `${0.03 * index}s` }}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="card-header-row">
        <h4 className="card-company">{item.perusahaan}</h4>
        <span
          className="card-score-badge"
          style={{
            color: getPriorityColor(item.prioritas),
            background: getPriorityBg(item.prioritas),
            border: `1px solid ${getPriorityBorder(item.prioritas)}`,
          }}
        >
          {item.prioritas} · {item.skorTotal}
        </span>
      </div>
      <p className="card-position">{item.posisi}</p>

      <div className="card-tags">
        <span className="card-tag">{item.jenisPerusahaan}</span>
        <span className="card-tag">{item.kotaKabupaten}</span>
        <span className="card-tag">{item.pendidikan}</span>
        {item.kuota > 1 && <span className="card-tag card-tag--accent">{item.kuota} kuota</span>}
      </div>

      <div className="card-skills">
        {visibleSkills.map(skill => (
          <span key={skill} className="card-skill-chip">{skill}</span>
        ))}
        {remaining > 0 && (
          <span className="card-skill-chip card-skill-more">+{remaining}</span>
        )}
      </div>
    </div>
  );
}
