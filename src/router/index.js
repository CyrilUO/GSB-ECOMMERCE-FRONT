import {createRouter, createWebHistory} from "vue-router";

import loginPage from "@/views/LoginPage.vue";



export const routes = [
    {
        path: '/loginGsb',
        component: loginPage
    },
]

const router = createRouter( {
    history : createWebHistory(),
    routes,
})


export default router