<template>
  <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col">
    <!-- Titre -->
    <h3 class="text-2xl font-semibold mb-4">Détails des commandes utilisateurs :</h3>

    <!-- Sélecteur utilisateur -->
    <div class="mb-6">
      <label for="userSelect" class="block text-lg font-medium mb-2">Choisir un utilisateur</label>
      <select
          id="userSelect"
          v-model="selectedUser"
          @change="loadOrders"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <p class="mt-2 text-sm text-gray-500 font-medium">
        (Utilisateur sélectionné : {{ getUserName(selectedUser) }})
      </p>
    </div>

    <!-- Tableau des commandes -->
    <div>

    <div class="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
      <table class="table-auto w-full border-collapse border border-gray-200 text-center">
        <thead class="bg-gray-100">
        <tr>
          <th class="border border-gray-300 px-4 py-2">IMAGE</th>
          <th class="border border-gray-300 px-4 py-2">Nom Produit</th>
          <th class="border border-gray-300 px-4 py-2">Prix unitaire</th>
          <th class="border border-gray-300 px-4 py-2">Quantité</th>
          <th class="border border-gray-300 px-4 py-2">Prix Total</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td class="border border-gray-300 px-4 py-2">
            <img :src="order.image" alt="Produit" class="w-12 h-12 object-contain mx-auto" />
          </td>
          <td class="border border-gray-300 px-4 py-2">{{ order.productName }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ formatPrice(order.unitPrice) }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ order.quantity }}</td>
          <td class="border border-gray-300 px-4 py-2 font-bold">
            {{ formatPrice(order.totalPrice) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

      <!-- Adresse -->
      <div class="mt-4 text-gray-700 text-sm font-medium">
        <p>Adresse : {{ address }}</p>
      </div>

      <!-- Total général -->
      <div class="mt-4 text-right font-bold text-lg text-gray-900">
        Prix total : {{ formatPrice(totalPrice) }}
      </div>
    </div>


    <div class="flex justify-center">
      <button
          class="mt-6 px-6 py-2 bg-blue-500 inline-block text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          @click="downloadPDF"
      >
        Télécharger un PDF des commandes
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

// Données factices pour les utilisateurs
const users = ref([
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
]);

// Données factices pour les commandes
const orders = ref([]);
const address = ref("LYON - 120 Avenue du champs de Mars - 69004 - France");
const totalPrice = ref(0);
const selectedUser = ref(users.value[0]?.id || null);

// Formater les prix
const formatPrice = (price) => `${price.toFixed(2)}€`;

// Charger les commandes d'un utilisateur
const loadOrders = () => {
  // Simuler des commandes pour un utilisateur
  orders.value = [
    {
      id: 1,
      productName: "Proxinol",
      unitPrice: 10.99,
      quantity: 2,
      totalPrice: 21.98,
      image: "https://via.placeholder.com/50", // Image factice
    },
    {
      id: 2,
      productName: "Doliprane",
      unitPrice: 5.99,
      quantity: 3,
      totalPrice: 17.97,
      image: "https://via.placeholder.com/50", // Image factice
    },
  ];

  // Mettre à jour le prix total
  totalPrice.value = orders.value.reduce((sum, order) => sum + order.totalPrice, 0);
};

// Obtenir le nom de l'utilisateur sélectionné
const getUserName = (userId) => users.value.find((user) => user.id === userId)?.name || "Inconnu";

// Télécharger un PDF (fonction placeholder)
const downloadPDF = () => {
  alert("Le PDF sera généré ici !");
};

// Charger les commandes pour l'utilisateur par défaut au montage
loadOrders();
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>
