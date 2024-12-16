<template>
  <NavBar/>
  <div class=" mx-auto p-6 flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
    <!-- Card Produit -->
    <div
        v-if="product"
        class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4"
    >
      <!-- Image -->
      <div class="w-32 h-32 rounded-lg overflow-hidden shadow-md">
        <img
            :src="product.productImage || 'https://via.placeholder.com/150/cccccc/ffffff?text=No+Image'"
            :alt="product.productName"
            class="w-full h-full object-cover"
        />
      </div>

      <!-- Infos Produit -->
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold text-gray-800">{{ product.productName }}</h1>
        <p class="text-gray-500 text-sm">{{ product.productDescription }}</p>
        <p class="text-green-500 font-semibold">Prix unitaire : {{ product.productPrice }}€</p>
        <p class="text-gray-700 text-sm font-medium">Stock disponible : {{ productStock }}</p>
      </div>

      <!-- Gestion Quantité -->
      <div class="flex items-center space-x-4">
        <button
            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow"
            @click="decreaseQuantity"
            :disabled="quantity <= 1"
        >
          <span class="text-gray-700 font-bold">-</span>
        </button>

        <input
            type="number"
            v-model.number="quantity"
            @input="onQuantityInput"
            class="w-16 text-center border rounded-md shadow"
            min="1"
            :max="productStock"
        />

        <button
            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow"
            @click="increaseQuantity"
            :disabled="quantity >= productStock"
        >
          <span class="text-gray-700 font-bold">+</span>
        </button>
      </div>

      <!-- Prix Total -->
      <p class="text-lg font-semibold text-blue-600">
        Prix total : {{ totalPrice.toFixed(2) }}€
      </p>

      <!-- Boutons Action -->
      <div class="flex space-x-4 w-full">
        <button
            class="flex-1 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            @click="addToCart"
        >
          Ajouter à la commande
        </button>
        <button
            class="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-full shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300"
            @click="redirectToPreviousPage"
        >
          Retour
        </button>
      </div>
    </div>

    <!-- Chargement -->
    <div v-else-if="loading" class="text-gray-500">Chargement...</div>

    <!-- Erreur -->
    <div v-else class="text-red-500">Produit introuvable.</div>
  </div>
</template>


<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";
import {getProductByIdRequest} from "@/services/products/productService.js";
import { useCartStore } from "@/store/cartStore.js";
import {storeToRefs} from "pinia";


const route = useRoute();
const router = useRouter();

const productId = Number(route.params.id);

const product = ref(null);
const loading = ref(true);
const quantity = ref(1); // Quantité par défaut
const productStock = ref(0); // Stock dynamique
const totalPrice = ref(0); // Prix total calculé

const fetchProductDetails = async () => {
  try {
    const response = await getProductByIdRequest(productId);
    if (response && response.data) {
      product.value = {
        productId: response.data.productId,
        productImage: response.data.productImage || "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image",
        productName: response.data.productName,
        productDescription: response.data.productDescription,
        productPrice: response.data.productPrice,
        productStock: response.data.productStock,
      };
      productStock.value = response.data.productStock;
      updateTotalPrice();
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error.message);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

const updateTotalPrice = () => {
  totalPrice.value = quantity.value * product.value.productPrice;
};

const increaseQuantity = () => {
  if (quantity.value < productStock.value) {
    quantity.value++;
    productStock.value--;
    updateTotalPrice();
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    productStock.value++;
    updateTotalPrice();
  }
};

const onQuantityInput = () => {
  if (quantity.value < 1) {
    quantity.value = 1;
  } else if (quantity.value > productStock.value) {
    quantity.value = productStock.value;
  }
  updateTotalPrice();
};

const cartStore = useCartStore();
const { cart } = storeToRefs(cartStore);


const addToCart = () => {
  cartStore.addToCart(product.value, quantity.value);
  alert(`${quantity.value} x ${product.value.productName} ajouté(s) à la commande !`);
  router.push("/medical-employee/cart");
};

const redirectToPreviousPage = () => {
  router.go(-1)
}

onMounted(fetchProductDetails);
</script>


<style scoped>
/* Retirer les flèches de l'input number */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}


button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>


