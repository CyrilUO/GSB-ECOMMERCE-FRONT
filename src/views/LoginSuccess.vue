<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
    <img
        src="@/assets/images/logo_gsb.png"
        class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
    />
    <div class="bg-white shadow-md rounded-lg p-6 text-center w-80">
      <div class="loaderCusto mx-auto mb-4"></div>
      <h2 class="text-2xl font-bold mb-2">Authentification Réussie</h2>
      <p class="text-sm text-gray-600 mb-4">
        Vous allez être redirigé vers la page dans {{ countdown }} seconde<span v-if="countdown > 1">s</span>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const countdown = ref(10);

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

onMounted(() => {
  startCountdown();
});

</script>

<style scoped>

.loaderCusto {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #285494;
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
