# 🌟 Projet GSB Front (Headless) 🌟

Bienvenue dans le projet **GSB Front (Headless)** ! Ce projet utilise **Vue.js** avec **TailwindCSS** pour le frontend et suit une architecture modulaire et bien organisée. 🚀

---

## 📁 Structure du Projet

Voici un aperçu de la structure principale du projet :

### 🗂️ Répertoires

- **`src/assets`** : Contient les ressources statiques.
    - 📷 `images` : Images pour le frontend.
    - 🎨 `styles` : Fichiers CSS/Tailwind personnalisés.

- **`src/components`** : Composants réutilisables.
    - **`common`** : Composants communs (ex. footer, CGU, etc.).
    - **`dashboardComponent`** : Composants spécifiques au tableau de bord.
    - **`medicalEmployeeComponent`** : Composants dédiés aux employés médicaux.

- **`src/router`** : Fichiers de configuration des routes.
    - 🔄 `admin.js`, `salesperson.js`, etc.

- **`src/services`** : Gestion des appels API (Ex. utilisateurs, produits, commandes).

- **`src/views`** : Pages principales par rôle :
    - 👑 `admin` : Pages pour les administrateurs.
    - 💼 `medical-employee` : Pages pour les employés médicaux.
    - 🛒 `salesperson` : Pages pour les commerciaux.

### 📄 Fichiers Importants

- **`App.vue`** : Point d'entrée principal de l'application.
- **`tailwind.config.js`** : Configuration personnalisée de TailwindCSS.
- **`vite.config.js`** : Configuration de Vite pour le bundling.

---

## 🚀 Installation et Lancement

1. **Cloner le dépôt** :
   ```bash
   git clone <https://github.com/CyrilUO/GSB-ECOMMERCE-FRONT.git>
   cd gsb_front

2. **Installer les dépendance** :
    ```bash
    npm install

3. **Lancer le projet en mode développement** :
    ```bash
    npm run dev

4. **Lancer le projet en mode développement** :
    ```bash
    npm run dev

## ✨ Fonctionnalités Principales

- 🖥️ **Dashboard** : Gestion intuitive pour les administrateurs.
- 🛒 **Catalogue Produits** : Consultation et gestion des produits pour les employés médicaux.
- 📊 **Analytique** : Affichage de graphiques dynamiques.
- 🔐 **Authentification** : Gestion des rôles (Admin, Employé Médical, Commerciaux).

---

## 📚 Technologies Utilisées

- **Vue.js** : Framework JavaScript moderne.
- **TailwindCSS** : Styles CSS utilitaires pour une conception rapide.
- **Vite** : Outil de build ultra rapide.
- **Node.js** : Gestion des dépendances.

