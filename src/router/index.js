import {createRouter, createWebHistory} from "vue-router";

import loginPage from "@/views/LoginPage.vue";

import landingPage from "@/views/medical_employee/LandingPage.vue"
import carouselProducts from "@/views/medical_employee/CarouselProducts.vue"
import productDetails from "@/views/medical_employee/ProductDetails.vue"
import orderValidation from "@/views/medical_employee/OrderValidation.vue"
import cart from "@/views/medical_employee/Cart.vue"

import dashboardSP from "@/views/salesperson/dashboardSp.vue"

import dashboardAdmin from "@/views/admin/dashboardAdmin.vue"


export const routes = [
    {path: '/', component: loginPage},

    {path: '/medicalEmployee/landingPage', name: 'Welcome Page', component : landingPage},
    {path: '/medicalEmployee/carouselProducts', name: 'PLP', component : carouselProducts},
    {path: '/medicalEmployee/productDetails', name: 'PDP', component : productDetails},
    {path: '/medicalEmployee/Cart', name: 'Cart Page', component : cart},
    {path: '/medicalEmployee/orderValidation', name: 'Order Validation', component : orderValidation},

    {path : '/admin/dashboardAdmin', name: 'Admin Dashboard', component: dashboardAdmin},

    {path : '/salesperson/dashboardSp', name: 'Salesperson Dashboard', component: dashboardSP}

]

const router = createRouter( {
    history : createWebHistory(),
    routes,
})


export default router