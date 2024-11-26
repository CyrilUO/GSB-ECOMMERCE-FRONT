import dashboardAdmin from "@/views/admin/dashboardAdmin.vue";
import dashboardDatanalytics from "@/views/admin/dashboardDatanalytics.vue";
import dashboardManageUsers from "@/views/admin/dashboardManageUsers.vue";
import dashboardAddUsers from "@/views/admin/dashboardAddUsers.vue";
import dashboardManageProducts from "@/views/admin/dashboardManageProducts.vue";
import dashboardAddProduct from "@/views/admin/dashboardAddProduct.vue";

export const adminRoutes = [
    {
        path: '/admin',
        name: 'Admin Dashboard',
        component: dashboardAdmin,
        redirect: '/admin/dashboard_analytics',
        children: [
            { path: 'dashboard_analytics', component: dashboardDatanalytics },
            { path: 'manage_users', component: dashboardManageUsers },
            { path: 'add_users', component: dashboardAddUsers },
            { path: 'manage_products', component: dashboardManageProducts },
            { path: 'add_products', component: dashboardAddProduct },
        ],
    },
];
