import {authApi} from "@/services/api.js";


/** Order for meds**/

export const showAllUserOrderDetails = async (userId) => {
    try {
        return await authApi.get(`/orders/user/${userId}`)
    } catch (err) {
        console.error("[getUserOrders] Erreur lors l'appel API :", err.response ? err.response.data : err.message);

        throw err
    }
}
// Créer une commande
export const createOrder = async (payload) => {
    try {
        const response = await authApi.post("/orders/create-order", payload);
        console.info("[createOrder] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[createOrder] Erreur lors de l'appel API :", error.response.status);
        throw error;
    }
};

/** Appel API pour récupérer les détails d'une commande par ID (partie meds) **/
export const getOrderDetailsRecap = async (orderId) => {
    try {
        const response = await authApi.get(`/orders/${orderId}`);
        console.trace(" Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("Erreur lors de l'appel API :", error.response ? error.response.data : error.message);
        throw error;
    }
};


/** Partie orders pour les salesperson, updater le status d'une commande **/
export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await authApi.patch(`/orders/update-status/${orderId}`, { orderStatus: newStatus });
        console.trace("Update Order Status : ", response)
    } catch (error){
        console.error("updateOrderStatus :", error.response ? error.response.data : error.message);
        throw error
    }
};

/** Appel pour récupérer le tableau des orders en les classant par régions **/
export const getUserOrdersByRegion = async (deliveryAddressId) => {
    try {
        const response = await authApi.get(`/orders/region/${deliveryAddressId}`);
        console.trace("[getUserOrdersByRegion]:", response.data);
        return response;
    } catch (error){
        console.error("[getUserOrdersByRegion] Erreur API :", error.response ? error.response.data : error.message);
        throw error;
    }
};




