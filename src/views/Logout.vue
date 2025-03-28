<template>
  <div class="flex flex-col items-center justify-center h-screen page-custo text-gray-800">
    <img
        src="../assets/images/common/logo_gsb.png"
        class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
    />
    <div class="bg-white shadow-md rounded-lg p-6 items-center text-center w-6/12 h-auto">
      <div class="loaderCusto mx-auto mb-4"></div>
      <h2 class="text-2xl font-bold mb-2">Déconnexion réussie</h2>
      <p class="text-sm text-gray-600 mb-4">
        Vous serez redirigé vers la page de connexion dans <span class="custo-countdown">{{ countdown }}</span> seconde<span v-if="countdown > 1">s</span>.
      </p>
      <p class="text-xs text-gray-500 italic">Merci d'avoir utilisé nos services.</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {ref, onMounted, onUnmounted} from "vue";

import {useCartStore} from "@/store/cartStore.js";
import {useUserStore} from "@/store/userStore.js";
import {parseJwt} from "@/services/api.js";

const userStore = useUserStore();

const cartStore = useCartStore();

const router = useRouter();
const countdown = ref(5);


const logout = async () => {
  try {
    console.info("userStore avant déconnexion :", userStore);

    if (userStore.roleName === "medical-employee") {
      await cartStore.clearCartStore();
      console.info("Panier vidé pour medical-employee");
    } else {
      console.info("Rôle non medical-employee, panier non vidé.");
    }

    await userStore.clearCurrentUser();
    await userStore.clearSessionData();



    console.info("reset des données fait !")
    console.trace("userStore après déconnexion :", userStore);

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
    console.info("Aucun token détecté, pas besoin de fetch l'utilisateur.");
    startCountdown();
    return;
  }

  const payload = parseJwt(token);
  if (!payload || payload.exp * 1000 < Date.now()) {
    console.info("Token expiré, suppression immédiate.");
    userStore.clearCurrentUser();
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    startCountdown();
    return;
  }

  try {
    console.log("Token valide, récupération de l'utilisateur...");
    await userStore.fetchCurrentUser();
  } catch (error) {
    console.warn("Erreur lors du fetch de l'utilisateur : ", error);
  }

  startCountdown();
});




</script>

<style scoped>


.custo-countdown {
  font-size: 14px;
  font-weight: bold;
  color: #9f7dea;
  font-family: Magneto,serif ;
}

.page-custo {
  background: linear-gradient(to right, #dbeafe, #93c5fd) !important;
}

.loaderCusto {
  position: relative;
  width: 48px;
  height: 48px;
  border: 4px solid #92d4ff;
  border-block-color: #031f48;
  border-inline-color: #4e00ff;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
}


.loaderCusto::before {
  content: "";
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 2px dashed #92d4ff;
  border-radius: 50%;
  animation: spinReverse 1.5s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

@keyframes spinReverse {
  100% { transform: rotate(-360deg); }
}
</style>
