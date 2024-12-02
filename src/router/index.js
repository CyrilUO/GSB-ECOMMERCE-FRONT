import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical_employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";


// Fichier directeur : centralise la logique de routing

// TODO Implémenter une logique pour les API
const routes = [
    ...commonRoutes,
    ...adminRoutes,
    ...medicalEmployeeRoutes,
    ...salespersonRoutes,

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },

    { path: "/unauthorized", name: "Unauthorized", component: Unauthorized },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
