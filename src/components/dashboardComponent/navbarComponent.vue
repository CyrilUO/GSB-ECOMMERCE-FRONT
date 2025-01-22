<template>

  <nav class="bg-blue-900 text-white py-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center">
        <img src="../../assets/images/common/logo_gsb.png" alt="logo" class="h-10 mr-4">
      </div>
      <div class="flex space-x-4">
        <h2 v-if="role === 'Admin'" class="font-extrabold hover:underline">Dashboard Administrateur</h2>
        <h2 v-else-if="role === 'Salesperson'" class="font-extrabold hover:underline">Dashboard Commercial</h2>
        <h2 v-else class="font-extrabold hover:underline">Bienvenue</h2>
      </div>
      <div>
        <router-link to="/" class="flex items-center text-white hover:text-blue-400">
          Déconnexion
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V3"/>
          </svg>
        </router-link>
      </div>
    </div>
  </nav>

</template>


<script>

export default {
  name : "dashboardNavbar",
  props : {
    role : {
      type : String,
      default : 'Admin'
    }
  }
}


</script>

<style>


</style>