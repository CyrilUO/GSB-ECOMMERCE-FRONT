<template>
  <nav class="sticky top-0 z-50 bg-blue-900 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <img src="@/assets/images/logo_gsb.png" alt="logo" class="h-10 mr-4" />
      </div>
      <div class="flex space-x-8 text-sm md:text-lg">
        <router-link to="/medical-employee/carousel-products" class="hover:underline">Nos produits</router-link>
        <router-link to="/medical-employee/cart" class="hover:underline">Panier</router-link>
        <router-link to="/medical-employee/order-validation" class="hover:underline">Commander</router-link>
        <div>
          <router-link to="/logout" class="hover:underline flex items-center">
            Déconnexion
          </router-link>
        </div>
      </div>
    </div>
  </nav>

</template>


<script>


</script>

<style>


</style>