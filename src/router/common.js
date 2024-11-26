import LoginPage from "@/views/LoginPage.vue";
import Logout from "@/views/Logout.vue";
import CGU from "@/components/common/CGU.vue";
import Policies from "@/components/common/Policies.vue";

export const commonRoutes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage, name: 'Login Page' },
    { path: '/logout', component: Logout, name: 'Logout Page' },
    { path: '/cgu', component: CGU, name: "Conditions générales d'utilisation" },
    { path: '/policies', component: Policies, name: 'Politiques de confidentialité' },
];