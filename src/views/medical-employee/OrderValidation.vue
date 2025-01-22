<template>
  <NavBar />
  <div v-if="!orderData" class="min-h-screen flex items-center justify-center bg-gray-50">
    <p class="text-lg text-gray-500">Chargement des détails de la commande...</p>
  </div>
  <div v-if="orderData" class="pb-10 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <!-- Message de bienvenue -->
      <div class="text-center">
        <p class="text-sm text-gray-600">
          Bonjour <span class="font-semibold text-blue-600">{{ orderUserName }}</span>,
        </p>
      </div>

      <!-- En-tête -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-800">Récapitulatif de votre commande n°{{ orderId }}</h1>
        <p class="text-sm text-gray-500 mt-2">Date : {{ orderCreatedAt }}</p>
        <p class="text-sm text-gray-500">
          Statut : <span class="font-semibold text-yellow-600">{{ orderStatus }}</span>
        </p>
      </div>

      <!-- Tableau des produits -->
      <div class="overflow-x-auto">
        <table class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead class="bg-blue-100 text-blue-700">
          <tr>
            <th class="p-3 text-left">Produit</th>
            <th class="p-3 text-center">Quantité</th>
            <th class="p-3 text-right">Prix</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(product, index) in products"
              :key="index"
              class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="p-3 text-gray-800">{{ product.productName }}</td>
            <td class="p-3 text-center text-gray-800">{{ product.quantity }}</td>
            <td class="p-3 text-right text-gray-800">{{ product.productPrice }} €</td>
          </tr>
          </tbody>
          <tfoot>
          <tr class="bg-gray-100">
            <td colspan="2" class="p-3 font-semibold text-right">Total :</td>
            <td class="p-3 text-right font-bold text-gray-900">{{ orderTotalPrice }} €</td>
          </tr>
          </tfoot>
        </table>
      </div>

      <!-- Adresse de livraison -->
      <div class="text-sm text-gray-600">
        <p>Adresse de livraison :</p>
        <p class="font-semibold text-gray-800">{{ orderDeliveryAddress }}</p>
      </div>

      <!-- Message d'au revoir -->
      <div class="text-center text-sm text-gray-600 mt-6">
        <p>Merci pour votre confiance et à bientôt !</p>
        <p>Cordialement,</p>
        <p class="font-semibold text-blue-600">L'équipe {{ companyName }}</p>
      </div>

      <!-- Boutons -->
      <div class="flex justify-center gap-4 mt-6">
        <button
            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 shadow-md"
            @click="downloadPDF"
        >
          Télécharger en PDF
        </button>
        <button
            class="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 shadow-md"
            @click="goToHome"
        >
          Retour à la page d'accueil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { getOrderDetails } from "@/services/order/orderService.js";

const router = useRouter();
const route = useRoute();

const goToHome = () => {
  router.push("/medical-employee/landing-page");
};

const companyName = ref("GSB");
const orderId = ref(route.params.orderId || "");
const products = ref([]);
const orderTotalPrice = ref(0);
const orderStatus = ref("");
const orderCreatedAt = ref("");
const orderDeliveryAddress = ref("");
const orderUserName = ref("");
const orderData = ref(null);

const downloadPDF = () => {
  alert("Fonction de téléchargement PDF en cours de développement.");
};

onMounted(async () => {
  if (!orderId.value) {
    alert("Une erreur est survenue : l'identifiant de la commande est introuvable.");
    return;
  }

  try {
    const response = await getOrderDetails(orderId.value);

    orderData.value = response.data;

    products.value = orderData.value.items.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      productPrice: item.unitPrice,
    }));
    orderTotalPrice.value = orderData.value.orderTotalPrice;
    orderStatus.value = orderData.value.orderStatus;
    orderCreatedAt.value = orderData.value.orderCreatedAt;
    orderDeliveryAddress.value = orderData.value.deliveryAddressName;
    orderUserName.value = orderData.value.userName || "Inconnu";
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande :", error);
  }
});
</script>

<style>
/* Ajoutez des ajustements globaux si nécessaire */
</style>
