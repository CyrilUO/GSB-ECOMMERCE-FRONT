import { defineStore } from "pinia";
import { ref } from "vue";
import {getCurrentUserRequest} from "@/services/users/userService.js";

export const useUserStore = defineStore("user", () => {
    const userId = ref(null);
    const userName = ref("");
    const userSurname = ref("");
    const isLoading = ref(false);
    const error = ref(null);

    const fetchCurrentUser = async () => {
        try {
            console.log("Appel API pour récupérer l'utilisateur...");
            isLoading.value = true;
            const response = await getCurrentUserRequest();
            console.log("Réponse API : ", response);

            if (response.data) {
                userId.value = response.data;
                userName.value = response.data.userName;
            } else {
                console.error("Aucune donnée utilisateur trouvée.");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération de l'utilisateur :", err);
            error.value = err.message || "Une erreur est survenue.";
        } finally {
            isLoading.value = false;
        }
    };



    return { userId, userName, fetchCurrentUser, isLoading, error };
});
