import axios from "axios";


import router from "@/router/index.js";
import {useUserStore} from "@/store/userStore.js";

/**
 * @description URL de base pour toutes les requêtes vers l'API principale.
 */

// const API_URL_DOCKER = import.meta.env.VITE_BACKEND_URL;

const API_TOKEN_URL = "http://localhost:8080/auth/login";
export const LOGIN_API_REQUEST_URL = "http://localhost:8080/auth/login";
const CONTENT_TYPE = "application/json";
const BACK_API_REQUEST_BASE_URL = "http://localhost:8080/api";
const BEARER_TOKEN = `Bearer ${localStorage.getItem("authToken")}`


/**
 * @description Instance Axios configurée pour communiquer avec l'API, incluant un intercepteur pour ajouter le token d'authentification.
 */
export const loginApi = axios.create({
    baseURL: LOGIN_API_REQUEST_URL,
    headers: {
        "Content-Type": CONTENT_TYPE,
    }
});


export const authApi = axios.create({
    baseURL: BACK_API_REQUEST_BASE_URL,
    headers: {
        "Content-Type": CONTENT_TYPE,
    },
});

/**
 * @description Forcer l('insertion du token dans les headers si un token existe (sa validité est déjà gérée)
 */
const token = localStorage.getItem("authToken");
if (token) {
    authApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


/**
 * @description Intercepteur des requêtes qui ajoute le token JWT dans les headers si disponible à chaque requête.
 */
authApi.interceptors.request.use(async (config) => {
    const userStore = useUserStore();
    const token = localStorage.getItem("authToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Token manquant");
        userStore.clearCurrentUser();
        return Promise.reject("Aucun token, arrêt des requêtes.");
    }
    return config;
});


/**
 * @description Fonction qui intercepte la réponse d'une promesse AAxios
 * - En cas de promesse résolue : mise à jour du token du local storage, dans instance authApi et dans userStore
 * - En cas de promesse rejetée : Tentative récupération nouveau token avec un retry avec ancien token. Si mauvais déconnexion auto via le rotuer push
 */
authApi.interceptors.response.use(
    async (response) => {
        // Mise à jour du token si reçu dans la réponse
        if (response.data?.newToken) {
            const userStore = useUserStore();
            const newToken = response.data.newToken;

            console.info("Mise à jour du token reçu après mise à jour utilisateur.");
            userStore.setAuthToken(newToken);
            localStorage.setItem("authToken", newToken);
            authApi.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const userStore = useUserStore();

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await fetchToken();
                if (newToken) {
                    console.info("Nouveau token récupéré, mise à jour immédiate.");
                    localStorage.setItem("authToken", newToken);
                    authApi.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    return authApi(originalRequest);
                }
            } catch (refreshError) {
                console.warn("Impossible de récupérer un nouveau token. Déconnexion...");
            }

            userStore.clearCurrentUser();
            localStorage.removeItem("authToken");
            await router.push("/logout");
        }

        return Promise.reject(error);
    }
);



/**
 * @description Récupère le token JWT, soit depuis le stockage local s'il existe, soit en le demandant à l'API d'auth.
 */
const fetchToken = async () => {
    const existingToken = localStorage.getItem("authToken");

    if (existingToken) {
        const payload = parseJwt(existingToken);

        if (payload && payload.exp * 1000 > Date.now()) {
            console.info("Token valide.");

            return existingToken;
        } else {
            console.warn("Token expiré. Tentative de renouvellement.");
            localStorage.removeItem("authToken");
        }
    }

    try {
        const response = await axios.get(API_TOKEN_URL);
        const token = response.data.token;

        const userStore = useUserStore();
        userStore.setAuthToken(token);

        return token;
    } catch (err) {
        console.error("Erreur lors de la récupération du token :", err.message);
        return null;
    }
};


/**
 * @description Décode un token JWT et extrait le payload au format JSON.
 */

export const parseJwt = (token) => {
    try {
        if (!token || typeof token !== "string"){
            new Error("Token JWT invalide ou absent.")
        }

        console.log("Token JSON chiffré :", token);


        const base64Url = token.split(".")[1]; // Extrait le payload codé en Base64.

        if (!base64Url) new Error("Format de token JWT invalide."); // Vérifie le format du token.


        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64); // Décode la chaîne Base64 en texte clair.
        console.info("Payload JSON déchiffré :", jsonPayload);

        return JSON.parse(jsonPayload); // Convertit le JSON en objet JavaScript.
    } catch (error) {
        console.error("Erreur lors du parsing du JWT :", error);
        return null; // Retourne `null` en cas d'erreur.
    }
};


