import {authApi, LOGIN_API_REQUEST_URL, loginApi, parseJwt} from "@/services/api.js";
import {useUserStore} from "@/store/userStore.js";
import router from "@/router/index.js";

console.log("authApi dans authService", authApi.defaults.data);

export const loginAndAuthenticate = async (user) => {
    try {
        console.log("%cStylé en rouge", "color: red; font-weight: bold;");
        console.timeLog("Début du process")
        console.trace("Tentative de connexion à :", LOGIN_API_REQUEST_URL);
        console.time("chargement")
        const response = await loginApi.post("", user);
        console.info("Réponse de l'API :", response.data);
        console.timeEnd("fin du chargement")

        if (response.status === 200) {
            const token = response.data;
            console.log("Token reçu :", token);

            localStorage.removeItem("authToken");
            localStorage.setItem("authToken", token);

            /* Mise à jour immédiate du header de l'instance axios authApi afin que les requêtes soit authentifiées*/
            authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;


            const decryptedToken = parseJwt(token);
            console.log("Token décodé :", decryptedToken);

            const userStore = useUserStore();
            userStore.setAuthToken(token);
            localStorage.setItem("userId", decryptedToken.userId)

            const userRole = decryptedToken?.roleName;
            console.log("Rôle utilisateur :", userRole);

            if (userRole) {
                localStorage.setItem("userRole", userRole);
                userStore.roleName = userRole;

                await router.push("/login-success");
            } else {
                console.error("Rôle non attribué dans le token.");
                throw new Error("Rôle non attribué.");
            } console.timeLog("Fin du process")
        } else {
            throw new Error(response.data.message || "Erreur lors de la connexion.");
        }
    } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error);
        throw error;
    }
};

