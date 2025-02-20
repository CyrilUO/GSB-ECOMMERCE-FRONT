import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getCurrentUserRequest, getUserDataByIdRequest} from "@/services/users/userService.js";
import {parseJwt} from "@/services/api.js";

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
            const payload = parseJwt(authToken.value);
            if (!payload) {
                throw new Error("Token invalide ou expiré.");
            }

            userId.value = payload.userId;
            const userEmail = payload.sub;

            // Appel API pour récupérer des informations complémentaires
            const response = await getUserDataByIdRequest(userId.value);
            const user = response.data;

            userName.value = user.userName;
            roleName.value = user.role.roleName;

            console.log("Utilisateur connecté :", {
                userId: userId.value,
                userEmail,
                userName: userName.value,
                roleName: roleName.value,
            });
        } catch (err) {
            console.error("Erreur lors de la récupération de l'utilisateur :", err.message);
            clearCurrentUser();
        }
    };

    // const getConnectedUserIdAndRole = () => {
    //     const store = useUserStore()
    //     const connectedUserRole = user.role.roleName
    //     console.log(`getting the current connected user roleId : ${connectedUser}`)
    //     return connectedUser
    // }




    // Déconnecte et réinitialise les données utilisateur
    const clearCurrentUser = () => {
        userId.value = null;
        userName.value = "";
        userSurname.value = "";
        roleName.value = "";
        roleId.value = "";
        localStorage.removeItem("authToken"); // Supprime le token
        let tempStorage = localStorage.getItem("authToken")
        console.log("Contenu du token storé : " + tempStorage)
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
        clearSessionData,
        // getConnectedUser
    };
});
