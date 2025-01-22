<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-blue-900 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="../../assets/images/common/logo_gsb.png" alt="logo" class="h-10 mr-4">
        </div>
        <div class="flex space-x-4">
          <h2 class="font-extrabold">Dashboard Administrateur</h2>
        </div>
        <div>

        </div>
      </div>
    </nav>

    <div class="flex flex-1 overflow-hidden">
      <aside class="w-60 bg-gray-800 text-white py-8 px-6 flex-shrink-0 max-sm:w-44">
        <h2 class="text-xl font-bold mb-6">TABLEAU DE BORD</h2>
        <nav class="flex flex-col space-y-4">
          <router-link
              :class="{ 'bg-yellow-600 text-white': route.path === '/admin/dashboard-analytics', 'bg-gray-700' : route.path !== '/admin/dashboard-analytics'}"
              to="/admin/dashboard-analytics"
              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70"
          >📈 Analytics
          </router-link>
          <router-link
              :class="route.path === '/admin/manage-users' || route.path === '/admin/add-users' ?
               'bg-yellow-600 text-white' :
               'bg-gray-700'"
              to="/admin/manage-users"
              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70 flex items-center space-x-2"
          >
            <span>👤 Gestion des utilisateurs</span>
          </router-link>
          <router-link
              :class="route.path === '/admin/manage-products' || route.path ==='/admin/add-products'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-700'"
              to="/admin/manage-products"
              class="bg-gray-700 py-2 px-4 flex rounded-lg hover:opacity-70"
          >💊 Gestion des produits
          </router-link>
          <router-link to="/logout" class="bg-gray-700 py-2 px-4 flex rounded-lg hover:opacity-70"
          >
            👋 Déconnexion

          </router-link>
        </nav>
      </aside>

      <!-- Vue principale -->
      <main class="flex-1 bg-gray-100 overflow-auto p-8">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
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
