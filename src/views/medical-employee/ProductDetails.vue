<template>
  <NavBar/>
  <div class=" mx-auto p-6 flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
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
        <span
            v-if="productStock === 0"
            class="inline-block bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full"
        >
                      Rupture de stocks
                    </span>
        <p v-else class="text-gray-700 text-sm font-medium">Stock disponible : {{ productStock }}</p>
      </div>

      <!-- Gestion Quantité -->
      <div class="flex items-center space-x-4">
        <!-- Bouton de diminution -->
        <button
            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow"
            @click="decreaseQuantity"
            :disabled="quantity <= 0"
        >
          <span class="text-gray-700 font-bold">-</span>
        </button>

        <!-- Input de quantité -->
        <input
            type="number"
            v-model.number="quantity"
            @input="onQuantityInput"
            class="w-16 text-center border rounded-md shadow"
            min="0"
            :max="initialProductStock"
        />

        <!-- Bouton d'augmentation -->
        <button
            class="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow"
            @click="increaseQuantity"
            :disabled="quantity >= initialProductStock"
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
            class="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-full shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300"
            @click="redirectToPreviousPage"
        >
          Retour
        </button>
        <button
            class="flex-1 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            @click="addToCart"
        >
          Ajouter à la commande
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
import {ref, onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";
import {getProductByIdRequest} from "@/services/products/productService.js";
import {useCartStore} from "@/store/cartStore.js";
import {storeToRefs} from "pinia";
import Mediazol  from "@/assets/images/medecine/mediazol.png"


const route = useRoute();
const router = useRouter();

const productId = Number(route.params.id);

const product = ref(null);
const loading = ref(true);
const quantity = ref(1); // Quantité par défaut
const productStock = ref(0); // Stock dynamique
const initialProductStock = ref(0)
const totalPrice = ref(0); // Prix total calculé
const cartStore = useCartStore();
const {cart} = storeToRefs(cartStore);



const fetchProductDetails = async () => {
  try {
    console.log("Récupération des détails pour le produit ID :", productId);
    const response = await getProductByIdRequest(productId);
    if (response && response.data) {
      product.value = {
        productId: response.data.productId,
        productImage: Mediazol,
        productName: response.data.productName,
        productDescription: response.data.productDescription,
        productPrice: response.data.productPrice,
        productStock: response.data.productStock,
      };

      // Stock initial depuis l'API
      initialProductStock.value = response.data.productStock;

      // Prendre en compte la quantité déjà ajoutée au panier
      const quantityInCart = cartStore.applyQuantityChosenToStock(productId);
      console.log("Quantité déjà dans le panier :", quantityInCart);

      productStock.value = Math.max(initialProductStock.value - quantityInCart, 0);
      quantity.value = 0; // Réinitialiser la quantité sélectionnée
      updateTotalPrice();
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error.message);
  } finally {
    loading.value = false;
  }
};

const updateTotalPrice = () => {
  totalPrice.value = quantity.value * product.value.productPrice;
};

// Mettre à jour dynamiquement le stock affiché
const updateDynamicStock = () => {
  const quantityInCart = cartStore.applyQuantityChosenToStock(productId);
  productStock.value = Math.max(initialProductStock.value - (quantity.value + quantityInCart), 0);
};

// Fonction pour augmenter la quantité
const increaseQuantity = () => {
  const quantityInCart = cartStore.applyQuantityChosenToStock(productId);
  if (quantity.value + 1 + quantityInCart <= initialProductStock.value) {
    quantity.value++;
    updateDynamicStock();
    updateTotalPrice();
  } else {
    alert("Vous ne pouvez pas dépasser le stock disponible.");
  }
};

// Fonction pour diminuer la quantité
const decreaseQuantity = () => {
  if (quantity.value > 0) {
    quantity.value--;
    updateDynamicStock();
    updateTotalPrice();
  }
};

// Validation pour l'input
const onQuantityInput = (event) => {
  const regex = /^[0-9]*$/; // Accepte uniquement les chiffres
  let value = event.target.value.replace(/\D/g, ""); // Supprime les caractères non numériques
  value = parseInt(value || "0", 10);

  const quantityInCart = cartStore.applyQuantityChosenToStock(productId);
  if (value + quantityInCart <= initialProductStock.value) {
    quantity.value = value;
  } else {
    alert(`Vous ne pouvez pas dépasser le stock disponible.`);
    quantity.value = initialProductStock.value - quantityInCart;
  }

  updateDynamicStock();
  updateTotalPrice();
};

const addToCart = () => {
  const totalQuantityInCart = cartStore.applyQuantityChosenToStock(product.value.productId);
  const newQuantity = totalQuantityInCart + quantity.value;


  if (newQuantity <= initialProductStock.value && newQuantity >0) {
    cartStore.addToCart(product.value, quantity.value);
    alert(`${quantity.value} x ${product.value.productName} ajouté(s) à la commande !`);
    router.push("/medical-employee/cart");
  } else {
    alert(`La quantité totale ne peut pas dépasser le stock disponible de ${initialProductStock.value}. Et doit être supérieur à 0 !`);
  }
};


const redirectToPreviousPage = () => {
  router.go(-1)
}

onMounted(async () => {
  document.body.classList.add("page-produits-body")
  await fetchProductDetails()
});


</script>


<style scoped>
.page-produits-body {
  background: linear-gradient(to right, #dbeafe, #93c5fd); /* Couleurs utilisées par Tailwind */
}
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


