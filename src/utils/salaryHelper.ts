/**
 * Helper to get UMK/UMP estimation based on company location (City/Province).
 * Data represents official 2026 minimum wage values in Indonesia.
 */
export function getEstimatedSalary(location: string, province: string): string {
  const locLower = location.toLowerCase();
  const provLower = province.toLowerCase();

  // UMK Kabupaten/Kota 2026
  if (locLower.includes('karawang')) {
    return 'Rp5.886.853 (UMK Karawang 2026)';
  }
  if (locLower.includes('jakarta') || provLower.includes('dki jakarta') || provLower.includes('jakarta')) {
    return 'Rp5.729.876 (UMP DKI Jakarta 2026)';
  }
  if (locLower.includes('surabaya')) {
    return 'Rp5.288.796 (UMK Surabaya 2026)';
  }
  if (locLower.includes('bandung')) {
    return 'Rp4.737.678 (UMK Kota Bandung 2026)';
  }
  if (locLower.includes('bontang')) {
    return 'Rp3.600.000 (Estimasi UMK Bontang 2026)';
  }

  // UMP Provinsi 2026 (Estimasi standar / fallback)
  if (provLower.includes('jawa barat')) {
    return 'Rp2.200.000 - Rp4.700.000 (Kisaran UMP Jabar 2026)';
  }
  if (provLower.includes('jawa timur')) {
    return 'Rp2.100.000 - Rp5.200.000 (Kisaran UMP Jatim 2026)';
  }
  if (provLower.includes('banten')) {
    return 'Rp3.000.000 - Rp5.000.000 (Kisaran UMP Banten 2026)';
  }
  if (provLower.includes('kalimantan timur')) {
    return 'Rp3.400.000 (Estimasi UMP Kaltim 2026)';
  }

  return 'Sesuai Kebijakan Perusahaan (Standar UMP setempat)';
}
