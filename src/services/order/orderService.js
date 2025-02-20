import {authApi} from "@/services/api.js";


/** Order for meds**/

export const showAllUserOrderDetails = async (userId) => {
    try {
        return await authApi.get(`/orders/user/${userId}`)
    } catch (err) {
        console.error("❌ [getUserOrders] Erreur lors de l'appel API :", err.response ? err.response.data : err.message);

        throw err
    }
}
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

/** Appel API pour récupérer les détails d'une commande par ID (partie meds) **/
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


/** Partie orders pour les salesperson, updater le status d'une commande **/
export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        return await authApi.patch(`/orders/update-status/${orderId}`, { orderStatus: newStatus });
    } catch (error){
        console.error("❌ [updateOrderStatus] Erreur lors de l'appel API :", error.response ? error.response.data : error.message);
        throw error
    }
};

/** Appel pour récupérer le tableau des orders en les classant par régions **/
export const getUserOrdersByRegion = async (deliveryAddressId) => {
    console.log(`🔹 [getUserOrdersByRegion] Appel API lancé pour les commandes aux adresses de livraisons id : ${deliveryAddressId}`);
    try {
        const response = await authApi.get(`/orders/region/${deliveryAddressId}`);
        console.log("✅ [getUserOrdersByRegion] Réponse API :", response.data);
        return response;
    } catch (error){
        console.error("❌ [getUserOrdersByRegion] Erreur lors de l'appel API :", error.response ? error.response.data : error.message);
        throw error;
    }
};




