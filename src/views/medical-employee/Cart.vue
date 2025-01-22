<template>
  <Navbar />
  <div class="min-h-screen mx-auto p-6">
    <!-- Titre -->
    <h1 v-if="orders && orders.length" class="text-2xl font-bold mb-4">
      Résumé de la commande numéro order.orderID
    </h1>

    <!-- Message si le panier est vide -->
    <div v-if="!orders.length" class="flex flex-col items-center justify-center mt-12">
      <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md w-full max-w-md">
        <div class="flex items-center space-x-5 ml-1.5">
          <!-- Texte du message -->
          <p class="text-lg font-semibold">
            Votre panier est vide.<br />
            <span class="text-blue-500 font-medium">Veuillez choisir un produit pour finaliser votre commande</span>
          </p>
        </div>
      </div>
    </div>


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
    <div class="mb-6 flex justify-end gap-2" v-if="orders && orders.length">
      <h2 class="text-lg font-semibold">Prix total : </h2>
      <span class="text-xl font-bold">
        {{ totalOrderPrice.toFixed(2) }} €
      </span>
    </div>

    <!-- Sélection d'adresse -->
    <div class="mb-6" v-if="orders && orders.length">
      <h2 class="text-lg font-semibold">Sélectionnez une adresse :</h2>
      <select v-model="selectedAddress" class="border border-gray-300 p-2 rounded">
        <option value="Paris">Paris - 56 Avenue des Champs-Elysées - 75008 - France</option>
        <option value="Marseille">Marseille - 78 Boulevard de la Canebière - 13001 - France</option>
        <option value="Lyon">Lyon - 123 Rue de la République - 69001 - France</option>
        <option value="Bordeaux">Bordeaux - 45 Quai des Chartrons - 33000 - France</option>
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
          v-if="orders.length"
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
  await userStore.fetchCurrentUser();
  console.log("l'userId est : " + userId)// Récupérer les informations utilisateur
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
    userId: userStore.userId,
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
    console.log("La réponse est ", response.data); // Assurez-vous qu'il affiche { orderId: 39 }
    const generatedUrl = `/medical-employee/order-validation/${response.data.orderId}`;
    console.log("Les datas responses ID sont : ", response.data.orderId);

    cartStore.clearCartStore();

    await router.push(generatedUrl);


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
