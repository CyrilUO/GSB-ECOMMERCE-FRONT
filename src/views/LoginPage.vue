<template>
  <div class="flex flex-col min-h-screen bg-blue-900 login-page">
    <!-- Contenu principal -->
    <div class="flex-grow flex items-center justify-center">
      <div class="flex-col justify-center py-12 bg-amber-50 rounded-xl shadow-lg border_custo px-container-responsive">
        <img
            src="../assets/images/common/logo_gsb.png"
            class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
        />

        <form @submit.prevent="validateForm" class="flex flex-col justify-center bg-amber-50">
          <div class="mb-8 bg-amber-50">
            <label for="email" class="block bg-amber-50 text-black">Email</label>
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
            <label for="password" class="bg-amber-50 block text-black">Mot de passe</label>
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

        <div
            class="text-wrap text-red-500 text-center mt-4"
            style="min-height: 20px; line-height: 20px;"
        >
          <p v-if="loginError">{{ loginError }}</p>
        </div>

        <div class="flex justify-end bg-amber-50 mt-4">
          <a
              href="#"
              @click.prevent="changeForgottenValue"
              class="forgot-password bg-amber-50 font-bold italic hover:text-blue-700"
          >
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>


    <div>
      <!-- Popup lorsque le bouton "Mot de passe oublié" est cliqué -->
      <div v-if="forgottenPasswordClicked"
           class="fixed inset-0 bg-black bg-opacity-50 z-50 ">
        <div class="bg-white flex flex-col items-center justify-center p-6 shadow-lg w-3/4 rounded-3xl">
          <h2 class="text-xl font-bold mb-4 underline">Mot de passe oublié</h2>
          <p class="mb-4 text-wrap text-justify">Pour tout oubli de mot de passe, veuillez contactez notre hotline au
            <strong>+458782523</strong> de 9h à 20h</p>
          <a class="bg-red-400 text-white rounded-3xl py-4 px-6 cursor-pointer justify-center hover:opacity-85" @click.prevent="changeForgottenValue">Retour</a>
        </div>
      </div>
    </div>


    <FooterComponent/>
  </div>
</template>


<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import FooterComponent from "@/components/common/footerComponent.vue";
import {parseJwt} from "@/services/api.js";
import {loginAndAuthenticate} from "@/services/authService/authService.js";

const userEmail = ref("");
const userPassword = ref("");
const emailError = ref(false);

const passwordError = ref(false);
const loginError = ref("");
const isLoading = ref(false);

const router = useRouter();

const forgottenPasswordClicked = ref(false);

const changeForgottenValue = () => {
  forgottenPasswordClicked.value = !forgottenPasswordClicked.value;
};


const validateForm = async () => {
  emailError.value = userEmail.value.trim() === "" || !/\S+@\S+\.\S+/.test(userEmail.value);
  passwordError.value = userPassword.value.trim() === "";
  clearErrorAfterTimeout();


  if (emailError.value || passwordError.value) {
    loginError.value = "Veuillez corriger les erreurs.";
    clearErrorAfterTimeout();
    return;
  }

  isLoading.value = true;
  loginError.value = "";

  const user = {
    userEmail: userEmail.value,
    userPassword: userPassword.value,
  }

  try {
    await loginAndAuthenticate(user);
    console.info("Connexion réussie, redirection en cours...");
  } catch (error) {
    if (error.response && error.response.status === 401) {
      loginError.value = "Email ou mot de passe incorrect.";
    } else {
      loginError.value = "Erreur de connexion. Veuillez réessayer.";
    }
    console.error("Erreur dans validateForm :", error);
  } finally {
    isLoading.value = false;
  }
};

const clearErrorAfterTimeout = () => {
  setTimeout(() => {
    loginError.value = "";
  }, 5000);
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



/* Styles pour le fond noir semi-transparent */
.fixed {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>





