<template>
  <NavBar/>
  <!-- Ajout de flex pour le centrage -->
  <div class="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center">
    <div class="w-full max-w-5xl">
      <!-- Titre en haut du carousel -->
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-6">
        Liste des produits disponibles
      </h1>

      <!-- Carousel -->
      <div class="relative overflow-hidden rounded-3xl shadow-lg bg-white/30 backdrop-blur-md pb-4">
        <!-- Carousel Content -->
        <div v-if="products.length > 0" class="relative">
          <div
              class="flex transition-transform duration-700 ease-in-out"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
                v-for="(product, index) in products"
                :key="index"
                class="flex-shrink-0 w-full flex justify-center items-center p-8"
            >
              <div
                  class="flex items-center space-x-6 p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300"
              >
                <img
                    :src="product.productImage"
                    :alt="product.productName"
                    class="w-32 h-32 object-cover rounded-full shadow-lg"
                />
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-gray-700">{{ product.productName }}</h2>
                  <p class="text-sm text-gray-500">{{ product.productDescription }}</p>
                  <div class="flex items-center space-x-2">
                    <span
                        class="inline-block bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-full shadow"
                    >
                      {{ product.productPrice }}€
                    </span>
                    <span
                        v-if="product.isNew"
                        class="inline-block bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full"
                    >
                      Nouveau
                    </span>
                  </div>
                  <button
                      @click="goToDetails(product)"
                      class="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Détails du produit
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-10">
          <p class="text-gray-600 text-lg">Aucun produit disponible pour le moment.</p>
        </div>

        <!-- Navigation Buttons -->
        <button
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 backdrop-blur-md text-gray-700 hover:bg-white text-2xl p-2 rounded-full shadow transition duration-300"
            @click="prevSlide" aria-label="Précédent"
        >
          &larr;
        </button>
        <button
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 backdrop-blur-md text-gray-700 hover:bg-white text-2xl p-2 rounded-full shadow transition duration-300"
            @click="nextSlide" aria-label="Suivant"
        >
          &rarr;
        </button>

        <!-- Indicators -->
        <div class="flex justify-center mt-4 space-x-2">
          <button
              v-for="(product, index) in products"
              :key="index"
              :class="{
                'bg-blue-600': currentIndex === index,
                'bg-gray-400': currentIndex !== index,
              }"
              class="w-4 h-4 rounded-full transition-all duration-300"
              @click="goToSlide(index)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import {ref, onMounted} from "vue";
import {useRouter} from "vue-router";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";
import {getProductsRequest} from "@/services/products/productService.js";

const router = useRouter();

const products = ref([]);
const currentIndex = ref(0);

const fetchProducts = async () => {
  try {
    const response = await getProductsRequest();
    products.value = response.data.map(product => ({
      productId: product.productId || 0,
      productImage: product.productImage || "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image",
      productName: product.productName || "Produit inconnu",
      productDescription: product.productDescription || "Aucune description disponible.",
      productPrice: product.productPrice || 0,
      isNew: Math.random() > 0.7, // Simule des produits "nouveaux"
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
  }
};

const goToDetails = (product) => {
  router.push({
    name: "PDP", // Assure-toi que le nom de ta route est correcte
    params: { id: product.productId }, // Passe l'ID en paramètre
  });
};


const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % products.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + products.value.length) % products.value.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

onMounted(fetchProducts);
</script>

<style scoped>
/* Pour des transitions fluides sur les boutons */

</style>
