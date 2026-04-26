import api from "../../utils/api";

export const getAllProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await api.post("/products", productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await api.patch(`/products/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};