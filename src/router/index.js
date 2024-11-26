import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical_employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";

const routes = [
    ...commonRoutes,
    ...adminRoutes,
    ...medicalEmployeeRoutes,
    ...salespersonRoutes,

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
