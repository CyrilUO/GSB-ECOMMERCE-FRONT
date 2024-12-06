import { createRouter, createWebHistory } from "vue-router";
import { commonRoutes } from "@/router/common.js";
import { adminRoutes } from "@/router/admin.js";
import { medicalEmployeeRoutes } from "@/router/medical-employee.js";
import { salespersonRoutes } from "@/router/salesperson.js";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import {nextTick} from "vue";

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

router.beforeEach((to, from, next) => {
    if (to.meta.authRequired === true) {

    }
})


