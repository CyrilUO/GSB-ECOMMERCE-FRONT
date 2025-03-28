<template>
<div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
<h1 class="text-6xl font-bold mb-4 text-blue-500">404</h1>
<p class="text-lg mb-6">Ressource(s) non trouvée(s)</p>
<button @click="RedirectToPreviousPage" class="border border-gray-950  px-4 py-2 rounded-xl bg-blue-800 text-white font-bold hover:opacity-85">Retour à la page précédente</button>
</div>



</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

const RedirectToPreviousPage = () => {
  router.go(-1)
}





</script>

<style>



</style>