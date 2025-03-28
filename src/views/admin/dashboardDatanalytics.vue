<template>
  <div class="grid grid-cols-2 gap-8">
    <!-- Graphique des utilisateurs -->
    <div class="bg-white shadow rounded-lg p-6 w-full h-96">
      <h3 class="text-lg font-semibold text-center mb-4">Nouveaux utilisateurs par jour</h3>
      <div class="h-full w-full">
        <canvas id="userChart"></canvas>
      </div>
    </div>

    <!-- Graphique des stocks de produits -->
    <div class="bg-white shadow rounded-lg p-6 w-full h-96">
      <h3 class="text-lg font-semibold text-center mb-4">État actuel des stocks</h3>
      <div class="h-full w-full">
        <canvas id="productStockChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {Chart, registerables} from "chart.js";
import {getCurrentProductStockRq} from "@/services/products/productService.js";
import {getDailyUsersStatsRequest} from "@/services/users/userService.js";

Chart.register(...registerables);

const userChart = ref(null);
const productStockChart = ref(null);

const userStats = ref([]);
const productStock = ref([]);

const fetchUserStats = async () => {
  try {
    const response = await getDailyUsersStatsRequest();
    userStats.value = response.data;
    console.info(userStats.value)
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques des utilisateurs :", error);
  }
};

const fetchProductStock = async () => {
  try {
    const response = await getCurrentProductStockRq();
    productStock.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des stocks des produits :", error);
  }
};

const setupUserChart = () => {
  const labels = userStats.value.map((item) => item.creation_date);
  const values = userStats.value.map((item) => item.user_count);

  const ctx = document.getElementById("userChart").getContext("2d");
  if (userChart.value) userChart.value.destroy();

  userChart.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Nouveaux utilisateurs par jour",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { left: 10, right: 10, top: 10, bottom: 20 },
      },
      scales: {
        x: {
          title: { display: true, text: "Date" },
          ticks: {
            padding: 10,
            font: { size: 12 },
          },
        },
        y: {
          title: { display: true, text: "Nombre d'utilisateurs" },
          beginAtZero: true, // Définit l'axe Y à partir de 0
          min: 0,            // Valeur minimale à 0
          ticks: {
            stepSize: 1,     // Incréments de 1
            callback: (value) => value, // Affiche les valeurs entières
          },
        },
      },
    },
  });
};



const setupProductStockChart = () => {
  const labels = productStock.value.map((item) => item.product_name);
  const values = productStock.value.map((item) => item.product_stock);

  const ctx = document.getElementById("productStockChart").getContext("2d");
  if (productStockChart.value) productStockChart.value.destroy();

  productStockChart.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantité en stock",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(137,187,220)",
          borderWidth: 1,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {left: 10, right: 10, top: 10, bottom: 20}, // Padding global
      },
      scales: {
        x: {
          title: {display: true, text: "Produits"},
          ticks: {
            padding: 10, // Espacement supplémentaire pour les labels X
            font: {size: 12},
            maxRotation: 0,
            minRotation: 0,
          },
          grid: {display: false}, // Cache la grille verticale
        },
        y: {
          title: {display: true, text: "Quantité en stock"},
          ticks: {callback: (value) => Math.floor(value)},
        },
      },
    },
  });
};


onMounted(async () => {
  await fetchUserStats();
  await fetchProductStock();
  await setupUserChart();
  await setupProductStockChart();
});
</script>

<style>
canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
