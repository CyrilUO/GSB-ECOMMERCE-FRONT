<template>
  <div class="grid grid-cols-2 gap-8">
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold text-center mb-4">Nombre d’utilisateurs globaux</h3>
      <div class="h-40">
        <canvas id="userChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Générer des données mockées
const generateMockData = () => {
  const days = 10; // Nombre de jours simulés
  const data = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    data.unshift({
      date: date.toISOString().split("T")[0], // Format YYYY-MM-DD
      count: Math.floor(Math.random() * 50) + 1, // Nombre aléatoire d'utilisateurs
    });
  }

  return data;
};

const chart = ref(null);

const setupChart = () => {
  const mockData = generateMockData();

  const labels = mockData.map((item) => item.date); // Extraire les dates
  const values = mockData.map((item) => item.count); // Extraire les comptes

  const ctx = document.getElementById("userChart").getContext("2d");
  chart.value = new Chart(ctx, {
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
          tension: 0.4, // Pour une courbe douce
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Date", // Titre de l'axe X
          },
          ticks: {
            display: false, // Masque les ticks (valeurs comme "2024-01-25")
          },
        },
        y: {
          title: {
            display: true,
            text: "Nombre d'utilisateurs",
          },
          ticks: {
            display: false, // Masque les ticks (valeurs comme "2024-01-25")
          },
        },
      },
    },
  });
};

onMounted(() => {
  setupChart();
});
</script>

<style>
/* Ajouter des styles si nécessaire */
</style>
