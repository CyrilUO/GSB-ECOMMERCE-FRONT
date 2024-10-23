<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Ajouter un Produit</h1>
    <form @submit.prevent="registerNewProduct">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Nom du produit</label>
        <input v-model="productName" type="text" placeholder="Nom du produit"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <input v-model="productDescription" type="text" placeholder="Description du produit" maxlength="150"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Prix</label>
        <input v-model="productPrice" type="number" step="0.01" placeholder="Prix" min="0"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Stock</label>
        <input v-model="productStock" type="number" placeholder="Stock" min="0"
               class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Ajouter le produit</button>
    </form>
    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    <p v-else-if="failureMessage" class="text-red-700 mt-4">{{ failureMessage }}</p>


  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const productName = ref('');
const productDescription = ref('');
const productPrice = ref(0);
const productStock = ref(0);
const successMessage = ref('');
const failureMessage = ref('');

const sanitizeInput = (input) => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};

const verifyName = (name) => {
  const regexName = /^[a-zA-Z0-9\s]+$
  return regexName.test(name)
}

const registerNewProduct = async () => {
  try {
    const newProduct = {
      productName: verifyInput(productName.value),
      productDescription: verifyInput(productDescription.value),
      productPrice: productPrice.value,
      productStock: productStock.value,
    };

    await axios.post('http://localhost:8080/products', newProduct);

    productName.value = '';
    productDescription.value = '';
    productPrice.value = '';
    productStock.value = '';

    successMessage.value = `Le produit ${newProduct.productName} a été ajouté avec succès !`;

    setTimeout(() => {
      successMessage.value = '';
    }, 5000);

  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit :', error);

    failureMessage.value = `Le produit sélectionné n'a pu être ajouté`

    setTimeout( () =>{
      failureMessage.value =''
    }, 5000);
  }
};
</script>
