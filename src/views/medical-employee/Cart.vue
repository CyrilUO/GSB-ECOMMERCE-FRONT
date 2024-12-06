<template>
  <Navbar/>
  <div class="container mx-auto p-6">
    <!-- Titre -->
    <h1 v-if="orders && orders.length" class="text-2xl font-bold mb-4">
      Résumé de la commande numéro
    </h1>

    <!-- Message si le panier est vide -->
    <p v-if="!orders.length" class="text-lg text-gray-600">
      Votre panier est vide. Vous serez redirigé vers la page des produits.
    </p>

    <!-- Tableau des commandes -->
    <table class="table-auto w-full border-collapse border border-gray-300 mb-6" v-if="orders && orders.length">
      <thead class="bg-gray-100">
      <tr>
        <th class="border border-gray-300 p-2">Image</th>
        <th class="border border-gray-300 p-2">Nom du produit</th>
        <th class="border border-gray-300 p-2">Prix unitaire</th>
        <th class="border border-gray-300 p-2">Quantité</th>
        <th class="border border-gray-300 p-2">Prix total</th>
        <th class="border border-gray-300 p-2">Supprimer</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in orders" :key="index" class="border-b">
        <td class="border border-gray-300 p-2 text-center">
          <img :src="item.product.productImage" :alt="item.product.productName" class="w-16 h-16 object-cover mx-auto" />
        </td>
        <td class="border border-gray-300 p-2 text-center">{{ item.product.productName }}</td>
        <td class="border border-gray-300 p-2 text-center">{{ item.product.productPrice }} €</td>
        <td class="border border-gray-300 p-2 text-center">{{ item.itemQuantity }}</td>
        <td class="border border-gray-300 p-2 text-center">
          {{ (item.product.productPrice * item.itemQuantity).toFixed(2) }} €
        </td>
        <td class="border border-gray-300 p-2 text-center">
          <button @click="removeItem(index)" class="text-red-600 hover:underline">X</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Prix total -->
    <div class="mb-6" v-if="orders && orders.length">
      <h2 class="text-lg font-semibold">Prix total :</h2>
      <span class="text-xl font-bold">
        {{ totalOrderPrice.toFixed(2) }} €
      </span>
    </div>

    <!-- Sélection d'adresse -->
    <div class="mb-6" v-if="orders && orders.length">
      <h2 class="text-lg font-semibold">Sélectionnez une adresse :</h2>
      <select v-model="selectedAddress" class="border border-gray-300 p-2 rounded">
        <option value="Nord">Paris</option>
        <option value="Sud">Marseille</option>
        <option value="Est">Lyon</option>
        <option value="Ouest">Bordeaux</option>
      </select>
    </div>

    <!-- Bouton finaliser commande -->
    <button
        @click="finalizeOrder"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        v-if="orders && orders.length"
    >
      Finalisez votre commande
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

import Navbar from "../../components/medicalEmployeeComponent/navbar.vue";

const router = useRouter();

// Les commandes du panier
const orders = ref([
  {
    orderId: 1,
    product: {
      productImage: "https://via.placeholder.com/100",
      productName: "Produit 1",
      productPrice: 50,
    },
    itemQuantity: 2,
  },
  {
    orderId: 1,
    product: {
      productImage: "https://via.placeholder.com/100",
      productName: "Produit 2",
      productPrice: 30,
    },
    itemQuantity: 1,
  },
]);

// Adresse sélectionnée
const selectedAddress = ref("");

// Calculer le prix total de la commande
const totalOrderPrice = computed(() => {
  return orders.value.reduce(
      (total, item) => total + item.product.productPrice * item.itemQuantity,
      0
  );
});

// Supprimer un produit
const removeItem = (index) => {
  orders.value.splice(index, 1);
};

// Finaliser la commande
const finalizeOrder = () => {
  if (!selectedAddress.value) {
    alert("Veuillez sélectionner une adresse avant de finaliser la commande !");
    return;
  }

  // Simuler une requête d'envoi
  setTimeout(() => {
    alert(
        `Votre commande a été finalisée et sera livrée à ${selectedAddress.value}.`
    );
    orders.value = [];
    router.push("/medical-employee/order-validation");
  }, 500);
};

// Redirection si le panier est vide
watch(
    () => orders.value.length,
    (newLength) => {
      if (newLength === 0) {
        alert("Votre panier est vide. Vous allez être redirigé vers la page des produits.");
        router.push("/medical-employee/carousel-products");
      }
    }
);
</script>

<style>
</style>
