import { authApi } from "@/services/api.js";

// Récupérer tous les produits
export const getProductsRequest = async () => {
    try {
        const response = await authApi.get("/products");
        console.info("[getProductsRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[getProductsRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const addProductRequest = async (product) => {
    try {
        const response = await authApi.post("/products", product);
        console.trace("[addProductRequest] Réponse API :", response.data);
        const headers = response.headers
        console.info(`Contenu des headers ${headers}`)
        return response;
    } catch (error) {
        console.error("[addProductRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateProductRequest = async (id, product) => {
    try {
        const response = await authApi.put(`/products/${id}`, product);
        console.trace("[updateProductRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[updateProductRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const deleteProductRequest = async (id) => {
    try {
        const response = await authApi.delete(`/products/${id}`);
        console.trace("Réponse de la requête :", response.data);
        return response;
    } catch (error) {
        console.error("deleteProductRequest : Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getCurrentProductStockRq = async () => {
    try {
        const response = await authApi.get("/products/stocks");
        console.trace("[getCurrentProductStockRq] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[getCurrentProductStockRq] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getProductByIdRequest = async (id) => {
    try {
        const response = await authApi.get(`/products/${id}`);
        console.info("[getProductByIdRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("[getProductByIdRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};


