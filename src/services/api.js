import axios from "axios";

// Base URL de l'API
const API_TOKEN_URL = "http://localhost:8080/auth/login"
const BACK_REQUEST_BASE_URL = "http://localhost:8080/api"; // Point d'entrée de l'API
const CONTENT_TYPE = "application/json";


// Récupère le token, check s'il existe, si oui (verifier par la présence de authToken) est renvoyé. Sinon
const fetchToken = async () => {
    const existingToken = localStorage.getItem("authToken");
    if (existingToken) return existingToken; /* pas specialement besoind 'accolades*/

    try {
        const response = await axios.get(API_TOKEN_URL);
        const token = response.data.token;
        localStorage.setItem("authToken", token);
        return token;
    } catch (err) {
        console.error("Erreur lors de la récupération du token :", err.message);
        return null;
    }
};

// Instance Axios avec intercepteur
export const authApi = axios.create({
    baseURL: BACK_REQUEST_BASE_URL,
    headers: { "Content-Type": CONTENT_TYPE },
});

authApi.interceptors.request.use(async (config) => {
    const token = await fetchToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("The token is : ", token)
    return config;
});



// export const isAuthenticated = () => {
//
//     return localStorage.getItem('authToken') !== null;
// }


export const parseJwt = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = atob(base64);
        console.log(jsonPayload)
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Erreur lors du parsing du JWT :", error);
        return null;
    }
};

