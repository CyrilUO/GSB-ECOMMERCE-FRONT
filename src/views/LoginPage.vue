<template>
  <div class="flex flex-col min-h-screen bg-blue-900 login-page">
    <!-- Contenu principal -->
    <div class="flex-grow flex items-center justify-center">
      <div class="flex-col justify-center px-4 lg:px-40 py-12 bg-amber-50 rounded-xl shadow-lg border_custo">
        <img
            src="@/assets/images/logo_gsb.png"
            class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
        />

        <form @submit.prevent="validateForm" class="flex flex-col justify-center bg-amber-50">
          <div class="mb-8 bg-amber-50">
            <label for="email" class="block bg-amber-50 text-black">Entrez votre email</label>
            <input
                type="email"
                id="email"
                v-model="userEmail"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                :class="{ 'border-red-500': emailError }"
            />
            <span v-if="emailError" class="text-red-500 text-sm">Email invalide</span>
          </div>

          <div class="mb-4 bg-amber-50">
            <label for="password" class="bg-amber-50 block text-black">Mot de passe :</label>
            <input
                type="password"
                id="password"
                v-model="userPassword"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                :class="{ 'border-red-500': passwordError }"
            />
            <span v-if="passwordError" class="text-red-500 text-sm">Mot de passe requis</span>
          </div>

          <button
              type="submit"
              :disabled="isLoading"
              class="w-60 py-1 text-white text-xl btn_custo rounded-2xl self-center hover:bg-blue-700 focus:outline-none"
          >
            <span v-if="!isLoading">Se connecter</span>
            <span v-else>Chargement...</span>
          </button>
        </form>

        <div v-if="loginError" class="mt-4 text-red-500 text-center">
          <p>{{ loginError }}</p>
        </div>

        <div class="flex justify-end bg-amber-50 mt-4">
          <a href="#" class="forgot-password bg-amber-50 font-bold italic hover:text-blue-700">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import FooterComponent from "@/components/common/footerComponent.vue";

const userEmail = ref("");
const userPassword = ref("");
const emailError = ref(false);
const passwordError = ref(false);
const loginError = ref("");
const isLoading = ref(false);

const router = useRouter();

// TODO Implémenter la logique back pour faire fonctionner le formulaire : simple implémentation, vérification des correspondances entre les mots de passe  emails avec ceux tapés
// TODO ajouter des timers pour reinitialiser les messages d'erreur ou d'injonction

const validateForm = async () => {
  emailError.value = userEmail.value.trim() === "" || !/\S+@\S+\.\S+/.test(userEmail.value);
  passwordError.value = userPassword.value.trim() === "";

  if (emailError.value || passwordError.value) {
    loginError.value = "Veuillez corriger les erreurs.";
    return;
  }

  isLoading.value = true;
  loginError.value = "";

  try {
    const apiResponse = await axios.post("http://localhost:8080/users", {
      userEmail: userEmail.value,
      userPassword: userPassword.value,
    });

    if (apiResponse.data.success) {
      const userRole = apiResponse.data.role;

      if (userRole === "Admin") {
        await router.push("/admin");
      } else if (userRole === "Salesperson") {
        await router.push("/salesperson");
      } else if (userRole === "Medical_Employee") {
        await router.push("/medical-employee");
      } else {
        loginError.value = "Rôle non attribué.";
      }
    } else {
      loginError.value = apiResponse.data.message || "Email ou mot de passe incorrect.";
    }
  } catch (error) {
    loginError.value = "Erreur de connexion. Veuillez réessayer.";
    console.error("Erreur lors de la connexion :", error);
  } finally {
    isLoading.value = false;
  }
};
</script>


<style scoped>
:root {
  --theme-blue-color: #2c2c8f;
}

* {
  font-family: "Lekton", monospace;
  font-weight: bold;
}

body {
  background-color: var(--theme-blue-color);

}

.login-page {
  background-color: var(--theme-blue-color);
}

.btn_custo {
  background-color: cornflowerblue;
  transition: transform 1s ease;
}

.btn_custo:hover {
  transform: translateY(-0.625rem);
  transition: transform 0.5s ease;
}

.border_custo {
  border: 5px solid var(--theme-blue-color);
}

.forgot-password {
  position: relative;
  display: inline-block;
  color: var(--theme-blue-color);
  text-decoration: none;
}

.forgot-password::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--theme-blue-color);
  transition: width 0.5s ease;
}

.forgot-password:hover::after {
  width: 100%;
}
</style>
