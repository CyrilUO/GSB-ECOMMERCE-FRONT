import axios from "axios";

export const apiBackend = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
});


// TODO revoir cette fonction pour centraliser les appels API
// export const apiCall = async (method, url, data = null, params = null) => {
//     try {
//         const response = await apiBackend({
//             method,
//             url,
//             data,
//             params,
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error
//     }
// }


