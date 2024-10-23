import {createRouter, createWebHistory} from "vue-router";

import LoginPage from "@/views/LoginPage.vue";

import landingPage from "@/views/medical_employee/LandingPage.vue"
import carouselProducts from "@/views/medical_employee/CarouselProducts.vue"
import productDetails from "@/views/medical_employee/ProductDetails.vue"
import orderValidation from "@/views/medical_employee/OrderValidation.vue"
import cart from "@/views/medical_employee/Cart.vue"


import dashboardSalesperson from "@/views/salesperson/dashboardSalesperson.vue"
import dashboardCustomerMonitoring from "@/views/salesperson/dashboardCustomerMonitoring.vue"
import dashboardOrder from "@/views/salesperson/dashboardOrder.vue"

import dashboardAdmin from "@/views/admin/dashboardAdmin.vue"
import dashboardDatanalytics from "@/views/admin/dashboardDatanalytics.vue"
import dashboardManageUsers from "@/views/admin/dashboardManageUsers.vue"
import dashboardManageProducts from "@/views/admin/dashboardManageProducts.vue"
import dashboardAddProduct from "@/views/admin/dashboardAddProduct.vue"

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
                path: 'dashboardAnalytics',
                component: dashboardDatanalytics
            },
            {
                path: 'manage-users',
                component: dashboardManageUsers,
            },
            {
                path: 'manage-products',
                component: dashboardManageProducts,
            },
            {
                path: 'add-products',
                component: dashboardAddProduct,
            },
        ]
    },

    {
        path: '/salesperson', name: 'Salesperson Dashboard', component: dashboardSalesperson, redirect: 'salesperson/order-dashboard',
        children: [
            {
                path: 'customer-monitoring', component: dashboardCustomerMonitoring,
            },
            {
                path: 'customer-order', component: dashboardOrder,
            }
        ]
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router