// import apiBackend from "@/services/api.js";
//
//
// const getProduct = async () => {
//     try {
//         const response = await apiBackend.get('/products')
//         return response.data;
//
//     } catch (error) {
//         console.error(error);
//         throw error
//     }
// }
//
// const getProductById = async (productId) => {
//     try {
//         const response = await apiBackend.get(`/products/${productId}`);
//         return response.data.id;
//     } catch (error) {
//         throw new Error(error)
//     }
// }
//
// const addProduct = async () => {
//     try {
//         const response = await apiBackend.post('/products')
//         return response.data;
//     } catch (error) {
//         throw new Error(error)
//     }
// }
//
// const deleteProduct = async (productId) => {
//     try {
//         await apiBackend.delete(`/products/${productId}`)
//     } catch (error) {
//         throw new Error(error)
//     }
// }
//
// const updateProduct = async (productId) => {
//     try {
//         return;
//     } catch (error) {
//         throw new Error(error)
//     }
// }
//
//
// export default {getProduct, addProduct, getProductById, deleteProduct}