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

    console.log("Panier avant suppression :", cart.value);


    const removeFromCart = (productId) => {
        console.log("ID du produit à supprimer :", productId);

        const index = cart.value.findIndex(
            (item) => String(item.product.productId) === String(productId)
        );
        if (index !== -1) {
            cart.value.splice(index, 1); // Supprime l'élément directement
        }
        console.log("Panier après suppression :", cart.value);
    };





    // Prix total
    const totalPrice = computed(() =>
        cart.value.reduce((total, item) => total + item.product.productPrice * item.quantity, 0)
    );

    return { cart, addToCart, removeFromCart, totalPrice };
});
