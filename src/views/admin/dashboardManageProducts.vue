<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Gestion des Produits</h1>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold mb-4">Liste des Produits</h2>
      <p class="text-green-500 mt-4 mb-4" v-if="messageStatus">{{ messageStatus }}</p>
      <table class="min-w-full bg-white border-collapse block md:table">
        <thead class="block md:table-header-group">
        <tr class="border border-gray-200 md:border-none block md:table-row">
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell ">
            ID
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell">
            Nom du produit
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell">
            Description
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell">
            Prix
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell">
            Stock
          </th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r md:border md:border-grey-500 block md:table-cell">
            Actions
          </th>
        </tr>
        </thead>
        <tbody class="block md:table-row-group">
        <tr class="bg-gray-300 border border-gray-200 md:border-none block md:table-row" v-for="product in productItem"
            :key="product.productId">
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">{{ product.productId }}</td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell" :class="{ 'bg-yellow-100': product.isGettingModified }">
            <template v-if="product.isGettingModified">
              <input v-model="product.productName" class="w-full p-1 border rounded" />
            </template>
            <template v-else>
              {{ product.productName }}
            </template>
          </td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell" :class="{ 'bg-yellow-100': product.isGettingModified }">
            <template v-if="product.isGettingModified">
              <input v-model="product.productDescription" class="w-full p-1 border rounded" />
            </template>
            <template v-else>
              {{ product.productDescription }}
            </template>
          </td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell" :class="{ 'bg-yellow-100': product.isGettingModified }">
            <template v-if="product.isGettingModified">
              <input type="number" v-model="product.productPrice" class="w-full p-1 border rounded"  />
            </template>
            <template v-else>
              {{ product.productPrice }}
            </template>
          </td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell" :class="{ 'bg-yellow-100': product.isGettingModified }">
            <template v-if="product.isGettingModified">
              <input type="number" v-model="product.productStock" class="w-full p-1 border rounded" />
            </template>
            <template v-else>
              {{ product.productStock }}
            </template>
          </td>
          <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
            <button v-if="!product.isGettingModified" @click="modifyProductStatus(product)" class="hover:underline">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#c9823e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
              </svg>
            </button>
            <button v-if="product.isGettingModified" @click="saveAndUpdateProduct(product)" class="hover:underline text-green-600">

            </button>
            <button @click="deleteProduct(product.productId)" class="hover:underline ml-4">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="#8b0000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18 17.94 6M18 18 6.06 6"/>
              </svg>
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-end">
        <button @click="goToAddProduct" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Ajouter un produit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {nextTick} from "vue";
import {ref, onMounted} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const productItem = ref([])
const messageStatus = ref('')


const modifyProductStatus = (product) => {
  product.isGettingModified = true;
}

const getProductData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products');
    productItem.value = response.data ;

  } catch (error) {
    console.error(error);
  }
};

const saveAndUpdateProduct = async (product) => {
  try {
    const updatedValue = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.productStock,
    };

    console.log("Les données sont :", updatedValue)

    const update = await axios.put(`http://localhost:8080/products/${product.productId}`, updatedValue);

    if (update.status === 200) {
      messageStatus.value = `Le produit dont l'id est ${product.productId} a été correctement mis à jour.`;
      product.isGettingModified = false;

      setTimeout(() => {
        messageStatus.value = '';
      }, 5000);

      await getProductData();
    } else {
      messageStatus.value = `Erreur lors de la modification du produit à l'id ${product.productId}. Code erreur : ${update.status}`;
      setTimeout(() => {
        messageStatus.value = '';
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id) => {
  /* TODO = Ajouter une modale plus jolie */
  if (confirm("Voulez-vous vraiment supprimer ce produit")) {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);

      messageStatus.value = `Produit ${id} supprimé avec succès`;

      setTimeout(() => {
        messageStatus.value = ''
      }, 5000)

      await getProductData();

    } catch (error) {
      console.error(error);
      alert('Une erreur est survenue');
    }
  }
};

const route = useRouter();

const goToAddProduct = async () => {
  await route.push('/admin/add-products')
}


onMounted(() => {
  getProductData()
});

</script>

<style>

</style>
