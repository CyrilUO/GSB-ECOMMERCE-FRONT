<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-blue-900 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center">
          <img src="@/assets/images/common/logo_gsb.png" alt="logo" class="h-10 mr-4" />
        </div>
        <h2 class="hidden md:block hover:underline active:text-blue-300">
          Dashboard Commerciaux
        </h2>
        <!-- Bouton burger pour petits écrans -->
        <button @click="toggleMenu" class="md:hidden flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
      </div>
      <!-- Menu déroulant pour petits écrans -->
      <div v-if="isMenuOpen" class="bg-blue-800 md:hidden flex flex-col space-y-4 mt-2 px-4 py-2 text-white">
        <router-link to="/logout" class="hover:bg-blue-700 py-2 px-4 rounded-md">Déconnexion</router-link>
      </div>
    </nav>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-fit bg-gray-800 text-white py-8 px-4">
        <h2 class="text-xl font-bold mb-6">TABLEAU DE BORD</h2>
        <nav class="flex flex-col space-y-4">
          <router-link
              to="/salesperson/customer-monitoring"
              :class="route.path === '/salesperson/customer-monitoring' ? 'bg-yellow-600 text-white' : 'bg-gray-700'"
              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70 flex items-center space-x-2"
          >
            <span>Suivi Commandes</span>
          </router-link>
<!--          <router-link-->
<!--              to="/salesperson/customer-order"-->
<!--              :class="route.path === '/salesperson/customer-order' ? 'bg-yellow-600 text-white' : 'bg-gray-700'"-->
<!--              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70 flex items-center space-x-2"-->
<!--          >-->
<!--            <span>Autre Vue</span>-->
<!--          </router-link>-->
          <router-link to="/logout" class="hidden md:flex items-center text-white hover:text-blue-400">
            Déconnexion
          </router-link>
        </nav>
      </aside>

      <!-- Zone de contenu des vues enfants -->
      <main class="flex-1 bg-gray-100 overflow-auto p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Vos styles si nécessaire */
</style>
