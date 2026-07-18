import type { Internship } from '../types';

export function getPriorityColor(p: string) {
  switch (p) {
    case 'S': return 'var(--priority-s)';
    case 'A': return 'var(--priority-a)';
    case 'B': return 'var(--priority-b)';
    case 'C': return 'var(--priority-c)';
    default: return 'var(--text-muted)';
  }
}

export function getPriorityBg(p: string) {
  switch (p) {
    case 'S': return 'var(--priority-s-bg)';
    case 'A': return 'var(--priority-a-bg)';
    case 'B': return 'var(--priority-b-bg)';
    case 'C': return 'var(--priority-c-bg)';
    default: return 'transparent';
  }
}

export function getPriorityBorder(p: string) {
  switch (p) {
    case 'S': return 'var(--priority-s-border)';
    case 'A': return 'var(--priority-a-border)';
    case 'B': return 'var(--priority-b-border)';
    case 'C': return 'var(--priority-c-border)';
    default: return 'var(--border-subtle)';
  }
}

export function getPriorityLabel(p: string) {
  switch (p) {
    case 'S': return 'Supreme';
    case 'A': return 'High';
    case 'B': return 'Medium';
    case 'C': return 'Low';
    default: return p;
  }
}

export function getTopSkills(data: Internship[], limit = 15): { skill: string; count: number }[] {
  const map = new Map<string, number>();
  data.forEach(d => {
    d.skillDibutuhkan.forEach(s => {
      map.set(s, (map.get(s) || 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getProvinceDistribution(data: Internship[]): { province: string; count: number }[] {
  const map = new Map<string, number>();
  data.forEach(d => {
    map.set(d.provinsi, (map.get(d.provinsi) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([province, count]) => ({ province, count }))
    .sort((a, b) => b.count - a.count);
}

export function getUniqueValues(data: Internship[], key: keyof Internship): string[] {
  const set = new Set<string>();
  data.forEach(d => {
    const val = d[key];
    if (typeof val === 'string') set.add(val);
  });
  return Array.from(set).sort();
}
