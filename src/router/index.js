import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical-employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import {isAuthenticated, getUserRole} from "@/services/api.js";

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
    const userRole = getUserRole()
    const userAuthenticated = isAuthenticated()

    // console.log("authToken présent ?", localStorage.getItem("authToken"));
    // console.log("isAuthenticated ?", userAuthenticated);

    if (to.meta.authRequired) {

        if (!userAuthenticated) {
            console.log("Erreur : authentifié ? ", userAuthenticated)

            return next({ path: "/unauthorized" });
        }

        if (to.meta.requestedRole && !userRole().includes(to.meta.requestedRole)) {
            console.log("Rôles actuels de l'utilisateur :", userRole);
            console.log("Rôle requis par la route :", to.meta.requestedRole);
            return next({ path: "/unauthorized" });
        }
    }

    next();
});



