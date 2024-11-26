<template>
  <footer class="bg-gray-800 text-white py-4 mt-auto">
    <div class="container mx-auto px-4 md:flex-col">
      <div class="flex flex-wrap justify-around">
        <div class="text-sm items-center md:text-base mb-2 md:mb-0">
          <p>&copy; GSB Ecommerce. Tous droits réservés.</p>
        </div>
        <div class="flex flex-wrap justify-center gap-8 md: mb-0">
          <a @click="goToCGU" class="text-white cst_link hover:text-blue-400 ml-4">Conditions d'utilisation</a>
          <a @click="goToPolicies" class="text-white cst_link hover:text-blue-400 ml-4">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>

import {useRouter} from "vue-router";

const router = useRouter()

const goToCGU = () => {
  router.push('/cgu')
}

const goToPolicies = () => {
  router.push('/policies')
}

</script>

<style scoped>

*{
  box-sizing: border-box;
  padding-block: 0.2rem;
}

.cst_link{
  cursor: pointer;
}
</style>