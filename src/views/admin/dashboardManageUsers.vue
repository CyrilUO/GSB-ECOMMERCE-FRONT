<template>
  <div class="min-h-screen flex flex-col">
    <h1 class="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>

    <div class="flex-grow bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold mb-4">Liste des Utilisateurs</h2>
      <p class="text-green-500 mt-4 mb-4" v-if="messageStatus">{{ messageStatus }}</p>
      <table class="min-w-full bg-white border-r-2 border-l-2">
        <thead class="block md:table-header-group">
        <tr class="border border-gray-200 md:border-none block md:table-row">
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            ID
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            Prénom
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            Nom
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            Email
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            Mot de passe
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            Role
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            Créé le
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td class="py-2 px-4 border-b">{{ user.userName }}</td>
          <td class="py-2 px-4 border-b">{{ user.userSurname }}</td>
          <td class="py-2 px-4 border-b text-wrap">{{ user.userEmail }}</td>
          <td class="py-2 px-4 border-b">{{ user.userPassword }}</td>
          <td class="py-2 px-4 border-b">{{ user.userRole }}</td>
          <td class="py-2 px-4 border-b">{{ user.userPassword }}</td>
          <td class="py-2 px-4 border-b">{{ user.userCreatedAt }}</td>
          <td class="py-2 px-4 border-b">
            <button class="text-blue-600 hover:underline">Modifier</button>
            <button class="text-red-600 hover:underline ml-4">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-end">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Ajouter un utilisateur
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from "vue";

const users = ref([])
const messageStatus = ref('');


</script>


<style>
.flex-grow {
  flex-grow: 1;
}
</style>
