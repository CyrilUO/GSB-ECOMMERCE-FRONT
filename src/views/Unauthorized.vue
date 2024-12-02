<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-700">
    <h1 class="text-6xl font-bold mb-4 text-red-700">401</h1>
    <p class="text-lg mb-6">Accès non autorisé</p>
    <p class="text-sm text-gray-500 mb-4">
      Vous allez être redirigé vers la page de connexion dans {{countdown}}  seconde<span v-if="countdown > 1">s</span>...
    </p>
  </div>



</template>

<script setup>
// TODO le router push ne doit pas renvoyé vers la page de login mais vers la dernière page consulté, utiliser les modules vue de Storage de session
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const route = useRouter();
const countdown = ref(5);

onMounted(() => {
  startCountdown();
  setTimeout(() => {
    route.push("/");
  },5000)
});


const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};


</script>

<style>


</style>