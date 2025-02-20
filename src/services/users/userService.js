import {authApi, parseJwt} from "@/services/api.js";
import {useUserStore} from "@/store/userStore.js";

// Récupérer tous les utilisateurs
export const getAllUsersRequest = async () => {
    console.log("🔹 [getUsersRequest] Appel API lancé pour récupérer tous les utilisateurs.");
    try {
        const response = await authApi.get("/users");
        console.log("✅ [getUsersRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getUsersRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer les datas d'un utilisateurs par son ID
export const getUserDataByIdRequest = async (id) => {
    console.log(`🔹 [getUserDataByIdRequest] Appel API lancé pour récupérer l'utilisateur ID: ${id}`);
    try {
        const response = await authApi.get(`/users/${id}`);
        console.log("✅ [getUserDataByIdRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getUserDataByIdRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};


// Ajouter un utilisateur
export const addUserRequest = async (user) => {
    console.log("🔹 [addUserRequest] Appel API lancé avec les données utilisateur :", user);
    try {
        const response = await authApi.post("/users", user);
        console.log("✅ [addUserRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [addUserRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateUserRequest = async (user) => {
    console.log(`🔹 [updateUserRequest] Mise à jour de l'utilisateur ID: ${user.userId} avec les données :`, user);

    // ✅ S'assurer d'envoyer le rôle existant
    const storedToken = localStorage.getItem("authToken");
    const storedUser = storedToken ? parseJwt(storedToken) : null;

    if (storedUser && !user.roleId) {
        console.log("🔹 Ajout du rôle existant à la requête pour éviter une erreur.");
        user.roleId = storedUser.roleId;  // Ajout du rôle existant
    }

    try {
        const response = await authApi.put(`/users/${user.userId}`, user);

        if (response.data.newToken) {
            if (storedUser && storedUser.userId == user.userId) {
                console.log("✅ Mise à jour du token car l'utilisateur connecté a été modifié.");
                localStorage.setItem("authToken", response.data.newToken);
                authApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.newToken}`;
            } else {
                console.log("⚠️ Le token NE sera PAS mis à jour car l'utilisateur modifié est différent.");
            }
        }

        console.log("✅ [updateUserRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [updateUserRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};



// Supprimer un utilisateur par ID
export const deleteUserRequest = async (id) => {
    console.log(`🔹 [deleteUserRequest] Appel API lancé pour supprimer l'utilisateur ID: ${id}`);
    try {
        const response = await authApi.delete(`/users/${id}`);
        console.log("✅ [deleteUserRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [deleteUserRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer les statistiques quotidiennes des utilisateurs
export const getDailyUsersStatsRequest = async () => {
    console.log("🔹 [getDailyUsersStatsRequest] Appel API lancé pour récupérer les statistiques quotidiennes des utilisateurs.");
    try {
        const response = await authApi.get("/users/stats");
        console.log("✅ [getDailyUsersStatsRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getDailyUsersStatsRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer l'utilisateur actuellement connecté
export const getCurrentUserRequest = async () => {
    console.log("🔹 [getCurrentUserRequest] Appel API lancé pour récupérer l'utilisateur connecté.");
    try {
        const response = await authApi.get("/users/current");
        console.log("✅ [getCurrentUserRequest] Réponse API pour l'utilisateur actuellement connecté en mode brut :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getCurrentUserRequest] Erreur API :", error.response ? error.response.data : error.message);
        throw error;
    }
};
