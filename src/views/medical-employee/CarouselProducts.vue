<template>
  <NavBar props="wislist"/>
  <div class="py-10 flex items-center justify-center">
    <div class="w-full max-w-7xl pb-10">
      <h1 class="text-3xl font-bold text-center text-gray-700 mb-6">
        Liste des produits disponibles
      </h1>
      <!-- Grille des produits -->
      <div
          class="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 p-4 bg-white/30 backdrop-blur-md rounded-3xl shadow-lg"
      >
        <div
            v-for="(product, index) in paginatedProducts"
            :key="product.productId"
            class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
        >
          <img
              :src="product.productImage"
              :alt="product.productName"
              class="w-full h-40 object-cover rounded-md mb-4"
          />
          <h2 class="text-lg font-semibold text-gray-700">
            {{ (currentPage - 1) * itemsPerPage + index + 1 }}. {{ product.productName }}
          </h2>
          <p class="text-sm text-gray-500 mb-4">{{ product.productDescription }}</p>
          <div class="flex justify-between items-center">
            <span class="text-blue-500 font-bold">{{ product.productPrice }}€</span>
            <button
                @click="goToDetails(product)"
                class="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Détails
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-6 space-x-4" id="custo">
        <button
            v-for="page in totalPages"
            :key="page"
            @click="changePage(page)"
            :class="[ 'px-4 py-2 rounded-lg', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300']"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import { useRouter } from "vue-router";
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";
import {getProductsRequest} from "@/services/products/productService.js";
import Mediazol from "@/assets/images/medecine/mediazol.png";

const router = useRouter();

const products = ref([]);
const paginatedProducts = ref([]);
const currentPage = ref(1);
const itemsPerPage = 1000;
const totalPages = ref(1);




// Récupération des produits
const fetchProducts = async () => {
  try {
    const response = await getProductsRequest({
      offset: (currentPage.value - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    const newProducts = response.data.map(product => ({
      productId: product.productId || 0,
      productImage: Mediazol,
      productName: product.productName || "Produit inconnu",
      productDescription: product.productDescription || "Aucune description disponible.",
      productPrice: product.productPrice || 0,
    }));

    products.value = [...products.value, ...newProducts];

    // Mise à jour de la pagination
    totalPages.value = Math.ceil(products.value.length / itemsPerPage);
    updatePaginatedProducts();
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
  }
};

// Mise à jour des produits affichés sur la page actuelle
const updatePaginatedProducts = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extraire uniquement les produits pour la page actuelle
  paginatedProducts.value = products.value.slice(startIndex, endIndex);
};

// Changer de page
const changePage = (page) => {
  currentPage.value = page;
  updatePaginatedProducts();
};

// Détails du produit
const goToDetails = (product) => {
  router.push({
    name: "PDP",
    params: { id: product.productId },
  });
};



onMounted(async () => {
  await fetchProducts(); // Charge les produits


  const page = document.getElementById('custo')
  page.classList.add('custo')

  document.body.classList.add("page-produits-body");
});

onBeforeUnmount(() => {
  document.body.classList.remove("page-produits-body");
});


</script>



<style>

.custo{
  display: none !important;
}

.page-produits-body {
  background: linear-gradient(to right, #dbeafe, #93c5fd);
}
</style>
