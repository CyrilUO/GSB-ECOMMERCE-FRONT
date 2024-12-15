<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-6 text-gray-800">Gestion des Utilisateurs</h1>

    <div class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-6 text-blue-700">Liste des Utilisateurs</h2>
      <p
          class="bg-green-500 text-white font-semibold rounded-lg py-2 px-4 text-center mb-4"
          v-if="messageStatus"
      >
        {{ messageStatus }}
      </p>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border-collapse border-gray-200 rounded-lg shadow-md">
          <thead>
          <tr class="bg-gradient-to-r from-blue-700 to-blue-800 text-white border border-white">
            <th class="py-3 px-5 text-left border-white border-2">ID</th>
            <th class="py-3 px-5 text-left border-white border-2">Nom</th>
            <th class="py-3 px-5 text-left border-white border-2">Prénom</th>
            <th class="py-3 px-5 text-left border-white border-2">Email</th>
            <th class="py-3 px-5 text-left border-white border-2">Mot de passe</th>
            <th class="py-3 px-5 text-left border-white border-2">Rôle</th>
            <th class="py-3 px-5 text-left border-white border-2">Créé le</th>
            <th class="py-3 px-5 text-left border-white border-2">Modifié le</th>
            <th class="py-3 px-5 text-center border-white border-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="user in users"
              :key="user.userId"
              class="hover:bg-blue-50 odd:bg-gray-50 even:bg-white"
          >
            <td class="py-3 px-5 text-gray-700">
              {{ user.userId }}
            </td>
            <td class="py-3 px-5">
              <template v-if="user.isGettingModified">
                <input v-model="user.userSurname" class="bg-amber-300 w-full p-2 border rounded"/>
              </template>
              <template v-else>
                {{ user.userSurname }}
              </template>
            </td>
            <td class="py-3 px-5">
              <template v-if="user.isGettingModified">
                <input v-model="user.userName" class="bg-amber-300 w-full p-2 border rounded"/>
              </template>
              <template v-else>
                {{ user.userName }}
              </template>
            </td>

            <td class="py-3 px-5">
              <template v-if="user.isGettingModified">
                <input v-model="user.userEmail" class="bg-amber-300 w-full p-2 border rounded"/>
              </template>
              <template v-else>
                {{ user.userEmail }}
              </template>
            </td>

            <td class="py-3 px-5">
              <template v-if="user.isGettingModified">
                <input v-model="user.userPassword" class="bg-amber-300 w-full p-2 border rounded"/>
              </template>
              <template v-else>
                {{ user.userPassword }}
              </template>
            </td>

            <td class="py-3 px-5">
              <template v-if="user.isGettingModified">
                <input v-model="user.userRole" class="bg-amber-300 w-full p-2 border rounded"/>
              </template>
              <template v-else>
                {{ user.userRole }}
              </template>
            </td>

            <td class="py-3 px-5">
              {{ user.userDateCreation }}
            </td>

            <td class="py-3 px-5">
              {{ user.userModifiedAt }}
            </td>


            <td class="py-3 px-5 text-center flex justify-center items-center gap-4">
              <button
                  v-if="!user.isGettingModified"
                  @click="modifyUserStatus(user)"
                  class="text-blue-600 hover:scale-110 transition-transform"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487a2.25 2.25 0 013.182 0l.469.47a2.25 2.25 0 010 3.182l-9.743 9.742a4.5 4.5 0 01-2.006 1.163l-3.01.752.753-3.01a4.5 4.5 0 011.163-2.006l9.743-9.743z"
                  />
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25L15.75 4.5"
                  />
                </svg>
              </button>


              <button
                  v-if="user.isGettingModified"
                  @click="updateAndSaveUser(user)"
                  class="text-green-600 hover:scale-110 transition-transform inline-flex items-center justify-center p-0 m-0 leading-none align-middle"
              >
                <CheckCircleIcon class="w-6 h-6"/>
              </button>

              <button
                  v-if="!user.isGettingModified"
                  @click="deleteUser(user.userId)"
                  class="text-red-600 hover:scale-110 transition-transform"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                  <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 flex justify-end">
        <button
            @click="goToAddUsers"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter un utilisateur
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {CheckCircleIcon} from "@heroicons/vue/24/outline/index.js";
import {useRouter} from "vue-router";

import {getUsersRequest, updateUserRequest , deleteUserRequest} from "@/services/users/userService.js";

const users = ref([])
const messageStatus = ref('');



const modifyUserStatus = (user) => {
  user.isGettingModified = true;
};

const route = useRouter()


const getUsersData = async () => {

  try {
    const response = await getUsersRequest()
    users.value = response.data
  } catch (error) {
    console.error("Erreur lors de la récuperation des donnees :", error)
  }

}

const updateAndSaveUser = async (user) => {
  try {
    const updatedUser = {
      userId: user.userId,
      userSurname: user.userSurname,
      userName: user.userName,
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRole: user.userRole,
      userModifiedAt: new Date().toISOString(), // Ajouter la date actuelle de modification
    };

    const response = await updateUserRequest(user.userId, updatedUser);

    if (response.status === 200) {
      messageStatus.value = `L'utilisateur dont l'ID est ${user.userId} a été mis à jour avec succès.`;
      user.isGettingModified = false;

      setTimeout(() => {
        messageStatus.value = "";
      }, 5000);

      await getUsersData(); // Rafraîchir la liste des utilisateurs
    } else {
      messageStatus.value = `Erreur : Impossible de mettre à jour l'utilisateur ${user.userId}.`;
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    messageStatus.value = "Une erreur s'est produite lors de la mise à jour.";
  }
};

const deleteUser = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    try {
      await deleteUserRequest(id);
      messageStatus.value = `Utilisateur ${id} supprimé avec succès.`;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      messageStatus.value = `Échec : Impossible de supprimer l'utilisateur ${id}.`;
    } finally {
      setTimeout(() => {
        messageStatus.value = "";
      }, 5000);
      await getUsersData();
    }
  }
};



const goToAddUsers = async () => {
  await route.push("/admin/add-users");
};


onMounted(() => {
  getUsersData();
})

</script>


<style>
</style>
