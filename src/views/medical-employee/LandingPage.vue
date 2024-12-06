<template>
  <div class="h-screen overflow-hidden bg-gray-100">

    <NavBar/>
    <header class="relative h-full">
      <img src="@/assets/images/medicament-landing-min.jpg" alt="background-med-images"
           class="w-full h-full object-cover">

      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-0">
        <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-4">
          BIENVENUE SUR<br> LA PLATEFORME<br> GSB ECOMMERCE
        </h1>

        <router-link to="/medical-employee/carousel-products"
                     class="w-60 py-2 bg-blue-700 rounded-2xl text-white text-lg hover:bg-blue-800 focus:outline-none md:w-44 lg:w-52">
          DECOUVRIR NOS PRODUITS
        </router-link>
      </div>
    </header>
  </div>
</template>

<script setup>
import NavBar from "../../components/medicalEmployeeComponent/navbar.vue"
</script>

<style scoped>
</style>
