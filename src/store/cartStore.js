// src/store/cartStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
    const cart = ref([]);

    // Ajouter un produit au panier
    const addToCart = (product, quantity) => {
        const existingItem = cart.value.find((item) => item.product.productId === product.productId);
        if (existingItem) {
            existingItem.quantity += quantity; // Mettre à jour la quantité
        } else {
            cart.value.push({ product, quantity });
        }
    };

    // Supprimer un produit du panier
    const removeFromCart = (productId) => {
        cart.value = cart.value.filter((item) => item.product.productId !== productId);
    };

    // Prix total
    const totalPrice = computed(() =>
        cart.value.reduce((total, item) => total + item.product.productPrice * item.quantity, 0)
    );

    return { cart, addToCart, removeFromCart, totalPrice };
});
