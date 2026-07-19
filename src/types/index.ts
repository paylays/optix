export interface Internship {
  no: number;
  perusahaan: string;
  posisi: string;
  kotaKabupaten: string;
  provinsi: string;
  jenisPerusahaan: string;
  pendidikan: string;
  kuota: number;
  jurusanDiterima: string[];
  skillDibutuhkan: string[];
  kategoriPosisi: string;
  websitePerusahaan: string;
  batch: string;
  statusUnik: string;
  skorJurusan: number;
  skorPosisi: number;
  skorPortofolio: number;
  skorPerusahaan: number;
  skorKuota: number;
  skorTotal: number;
  prioritas: 'S' | 'A' | 'B' | 'C';
  statusLamaran: string;
  catatanPersiapan: string[];
}

export type SortField = 'skorTotal' | 'kuota' | 'perusahaan' | 'no';
export type SortDirection = 'asc' | 'desc';
export type ViewMode = 'card' | 'table';

export interface Filters {
  search: string;
  jenisPerusahaan: string[];
  provinsi: string[];
  pendidikan: string[];
}

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
