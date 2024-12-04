import axios from "axios";

// Base URL de l'API
const API_BASE_URL = "http://localhost:8080";

// Headers par défaut
const defaultHeaders = {
    "Content-Type": "application/json",
};

// Instance Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: defaultHeaders,
});


