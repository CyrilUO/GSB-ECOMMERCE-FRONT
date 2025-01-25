import {authApi, LOGIN_API_REQUEST_URL, loginApi, parseJwt} from "@/services/api.js";
import {useUserStore} from "@/store/userStore.js";
import router from "@/router/index.js";


export const loginAndAuthenticate = async (user) => {
    try {
        console.log("Tentative de connexion à :", LOGIN_API_REQUEST_URL);

        // Requête d'authentification
        const response = await loginApi.post("", user);
        console.log("Réponse de l'API :", response.data);

        if (response.status === 200) {
            const token = response.data;
            console.log("Token reçu :", token);

            // Sauvegarde du token
            localStorage.setItem("authToken", token);

            // Décodage du token
            const decryptedToken = parseJwt(token);
            console.log("Token décodé :", decryptedToken);

            const userStore = useUserStore();
            userStore.setAuthToken(token);

            const userRole = decryptedToken?.roleName;
            console.log("Rôle utilisateur :", userRole);

            if (userRole) {
                localStorage.setItem("userRole", userRole);
                userStore.roleName = userRole;
                await router.push("/login-success");
            } else {
                console.error("Rôle non attribué dans le token.");
                throw new Error("Rôle non attribué.");
            }
        } else {
            throw new Error(response.data.message || "Erreur lors de la connexion.");
        }
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error);
        throw error;
    }
};

export const invalidateToken = async () => {
    console.log("🔹 [Invalidate token] Appel API lancé pour invalider le token");
    try {
        const response = await authApi.post("/api/logout");
        console.log("response : ", response.data)
    } catch (error) {
        console.error("Erreur lors de l'invalidation", error)
    }
}