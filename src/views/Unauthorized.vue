<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
    <img
        src="../assets/images/common/logo_gsb.png"
        class="mx-auto mb-10 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border-2 border-red-700"
    />
    <h1 class="text-6xl font-bold mb-1 text-red-700">401</h1>
    <p class="text-lg mb-6">Accès non autorisé, veuillez vous reconnecter</p>
    <button @click="RedirectToPreviousPage" class="bg-red-700 text-white rounded-3xl px-4 py-2 hover:opacity-80">Se reconnecter</button>
  </div>



</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter();

const RedirectToPreviousPage = () => {
  localStorage.clear();
  router.push("/login")
}


</script>

<style>


</style>