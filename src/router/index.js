import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical-employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import {parseJwt} from "@/services/api.js";


const routes = [
    ...commonRoutes,
    ...adminRoutes,
    ...medicalEmployeeRoutes,
    ...salespersonRoutes,
    { path: "/unauthorized", name: "Unauthorized", component: Unauthorized },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }, // Dernière route
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

/* MiddleWare  */

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("authToken");
    const userAuthenticated = token !== null;

    if (to.meta.authRequired) {
        if (!userAuthenticated) {
            console.warn("Utilisateur non authentifié.");
            return next({ path: "/unauthorized" });
        }

        const userRole = parseJwt(token)?.userRole;
        console.log("Rôle utilisateur :", userRole);

        if (to.meta.requestedRole && userRole?.toLowerCase() !== to.meta.requestedRole) {
            console.warn(`Accès refusé. Rôle requis : ${to.meta.requestedRole}`);
            return next({ path: "/unauthorized" });
        }
    }

    next();
});



