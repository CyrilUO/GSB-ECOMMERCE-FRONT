import {authApi, parseJwt} from "@/services/api.js";
import {useUserStore} from "@/store/userStore.js";

// Récupérer tous les utilisateurs
export const getAllUsersRequest = async () => {
    try {
        const response = await authApi.get("/users");
        console.trace("[getUsersRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[getUsersRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getUserDataByIdRequest = async (id) => {
    try {
        const response = await authApi.get(`/users/${id}`);
        console.trace("[getUserDataByIdRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[getUserDataByIdRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};



export const addUserRequest = async (user) => {
    try {
        const response = await authApi.post("/users", user);
        console.trace("[addUserRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[addUserRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateUserRequest = async (user) => {

    // S'assurer d'envoyer le rôle existant
    const storedToken = localStorage.getItem("authToken");
    const storedUser = storedToken ? parseJwt(storedToken) : null;

    if (storedUser && !user.roleId) {
        console.trace("Ajout du rôle existant à la requête pour éviter une erreur.");
        user.roleId = storedUser.roleId;  // Ajout du rôle existant
    }

    try {
        const response = await authApi.put(`/users/${user.userId}`, user);

        if (response.data.newToken) {
            if (storedUser && storedUser.userId === user.userId) {
                console.trace("Mise à jour du token car l'utilisateur connecté a été modifié.");
                localStorage.setItem("authToken", response.data.newToken);
                authApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.newToken}`;
            } else {
                console.warn("Le token NE sera PAS mis à jour car l'utilisateur modifié est différent.");
            }
        }

        console.trace("[updateUserRequest] Réponse API :", response.data);
        return response;

    } catch (error) {
        console.error("[updateUserRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};



export const deleteUserRequest = async (id) => {
    try {
        const response = await authApi.delete(`/users/${id}`);
        console.trace("[deleteUserRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[deleteUserRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getDailyUsersStatsRequest = async () => {
    try {
        const response = await authApi.get("/users/stats");
        console.trace("[getDailyUsersStatsRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[getDailyUsersStatsRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getCurrentUserRequest = async () => {
    try {
        const response = await authApi.get("/users/current");
        console.trace("[getCurrentUserRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error(" [getCurrentUserRequest] Erreur API :", error.response ? error.response.data : error.message);
        throw error;
    }
};
