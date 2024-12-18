<template>
  <NavBar/>
  <div class="pb-10">
    <div class="max-w-4xl my-5 mx-auto p-6 border border-gray-300 rounded-lg shadow-lg">
      <!-- Message de bienvenue -->
      <p class="text-sm text-gray-600 mb-4">
        Bonjour <span class="font-semibold">{{ userName }}</span>,
      </p>

      <!-- En-tête -->
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        Récapitulatif de votre commande n°{{ orderId }}
      </h1>

      <!-- Informations de la commande -->
      <p class="text-sm text-gray-600 mb-2">Date : {{ orderCreatedAt }}</p>
      <p class="text-sm text-gray-600 mb-4">
        Statut : <span class="font-semibold">{{ orderStatus }}</span>
      </p>

      <!-- Tableau des produits -->
      <table class="w-full border-collapse border border-gray-200 mb-6">
        <thead>
        <tr class="bg-gray-100">
          <th class="text-left text-sm text-gray-800 p-2">Produit</th>
          <th class="text-center text-sm text-gray-800 p-2">Quantité</th>
          <th class="text-right text-sm text-gray-800 p-2">Prix</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in products" :key="index" class="border-b border-gray-200">
          <td class="p-2 text-sm text-gray-700">{{ product.productName }}</td>
          <td class="text-center p-2 text-sm text-gray-700">{{ product.quantity }}</td>
          <td class="text-right p-2 text-sm text-gray-700">{{ product.productPrice }} €</td>
        </tr>
        </tbody>
      </table>

      <!-- Total -->
      <p class="text-right text-lg font-bold text-gray-800 mb-6">
        Total : {{ orderTotalPrice }} €
      </p>

      <!-- Adresse de livraison -->
      <p class="text-sm text-gray-600 mb-6">
        Adresse de livraison : <br/>
        <span class="font-semibold">{{ deliveryAddress }}</span>
      </p>

      <!-- Message d'au revoir -->
      <p class="text-sm text-gray-600 mt-6">
        Merci pour votre confiance et à bientôt !<br/>
        Cordialement,<br/>
        L'équipe <span class="font-semibold">{{ companyName }}</span>
      </p>
    </div>

    <div class="flex justify-center gap-3 items-center">
      <!-- Bouton Télécharger PDF -->
      <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          @click="downloadPDF"
      >
        Télécharger en PDF
      </button>

      <!-- Bouton Retour -->
      <button
          class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          @click="goToHome"
      >
        Retour à la page d'accueil
      </button>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

import NavBar from '../../components/medicalEmployeeComponent/navbar.vue'
import {useRoute, useRouter} from "vue-router";
import { onMounted } from "vue";
import { getOrderDetails } from "@/services/order/orderService.js"

const router = useRouter()
const route = useRoute();



const goToHome = () => {
  router.push("/medical-employee/landing-page")
};



const companyName = ref("GSB");
const orderId = ref(route.query.orderId || ""); // ID récupéré dans l'URL
const products = ref([]);
const orderTotalPrice = ref(0);
const orderStatus = ref("");
const orderCreatedAt = ref("");
const deliveryAddress = ref("");
const userName = ref("");

const downloadPDF = () => {
  alert("Fonction de téléchargement PDF en cours de développement.");
};

onMounted(async () => {
  try {
    // Récupérer les détails de la commande depuis l'API
    const response = await getOrderDetails(orderId.value);
    const orderData = response.data;

    console.log("Les données sont :", orderData)

    products.value = orderData.items;
    orderTotalPrice.value = orderData.orderTotalPrice;
    orderStatus.value = orderData.orders;
    orderCreatedAt.value = orderData.orderCreatedAt;
    deliveryAddress.value = orderData.deliveryAddressId || deliveryAddress.value;
    userName.value = orderData.userName || userName.value;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande :", error);
  }
});

</script>


<style>

</style>