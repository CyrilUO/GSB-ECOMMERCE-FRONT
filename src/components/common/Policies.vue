<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white py-4 shadow-md">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold">Politique de confidentialité</h2>
        <img
            src="../../assets/images/common/logo_gsb.png"
            class="mx-auto mt-6 mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
        />
        <p class="text-sm mt-2">Dernière mise à jour : {{Date}}</p>
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
        <p class="text-sm mt-2">
          Pour toute question, contactez-nous à
          <span class="text-blue-400">[email@example.com]</span>.
        </p>
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
    title: "2. Données Collectées",
    content: [
      "a. Données personnelles :",
      "Nom et prénom",
      "Adresse professionnelle",
      "Adresse e-mail professionnelle",
      "Numéro de téléphone professionnel",
      "Numéro d'identification professionnelle (RPPS ou équivalent)",
      "b. Données liées aux transactions :",
      "Historique des commandes",
      "Informations de paiement",
      "Produits achetés",
      "c. Données techniques (en cas d'utilisation de notre plateforme en ligne) :",
      "Adresse IP",
      "Identifiants de connexion",
      "Données de navigation",
    ],
  },
  {
    title: "3. Finalités de l’Utilisation des Données",
    content: [
      "La gestion des commandes et des livraisons.",
      "La facturation et la gestion des paiements.",
      "La communication commerciale (informations sur les produits, offres spéciales, newsletters).",
      "Le respect des obligations légales, notamment en matière de traçabilité des médicaments.",
    ],
  },
  {
    title: "4. Partage des Données",
    content: [
      "Vos données personnelles peuvent être partagées avec des tiers dans les cas suivants :",
      "Prestataires de services : pour la livraison, la gestion des paiements ou l’hébergement de données.",
      "Autorités compétentes : en cas d’obligation légale ou réglementaire, notamment en matière de pharmacovigilance.",
      "Nous garantissons que ces tiers respectent les normes strictes de confidentialité et n'utilisent vos données que dans le cadre des prestations demandées.",
    ],
  },
  {
    title: "5. Conservation des Données",
    content:
        "Les données personnelles sont conservées :\n" +
        "Pendant la durée de la relation contractuelle.\n" +
        "Conformément aux exigences légales (par exemple, pour les données de facturation).\n" +
        "Au-delà de cette période, vos données seront supprimées ou anonymisées.",
  },
  {
    title: "6. Sécurité des Données",
    content:
        "Nous mettons en place des mesures techniques et organisationnelles rigoureuses pour protéger vos données contre :\n" +
        "Les accès non autorisés.\n" +
        "Les pertes accidentelles.\n" +
        "Les altérations ou destructions.\n" +
        "Ces mesures incluent le chiffrement des données sensibles et un contrôle strict des accès.",
  },
  {
    title: "7. Vos Droits",
    content: [
      "Conformément à la réglementation applicable (RGPD en Europe, par exemple), vous disposez des droits suivants :",
      "Accès : Vous pouvez demander à consulter les données que nous détenons sur vous.",
      "Rectification : Vous pouvez demander la correction de vos données inexactes.",
      "Effacement : Vous pouvez demander la suppression de vos données, sous réserve des obligations légales.",
      "Opposition : Vous pouvez vous opposer à l’utilisation de vos données à des fins commerciales.",
      "Portabilité : Vous pouvez demander une copie de vos données dans un format structuré.",
      "Pour exercer vos droits, contactez-nous à l’adresse : [email@example.com].",
    ],
  },
  {
    title: "8. Cookies et Données de Navigation",
    content: [
      "En utilisant notre plateforme, des cookies peuvent être déposés sur votre appareil pour :",
      "• Assurer le bon fonctionnement du site.",
      "• Collecter des statistiques d’usage.",
      "• Personnaliser votre expérience utilisateur.",
      "Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur.",
    ],
  },
  {
    title: "9. Modifications de la Politique de Confidentialité",
    content:
        "Cette politique peut être modifiée pour refléter des évolutions législatives ou organisationnelles. Toute modification sera communiquée via notre site ou par e-mail.",
  },
  {
    title: "10. Contact",
    content:
        "Pour toute question ou réclamation concernant cette politique de confidentialité, veuillez nous contacter :\n" +
        "• Adresse : [Votre Adresse]\n" +
        "• E-mail : [email@example.com]\n" +
        "• Téléphone : [Votre Numéro de Téléphone]\n" +
        "Date de mise à jour : [Date]",
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
