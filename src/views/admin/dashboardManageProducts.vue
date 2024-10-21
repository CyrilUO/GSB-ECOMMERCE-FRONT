<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Gestion des Produits</h1>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold mb-4">Liste des Produits</h2>
      <table class="min-w-full bg-white border-r-2 border-l-2">
        <thead>
        <tr>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">ID</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Nom du produit</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Description</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Prix</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Stock</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in productItem" :key="product.id">
          <td class="py-2 px-4 border-b">{{product.productId}}</td>
          <td class="py-2 px-4 border-b">{{product.productName}}</td>
          <td class="py-2 px-4 border-b text-wrap">{{ product.productDescription}}</td>
          <td class="py-2 px-4 border-b">{{product.productPrice.toFixed(2)}}</td>
          <td class="py-2 px-4 border-b">{{product.productStock}}</td>
          <td class="py-2 px-4 border-b">
            <button class="text-blue-600 hover:underline">Modifier</button>
            <button @click="deleteProduct(product.productId)" class="text-red-600 hover:underline ml-4">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-end">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Ajouter un produit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";

const productItem = ref([])

const getProductData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products')
    productItem.value = response.data;
    console.log(response.data);
  } catch (error){
    console.error(error)
  }
}

const deleteProduct = async(id) => {
  if (confirm("Voulez-vous vraiment supprimer ce produit")) {
    console.log(`Suppression du produit avec l'ID : ${id}`);
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      alert('Produit supprimé avec succès');
      await getProductData();
    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue');
    }
  }
};


onMounted(() => {
  getProductData()
});

</script>

<style>

</style>
