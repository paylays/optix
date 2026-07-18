import type { Internship } from '../types';
import { getPriorityColor } from '../utils/helpers';

interface Props {
  data: Internship[];
  onRowClick: (item: Internship) => void;
}

export default function InternshipTable({ data, onRowClick }: Props) {
  return (
    <div className="table-wrapper" style={{ animation: 'slideUp 0.4s ease both' }}>
      <table className="internship-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Perusahaan</th>
            <th>Posisi</th>
            <th>Tipe</th>
            <th>Lokasi</th>
            <th>Kuota</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={item.no}
              onClick={() => onRowClick(item)}
              style={{ animationDelay: `${0.02 * i}s` }}
            >
              <td className="table-no">{item.no}</td>
              <td className="table-company">{item.perusahaan}</td>
              <td className="table-position">{item.posisi}</td>
              <td>
                <span className="table-type-badge">{item.jenisPerusahaan}</span>
              </td>
              <td className="table-location">{item.kotaKabupaten}</td>
              <td className="table-kuota">{item.kuota}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="table-empty">Tidak ada data yang cocok dengan filter.</div>
      )}
    </div>
  );
}
