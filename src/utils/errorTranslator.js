const errorDictionary = {
  "Stock not available": "Stok tidak tersedia",
  "Insufficient stock": "Stok tidak mencukupi",
  "Quantity exceeds available stock": "Jumlah melebihi stok yang tersedia",
  "Out of stock": "Stok habis",
  "Invalid quantity": "Jumlah tidak valid",

  "Product not found": "Produk tidak ditemukan",
  "Cart item not found": "Item keranjang tidak ditemukan",
  "Cart not found": "Keranjang tidak ditemukan",

  "Unauthorized": "Tidak memiliki akses",
  "Unauthorized access": "Akses tidak diizinkan",
  "Invalid token": "Sesi tidak valid, silakan login ulang",
  "Token expired": "Sesi telah berakhir, silakan login ulang",
  "Authentication required": "Silakan login terlebih dahulu",
  "Please login first": "Silakan login terlebih dahulu",

  "Email or password incorrect": "Email atau password salah",
  "Invalid credentials": "Email atau password salah",
  "User not found": "Pengguna tidak ditemukan",
  "Password does not match": "Password tidak cocok",
  "Account not verified": "Akun belum diverifikasi",
  "Email not verified": "Email belum diverifikasi",
  "Email or account is not active": "Email atau akun tidak aktif",

  "Email already registered": "Email sudah terdaftar",
  "Username already taken": "Username sudah digunakan",
  "Google login failed": "Login Google gagal",
  "Invalid Google token": "Token Google tidak valid",
  "Invalid id_token": "Token Google tidak valid",

  "Invalid OTP": "Kode OTP tidak valid",
  "OTP expired": "Kode OTP sudah kadaluwarsa",
  "Invalid OTP code": "Kode OTP tidak valid",
  "OTP verification failed": "Verifikasi OTP gagal",
  "Failed to send OTP code": "Gagal mengirim kode OTP",
  "Failed to send OTP": "Gagal mengirim kode OTP",

  "Category not found": "Kategori tidak ditemukan",
  "Category already exists": "Kategori sudah ada",
  "Type not found": "Satuan tidak ditemukan",
  "Type already exists": "Satuan sudah ada",
  "Failed to upload image": "Gagal mengunggah gambar",
  "Image file required": "File gambar wajib diunggah",
  "Invalid file format": "Format file tidak valid",
  "Product is inactive": "Produk sedang tidak aktif",
  "Failed to toggle product status": "Gagal mengubah status produk",

  "User ID not found": "ID pengguna tidak ditemukan",
  "Address not found": "Alamat tidak ditemukan",
  "Invalid address ID": "ID alamat tidak valid",
  "Failed to save address": "Gagal menyimpan alamat",
  "Failed to update profile": "Gagal memperbarui profil",

  "Order not found": "Pesanan tidak ditemukan",
  "Failed to process order": "Gagal memproses pesanan",
  "Failed to calculate shipping fee": "Gagal menghitung ongkos kirim",
  "Payment failed": "Pembayaran gagal",
  "Failed to generate payment URL": "Gagal membuat link pembayaran",
  "Payment link expired": "Link pembayaran sudah kadaluwarsa",
  "Cannot cancel order in current status": "Pesanan tidak bisa dibatalkan pada status ini",
  "Order already completed": "Pesanan sudah selesai",
  "Order already cancelled": "Pesanan sudah dibatalkan",

  "Forbidden access": "Akses ditolak",
  "Owner access required": "Hanya pemilik yang bisa mengakses",
  "Failed to fetch analytics": "Gagal memuat data analitik",
  "Failed to promote user": "Gagal mempromosikan pengguna",
  "Failed to demote admin": "Gagal menurunkan admin",
  "Expense not found": "Data pengeluaran tidak ditemukan",
  "Failed to record expense": "Gagal mencatat pengeluaran",

  "Phone number is required for pickup order": "Nomor WhatsApp wajib diisi untuk pesanan ambil sendiri",
  "Phone number is required": "Nomor WhatsApp wajib diisi",
  "The minimum order is 10 items": "Minimal pemesanan adalah 10 item",
};

const keywordMap = [
  { keyword: "stock", translation: "Stok produk tidak mencukupi" },
  { keyword: "quantity", translation: "Jumlah pesanan tidak valid" },
  { keyword: "not found", translation: "Data tidak ditemukan" },
  { keyword: "unauthorized", translation: "Akses tidak diizinkan" },
  { keyword: "token", translation: "Sesi tidak valid, silakan login ulang" },
  { keyword: "otp", translation: "Kode OTP tidak valid" },
  { keyword: "expired", translation: "Sesi atau kode sudah kadaluwarsa" },
  { keyword: "required", translation: "Data wajib belum dilengkapi" },
  { keyword: "already", translation: "Data sudah ada sebelumnya" },
  { keyword: "failed", translation: "Terjadi kesalahan, silakan coba lagi" },
  { keyword: "invalid", translation: "Data yang dikirim tidak valid" },
  { keyword: "password", translation: "Password tidak sesuai" },
  { keyword: "login", translation: "Silakan login terlebih dahulu" },
  { keyword: "permission", translation: "Anda tidak memiliki izin" },
  { keyword: "denied", translation: "Akses ditolak" },
];

export const translateError = (message) => {
  if (!message || typeof message !== "string") return message;

  if (errorDictionary[message]) return errorDictionary[message];

  const lowerMsg = message.toLowerCase();
  for (const { keyword, translation } of keywordMap) {
    if (lowerMsg.includes(keyword)) return translation;
  }

  return message;
};
