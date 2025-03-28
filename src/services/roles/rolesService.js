import {authApi} from "@/services/api.js";

export const fetchRoles = async () => {
    try {
        const response = await authApi.get("/roles");
        console.trace("[fetchRoles] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[fetchRoles] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};