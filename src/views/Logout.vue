<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
    <img
        src="../assets/images/common/logo_gsb.png"
        class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
    />
    <div class="bg-white shadow-md rounded-lg p-6 text-center w-80">
      <div class="loaderCusto mx-auto mb-4"></div>
      <h2 class="text-2xl font-bold mb-2">Déconnexion réussie</h2>
      <p class="text-sm text-gray-600 mb-4">
        Vous serez redirigé vers la page de connexion dans {{ countdown }} seconde<span v-if="countdown > 1">s</span>.
      </p>
      <p class="text-xs text-gray-500 italic">Merci d'avoir utilisé nos services.</p>
    </div>
  </div>
</template>

<script setup>
// TODO le logout doit appeler la fonction qui gère la logique de fin de session
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

import {useCartStore} from "@/store/cartStore.js";
import {useUserStore} from "@/store/userStore.js";
import {parseJwt} from "@/services/api.js";

const userStore = useUserStore();

const cartStore = useCartStore();

const router = useRouter();
const countdown = ref(5);


const logout = async () => {
  try {
    console.log("userStore avant déconnexion :", userStore);

    if (userStore.roleName === "medical-employee") {
      cartStore.clearCartStore();
      console.log("Panier vidé pour medical-employee");
    } else {
      console.log("Rôle non medical-employee, panier non vidé.");
    }

    userStore.clearCurrentUser();
    userStore.clearSessionData();


    // await userStore.$reset();



    console.log("reset des données fait !")
    console.log("userStore après déconnexion :", userStore);

    await router.push('/login');
  } catch (error) {
    console.error("Une erreur est survenue lors de la déconnexion :", error);
  }
};


const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1;
    } else {
      clearInterval(interval);
      logout();
    }
  }, 1000);
};

onMounted(async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.log("🔹 Aucun token détecté, pas besoin de fetch l'utilisateur.");
    startCountdown();
    return;
  }

  const payload = parseJwt(token);
  if (!payload || payload.exp * 1000 < Date.now()) {
    console.log("🔹 Token expiré, suppression immédiate.");
    userStore.clearCurrentUser();
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    startCountdown();
    return;
  }

  try {
    console.log("🔹 Token valide, récupération de l'utilisateur...");
    await userStore.fetchCurrentUser();
  } catch (error) {
    console.warn("⚠️ Erreur lors du fetch de l'utilisateur : ", error);
  }

  startCountdown();
});




</script>

<style scoped>

.loaderCusto {
  border: 4px solid #f3f3f3; /* Couleur de l'arrière-plan */
  border-top: 4px solid #285494; /* Couleur de l'animation */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
