<template>
  <NavBar class="h-fit"/>
  <div class="max-w-5xl w-full mx-auto mt-12 px-8 pt-8 pb-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-3xl font-extrabold mb-8 text-gray-900">Historique des Commandes 📜</h1>

    <!-- Affichage des états -->
    <div v-if="isLoading" class="text-center text-gray-500">
      <span class="animate-pulse">Chargement des commandes...</span>
    </div>
    <div v-else-if="orders.length === 0" class="text-center text-gray-500">
      <p class="font-semibold bg-red-700 text-white py-4 px-10 text-lg">Vous n'avez pas encore passé de commandes.</p>
    </div>

    <!-- Liste des commandes -->
    <div v-else>
      <div
          v-for="order in orders"
          :key="order.orderId"
          class="border p-6 mb-8 rounded-lg bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-md"
      >
        <!-- En-tête de commande -->
        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-xl text-gray-800">Commande n°{{ order.orderId }} 📦</p>
            <p class="text-gray-600">
            <span
                class="font-semibold"
                :class="{
                'text-yellow-600': order.orderStatus === 'En attente',
                'text-red-600': order.orderStatus === 'Retardée',
                'text-green-600': order.orderStatus === 'Validée'
              }"
            >
              Statut : {{ order.orderStatus }}
            </span>
            </p>
            <p class="text-gray-600">
              <span class="font-semibold">Total :</span> {{ order.totalOrderPrice.toFixed(2) }} €
            </p>
          </div>
          <button
              @click="toggleDetails(order.orderId)"
              class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition"
          >
            {{ expandedOrderId === order.orderId ? "Masquer les détails" : "Voir les détails" }}
          </button>
        </div>

        <!-- Détails de la commande -->
        <div v-if="expandedOrderId === order.orderId" class="mt-6 bg-white border-t py-2">
          <p class="text-gray-700">
            <span class="font-semibold">Date de commande :</span> {{ order.orderCreatedAt }}
          </p>
          <p class="text-gray-700">
            <span class="font-semibold">Adresse de livraison :</span>
            {{ order.city }}, {{ order.street }}, {{ order.zipCode }}, {{ order.country }}
          </p>

          <!-- Tableau des produits -->
          <table class="w-full mt-6 border-collapse">
            <thead>
            <tr class="bg-gray-100 text-left text-gray-700">
              <th class="p-4 border">Produit</th>
              <th class="p-4 border text-center">Quantité</th>
              <th class="p-4 border text-right">Prix Unitaire</th>
              <th class="p-4 border text-right">Sous-total</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in order.items"
                :key="item.productName"
                class="hover:bg-gray-50"
            >
              <td class="p-4 border">{{ item.productName }}</td>
              <td class="p-4 border text-center">{{ item.quantity }}</td>
              <td class="p-4 border text-right">{{ item.unitPrice.toFixed(2) }} €</td>
              <td class="p-4 border text-right">
                {{ (item.unitPrice * item.quantity).toFixed(2) }} €
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-gray-50 {
  background-color: #f9fafb;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

.text-gray-900 {
  color: #111827;
}

.text-gray-700 {
  color: #374151;
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

.table th {
  background-color: #f3f4f6;
}

.table td,
.table th {
  padding: 16px;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.page-produits-body {
  background: linear-gradient(to right, #dbeafe, #93c5fd); /* Couleurs utilisées par Tailwind */
}
</style>


<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import {useUserStore} from "@/store/userStore.js";
import {showAllUserOrderDetails} from "@/services/order/orderService.js";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";

const orders = ref([]);
const isLoading = ref(false);
const expandedOrderId = ref(null);

const userStore = useUserStore();

const toggleDetails = (orderId) => {
  expandedOrderId.value = expandedOrderId.value === orderId ? null : orderId;
};


onMounted(async () => {
  document.body.classList.add("page-produits-body"); // Retrait de la classe au body

  if (!userStore.userId) {
    console.log("Order : récupération de userId depuis le store");
    await userStore.fetchCurrentUser();
  }

  const userId = userStore.userId;
  if (!userId) {
    console.error("User ID introuvable.");
    return;
  }

  isLoading.value = true;
  try {
    const response = await showAllUserOrderDetails(userId);
    orders.value = response.data; // Les données sont déjà structurées depuis le backend
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
  } finally {
    isLoading.value = false;
  }
});


</script>

