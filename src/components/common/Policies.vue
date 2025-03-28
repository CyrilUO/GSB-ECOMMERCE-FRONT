<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white py-4 shadow-md">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold">Politique de confidentialité</h2>
        <img
            src="../../assets/images/common/logo_gsb.png"
            class="mx-auto mt-6 mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
        />
      </div>
    </header>

    <main class="container mx-auto bg-gray-100 px-4 py-8  shadow-lg rounded-lg mt-8 mb-8">
      <section v-for="(section, index) in policySections" :key="index" class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ section.title }}</h2>
        <ul v-if="Array.isArray(section.content)" class="list-disc pl-6 space-y-2">
          <li v-for="(item, index) in section.content" :key="index" class="text-gray-700">
            {{ item }}
          </li>
        </ul>
        <p v-else class="text-gray-700">{{ section.content }}</p>
      </section>
    </main>

    <footer class="bg-gray-800 text-white py-4 mt-auto">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; GSB Ecommerce. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";


const policySections = ref([
  {
    title: "1. Introduction",
    content:
        "La confidentialité de vos données est essentielle pour nous. Cette politique de confidentialité explique comment notre entreprise (ci-après \"nous\") collecte, utilise, stocke et protège les données personnelles des professionnels de la santé dans le cadre de la vente de médicaments. Elle s'applique à toutes les interactions avec nos services, que ce soit en ligne ou hors ligne.",
  },
  {
    title: "2. Finalités de l’Utilisation des Données",
    content: [
      "La gestion des commandes et des livraisons.",
      "La facturation et la gestion des paiements.",
      "La communication commerciale (informations sur les produits, offres spéciales, newsletters).",
      "Le respect des obligations légales, notamment en matière de traçabilité des médicaments.",
    ],
  },
  {
    title: "3. Sécurité des Données",
    content:
        "Nous mettons en place des mesures techniques et organisationnelles rigoureuses pour protéger vos données contre :\n" +
        "Les accès non autorisés.\n" +
        "Les pertes accidentelles.\n" +
        "Les altérations ou destructions."
  },
  {
    title: "4. Modifications de la Politique de Confidentialité",
    content:
        "Cette politique peut être modifiée pour refléter des évolutions législatives ou organisationnelles. Toute modification sera communiquée via notre site ou par e-mail.",
  },
]);



</script>

<style scoped>


h2 {
  display: inline-block;
  border-bottom: 2px solid #3498db;
  padding-bottom: 4px;
}

ul {
  list-style-type: disc;
}

.container {
  max-width: 80%;
}

</style>
