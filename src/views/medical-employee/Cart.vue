<template>
  <Navbar />
  <div class="container mx-auto p-6">
    <!-- Titre -->
    <h1 v-if="orders && orders.length" class="text-2xl font-bold mb-4">
      Résumé de la commande numéro order.orderID
    </h1>

    <!-- Message si le panier est vide -->
    <p v-if="!orders.length" class="text-lg text-gray-600">
      Votre panier est vide. Vous serez redirigé vers la page des produits.
    </p>

    <!-- Tableau des commandes -->
    <table
        class="table-auto w-full border-collapse border border-gray-300 mb-6"
        v-if="orders && orders.length"
    >
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
      <tr
          v-for="(item, index) in orders"
          :key="index"
          class="border-b"
      >
        <td class="border border-gray-300 p-2 text-center">
          <img
              :src="item.product.productImage"
              :alt="item.product.productName"
              class="w-16 h-16 object-cover mx-auto"
          />
        </td>
        <td class="border border-gray-300 p-2 text-center">
          {{ item.product.productName }}
        </td>
        <td class="border border-gray-300 p-2 text-center">
          {{ item.product.productPrice }} €
        </td>
        <td class="border border-gray-300 p-2 text-center">
          {{ item.quantity }}
        </td>
        <td class="border border-gray-300 p-2 text-center">
          {{ (item.product.productPrice * item.quantity).toFixed(2) }} €
        </td>
        <td class="border border-gray-300 p-2 text-center">
          <button
              @click="removeItem(item.product.productId)"
              class="text-red-600 hover:underline"
          >
            X
          </button>
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
        <option value="Paris">Paris</option>
        <option value="Marseille">Marseille</option>
        <option value="Lyon">Lyon</option>
        <option value="Bordeaux">Bordeaux</option>
      </select>
    </div>

    <!-- Boutons d'action -->
    <div class="flex justify-end mt-6">
      <button
          @click="backToCarouselProduct"
          class="bg-orange-500 hover:bg-orange-300 mr-6 text-white px-6 py-3 rounded-md shadow-lg"
      >
        Retour Page Produits
      </button>
      <button
          @click="finalizeOrder"
          class="bg-blue-500 hover:bg-blue-300 text-white px-6 py-3 rounded-md shadow-lg"
      >
        Finalisez votre commande
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cartStore.js";
import { useUserStore } from "@/store/userStore.js";
import Navbar from "../../components/medicalEmployeeComponent/navbar.vue";
import { createOrder } from "@/services/order/orderService.js";

// Stores
const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

// Propriétés réactives
const { cart: orders, totalPrice: totalOrderPrice } = cartStore;
const { userId } = userStore;

// Adresse sélectionnée
const selectedAddress = ref("");

// Récupération de l'utilisateur connecté
onMounted(async () => {
  await userStore.fetchCurrentUser(); // Récupérer les informations utilisateur
});

const removeItem = (productId) => {
  console.log("ID du produit à supprimer :", productId);
  cartStore.removeFromCart(productId);
};


// Redirection vers la page des produits
const backToCarouselProduct = () => {
  router.push("/medical-employee/carousel-products");
};

const getAddressId = (city) => {
  switch (city) {
    case "Paris":
      return 2;
    case "Marseille":
      return 4;
    case "Lyon":
      return 1;
    case "Bordeaux":
      return 3;
    default:
      return null;
  }
};

const finalizeOrder = async () => {
  if (!selectedAddress.value) {
    alert("Veuillez sélectionner une adresse avant de finaliser la commande !");
    return;
  }

  console.log("Contenu du panier :", orders);
  console.log("Adresse sélectionnée :", selectedAddress.value);

  const payload = {
    userId: userId,
    deliveryAddressId: getAddressId(selectedAddress.value),
    orderTotalPrice: totalOrderPrice,
    items: orders.map((item) => ({
      productId: item.product.productId,
      orderedItemsQuantity: item.quantity,
      orderedItemsUnitPrice: item.product.productPrice,
    })),
  };

  try {
    console.log("Payload envoyé :", payload); // Vérifie ici !

    const response = await createOrder(payload);
    const orderId = response.data.orderId;
    await router.push({
      path: "/medical-employee/order-validation",
      params: { orderId },
    });
  } catch (error) {
    console.error("Erreur lors de la finalisation de la commande :", error);
    alert("Une erreur est survenue lors de la finalisation de votre commande.");
  }
};


// Redirection si le panier est vide
watch(
    () => orders.length,
    (newLength) => {
      if (newLength === 0) {
        alert("Votre panier est vide. Vous allez être redirigé vers la page des produits.");
        router.push("/medical-employee/carousel-products");
      }
    }
);
</script>

<style></style>
