import { useState, useMemo, useEffect } from "react";
import type { Internship, Filters, SortConfig, SortField, ViewMode } from "./types";
import internshipsData from "./data/internships.json";

import DashboardHeader from "./components/DashboardHeader";
import MetricCards from "./components/MetricCards";
import FilterBar from "./components/FilterBar";
import SkillChart from "./components/Charts/SkillChart";
import ProvinceChart from "./components/Charts/ProvinceChart";
import InternshipCard from "./components/InternshipCard";
import InternshipTable from "./components/InternshipTable";
import DetailDrawer from "./components/DetailDrawer";
import InfoModal from "./components/InfoModal";
import ProfileCard from "./components/ProfileCard";

const rawData: Internship[] = internshipsData as Internship[];

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('optix-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'light';
  });

  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(() => {
    return !localStorage.getItem('optix-visited');
  });

  const openInfo = () => setIsInfoOpen(true);
  const closeInfo = () => {
    localStorage.setItem('optix-visited', '1');
    setIsInfoOpen(false);
  };

  useEffect(() => {
    localStorage.setItem('optix-theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [filters, setFilters] = useState<Filters>({
    search: "",
    jenisPerusahaan: [],
    provinsi: [],
    pendidikan: [],
  });

  const [sort, setSort] = useState<SortConfig>({
    field: "skorTotal" as SortField,
    direction: "desc",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [selectedItem, setSelectedItem] = useState<Internship | null>(null);

  const filteredData = useMemo(() => {
    let result = [...rawData];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.perusahaan.toLowerCase().includes(q) ||
          d.posisi.toLowerCase().includes(q) ||
          d.skillDibutuhkan.some((s) => s.toLowerCase().includes(q)) ||
          d.kategoriPosisi.toLowerCase().includes(q),
      );
    }

    // Multi-select filters
    if (filters.jenisPerusahaan.length > 0) {
      result = result.filter((d) =>
        filters.jenisPerusahaan.includes(d.jenisPerusahaan),
      );
    }
    if (filters.provinsi.length > 0) {
      result = result.filter((d) => filters.provinsi.includes(d.provinsi));
    }
    if (filters.pendidikan.length > 0) {
      result = result.filter((d) => filters.pendidikan.includes(d.pendidikan));
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (sort.field === "skorTotal") {
        cmp = a.skorTotal - b.skorTotal;
      } else if (sort.field === "kuota") {
        cmp = a.kuota - b.kuota;
      } else if (sort.field === "perusahaan") {
        cmp = a.perusahaan.localeCompare(b.perusahaan);
      }
      return sort.direction === "desc" ? -cmp : cmp;
    });

    return result;
  }, [filters, sort]);

  // Lock body scroll when drawer is open
  if (selectedItem) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return (
    <div className="app">
      <DashboardHeader theme={theme} toggleTheme={toggleTheme} onInfoClick={openInfo} />
      <ProfileCard />
      <MetricCards data={filteredData} />
      <FilterBar
        filters={filters}
        sort={sort}
        viewMode={viewMode}
        data={rawData}
        onFiltersChange={setFilters}
        onSortChange={setSort}
        onViewModeChange={setViewMode}
        resultCount={filteredData.length}
      />

      {/* Charts */}
      <div className="charts-grid">
        <SkillChart data={filteredData} />
        <ProvinceChart data={filteredData} />
      </div>

      {/* Data View */}
      {viewMode === "card" ? (
        <div className="internship-grid">
          {filteredData.map((item, i) => (
            <InternshipCard
              key={item.no}
              item={item}
              index={i}
              onClick={() => setSelectedItem(item)}
            />
          ))}
          {filteredData.length === 0 && (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "3rem",
                color: "var(--text-muted)",
                fontWeight: "var(--font-weight-light)" as unknown as number,
                fontSize: "var(--font-size-sm)",
              }}
            >
              Tidak ada lowongan yang cocok dengan filter.
            </div>
          )}
        </div>
      ) : (
        <InternshipTable data={filteredData} onRowClick={setSelectedItem} />
      )}

      {/* Detail Drawer */}
      <DetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Info / Onboarding Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={closeInfo} />
    </div>
  );
}

export default App;
