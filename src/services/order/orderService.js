import {authApi} from "@/services/api.js";

// Créer une commande
export const createOrder = async (payload) => {
    console.log("🔹 [createOrder] Appel API lancé avec le payload :", payload);

    try {
        const response = await authApi.post("/orders/create-order", payload);
        console.log("✅ [createOrder] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [createOrder] Erreur lors de l'appel API :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer les détails d'une commande par ID
export const getOrderDetailsRecap = async (orderId) => {
    console.log(`🔹 [getOrderDetailsRecap] Appel API lancé pour orderId : ${orderId}`);

    try {
        const response = await authApi.get(`/orders/${orderId}`);
        console.log("✅ [getOrderDetails] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getOrderDetails] Erreur lors de l'appel API :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const showAllUserOrderDetails = async (userId) => {
    try {
        return await authApi.get(`/orders/user/${userId}`)
    } catch (err) {
        console.error("❌ [getUserOrders] Erreur lors de l'appel API :", err.response ? err.response.data : err.message);

        throw err
    }
}

