<template>
<NavBar/>
  <div class="py-40">
    <div class="relative w-full max-w-4xl mx-auto overflow-hidden bg-gray-100 py-10 border rounded-lg shadow">
      <div
          class="flex transition-transform duration-500"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
            v-for="(product, index) in products"
            :key="index"
            class="flex-shrink-0 w-full flex justify-center items-center p-5"
        >
          <div class="flex items-center space-x-4">
            <img
                :src="product.productImage"
                :alt="product.productName"
                class="w-24 h-24 object-cover rounded-full shadow"
            />
            <div>
              <h2 class="text-xl font-bold text-gray-800">{{ product.productName }}</h2>
              <p class="text-sm text-gray-600">
                {{ product.productDescription }}
              </p>
              <p class="text-sm text-gray-600">
                {{ product.productPrice }}€
              </p>
              <button
                  @click="goToDetails(product)"
                  class="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Détails du produit
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
          class="absolute top-1/2 left-2 transform text-white font-extrabold -translate-y-1/2 bg-blue-800 px-1 py-1 rounded-full hover:opacity-85"
          @click="prevSlide" aria-label="Précédent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
          class="absolute top-1/2 right-2 transform text-white font-extrabold -translate-y-1/2 bg-blue-800 px-1 py-1 rounded-full hover:opacity-85"
          @click="nextSlide" aria-label="Suivant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div class="flex justify-center mt-2 space-x-2">
        <button
            v-for="(product, index) in products"
            :key="index"
            :class="{
          'bg-blue-500': currentIndex === index,
          'bg-gray-400': currentIndex !== index,
        }"
            class="w-3 h-3 rounded-full focus:outline-none"
            @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";

import NavBar from "../../components/medicalEmployeeComponent/navbar.vue"


const router = useRouter();

const route = useRoute();


const products = ref([
  {
    productId : 1,
    productImage: "data:image/jpeg;base64,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",
    productName: "PROXINOL",
    productDescription:
        "Produit recommandé dans le traitement contre les douleurs cutanées et les infections de niveau 1.",
    productPrice: 150,

  },
  {
    productId: 2,
    productImage: "https://via.placeholder.com/100",
    productName: "MEDICORP",
    productDescription:
        "Aide à combattre les infections respiratoires légères et à soulager les irritations.",
    productPrice: 150,

  },
  {
    productId: 3,
    productImage: "https://via.placeholder.com/100",
    productName: "VITAMAX",
    productDescription:
        "Complément alimentaire pour renforcer le système immunitaire et réduire la fatigue.",
    productPrice: 150,
  },
  {
    productId: 4,
    productImage: "https://via.placeholder.com/100",
    productName: "VITAMAX",
    productDescription:
        "Complément alimentaire pour renforcer le système immunitaire et réduire la fatigue.",
    productPrice: 150,
  },
  {
    productId: 5,
    productImage: "https://via.placeholder.com/100",
    productName: "VITAMAX",
    productDescription:
        "Complément alimentaire pour renforcer le système immunitaire et réduire la fatigue.",
    productPrice: 150,
  },
]);

const currentIndex = ref(0);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % products.value.length;
};

const prevSlide = () => {
  currentIndex.value =
      (currentIndex.value - 1 + products.value.length) % products.value.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

const goToDetails = (product) => {
  router.push({
    name: 'PDP', // Use the route's name for navigation
    params: { id: product.productId }, // Dynamic parameter
    // query: { productName: product.productName }, // Optional query parameters
  });
};

</script>
