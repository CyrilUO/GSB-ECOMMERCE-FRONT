<template>
  <nav class="sticky top-0 z-50 bg-blue-900 text-white py-4 shadow-md">
    <div class="mx-auto flex justify-around  items-center px-4 phone:justify-between tablet:justify-between">
      <div class="flex items-center">
        <img src="../../assets/images/common/logo_gsb.png" alt="logo" class="h-10 mr-2" />
      </div>

      <!-- Menu Burger (Mobile uniquement) -->
      <div class="burger_menu">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <div class="flex flex-row hidden_class text-left space-x-7 md:text-lg text-base">
        <div>


        <router-link
            to="/medical-employee/landing-page"
            class="hover:text-gray-300 transition-all duration-300 text-base"
        >🏠 Accueil</router-link
        >
        </div>

        <div>

        <router-link
            to="/medical-employee/carousel-products"
            class="hover:text-gray-300 transition-all duration-300 text-base"
        >🩹 Nos produits</router-link
        >
      </div>

        <div>
        <router-link
            to="/medical-employee/cart"
            class="hover:text-gray-300 transition-all duration-300 text-base"
        >🛒 Panier</router-link
        >
        </div>

        <div>
        <router-link
            to="/medical-employee/order-list"
            class="hover:text-gray-300 transition-all duration-300 text-base"
        >📋 Mes Commandes</router-link
        >
        </div>

        <div>
        <router-link
            to="/logout"
            class="hover:text-gray-300 transition-all duration-300 flex items-center text-base"
        >👋 Déconnexion</router-link
        >
          </div>
      </div>

      <!-- Menu déroulant (Mobile uniquement) -->
      <div
          v-if="isMenuOpen"
          class="burger_layer absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col space-y-4 p-4 md:hidden"
      >
        <router-link
            to="/medical-employee/landing-page"
            class="hover:text-gray-300 hover:opacity-90 transition-all duration-300"
            @click="toggleMenu"
        >🏠 Accueil</router-link
        >

        <router-link
            to="/medical-employee/carousel-products"
            class="hover:text-gray-300 hover:opacity-90 transition-all duration-300"
            @click="toggleMenu"
        >🩹 Nos produits</router-link
        >

        <router-link
            to="/medical-employee/cart"
            class="hover:text-gray-300 hover:opacity-90 transition-all duration-300"
            @click="toggleMenu"
        >🛒 Panier</router-link
        >

        <router-link
            to="/medical-employee/order-list"
            class="hover:text-gray-300 hover:opacity-90 transition-all duration-300"
            @click="toggleMenu"
        >📋 Résumé Commandes</router-link
        >

        <router-link
            to="/logout"
            class="hover:text-gray-300 hover:opacity-90 transition-all duration-300"
            @click="toggleMenu"
        >👋 Déconnexion</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
nav {
  transition: all 0.3s ease-in-out;
}

@media screen and (min-width: 1046px){
  .burger_menu {
    display: none;
  }
  .burger_layer{
    display: none;
  }
}

@media screen and (max-width: 1045px) {
  .burger_menu {
    display: block;
  }
  .hidden_class{
    display: none;
  }

  .burger_layer {
    border-top : 1px solid white;
  }
}


</style>
