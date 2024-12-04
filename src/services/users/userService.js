import {api} from "@/services/api.js";

export const getUsers = () => api.get("/users");
export const addUser = (user) => api.post("/users", user);
export const updateUser = (id, user) => api.put(`/users/${id}`, user);
export const deleteUser= (id) => api.delete(`/users/${id}`);

