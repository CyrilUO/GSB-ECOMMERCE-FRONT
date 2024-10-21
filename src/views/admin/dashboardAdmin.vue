<template>
  <div class="min-h-screen flex flex-col">
    <!-- Barre de navigation supérieure -->
    <nav class="bg-blue-900 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="../../assets/images/logo_gsb.png" alt="logo" class="h-10 mr-4">
        </div>
        <div class="flex space-x-4">
          <h2 class=" font-extrabold hover:underline">Dashboard Administrateur</h2>
        </div>
        <div>
          <router-link to="/" class="flex items-center text-white hover:text-blue-400">
            Déconnexion
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </nav>

    <div class="flex flex-1">
      <aside class="w-64 bg-gray-800 text-white py-8 px-6 max-sm:w-44">
        <h2 class="text-xl font-bold mb-6">TABLEAU DE BORD</h2>
        <nav class="flex flex-col space-y-4">
          <router-link
              :class="{ 'bg-yellow-600 text-white': route.path === '/admin/dashboardAnalytics', 'bg-gray-700' : route.path !== '/admin/dashboardAnalytics'}"
              to="/admin/dashboardAnalytics"
              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70"
              >Datanalytics
          </router-link>
          <router-link
              :class="{ 'bg-yellow-600 text-white': route.path === '/admin/manage-users', 'bg-gray-700' : route.path !== '/admin/users-products'}"
              to="/admin/manage-users"
              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70"
              >Gestion des utilisateurs
          </router-link>
          <router-link
              :class="{ 'bg-yellow-600 text-white': route.path === '/admin/manage-products', 'bg-gray-700' : route.path !== '/admin/manage-products'}"
              to="/admin/manage-products"
              class="bg-gray-700 py-2 px-4 rounded-lg hover:opacity-70"
              >Gestion des produits
          </router-link>
        </nav>
      </aside>

      <!-- Contenu principal du tableau de bord -->
      <main class="flex-1 bg-gray-100 p-8">
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";

const route = useRoute()

</script>

<style>

</style>
