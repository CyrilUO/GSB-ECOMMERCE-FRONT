<template>
  <div class="min-h-screen flex flex-col">
    <h1 class="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>

    <div class="flex-grow bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-semibold mb-4">Liste des Utilisateurs</h2>
      <table class="min-w-full bg-white border-r-2 border-l-2">
        <thead>
        <tr>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">ID</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Prénom</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Nom</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Email</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Mot de passe</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Role</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Créé le</th>
          <th class="py-2 px-4 bg-gray-400 text-white border-b border-r">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="py-2 px-4 border-b"></td>
          <td class="py-2 px-4 border-b"></td>
          <td class="py-2 px-4 border-b text-wrap"></td>
          <td class="py-2 px-4 border-b"></td>
          <td class="py-2 px-4 border-b"></td>
          <td class="py-2 px-4 border-b"></td>
          <td class="py-2 px-4 border-b"></td>
          <td class="py-2 px-4 border-b">
            <button class="text-blue-600 hover:underline">Modifier</button>
            <button class="text-red-600 hover:underline ml-4">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-4 flex justify-end">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Ajouter un utilisateur
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur qui grandit pour occuper l'espace disponible */
.flex-grow {
  flex-grow: 1;
}
</style>
