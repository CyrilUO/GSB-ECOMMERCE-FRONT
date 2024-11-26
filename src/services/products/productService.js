import {apiBackend} from "@/services/api.js";

export const getProducts = () => apiBackend.create("/auth/users");
export const addProduct = (product) => apiBackend.post("/auth/users", product);
export const updateProduct = (id, product) => apiBackend.put(`/auth/users/${id}`, product);
export const deleteProduct= (id) => apiBackend.delete(`/auth/users/${id}`);

