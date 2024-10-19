<template>
  <div class="flex justify-center">
    <form>
      <!-- Exemple d'un label et input pour le login -->
      <div class="mb-4">
        <label for="username" class="block text-gray-700 dark:text-gray-300">Nom d'utilisateur :</label>
        <input
            type="text"
            id="username"
            v-model="username"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-gray-700 dark:text-gray-300">Mot de passe :</label>
        <input
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Se connecter
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Déclarer les données réactives
const username = ref('');
const password = ref('');

// Permet de déclarer le nom du composant !
defineOptions({
  name: 'LoginPage',
});
</script>
