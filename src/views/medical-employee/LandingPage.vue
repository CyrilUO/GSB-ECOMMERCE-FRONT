<template>
  <div class="h-screen overflow-hidden bg-gray-50">

    <!-- NavBar Component -->
    <NavBar />

    <!-- Hero Section -->
    <header class="relative h-full w-full">

      <div class="absolute inset-0">
        <img
            src="@/assets/images/med-bg-min.jpg"
            alt="background-med-images"
            class="w-full h-full object-cover filter brightness-75"
        />
      </div>

      <div class="relative z-10 flex items-center justify-center h-full px-6">
        <div
            class="glass-card max-w-3xl w-full p-8 md:p-12 rounded-3xl text-center text-white shadow-lg animate-fade-in-up"
        >
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            BIENVENUE SUR<br />
            <span class="text-blue-500">LA PLATEFORME</span><br />
            <span class="text-blue-800">GSB ECOMMERCE</span>
          </h1>

          <p class="text-lg md:text-2xl mb-8 opacity-90">
             Explorez notre large gamme de produits médicaux pour professionnels de santé, avec une expérience utilisateur fluide et moderne.
          </p>

          <router-link
              to="/medical-employee/carousel-products"
              class="inline-block py-3 px-8 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105"
          >
            🚀 Découvrir nos produits
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue";
</script>

<style scoped>
/* Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.15); /* Transparence légère */
  border: 1px solid rgba(255, 255, 255, 0.18); /* Bordure subtile */
  backdrop-filter: blur(10px); /* Effet de flou */
  -webkit-backdrop-filter: blur(10px); /* Compatibilité Safari */
  border-radius: 20px; /* Coins arrondis */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Ombre légère */
  color: #ffffff; /* Texte blanc pour contraste */
}

/* Animation Fade In */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}
</style>
