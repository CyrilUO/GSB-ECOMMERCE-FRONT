import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getCurrentUserRequest, getUserDataByIdRequest} from "@/services/users/userService.js";
import {authApi, parseJwt} from "@/services/api.js";

export const useUserStore = defineStore("user", () => {
    const userId = ref(localStorage.getItem("userId") || null);
    const userName = ref("");
    const userSurname = ref("");
    const roleId = ref(null)
    const userEmail = ref('')
    const roleName = ref("");
    const authToken = ref(localStorage.getItem("authToken") || null);
    const isLoading = ref(false);
    const error = ref(null);
    const isAuthenticated = computed(() => !!authToken.value);
    /* Petit cast !! renvoit la valeur booléenne pure (JS) ==> stricitement booléen */


    const fetchCurrentUser = async () => {
        try {
            const payload = parseJwt(authToken.value);
            if (!payload) {
                throw new Error("Token invalide ou expiré.");
            }

            // Passe en valeur réactive les données du payload parsé / décodé
            userId.value = payload.userId;
            userEmail.value = payload.sub;
            roleName.value = payload.roleName
            localStorage.setItem("userId", payload.userId);

            const response = await getUserDataByIdRequest(userId.value);
            const user = response.data;
            userName.value = user.userName;

        } catch (err) {
            console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
            clearCurrentUser();
        }
    };


    // Déconnecte et réinitialise les données utilisateur
    const clearCurrentUser = () => {
        userId.value = null;
        userName.value = "";
        userSurname.value = "";
        userEmail.value= "";
        roleName.value = "";
        roleId.value = "";
        localStorage.removeItem("authToken"); // Supprime le token
        let tempStorage = localStorage.getItem("authToken")
        console.info("Contenu du token storé : " + tempStorage)
        console.info("Données utilisateur et token réinitialisés.");
    };


    // Définit un nouveau token d'authentification
    const setAuthToken = (token) => {
        authToken.value = token;
        localStorage.setItem("authToken", token);

        if (token) {
            authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.info("[UserStore] Token enregistré et appliqué :", token);
        } else {
            delete authApi.defaults.headers.common["Authorization"];
            console.warn("[UserStore] Token supprimé des headers.");
        }
    };


    const clearSessionData = () => {
        localStorage.clear();
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
        clearSessionData,
        isAuthenticated,
    };
});
