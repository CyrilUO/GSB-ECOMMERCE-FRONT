<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Ajouter un Utilisateur</h1>
    <p v-if="successMessage" class="bg-green-500 text-white font-semibold rounded-lg py-2 px-4 text-center mb-2">{{ successMessage }}</p>
    <p v-else-if="failureMessage" class="bg-red-700 text-white font-semibold rounded-lg py-2 px-4 text-center mb-2">{{ failureMessage }}</p>
    <form @submit.prevent="registerNewUser">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Nom de l'utilisateur</label>
        <input v-model="userSurname" type="text" placeholder="Nom"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Prénom de l'utilisateur</label>
        <input v-model="userName" type="text" placeholder="Prénom" maxlength="150"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Email de l'utilisateur</label>
        <input v-model="userEmail" placeholder="Email"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
        <input v-model="userPassword" placeholder="Mot de passe"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               required>
      </div>
      <div class="mb-4 relative">
        <label class="block text-gray-700 text-sm font-bold mb-2">Rôle utilisateur</label>
        <select v-model="userRole" name="role"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required>
          <option value="admin">Admin</option>
          <option value="medical-employee">Employé Médical</option>
          <option value="salesperson">Commercial</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>


      <div class="flex justify-end gap-3.5">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Ajouter
          l'utilisateur
        </button>
        <routerLink
            to="/admin/manage-users"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 opacity-70">
          Retour
        </routerLink>
      </div>
    </form>
  </div>
</template>

<script setup>

import {ref} from "vue";
import axios from "axios";
import DOMPurify from 'dompurify';

const userSurname = ref('')
const userName = ref('')
const userEmail = ref('')
const userPassword = ref('')
const userRole = ref('')

const successMessage = ref('')
const failureMessage = ref('')

const sanitizeInputUser = (string) => {
  return DOMPurify.sanitize(string)
}


const registerNewUser = async () => {

  const token = localStorage.getItem("authToken")
  try {
    const newUser = {
      userSurname: sanitizeInputUser(userSurname.value),
      userName: sanitizeInputUser(userName.value),
      userEmail: sanitizeInputUser(userEmail.value),
      userPassword: sanitizeInputUser(userPassword.value),
      userRole: userRole.value,
    };

    await axios.post("http://localhost:8080/api/users", newUser, {
      headers : {
        Authorization : `Bearer ${token}`,
        Accept : "application/json"
      }
    });

    userSurname.value = "";
    userName.value = "";
    userEmail.value = "";
    userPassword.value = "";
    userRole.value = "";

    successMessage.value = `L'utilisateur ${newUser.userName} ${newUser.userSurname} a été ajouté avec succès !`;

    setTimeout(() => {
      successMessage.value = "";
    }, 5000);
  } catch (error) {
    failureMessage.value = `Une erreur s'est produite. Le nouvel utilisateur n'a pas été ajouté!`;
    setTimeout(() => {
      failureMessage.value = "";
    }, 5000);
  }
};



</script>