import { authApi } from "@/services/api.js";

export const getProductsRequest = () => authApi.get("/products");
export const addProductRequest = (product) => authApi.post("/products", product);
export const updateProductRequest = (id, product) =>
    authApi.put(`/products/${id}`, product);
export const deleteProductRequest = (id) => authApi.delete(`/products/${id}`);

export const getCurrentProductStockRq = () => authApi.get("/products/stocks")

