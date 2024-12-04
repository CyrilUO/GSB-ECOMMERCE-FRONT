import {api} from "@/services/api.js";

export const getProducts = () => api.create("/users");
export const addProduct = (product) => api.post("/users", product);
export const updateProduct = (id, product) => api.put(`/users/${id}`, product);
export const deleteProduct= (id) => api.delete(`/users/${id}`);

