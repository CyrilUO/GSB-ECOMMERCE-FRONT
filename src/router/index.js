import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical-employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";

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

/* MiddleWare de test, code généré entièrement par  ChatGPT */
/* MiddleWare = */
// router.beforeEach((to, from, next) => {
//     console.log("Navigating from:", from.fullPath || "No from path", "to:", to.fullPath);
//     if (to.name === "NotFound" || to.name === "Unauthorized") {
//         console.log("Not saving lastPage, invalid navigation");
//     } else if (from.fullPath) {
//         console.log("Saving lastPage:", from.fullPath); // Debugging
//         sessionStorage.setItem("lastPage", from.fullPath);
//     }
//     next();
// });


