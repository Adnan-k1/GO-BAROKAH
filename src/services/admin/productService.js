const BASE_URL = "http://node.waifly.com:28222/api/products";

/**
 * Membangun header secara dinamis.
 * Menangani otentikasi Bearer dan bypass ngrok warning.
 */
const authHeaders = () => {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  if (token) {
    // Memastikan format "Bearer <token>"
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Helper untuk menangani response dan menangkap error backend.
 */
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error(`Backend Error (${res.status}):`, errorData);
    throw new Error(errorData.message || `Error ${res.status}`);
  }
  return res.json();
};

// --- API Service Functions ---

export const getAllProducts = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const createProduct = async (productData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    // Mengirim objek lengkap: name, price, description, image_url, stock, discount_amount
    body: JSON.stringify(productData),
  });
  return handleResponse(res);
};

export const updateProduct = async (id, productData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  return handleResponse(res);
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return handleResponse(res);
};