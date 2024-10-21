<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-blue-900 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="../../assets/images/logo_gsb.png" alt="logo" class="h-10 mr-4">
          <ul class="flex space-x-4">
            <li><a href="#" class="hover:underline">Accueil</a></li>
            <li><a href="#" class="hover:underline">Nos produits</a></li>
            <li><a href="#" class="hover:underline">Panier</a></li>
            <li><a href="#" class="hover:underline active:text-blue-300">Administration</a></li>
          </ul>
        </div>
        <div>
          <a href="#" class="flex items-center text-white hover:text-blue-400">
            Déconnexion
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3" />
            </svg>
          </a>
        </div>
      </div>
    </nav>

    <div class="flex flex-1">
      <aside class="w-64 bg-gray-800 text-white py-8 px-6">
        <h2 class="text-xl font-bold mb-6">TABLEAU DE BORD</h2>
        <nav class="flex flex-col space-y-4">
          <a href="#" class="bg-gray-700 py-2 px-4 rounded-lg">Suivi Clients</a>
          <a href="#" class="bg-gray-700 py-2 px-4 rounded-lg">Commandes Clients</a>
        </nav>
      </aside>

      <main class="flex-1 bg-gray-100 p-8">

      </main>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
</style>
