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
        meta: { requiresRole: "admin" },
        component: dashboardAdmin,
        redirect: '/admin/dashboard-analytics',
        children: [
            { path: 'dashboard-analytics', component: dashboardDatanalytics },
            { path: 'manage-users', component: dashboardManageUsers },
            { path: 'add-users', component: dashboardAddUsers },
            { path: 'manage-products', component: dashboardManageProducts },
            { path: 'add-products', component: dashboardAddProduct },
        ],
    },
];
