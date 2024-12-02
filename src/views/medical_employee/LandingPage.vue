<template>
  <div class="h-screen overflow-hidden bg-gray-100">
    <nav class="sticky top-0 z-50 bg-blue-900 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img src="@/assets/images/logo_gsb.png" alt="logo" class="h-10 mr-4" />
        </div>
        <div class="flex space-x-8 text-sm md:text-lg">
          <router-link to="/medical-employee/products" class="hover:underline">NOS PRODUITS</router-link>
          <router-link to="/medical-employee/cart" class="hover:underline">PANIER</router-link>
          <router-link to="/medical-employee/order-validation" class="hover:underline">Récapitulatif de commandes</router-link>
          <router-link to="/" class="hover:underline flex items-center">
            DECONNEXION
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </nav>

    <header class="relative h-full">
      <img src="@/assets/images/medicament-landing-min.jpg" alt="background-med-images" class="w-full h-full object-cover">

      <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 md:px-0">
        <h1 class="text-3xl md:text-5xl font-bold leading-tight mb-4">
          BIENVENUE SUR<br> LA PLATEFORME<br> GSB ECOMMERCE
        </h1>

        <router-link to="/medical-employee/carousel-products" class="w-60 py-2 bg-blue-700 rounded-2xl text-white text-lg hover:bg-blue-800 focus:outline-none md:w-44 lg:w-52">
          DECOUVRIR NOS PRODUITS
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
</style>
