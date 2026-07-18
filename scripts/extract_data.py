"""
Extract MagangHub Excel data to JSON for the OPTIX dashboard.
Run: python scripts/extract_data.py
"""
import pandas as pd
import json
import os

EXCEL_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'Database_Profesional_MagangHub_41_Screenshot.xlsx')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'internships.json')

df = pd.read_excel(EXCEL_PATH, skiprows=2)

records = []
for _, row in df.iterrows():
    records.append({
        "no": int(row["No"]),
        "perusahaan": str(row["Perusahaan"]).strip(),
        "posisi": str(row["Posisi"]).strip(),
        "kotaKabupaten": str(row["Kota/Kabupaten"]).strip(),
        "provinsi": str(row["Provinsi"]).strip(),
        "jenisPerusahaan": str(row["Jenis Perusahaan"]).strip(),
        "pendidikan": str(row["Pendidikan"]).strip(),
        "kuota": int(row["Kuota"]),
        "jurusanDiterima": [j.strip() for j in str(row["Jurusan Diterima"]).split(";") if j.strip()],
        "skillDibutuhkan": [s.strip() for s in str(row["Skill Dibutuhkan"]).split(";") if s.strip()],
        "kategoriPosisi": str(row["Kategori Posisi"]).strip(),
        "websitePerusahaan": str(row["Website Perusahaan"]).strip(),
        "batch": str(row["Batch"]).strip(),
        "statusUnik": str(row["Status Unik"]).strip(),
        "skorJurusan": int(row["Skor Jurusan"]),
        "skorPosisi": int(row["Skor Posisi"]),
        "skorPortofolio": int(row["Skor Portofolio"]),
        "skorPerusahaan": int(row["Skor Perusahaan"]),
        "skorKuota": int(row["Skor Kuota"]),
        "skorTotal": int(row["Skor Total"]),
        "prioritas": str(row["Prioritas"]).strip(),
        "statusLamaran": str(row["Status Lamaran"]).strip(),
        "catatanPersiapan": [c.strip() for c in str(row["Catatan Persiapan"]).split(";") if c.strip()],
    })

os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(records)} records to {OUTPUT_PATH}")
