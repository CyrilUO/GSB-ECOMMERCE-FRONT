<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-6 text-gray-800">Gestion des Utilisateurs</h1>

    <div class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-6 text-blue-700">Liste des Utilisateurs</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border-collapse border-gray-200 rounded-lg shadow-md">
          <thead>
          <tr class="bg-gradient-to-r from-blue-700 to-blue-800 text-white border border-white">
            <th class="py-3 px-5 text-left border-white border-2">ID</th>
            <th class="py-3 px-5 text-left border-white border-2">Nom</th>
            <th class="py-3 px-5 text-left border-white border-2">Prénom</th>
            <th class="py-3 px-5 text-left border-white border-2">Email</th>
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
                {{ user.userSurname }}
            </td>
            <td class="py-3 px-5">
                {{ user.userName }}
            </td>

            <td class="py-3 px-5">
                {{ user.userEmail }}
            </td>

            <td class="py-3 px-5">
                {{ user.role.roleName }}
            </td>

            <td class="py-3 px-5">
              {{ formatDate(user.userDateCreation) }}
            </td>

            <td class="py-3 px-5">
              {{ formatDate(user.userModifiedAt) }}
            </td>


            <td class="py-3 px-5 text-center flex justify-center items-center gap-4">
              <button
                  @click="goToUpdateUser(user)"
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
import {useRouter} from "vue-router";

import {getAllUsersRequest, deleteUserRequest} from "@/services/users/userService.js";

import {format} from "date-fns/format";
import { fr } from "date-fns/locale"

const users = ref([])
const route = useRouter()


const getUsersData = async () => {

  try {
    const response = await getAllUsersRequest()
    users.value = response.data
  } catch (error) {
    console.error("Erreur lors de la récuperation des donnees :", error)
  }
}

const deleteUser = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    try {
      await deleteUserRequest(id);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      await getUsersData();
    }
  }
};

const formatDate = (isoDate) => {
  if (!isoDate) return "Date inconnue";
  const formattedDate = new Date(isoDate)
  return format(formattedDate, "dd/MM/yyyy à HH:mm", {locale : fr})
}

const goToAddUsers = async () => {
  await route.push("/admin/add-users");
};

const goToUpdateUser = async (user) => {
  console.log(`Navigating to: /admin/update-users/${user.userId}`);
  await route.push(`/admin/update-users/${user.userId}`);
};


onMounted(async () => {
  await getUsersData();
})

</script>


<style>
</style>
