<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
    <h1 class="text-6xl font-bold mb-4 text-red-700">401</h1>
    <p class="text-lg mb-6">Accès non autorisé</p>
    <button @click="RedirectToPreviousPage">Revenir à la page précédente</button>
  </div>



</template>

<script setup>
// TODO le router push ne doit pas renvoyé vers la page de login mais vers la dernière page consulté, utiliser les modules vue de Session storage
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const RedirectToPreviousPage = () => {
  router.go(-1)
}


</script>

<style>


</style>