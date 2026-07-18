import type { Internship } from '../types';

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
      <h4 className="card-company" style={{ marginTop: '0px' }}>{item.perusahaan}</h4>
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
