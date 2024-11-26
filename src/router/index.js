import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical_employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";

const routes = [
    ...commonRoutes,
    ...adminRoutes,
    ...medicalEmployeeRoutes,
    ...salespersonRoutes,
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
