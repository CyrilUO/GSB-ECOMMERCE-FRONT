<template>
  <div class="flex flex-col items-center page-custo justify-center h-screen text-gray-800">
    <img
        src="../assets/images/common/logo_gsb.png"
        class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
    />
    <div class="bg-white shadow-md rounded-lg p-6 text-center content-center w-6/12 h-auto">
      <div class="loaderCusto mx-auto mb-4"></div>
      <h2 class="text-2xl font-bold mb-2">Authentification Réussie</h2>
      <p class="text-sm text-gray-600 mb-4">
        Vous serez redirigé vers la page de connexion dans <span class="custo-countdown" >{{ countdown }}</span> seconde<span v-if="countdown > 1">s</span>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {ref, onMounted, onUnmounted} from "vue";

const router = useRouter();
const countdown = ref(5);

const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1;
    } else {
      clearInterval(interval);

      const userRole = localStorage.getItem("userRole");

      if (userRole === "admin") {
        router.push("/admin");
      } else if (userRole === "salesperson") {
        router.push("/salesperson");
      } else if (userRole === "medical-employee") {
        router.push("/medical-employee");
      } else {
        router.push("/");
      }
    }
  }, 1000);
};

onMounted( () => {
  startCountdown();
});




</script>

<style scoped>

.custo-countdown {
  font-size: 14px;
  font-family: Magneto,serif ;
  font-weight: bold;
  color: #4e00ff;
}

.page-custo {
  background: linear-gradient(to right, #dbeafe, #93c5fd)
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
