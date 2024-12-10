<template>
  <div class="=bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
    <h3 class="text-lg font-semibold text-center mb-4">Répartition des commandes par utilisateur</h3>
    <div>
      <canvas id="pieChart" class="w-full h-auto"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Mock Data
const userOrderData = [
  { name: "User 1", orders: 45 },
  { name: "User 2", orders: 30 },
  { name: "User 3", orders: 25 },
];

// Chart.js setup
const setupPieChart = () => {
  const ctx = document.getElementById("pieChart").getContext("2d");
  const labels = userOrderData.map((user) => user.name);
  const data = userOrderData.map((user) => user.orders);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
    options: {
      responsive: true, // Rendre le graphique responsive
      maintainAspectRatio: false, // Permet de gérer la hauteur indépendamment
      plugins: {
        legend: {
          display: true,
          position: "right",
        },
      },
    },
  });
};

onMounted(() => {
  setupPieChart();
});
</script>

<style scoped>
/* Garantir que le canvas s'ajuste à son conteneur */
canvas {
  display: block;
  height: auto !important;
}
</style>
