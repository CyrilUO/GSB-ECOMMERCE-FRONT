<template>
  <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Modification de l'utilisateur</h1>

    <!-- Messages de succès et d'échec -->
    <p v-if="successMessage" class="bg-green-100 text-green-800 font-semibold rounded-lg py-2 px-4 mb-4">
      {{ successMessage }}
    </p>
    <p v-if="failureMessage" class="bg-red-100 text-red-800 font-semibold rounded-lg py-2 px-4 mb-4">
      {{ failureMessage }}
    </p>

    <!-- Formulaire -->
    <form @submit.prevent="updateUser" class="space-y-4">
      <div class="flex flex-col">
        <label for="surname" class="text-gray-700 font-semibold mb-2">Nom :</label>
        <input
            id="surname"
            v-model="userSurname"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="flex flex-col">
        <label for="name" class="text-gray-700 font-semibold mb-2">Prénom :</label>
        <input
            id="name"
            v-model="userName"
            type="text"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="flex flex-col">
        <label for="email" class="text-gray-700 font-semibold mb-2">Email :</label>
        <input
            id="email"
            v-model="userEmail"
            type="email"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="flex flex-col">
        <label for="password" class="text-gray-700 font-semibold mb-2">Mot de passe :</label>
        <input
            id="password"
            v-model="userPassword"
            type="password"
            placeholder="Laissez vide si vous ne souhaitez pas changer"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="flex flex-col">
        <label for="role" class="text-gray-700 font-semibold mb-2">Rôle :</label>
        <select
            id="role"
            v-model="userRole"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option v-for="role in roles" :key="role.roleId" :value="role.roleId">
            {{ role.roleName }}
          </option>
        </select>
      </div>

      <div class="flex justify-end mt-4">
        <button
            type="submit"
            class="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Mettre à jour
        </button>
      </div>
      <div v-if="hasRoleChanged">
        <p class="z-50 w-full text-white bg-gray-200">{{ roleMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserDataByIdRequest, updateUserRequest } from "@/services/users/userService.js";
import { fetchRoles as fetchRolesService } from "@/services/roles/rolesService.js";
import { useUserStore } from "@/store/userStore.js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const userId = ref(null);
const userSurname = ref("");
const userName = ref("");
const userEmail = ref("");
const userPassword = ref("");
const userRole = ref("");
const roles = ref([]);
const successMessage = ref("");
const failureMessage = ref("");
const hasRoleChanged = ref(false);
const roleMessage = ref("");

const initialRole = ref(""); // Stocke le rôle initial pour comparaison

// Fonction pour récupérer les données utilisateur
const fetchSelectedUserData = async () => {
  try {
    const response = await getUserDataByIdRequest(route.params.userId);
    const initialUser = response.data;

    userId.value = initialUser.userId;
    userSurname.value = initialUser.userSurname;
    userName.value = initialUser.userName;
    userEmail.value = initialUser.userEmail;
    userPassword.value = initialUser.userPassword;
    userRole.value = initialUser.role.roleId;

    initialRole.value = initialUser.role.roleId; // Stocke le rôle initial
    console.log("Valeur initiale du rôle : ", initialRole.value);
  } catch (error) {
    failureMessage.value = "Impossible de charger les informations de l'utilisateur.";
  }
};

/* On rcupère les rôles depuis l'API pour voir l'option des rôles (case où de nouveaux rôles seraient créés!*/
const fetchRoles = async () => {
  try {
    const response = await fetchRolesService();
    roles.value = response.data;
  } catch (error) {
    failureMessage.value = "Impossible de charger les rôles.";
  }
};

const updateUser = async () => {
  try {
    const updatedUser = {
      userId: userId.value,
      userName: userName.value.trim(),
      userSurname: userSurname.value.trim(),
      userEmail: userEmail.value.trim(),
      userPassword: userPassword.value ? userPassword.value : null,
      roleId: userRole.value,
    };

    console.log("Données mises à jour :", updatedUser);

    const response = await updateUserRequest(updatedUser);
    console.log("Réponse API reçue :", response);


    // Vérifiez si la réponse contient le statut de succès
    if (response && response.status === 200) {
      successMessage.value = "Utilisateur mis a jour avec succès !"
    } else {
      failureMessage.value = "Erreur API";
      throw new Error("Réponse API inattendue");
    }

    // Gère les cas spécifiques après la mise à jour (ex. déconnexion si le rôle change)
    if (updatedUser.roleId !== initialRole.value) {
      hasRoleChanged.value = true;
      console.log("Rôle modifié !");
    }
  } catch (error) {
    // Capture et affiche les erreurs
    failureMessage.value = "Impossible de mettre à jour l'utilisateur.";
    successMessage.value = ""; // Réinitialiser en cas d'erreur
    console.error("Erreur dans updateUser :", error);
  }
};



// Charge les données au montage du composant
onMounted(async () => {
  try {
    await userStore.fetchCurrentUser(); // Charge l'utilisateur connecté
    console.log("Utilisateur connecté après fetchCurrentUser :", {
      userId: userStore.userId,
      roleName: userStore.roleName,
    });

    await fetchRoles(); // Charge les rôles disponibles
    console.log("Rôles chargés :", roles.value);

    await fetchSelectedUserData(); // Charge les données de l'utilisateur à modifier
    console.log("Données utilisateur à modifier :", { userId: userId.value, roleId: userRole.value });
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
});


</script>



<style scoped>
/* Ajoutez ici des styles supplémentaires si nécessaire */
</style>