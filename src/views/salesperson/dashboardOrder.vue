<template>
  <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col">
    <h3 class="text-2xl font-semibold mb-4">Détails des commandes utilisateurs :</h3>

    <!-- Sélecteur d'Adresse -->
    <div class="mb-6">
      <label for="addressSelect" class="block text-lg font-medium mb-2">Choisir une adresse</label>
      <select id="addressSelect" v-model="selectedAddress" @change="loadOrders"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option v-for="address in addresses" :key="address.deliveryAddressId" :value="address.deliveryAddressId">
          {{ address.deliveryAddressCity }} - {{ address.deliveryAddressStreet }}
        </option>
      </select>
      <p v-if="error" class="text-red-500 mt-2">❌ Erreur : {{ error }}</p>
    </div>

    <!-- Tableau des commandes -->
    <div v-if="orders.length">
      <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <table class="table-auto w-full border-collapse border border-gray-200 text-center">
          <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 px-4 py-2">ID Commande</th>
            <th class="border border-gray-300 px-4 py-2">Nom Client</th>
            <th class="border border-gray-300 px-4 py-2">Email</th>
            <th class="border border-gray-300 px-4 py-2">Total</th>
            <th class="border border-gray-300 px-4 py-2">Statut</th>
            <th class="border border-gray-300 px-4 py-2">Modifier</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders" :key="order.orderId">
            <td class="border border-gray-300 px-4 py-2">{{ order.orderId }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ order.userName }} {{ order.userSurname }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ order.userEmail }}</td>
            <td class="border border-gray-300 px-4 py-2 font-bold">{{ formatPrice(order.orderTotalPrice) }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <select v-model="order.orderStatus"
                      class="px-2 py-1 border border-gray-300 rounded-md shadow-sm">
                <option value="En attente">En attente</option>
                <option value="Expédié">Expédié</option>
                <option value="Livré">Livré</option>
              </select>
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <button @click="updateStatus(order.orderId, order.orderStatus)"
                      class="bg-green-500 text-white px-3 py-1 rounded-md shadow hover:bg-green-600">
                Modifier
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <p v-else class="text-gray-500 mt-4">Aucune commande disponible pour cette région.</p>

  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import {getUserOrdersByRegion, updateOrderStatus } from "@/services/order/orderService.js";
import {fetchAvailableAddresses } from "@/services/deliveryAddress/deliveryAddressService.js";

// **Variables Réactives**
const addresses = ref([]); // Liste des adresses
const selectedAddress = ref(null); // Adresse sélectionnée
const orders = ref([]); // Liste des commandes
const error = ref(null); // Gestion des erreurs

// **Charger les adresses**
const loadAddresses = async () => {
  try {
    console.log("🔹 Chargement des adresses...");
    const response = await fetchAvailableAddresses();
    addresses.value = response.data;
    console.log("✅ Adresses récupérées :", addresses.value);
  } catch (err) {
    console.error("❌ Erreur lors du chargement des adresses :", err);
    error.value = "Impossible de récupérer les adresses.";
  }
};

// **Charger les commandes en fonction de l'adresse sélectionnée**
const loadOrders = async () => {
  if (!selectedAddress.value) return;

  try {
    console.log(`🔹 Chargement des commandes pour l'adresse ID: ${selectedAddress.value}`);
    const response = await getUserOrdersByRegion(selectedAddress.value);

    if (response.data.length === 0) {
      console.warn("⚠️ Aucune commande trouvée pour cette adresse.");
      orders.value = []; // ✅ On stocke une liste vide
      error.value = null;
    } else {
      orders.value = response.data.map(item => ({
        orderId: item.order?.orderId || "ID inconnu",
        userName: item.users?.userName || "Nom inconnu",
        userSurname: item.users?.userSurname || "Prénom inconnu",
        userEmail: item.users?.userEmail || "Email inconnu",
        orderTotalPrice: item.order?.orderTotalPrice || "Prix total inconnu",
        orderStatus: item.order?.orderStatus || "Statut de commande inconnu"
      }));
      error.value = null;
    }
  } catch (err) {
    console.error("❌ Erreur lors du chargement des commandes :", err);
    error.value = "Impossible de récupérer les commandes.";
  }
};

// **Modifier le statut d'une commande**
const updateStatus = async (orderId, newStatus) => {
  try {
    console.log(`🔹 Mise à jour du statut de la commande ${orderId} -> ${newStatus}`);
    await updateOrderStatus(orderId, String(newStatus));
    console.log(`✅ Statut de la commande ${orderId} mis à jour avec succès`);
  } catch (error) {
    console.error(`❌ Erreur lors de la mise à jour de la commande ${orderId} :`, error);
  }
};

// **Formatter le prix**
const formatPrice = (price) => {
  return price ? `${price.toFixed(2)} €` : "0.00 € ";
};

// **Charger les adresses au montage**
onMounted(() => {
  loadAddresses();
});
</script>
