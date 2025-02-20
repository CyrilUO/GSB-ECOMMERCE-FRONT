import {authApi} from "@/services/api.js";

export const fetchAvailableAddresses = async () => {
    console.log("🔹 [fetchAvailableAddresses] Appel API lancé pour récupérer toutes les adresses.");
    try {
        const response = await authApi.get("/address/full-list");
        console.log("✅ [fetchAvailableAddresses] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [fetchAvailableAddresses] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};