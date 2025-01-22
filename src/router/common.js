import LoginPage from "@/views/LoginPage.vue";
import Logout from "@/views/Logout.vue";
import CGU from "@/components/common/CGU.vue";
import Policies from "@/components/common/Policies.vue";
import LoginSuccess from "@/views/LoginSuccess.vue";

export const commonRoutes = [
    { path: '/', redirect: '/login', meta : {authRequired : false}},
    { path: '/login', component: LoginPage, name: 'Login Page', meta : {authRequired : false} },
    { path: '/logout', component: Logout, name: 'Logout Page' , meta : {authRequired : true}},
    { path: '/login-success', component: LoginSuccess, name: 'Login Success', meta : {authRequired : true} },
    { path: '/cgu', component: CGU, name: "Conditions générales d'utilisation", meta : {authRequired : false} },
    { path: '/policies', component: Policies, name: 'Politiques de confidentialité', meta : {authRequired : false} },
];
