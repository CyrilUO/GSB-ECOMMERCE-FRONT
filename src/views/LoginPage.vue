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

        <!-- Conteneur de message d'erreur avec hauteur fixe -->
        <div
            class="text-wrap text-red-500 text-center mt-4"
            style="min-height: 20px; line-height: 20px;"
        >
          <p v-if="loginError">{{ loginError }}</p>
        </div>

        <!-- Lien pour afficher la popup -->
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

    <!-- Popup lorsque le boutton mot de passe oublié est créé -->
    <!-- TODO faker un envoit de  -->
    <div>
      <!-- Popup lorsque le bouton "Mot de passe oublié" est cliqué -->
      <div v-if="forgottenPasswordClicked" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          <h2 class="text-xl font-bold mb-4">Mot de passe oublié</h2>
          <p class="mb-4">Veuillez entrer votre adresse email, un administrateur s'occupera de votre demande</p>
          <input
              v-model="resetPasswordEmail"
              type="email"
              placeholder="Votre email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />
          <div v-if="resetEmailError" class="text-red-500 text-sm mb-4">
            {{ resetEmailError }}
          </div>
          <div class="flex justify-end space-x-4">
            <button
                @click="changeForgottenValue"
                class="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
                @click="confirmResetPassword"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>

      <!-- Confirmation d'envoi -->
      <div v-if="emailSent" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-6 shadow-lg max-w-md w-full text-center">
          <h2 class="text-xl font-bold mb-4">Email envoyé !</h2>
          <p class="mb-4">Un email de réinitialisation a été envoyé à un administrateur, il vous contactera dans les plus brefs delais</p>
          <button
              @click="closeConfirmation"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>


<script setup>
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import FooterComponent from "@/components/common/footerComponent.vue";
import {parseJwt} from "@/services/api.js";

const userEmail = ref("");
const userPassword = ref("");
const emailError = ref(false);
const passwordError = ref(false);
const loginError = ref("");
const isLoading = ref(false);

const router = useRouter();

const resetPasswordEmail = ref(""); // Email saisi dans le champ
const resetEmailError = ref(""); // Message d'erreur pour le champ email
const forgottenPasswordClicked = ref(false); // Gère l'état de la popup
const emailSent = ref(false); // Gère l'affichage de la confirmation

// Fonction pour ouvrir/fermer la popup
const changeForgottenValue = () => {
  forgottenPasswordClicked.value = !forgottenPasswordClicked.value;
  resetEmailError.value = ""; // Réinitialiser l'erreur
};

// Fonction pour simuler l'envoi de l'email
const confirmResetPassword = () => {
  // Vérification de l'email avant d'envoyer
  if (!resetPasswordEmail.value || !/\S+@\S+\.\S+/.test(resetPasswordEmail.value)) {
    resetEmailError.value = "Veuillez entrer une adresse email valide.";
    return;
  }

  // Simuler un envoi d'email avec un délai
  setTimeout(() => {
    emailSent.value = true; // Afficher la confirmation
    forgottenPasswordClicked.value = false; // Fermer la popup initiale
  }, 1000); // Délai de 1 seconde
};

// Fonction pour fermer la confirmation
const closeConfirmation = () => {
  emailSent.value = false; // Fermer la confirmation
  resetPasswordEmail.value = ""; // Réinitialiser l'email saisi
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

  try {
    const apiResponse = await axios.post("http://localhost:8080/auth/login", {
      userEmail: userEmail.value,
      userPassword: userPassword.value,
    });

    console.log("Réponse API :", apiResponse);

    if (apiResponse.status === 200 && apiResponse.data) {
      const token = apiResponse.data;
      console.log("Token reçu :", token);

      localStorage.setItem("authToken", token);

      const tokenDecoded = parseJwt(token);
      console.log("Token décodé :", tokenDecoded);

      const userRole = tokenDecoded?.roleName;
      console.log("Rôle utilisateur :", userRole);

      if (userRole) {
        localStorage.setItem("userRole", userRole);
        await router.push("/login-success"); // Rediriger vers la page intermédiaire
      } else {
        loginError.value = "Rôle non attribué.";
        clearErrorAfterTimeout();
      }
    } else {
      loginError.value = apiResponse.data.message || "Email ou mot de passe incorrect.";
      clearErrorAfterTimeout();
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      loginError.value = error.response.data; // Message du backend
    } else {
      loginError.value = "Erreur de connexion. Veuillez réessayer.";
    }
    console.error("Erreur lors de la connexion :", error);
    clearErrorAfterTimeout();
  } finally {
    isLoading.value = false;
  }
};

const clearErrorAfterTimeout = () => {
  setTimeout(() => {
    loginError.value = "";
  }, 5000); // Efface le message après 5 secondes
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

.text-wrap {
  transition: opacity 0.5s ease-in-out;
}

.text-wrap[hidden] {
  opacity: 0;
}


/* Popup container */
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}

/* Styles pour le fond noir semi-transparent */
.fixed {
  display: flex;
  justify-content: center;
  align-items: center;
}

.z-50 {
  z-index: 50;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

</style>





