<template>
  <NavBar class="h-fit" />
  <div class="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-4">Vos Commandes</h1>
    <div v-if="isLoading" class="text-center">
      Chargement des commandes...
    </div>
    <div v-else-if="orders.length === 0" class="text-center text-gray-500">
      Vous n'avez pas encore passé de commandes.
    </div>
    <div v-else>
      <div
          v-for="order in orders"
          :key="order.orderId"
          class="border p-4 mb-4 rounded bg-gray-50 shadow"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="font-semibold">Commande n°{{ order.orderId }}</p>
            <p>Status : {{ order.orderStatus }}</p>
            <p>Total : {{ order.orderTotalPrice }} €</p>
          </div>
          <button
              @click="toggleDetails(order.orderId)"
              class="text-blue-500 hover:underline"
          >
            {{ expandedOrderId === order.orderId ? "Masquer" : "Voir" }} les
            détails
          </button>
        </div>
        <div
            v-if="expandedOrderId === order.orderId"
            class="mt-4 border-t pt-4"
        >
          <p>Date de commande : {{ order.orderCreatedAt }}</p>
          <p>Adresse de livraison : {{ order.deliveryAddressName }}</p>
          <table class="w-full text-sm mt-4 border">
            <thead class="bg-gray-100">
            <tr>
              <th class="text-left p-2 border">Produit</th>
              <th class="text-center p-2 border">Quantité</th>
              <th class="text-right p-2 border">Prix</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="item in order.items"
                :key="item.productName"
                class="border-b"
            >
              <td class="p-2 border">{{ item.productName }}</td>
              <td class="text-center p-2 border">{{ item.quantity }}</td>
              <td class="text-right p-2 border">{{ item.unitPrice }} €</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/userStore.js";
import { getUserOrders } from "@/services/order/orderService.js";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";

const orders = ref([]);
const isLoading = ref(false);
const expandedOrderId = ref(null);

const userStore = useUserStore();

const toggleDetails = (orderId) => {
  expandedOrderId.value =
      expandedOrderId.value === orderId ? null : orderId;
};

onMounted(async () => {
  const userId = userStore.userId;
  if (!userId) {
    console.error("User ID introuvable.");
    return;
  }
  isLoading.value = true;
  try {
    const response = await getUserOrders(userId);
    orders.value = response.data; // Assurez-vous que la structure correspond bien à l'API
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>
