import {createRouter, createWebHistory} from "vue-router";
import {commonRoutes} from "@/router/common.js";
import {adminRoutes} from "@/router/admin.js";
import {medicalEmployeeRoutes} from "@/router/medical-employee.js";
import {salespersonRoutes} from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import {parseJwt} from "@/services/api.js";


const routes = [
    ...commonRoutes,
    ...adminRoutes,
    ...medicalEmployeeRoutes,
    ...salespersonRoutes,
    { path: "/unauthorized", name: "Unauthorized", component: Unauthorized },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

/* MiddleWare  */

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("authToken");
    console.log("Contenu du session storage", sessionStorage)
    console.log("Contenu du local storage" , localStorage)

    // Vérifie si l'utilisateur est authentifié
    if (to.meta.authRequired && !isAuthenticated(token)) {
        console.warn("Utilisateur non authentifié.");
        return next({ path: "/unauthorized" });
    }

    // Vérifie si l'utilisateur a le rôle requis
    if (to.meta.requestedRole && !hasRequiredRole(token, to.meta.requestedRole)) {
        console.warn(`Accès refusé. Rôle requis : ${to.meta.requestedRole}`);
        return next({ path: "/unauthorized" });
    }

    console.log("Utilisateur autorisé")

    next();
});

// Fonction utilitaire pour vérifier l'authentification
function isAuthenticated(token) {
    if (!token) return false;

    const payload = parseJwt(token);
    if (!payload || payload.exp * 1000 <= Date.now()) {
        console.warn("Token expiré.");
        localStorage.removeItem("authToken"); // Supprime le token expiré
        return false;
    }
    return true;
}

// Fonction utilitaire pour vérifier le rôle requis
function hasRequiredRole(token, requiredRole) {
    const userRole = parseJwt(token)?.roleName?.toLowerCase();
    return userRole === requiredRole.toLowerCase();
}




