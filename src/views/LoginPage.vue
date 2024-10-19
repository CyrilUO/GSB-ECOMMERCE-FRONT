<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex-col justify-center px-40 py-12 bg-amber-50 rounded-lg shadow-lg border_custo">
      <img src="../assets/images/logo_gsb.png"
           class="mx-auto mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"/>

      <form @submit.prevent="validateForm" class="flex flex-col justify-center bg-amber-50">
        <div class="mb-8 bg-amber-50">
          <label for="email" class="block bg-amber-50 text-black">Entrez votre email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div class="mb-4 bg-amber-50 mb-8">
          <label for="password" class="bg-amber-50 block text-black">Mot de passe :</label>
          <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <button
            type="submit"
            class=" w-60 py-1 text-white text-xl btn_custo rounded-2xl hover:bg-blue-700 focus:outline-none"
        >
          Se connecter
        </button>
      </form>

      <div class="flex justify-end bg-amber-50 mt-4 ">
        <a href="#" class="forgot-password bg-amber-50 font-bold italic hover:text-blue-700">Mot de passe oublié ?</a>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import axios from "axios";

const email = ref('');
const password = ref('');


const validateForm = async () => {

  try {

    const apiResponse= await axios.post('http://localhost:8080/api/auth/login', {
      email : email.value,
      password : password.value
    })

    if (apiResponse.data.success) {

      alert("Connexion réussie")

    } else {

    }

  } catch (error) {
    console.error(error)
  }

}

defineOptions({
  name: 'LoginPage',
});







</script>

<style>

:root {

}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #2c2c8f;
  font-family: "Lekton", monospace;
  font-weight: bold;
}

input::placeholder {
  color: #938888;
  opacity: 1;
}

.btn_custo {
  background-color: #2c2c8f;
  transition: transform 1s ease;
  border: 3px solid blueviolet;
}

.btn_custo:hover {
  transform: translateY(-0.625rem);
  transition: transform 0.5s ease;
}


.border_custo {
  border: 7px solid #7229b6;
}


.forgot-password {
  position: relative;
  display: inline-block;
  color: #2c2c8f;
  text-decoration: none;
}

.forgot-password::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #2c2c8f;
  transition: width 0.5s ease;
}

.forgot-password:hover::after {
  width: 100%;
}




</style>
