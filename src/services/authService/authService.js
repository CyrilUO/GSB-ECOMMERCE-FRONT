import {authApi} from "@/services/api.js";

export const invalidateToken = async () => {
    console.log("🔹 [Invalidate token] Appel API lancé pour invalider le token");

    try {
        const response = await authApi.post("/api/logout");
        console.log("response : ", response.data)
    } catch (error){
        console.error("Erreur lors de l'invalidation", error)
    }

}