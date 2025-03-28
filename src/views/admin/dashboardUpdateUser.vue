<template>
  <div class="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Modification de l'utilisateur</h1>

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

      <div class="flex flex-col relative">
        <label for="password" class="text-gray-700 font-semibold mb-2">Mot de passe :</label>
        <input
            id="password"
            v-model="userPassword"
            type="password"
            placeholder="Laissez vide si vous ne souhaitez pas changer"
            class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 pr-10"
        />
      </div>


      <div class="flex flex-col" v-if="canChangeRole">
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
    </form>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getUserDataByIdRequest, updateUserRequest} from "@/services/users/userService.js";
import {fetchRoles as fetchRolesService} from "@/services/roles/rolesService.js";
import {useUserStore} from "@/store/userStore.js";
import {storeToRefs} from "pinia";

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
const showPassword = ref(false);


const initialRole = ref("");

// On définit une computed property pour l'utilisateur connecté
const connectedUserId = computed(() => userStore.userId);
console.log("Give the valueee", connectedUserId)

// Computed property pour déterminer si le rôle peut être modifié
const canChangeRole = computed(() => {
  return Number(connectedUserId.value) !== Number(userId.value);
});

// Fonction pour récupérer les données de l'utilisateur à modifier
const fetchSelectedUserData = async () => {
  try {
    const response = await getUserDataByIdRequest(route.params.userId);
    const initialUser = response.data;

    userId.value = initialUser.userId;
    userSurname.value = initialUser.userSurname;
    userName.value = initialUser.userName;
    userEmail.value = initialUser.userEmail;
    userRole.value = initialUser.role.roleId;
    userPassword.value = "";
    initialRole.value = initialUser.role.roleId;

    console.log("Valeur initiale du rôle : ", initialRole.value);
  } catch (error) {
    console.error(error)
  }
};

const fetchRoles = async () => {
  try {
    const response = await fetchRolesService();
    roles.value = response.data;
  } catch (error) {
    console.error(error)
  }
};
const updateUser = async () => {
  try {
    const updatedUser = {
      userId: userId.value,
      userName: userName.value.trim(),
      userSurname: userSurname.value.trim(),
      userEmail: userEmail.value.trim(),
      roleId: userRole.value,
    };

    if (userPassword.value.trim() !== "") {
      updatedUser.userPassword = userPassword.value;
    }

    console.info("Données mises à jour :", updatedUser);

    const response = await updateUserRequest(updatedUser);
    console.info("Réponse API reçue :", response);

    if (updatedUser.roleId !== initialRole.value) {
      console.info("Rôle modifié !");
    }
  } catch (error) {
    console.error("Erreur dans updateUser :", error);
  }
};

onMounted(async () => {
  try {
    await userStore.fetchCurrentUser();
    console.log("Utilisateur connecté :", {
      userId: userStore.userId,
      roleName: userStore.roleName,
    });

    await fetchRoles();
    console.info("Rôles chargés :", roles.value);

    await fetchSelectedUserData();
    console.info("Données utilisateur à modifier :", { userId: userId.value, roleId: userRole.value });
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
});

watch(userEmail, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    console.info("Email changé, mise à jour de l'affichage.");
  }
});

watch(userPassword, (newValue, oldValue) => {
  if (newValue !== "" && newValue !== oldValue) {
    console.log("Nouveau mot de passe défini.");
  }
});

watch(userRole, (newRole) => {
  console.log("Valeur actuelle de userRole :", newRole);
});

watch(userRole, (newValue, oldValue) => {
  if (newValue !== "" && newValue !== oldValue) {
    console.log("Role changé.");
  }
});





</script>


<style scoped>
</style>