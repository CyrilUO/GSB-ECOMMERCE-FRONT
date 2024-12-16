import { authApi } from "@/services/api.js";

// Récupérer tous les produits
export const getProductsRequest = async () => {
    console.log("🔹 [getProductsRequest] Appel API lancé pour récupérer tous les produits.");
    try {
        const response = await authApi.get("/products");
        console.log("✅ [getProductsRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getProductsRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Ajouter un produit
export const addProductRequest = async (product) => {
    console.log("🔹 [addProductRequest] Appel API lancé avec le produit :", product);
    try {
        const response = await authApi.post("/products", product);
        console.log("✅ [addProductRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [addProductRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Mettre à jour un produit par ID
export const updateProductRequest = async (id, product) => {
    console.log(`🔹 [updateProductRequest] Appel API lancé pour le produit ID: ${id} avec les données :`, product);
    try {
        const response = await authApi.put(`/products/${id}`, product);
        console.log("✅ [updateProductRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [updateProductRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Supprimer un produit par ID
export const deleteProductRequest = async (id) => {
    console.log(`🔹 [deleteProductRequest] Appel API lancé pour supprimer le produit ID: ${id}`);
    try {
        const response = await authApi.delete(`/products/${id}`);
        console.log("✅ [deleteProductRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [deleteProductRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer les stocks actuels des produits
export const getCurrentProductStockRq = async () => {
    console.log("🔹 [getCurrentProductStockRq] Appel API lancé pour récupérer les stocks des produits.");
    try {
        const response = await authApi.get("/products/stocks");
        console.log("✅ [getCurrentProductStockRq] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getCurrentProductStockRq] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Récupérer un produit par ID
export const getProductByIdRequest = async (id) => {
    console.log(`🔹 [getProductByIdRequest] Appel API lancé pour récupérer le produit ID: ${id}`);
    try {
        const response = await authApi.get(`/products/${id}`);
        console.log("✅ [getProductByIdRequest] Réponse API :", response.data);
        return response;
    } catch (error) {
        console.error("❌ [getProductByIdRequest] Erreur :", error.response ? error.response.data : error.message);
        throw error;
    }
};
