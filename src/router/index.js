import {createRouter, createWebHistory} from "vue-router";

import LoginPage from "@/views/LoginPage.vue";

import landingPage from "@/views/medical_employee/LandingPage.vue"
import carouselProducts from "@/views/medical_employee/CarouselProducts.vue"
import productDetails from "@/views/medical_employee/ProductDetails.vue"
import orderValidation from "@/views/medical_employee/OrderValidation.vue"
import cart from "@/views/medical_employee/Cart.vue"

import dashboardSP from "@/views/salesperson/dashboardSp.vue"
import dashboardOrder from "@/views/salesperson/dashboardOrder.vue"

import dashboardAdmin from "@/views/admin/dashboardAdmin.vue"
import dashboardDatanalytics from "@/views/admin/dashboardDatanalytics.vue"
import dashboardManageUsers from "@/views/admin/dashboardManageUsers.vue"
import dashboardManageProducts from "@/views/admin/dashboardManageProducts.vue"

export const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: LoginPage, name: 'LoginPage'},


    // { path: '/medicalEmployee/landingPage', name: 'Welcome Page', component: landingPage },
    // { path: '/medicalEmployee/carouselProducts', name: 'PLP', component: carouselProducts },
    // { path: '/medicalEmployee/productDetails', name: 'PDP', component: productDetails },
    // { path: '/medicalEmployee/Cart', name: 'Cart Page', component: cart },
    // { path: '/medicalEmployee/orderValidation', name: 'Order Validation', component: orderValidation },
    //
    {
        path: '/admin', name: 'Admin Dashboard', component: dashboardAdmin, redirect: 'admin/dashboardAnalytics',
        children: [
            {
                path: 'dashboardAnalytics', component: dashboardDatanalytics
            },
            {
                path: 'manage-users', component: dashboardManageUsers,
            },
            {
                path: 'manage-products', component: dashboardManageProducts
            }
        ]
    },

    {
        path: '/salesperson/', name: 'Salesperson Dashboard', component: dashboardSP,
        children: [
            {
                path: 'order-dashboard', component: dashboardOrder
            },
            {
                path: ''
            }
        ]
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router