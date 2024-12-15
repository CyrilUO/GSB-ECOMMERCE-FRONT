import {authApi} from "@/services/api.js";
export const getUsersRequest = () => authApi.get("/users");
export const addUserRequest = (user) => authApi.post("/users", user);
export const updateUserRequest = (id, user) => authApi.put(`/users/${id}`, user);
export const deleteUserRequest = (id) => authApi.delete(`/users/${id}`);

export const getDailyUsersStatsRequest = () => authApi.get("/users/stats")

