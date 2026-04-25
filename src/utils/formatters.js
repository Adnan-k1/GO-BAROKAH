/**
 * Format angka ke Rupiah singkat  → "Rp 48,7jt" / "Rp 320rb"
 */
export const formatRupiah = (value) => {
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)}jt`;
  if (value >= 1_000)     return `Rp ${(value / 1_000).toFixed(0)}rb`;
  return `Rp ${value}`;
};

/**
 * Format angka dengan pemisah ribuan Indonesia → "1.284"
 */
export const formatNumber = (value) =>
  value.toLocaleString("id-ID");

/**
 * Hitung persentase stok (0–100)
 */
export const stockPercent = (current, max = 100) =>
  Math.min(Math.round((current / max) * 100), 100);

/**
 * Warna progress bar stok
 */
export const stockBarColor = (percent) => {
  if (percent <= 20) return "bg-red-400";
  if (percent <= 50) return "bg-amber-400";
  return "bg-emerald-400";
};