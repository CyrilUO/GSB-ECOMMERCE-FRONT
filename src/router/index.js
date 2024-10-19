import {createRouter, createWebHistory} from "vue-router";

import loginPage from "@/views/LoginPage.vue";



export const routes = [
    {
        path: '/',
        component: loginPage
    },

    {
        path: '/Accueil',
        component :'Landing Page'
    }
]

const router = createRouter( {
    history : createWebHistory(),
    routes,
})


export default router