<template>
  <div>
    <h1 class="text-3xl font-extrabold mb-6 text-gray-800">Gestion des Produits</h1>

    <div class="bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-6 text-blue-700">Liste des Produits</h2>
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
            <th class="py-3 px-5 text-left border-white border-2">Nom du produit</th>
            <th class="py-3 px-5 text-left border-white border-2">Description</th>
            <th class="py-3 px-5 text-left border-white border-2">Prix</th>
            <th class="py-3 px-5 text-left border-white border-2">Stock</th>
            <th class="py-3 px-5 text-center border-white border-2">Actions</th>
          </tr>
          </thead>
          <tbody>

          <!-- Boucle sur l'ensemble des produit de ma base de données-->

          <tr
              v-for="product in productItem"
              :key="product.productId"
              class="hover:bg-blue-50 odd:bg-gray-50 even:bg-white"
          >
            <td class="py-3 px-5 text-gray-700">{{ product.productId }}</td>
            <td class="py-3 px-5">
              <template v-if="product.isGettingModified">
                <input v-model="product.productName" class="w-full p-2 border rounded"/>
              </template>
              <template v-else>
                {{ product.productName }}
              </template>
            </td>
            <td class="py-3 px-5">
              <template v-if="product.isGettingModified">
                <input
                    v-model="product.productDescription"
                    class="w-full p-2 border rounded"
                />
              </template>
              <template v-else>
                {{ product.productDescription }}
              </template>
            </td>
            <td class="py-3 px-5">
              <template v-if="product.isGettingModified">
                <input
                    type="number"
                    v-model="product.productPrice"
                    class="w-full p-2 border rounded"
                />
              </template>
              <template v-else>
                {{ product.productPrice }}
              </template>
            </td>
            <td class="py-3 px-5">
              <template v-if="product.isGettingModified">
                <input
                    type="number"
                    v-model="product.productStock"
                    class="w-full p-2 border rounded"
                />
              </template>
              <template v-else>
                {{ product.productStock }}
              </template>
            </td>
            <td class="py-3 px-5 text-center flex justify-center items-center gap-4">


              <!-- Modifier -->
              <button
                  v-if="!product.isGettingModified"
                  @click="modifyProductStatus(product)"
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
                  v-if="product.isGettingModified"
                  @click="saveAndUpdateProduct(product)"
                  class="text-green-600 hover:scale-110 transition-transform inline-flex items-center justify-center p-0 m-0 leading-none align-middle"
              >
                <CheckCircleIcon class="w-6 h-6"/>
              </button>


              <!-- Supprimer -->
              <button
                  v-if="!product.isGettingModified"
                  @click="deleteProduct(product.productId)"
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
            @click="goToAddProduct"
            class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ajouter un produit
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import {CheckCircleIcon} from "@heroicons/vue/24/outline";
import {ref, onMounted} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const productItem = ref([]);
const messageStatus = ref("");

const modifyProductStatus = (product) => {
  product.isGettingModified = true;
};

const getProductData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/products");
    productItem.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const saveAndUpdateProduct = async (product) => {
  try {
    const updatedValues = {
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.productStock,
    };

    const update = await axios.put(
        `http://localhost:8080/products/${product.productId}`,
        updatedValues
    );

    if (update.status === 200) {
      messageStatus.value = `Le produit dont l'id est ${product.productId} a été correctement mis à jour.`;
      product.isGettingModified = false;
      setTimeout(() => {
        messageStatus.value = "";
      }, 5000);
      await getProductData();
    } else {
      messageStatus.value = `Erreur lors de la modification du produit.`;
      setTimeout(() => {
        messageStatus.value = "";
      }, 5000);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (id) => {
  if (confirm("Voulez-vous vraiment supprimer ce produit")) {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      messageStatus.value = `Produit ${id} supprimé avec succès`;
      setTimeout(() => {
        messageStatus.value = "";
      }, 5000);
      await getProductData();
    } catch (error) {
      console.error(error);
    }
  }
};

const route = useRouter();

const goToAddProduct = async () => {
  await route.push("/admin/add-products");
};

onMounted(() => {
  getProductData();
});
</script>

<style>
</style>
