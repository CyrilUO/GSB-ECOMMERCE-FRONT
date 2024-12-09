import axios from "axios";

// Base URL de l'API
const API_BASE_URL = "http://localhost:8080/api";
const API_TOKEN_URL = "http://localhost:8080/auth/"
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
    baseURL: API_BASE_URL,
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


// Instance Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
});


export const isAuthenticated = () => {

    return localStorage.getItem('authToken') !== null;
}

export const getUserRole = () => {
    return JSON.parse(localStorage.getItem("userRole")) || []; // Y stocker dans una array et pas un objet
}
