<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-blue-900 text-white py-4 px-6 flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <img src="@/assets/images/common/logo_gsb.png" alt="logo" class="h-10" />
        <h2 class="font-extrabold hidden md:block">Dashboard Commerciaux</h2>
      </div>

      <!-- MENU BURGER -->
      <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
        <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </nav>

    <!-- SIDEBAR RESPONSIVE -->
    <aside
        class="fixed inset-y-0 left-0 w-60 bg-gray-800 text-white py-8 px-6 z-50 transform transition-transform duration-300 ease-in-out"
        :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
    >

    <h2 class="text-xl font-bold mb-6">TABLEAU DE BORD</h2>
      <nav class="flex flex-col space-y-4">
        <router-link
            to="/salesperson/customer-monitoring"
            :class="route.path === '/salesperson/customer-monitoring'
              ? 'bg-yellow-600 text-white' : 'bg-gray-700'"
            class="py-2 px-4 rounded-lg hover:opacity-70"
            @click="closeMenu"
        >
          📦 Suivi Commandes
        </router-link>
        <router-link
            to="/logout"
            class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70"
            @click="closeMenu"
        >
          👋 Déconnexion
        </router-link>
      </nav>
    </aside>

    <main>
      <router-view />
    </main>
  </div>
</template>


<script setup>
import {ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

</script>

<style scoped>
/* Vos styles si nécessaire */
</style>
