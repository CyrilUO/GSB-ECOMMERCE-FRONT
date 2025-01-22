import axios from "axios";


import router from "@/router/index.js";
import {useUserStore} from "@/store/userStore.js";

/**
 * @type {string}
 * @description URL pour taper sur l'endpoint back qui permet de récupérer le token d'authentification.
 */
const API_TOKEN_URL = "http://localhost:8080/auth/login";

/**
 * @type {string}
 * @description URL de base pour toutes les requêtes vers l'API principale.
 */
const BACK_API_REQUEST_BASE_URL = "http://localhost:8080/api";

/**
 * @type {string}
 * @description Type de contenu envoyé dans les requêtes HTTP.
 */
const CONTENT_TYPE = "application/json";

/**
 * @description Instance Axios configurée pour communiquer avec l'API, incluant un intercepteur pour ajouter le token d'authentification.
 */
export const authApi = axios.create({
    baseURL: BACK_API_REQUEST_BASE_URL,
    headers: {"Content-Type": CONTENT_TYPE},
});

/**
 * @description Intercepteur des requêtes pour ajouter le token JWT dans les headers si disponible.
 */
authApi.interceptors.request.use(async (config) => {
    const userStore = useUserStore(); // Charge le store utilisateur
    const token = userStore.authToken; // Récupère le token du store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn("Token manquant. Redirection vers login.");
        await router.push("/logout");
    }
    return config;
});



authApi.interceptors.response.use(
    async (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const userStore = useUserStore();
            console.warn("Token invalide ou expiré. Déconnexion en cours...");
            userStore.clearCurrentUser();
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken");
        }
        throw error;
    }
);



/**
 * @function fetchToken
 * @description Récupère le token JWT, soit depuis le stockage local s'il existe, soit en le demandant à l'API.
 * @returns {Promise<string|null>} Le token JWT ou `null` si une erreur se produit.
 */
const fetchToken = async () => {
    const existingToken = localStorage.getItem("authToken");

    if (existingToken) {
        const payload = parseJwt(existingToken);

        if (payload && payload.exp * 1000 > Date.now()) {
            return existingToken;
        } else {
            console.warn("Token expiré. Tentative de renouvellement.");
            localStorage.removeItem("authToken");
        }
    }

    try {
        const response = await axios.get(API_TOKEN_URL);
        const token = response.data.token;

        const userStore = useUserStore(); // Appelle le store Pinia
        userStore.setAuthToken(token); // Mets à jour le token dans le store

        return token;
    } catch (err) {
        console.error("Erreur lors de la récupération du token :", err.message);
        return null;
    }
};


/**
 * @function parseJwt
 * @description Décode un token JWT et extrait le payload au format JSON.
 * @param {string} token - Le token JWT à décoder.
 * @returns {Object|null} Le payload JSON décodé ou `null` en cas d'erreur.
 * @throws {Error} Si le token est invalide ou si le format est incorrect.
 */

export const parseJwt = (token) => {
    try {
        if (!token || typeof token !== "string") new Error("Token JWT invalide ou absent.")

        console.log("Token JSON chiffré :", token);


        const base64Url = token.split(".")[1]; // Extrait le payload codé en Base64.

        if (!base64Url) new Error("Format de token JWT invalide."); // Vérifie le format du token.


        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64); // Décode la chaîne Base64 en texte clair.
        console.log("Payload JSON déchiffré :", jsonPayload);

        return JSON.parse(jsonPayload); // Convertit le JSON en objet JavaScript.
    } catch (error) {
        console.error("Erreur lors du parsing du JWT :", error);
        return null; // Retourne `null` en cas d'erreur.
    }
};


