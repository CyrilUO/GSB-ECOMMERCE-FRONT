import apiBackend from "@/services/api.js";

export default {

    getProduct() {
        return apiBackend.get(`/products`);
    },


    getProductById() {
        return apiBackend.get(`products/${productId}`)
    }
};