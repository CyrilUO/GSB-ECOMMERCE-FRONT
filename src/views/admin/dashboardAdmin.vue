<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-blue-900 text-white py-4">
      <div class="flex justify-around items-center">
        <div class="flex items-center">
          <img src="../../assets/images/common/logo_gsb.png" alt="logo" class="h-10 mr-4">
        </div>

        <div>
          <h2 class="font-extrabold">Dashboard Administrateur</h2>
        </div>

        <!-- Menu burger start ici  -->
        <div class="max-phone:block">
          <button v-if="!menuOpen" @click="toggleMenu" class="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button v-else @click="toggleMenu" class="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <aside
          class="fixed inset-y-0 left-0 w-60 bg-gray-800 text-white py-8 px-6 z-50 transform transition-transform duration-300 ease-in-out"
          :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
      >

      <h2 class="text-xl font-bold mb-6">TABLEAU DE BORD</h2>
        <nav class="flex flex-col space-y-4">
          <router-link
              :class="{ 'bg-yellow-600 text-white': route.path === '/admin/dashboard-analytics', 'bg-gray-700' : route.path !== '/admin/dashboard-analytics'}"
              to="/admin/dashboard-analytics"
              @click="closeMenu"

              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70"
          >
            📈 Analytics
          </router-link>
          <router-link
              :class="route.path === '/admin/manage-users' || route.path === '/admin/add-users' ?
              'bg-yellow-600 text-white' :
              'bg-gray-700'"
              to="/admin/manage-users"
              @click="closeMenu"

              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70 flex items-center space-x-2"
          >
            <span>👤 Gestion des utilisateurs</span>
          </router-link>
          <router-link
              :class="route.path === '/admin/manage-products' || route.path ==='/admin/add-products'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-700'"
              to="/admin/manage-products"
              @click="closeMenu"

              class="bg-gray-700 py-2 px-4 flex rounded-lg hover:opacity-70"
          >
            💊 Gestion des produits
          </router-link>
          <router-link to="/logout" class="bg-gray-700 py-2 px-4 flex rounded-lg hover:opacity-70"
          >
            👋 Déconnexion
          </router-link>
        </nav>
      </aside>
    </nav>


      <!-- Vue principale -->
      <main class="flex-1 bg-gray-100 overflow-auto p-8">
        <router-view />
      </main>
    </div>
</template>


<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();

let menuOpen = ref(false);


const closeMenu = () => {
  menuOpen.value = false;
}
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

.min-h-screen {
  height: 100vh;
}

.flex-1 {
  flex: 1;
}

.overflow-auto {
  overflow: auto;
}
</style>
