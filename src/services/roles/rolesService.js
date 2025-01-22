import {authApi} from "@/services/api.js";

export const fetchRoles = async () => {
    console.log("🔹 [fetchRoles] Appel API lancé pour récupérer tous les rôles.");
    try {
        const response = await authApi.get("/roles");
        console.log("✅ [fetchRoles] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [fetchRoles] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};