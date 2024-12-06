<template>
  <NavBar />
  <div class="container mx-auto p-4">
    <div v-if="product" class="flex items-center space-x-8">
      <!-- Image du produit -->
      <img
          :src="product.productImage"
          :alt="product.productName"
          class="w-40 h-40 rounded-lg shadow"
      />

      <!-- Détails du produit -->
      <div class="border p-4 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold">{{ product.productName }}</h1>
        <p class="mt-2 text-gray-600">ID : {{ product.productId }}</p>
        <p class="mt-2 text-gray-600">{{ product.productDescription }}</p>
        <p class="mt-4 text-lg font-semibold text-green-600">
          Prix unitaire : {{ product.productPrice }}€
        </p>
        <p class="mt-2 text-gray-800">Stock disponible : {{ product.productStock }}</p>

        <!-- Gestion de la quantité -->
        <div class="mt-4">
          <label for="quantity" class="font-medium">Quantité :</label>
          <div class="flex items-center space-x-4 mt-2">
            <button
                class="px-3 py-1 border rounded hover:bg-gray-200"
                @click="decreaseQuantityAndStock"
            >
              -
            </button>
            <span class="font-medium">{{ quantity }}</span>
            <button
                class="px-3 py-1 border rounded hover:bg-gray-200"
                @click="increaseQuantityAndStock"
            >
              +
            </button>
          </div>
        </div>

        <!-- Calcul du prix total -->
        <p class="mt-4 text-lg font-bold">
          Prix total : {{ (quantity * product.productPrice).toFixed(2) }}€
        </p>

        <!-- Bouton Ajouter au panier -->
        <button
            class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="addToCart"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
    <div v-else>
      <p>Chargement des informations du produit...</p>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";

// Utilisation de useRoute pour récupérer les paramètres de la route
const route = useRoute();
const productId = Number(route.params.id); // Récupération et conversion de l'ID en nombre

// Initialisation des produits disponibles (vous pouvez remplacer cette liste par des données dynamiques)
const products = ref([
  {
    productId: 1,
    productImage: "https://via.placeholder.com/100",
    productName: "PROXINOL",
    productDescription:
        "Produit recommandé dans le traitement contre les douleurs cutanées et les infections de niveau 1.",
    productPrice: 100,
    productStock: 200,
  },
  {
    productId: 2,
    productImage: "https://via.placeholder.com/100",
    productName: "MEDICORP",
    productDescription:
        "Aide à combattre les infections respiratoires légères et à soulager les irritations.",
    productPrice: 150,
    productStock: 150,
  },
  {
    productId: 3,
    productImage: "https://via.placeholder.com/100",
    productName: "VITAMAX",
    productDescription:
        "Complément alimentaire pour renforcer le système immunitaire et réduire la fatigue.",
    productPrice: 120,
    productStock: 250,
  },
]);

// Produit sélectionné
const product = ref(null);

// Quantité sélectionnée par l'utilisateur
const quantity = ref(1);

// Récupération des données du produit en fonction de l'ID
onMounted(() => {
  product.value = products.value.find((product) => product.productId === productId);
  if (!product.value) {
    console.error("Produit introuvable");
  }
});

// Augmenter la quantité
const increaseQuantityAndStock = () => {
  if (product.value.productStock > 1) {
    quantity.value++;
    product.value.productStock--;
  } else {
    alert("Produit en rupture de stock");
  }
};

// Diminuer la quantité
const decreaseQuantityAndStock = () => {
  if (quantity.value > 1 && product.value.productStock > 0) {
    quantity.value--;
    product.value.productStock++;
  } else {
    alert("La quantité choisie ne peut être inférieure à 1");
  }
};

// Ajouter au panier
const addToCart = () => {
  if (product.value) {
    alert(
        `${quantity.value} ${product.value.productName}(s) ajouté(s) au panier !`
    );
  } else {
    alert("Aucun produit sélectionné.");
  }
};
</script>



<style>

</style>