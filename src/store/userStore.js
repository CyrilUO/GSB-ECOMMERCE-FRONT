import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getCurrentUserRequest} from "@/services/users/userService.js";

export const useUserStore = defineStore("user", () => {
    const userId = ref(null);
    const userName = ref("");
    const userSurname = ref("");
    const roleId = ref(null)
    const roleName = ref("");
    const authToken = ref(localStorage.getItem("authToken") || null); // Token d'authentification
    const isLoading = ref(false);
    const error = ref(null);

    // Récupère les données utilisateur
    const fetchCurrentUser = async () => {
        try {
            isLoading.value = true;

            const response = await getCurrentUserRequest();
            console.log("Donnée fetchée dans le user store :", response.data);
            console.log("Donnée fetchée dans le user store pour le userId :", response.data.userId);


            // Vérifiez si `response.data` contient les données minimales nécessaires
            if (response.data) {
                userId.value = response.data.userId;
                userName.value = response.data.userName || "Inconnu";
                userSurname.value = response.data.userSurname || "";

                // Gérer le cas où `role` ou ses sous-propriétés sont absents
                if (response.data.role) {
                    roleId.value = response.data.role.roleId || null;
                    roleName.value = response.data.role.roleName || "";
                } else {
                    console.warn("Les données de rôle sont absentes pour l'utilisateur.");
                    roleId.value = null;
                    roleName.value = ""; // Valeurs par défaut si le rôle est absent
                }

                console.log("Utilisateur connecté :", {
                    userId: userId.value,
                    userName: userName.value,
                    roleName: roleName.value,
                });
            } else {
                throw new Error("Les données utilisateur sont incomplètes ou absentes.");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération de l'utilisateur :", err);
            error.value = err.message || "Erreur inconnue.";
        } finally {
            isLoading.value = false;
        }
    };



    // Déconnecte et réinitialise les données utilisateur
    const clearCurrentUser = () => {
        userId.value = null;
        userName.value = "";
        userSurname.value = "";
        roleName.value = "";
        roleId.value = "";
        localStorage.removeItem("authToken"); // Supprime le token
        let tempStorage = localStorage.getItem("authToken")
        console.log("Contenu du token storé :" + tempStorage)
        console.log("Données utilisateur et token réinitialisés.");
    };

    const invalidateToken = async (token) => {
        authToken.value ="";
    }

    // Définit un nouveau token d'authentification
    const setAuthToken = (token) => {
        authToken.value = token;
        localStorage.setItem("authToken", token); // Stocke le token dans localStorage
    };

    const clearSessionData = () => {
        localStorage.removeItem("authToken"); // Supprime le token
        sessionStorage.removeItem("authToken"); // Supprime le token si stocké dans sessionStorage
        localStorage.clear();
        sessionStorage.clear();
    };


    const hasRole = (requiredRole) => {
        return roleName.value === requiredRole;
    };

    const isUserLoaded = computed(() => userId.value !== null && roleName.value !== "");


    return {
        userId,
        userName,
        userSurname,
        roleName,
        authToken,
        isLoading,
        error,
        fetchCurrentUser,
        clearCurrentUser,
        setAuthToken,
        hasRole,
        isUserLoaded,
        clearSessionData
    };
});
