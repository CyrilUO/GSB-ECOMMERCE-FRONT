import axios from "axios";

// Base URL de l'API
const API_TOKEN_URL = "http://localhost:8080/auth/login"
const CONTENT_TYPE = "application/json";

const fetchToken = async () => {
    const existingToken = localStorage.getItem("authToken");

    if (existingToken) {
        return existingToken;
    }
    try {
        const response = await axios.get(API_TOKEN_URL);
        const token = response.data.token;
        localStorage.setItem("authToken", token); // C'est là que le token est stocké
        return token;
    } catch (err) {
        console.error("Erreur lors de la récupération du token :", err.message);
        return null;
    }
};

/* localStorage.clear() ==> Dégager les credentials à la déco*/

// Headers par défaut
export const authApi = axios.create({
    baseURL: API_TOKEN_URL,
    headers: {
        "Content-Type": CONTENT_TYPE,
    }
});




authApi.interceptors.request.use(async (config) => {
    try {
        const token = await fetchToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("Pas de token disponible.");
        }
        return config;
    } catch (err) {
        console.error("Erreur lors de l'interception de la requête :", err.message);
        return Promise.reject(err);
    }
});


export const isAuthenticated = () => {

    return localStorage.getItem('authToken') !== null;
}


export const parseJwt = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64);
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Erreur lors du parsing du JWT :", error);
        return null;
    }
};

