import {apiBackend} from "@/services/api.js";

export const getUsers = () => apiBackend.get("/auth/users");
export const addUser = (user) => apiBackend.post("/auth/users", user);
export const updateUser = (id, user) => apiBackend.put(`/auth/users/${id}`, user);
export const deleteUser= (id) => apiBackend.delete(`/auth/users/${id}`);

