import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
    const cart = ref([]);

    // Ajouter un produit au panier
    const addToCart = (product, quantity) => {
        console.log("Produit ajouté :", product, "Quantité :", quantity);
        const existingItem = cart.value.find((item) => item.product.productId === product.productId);
        if (existingItem) {
            console.log("Produit existant, mise à jour de la quantité");
            existingItem.quantity += quantity;
        } else {
            console.log("Ajout d'un nouveau produit au panier");
            cart.value.push({ product, quantity });
        }
        console.log("Panier mis à jour :", cart.value);
    };

    const removeFromCart = (productId) => {
        console.log("ID du produit à supprimer :", productId);
        const index = cart.value.findIndex((item) => String(item.product.productId) === String(productId));
        if (index !== -1) {
            cart.value.splice(index, 1);
            console.log("Produit supprimé. Panier mis à jour :", cart.value);
        }
    };

    const applyQuantityChosenToStock = (productId) => {
        const item = cart.value.find((item) => item.product.productId === productId);
        console.log(`Quantité déjà dans le panier pour le produit ID ${productId}:`, item ? item.quantity : 0);
        return item ? item.quantity : 0;
    };

    const totalPrice = computed(() => {
        const total = cart.value.reduce((total, item) => total + item.product.productPrice * item.quantity, 0);
        console.log("Prix total du panier :", total);
        return total;
    });

    const clearCartStore = () => {
        cart.value = [];
        console.log("Vidage du panier")
    }

    return { cart, addToCart, removeFromCart, totalPrice, applyQuantityChosenToStock, clearCartStore };
});
