<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header Section -->
    <header class="bg-gray-800 text-white py-4 shadow-md">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold">Conditions Générales d'Utilisation</h2>
        <img
            src="@/assets/images/logo_gsb.png"
            class="mx-auto mt-6 mb-6 w-32 h-auto rounded-lg shadow-lg bg-white p-2 border border-gray-300"
        />
        <p class="text-sm mt-2">Dernière mise à jour : Novembre 2024</p>
      </div>
    </header>

    <!-- Content Section -->
    <main class="container mx-auto bg-gray-100 px-4 py-8  shadow-lg rounded-lg mt-8 mb-8">
      <section v-for="(section, index) in cguSections" :key="index" class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ section.title }}</h2>
        <ul v-if="Array.isArray(section.content)" class="list-disc pl-6 space-y-2">
          <li v-for="(item, index) in section.content" :key="index" class="text-gray-700">
            {{ item }}
          </li>
        </ul>
        <p v-else class="text-gray-700" v-html="section.content"></p>
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


const cguSections = ref([
  {
    title: "1. Objet",
    content:
        "Les présentes Conditions Générales d'Utilisation (ci-après \"CGU\") définissent les modalités d'accès et d'utilisation des services proposés par notre entreprise via nos plateformes (site web, application mobile, etc.). Elles s'appliquent exclusivement aux professionnels de la santé utilisant nos services pour des besoins liés à leur activité.",
  },
  {
    title: "2. Acceptation des CGU",
    content:
        "L'accès à nos services implique l'acceptation pleine et entière des présentes CGU. Si vous n'êtes pas d'accord avec l'une des dispositions, vous êtes invité à ne pas utiliser nos services.",
  },
  {
    title: "3. Accès aux Services",
    content: [
      "3.1. Utilisateurs autorisés : L'accès à nos services est réservé aux professionnels de la santé, tels que définis par la législation en vigueur (médecins, pharmaciens, dentistes, etc.), disposant d'un numéro d'identification professionnelle valide (ex. : RPPS).",
      "3.2. Création de compte : Pour accéder aux fonctionnalités, l’utilisateur doit créer un compte en fournissant des informations professionnelles exactes et une adresse e-mail professionnelle active. L’utilisateur est responsable de la confidentialité de ses identifiants de connexion et de l’usage de son compte.",
    ],
  },
  {
    title: "4. Utilisation des Services",
    content: [
      "4.1. Commandes de médicaments : Les utilisateurs peuvent consulter le catalogue de médicaments, passer des commandes en ligne, et suivre l’état de leurs commandes.",
      "4.2. Obligations de l’utilisateur : L’utilisateur s’engage à fournir des informations exactes lors de la création du compte et des commandes, utiliser les services conformément à la législation en vigueur, et ne pas détourner l’utilisation des services à des fins personnelles ou illégales.",
    ],
  },
  {
    title: "5. Responsabilités",
    content: [
      "5.1. Responsabilité de l’entreprise : Nous nous engageons à fournir des services conformes aux normes de qualité, assurer la disponibilité du site sous réserve des maintenances ou des cas de force majeure, et respecter les réglementations en vigueur, notamment en matière de traçabilité des médicaments.",
      "5.2. Limites de responsabilité : Nous ne pouvons être tenus responsables en cas d’utilisation frauduleuse des services par un tiers, de non-conformité résultant d’erreurs ou d’omissions dans les informations fournies par l’utilisateur, ou d’interruption des services due à des raisons techniques ou à des maintenances planifiées.",
      "5.3. Responsabilité de l’utilisateur : L’utilisateur est seul responsable des informations fournies, des commandes passées et de leur utilisation des services.",
    ],
  },
  {
    title: "6. Propriété Intellectuelle",
    content:
        "Tous les contenus de nos plateformes (textes, images, logos, logiciels) sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction, modification ou distribution non autorisée est strictement interdite.",
  },
  {
    title: "7. Données Personnelles",
    content:
        "L’utilisation des services implique le traitement de données personnelles, conformément à notre Politique de Confidentialité. L’utilisateur accepte que ses données soient collectées, traitées et stockées pour les besoins des services.",
  },
  {
    title: "8. Suspension et Résiliation",
    content: [
      "8.1. Suspension des services : Nous nous réservons le droit de suspendre l'accès aux services en cas de non-respect des CGU ou d'utilisation frauduleuse ou abusive.",
      "8.2. Résiliation : L’utilisateur peut résilier son compte à tout moment en contactant notre service client.",
    ],
  },
  {
    title: "9. Modification des CGU",
    content:
        "Nous nous réservons le droit de modifier les CGU à tout moment pour répondre aux évolutions législatives ou améliorer nos services. Toute modification sera notifiée à l’utilisateur via e-mail ou publication sur notre site.",
  },
  {
    title: "10. Droit applicable et Juridiction compétente",
    content:
        "Les présentes CGU sont régies par les lois en vigueur dans le pays d’implantation de l’entreprise. Tout litige sera soumis à la compétence exclusive des tribunaux compétents.",
  },
  {
    title: "11. Contact",
    content:
        "Pour toute question ou réclamation relative aux présentes CGU, contactez-nous à:  \nTéléphone : [Votre Numéro de Téléphone] \nAdresse : [Votre Adresse]",
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
