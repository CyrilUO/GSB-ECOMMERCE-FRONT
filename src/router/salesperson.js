import dashboardSalesperson from "@/views/salesperson/dashboardSalesperson.vue";
import dashboardCustomerMonitoring from "@/views/salesperson/dashboardCustomerMonitoring.vue";
import dashboardOrder from "@/views/salesperson/dashboardOrder.vue";

export const salespersonRoutes = [
    {
        path: '/salesperson',
        name: 'Salesperson Dashboard',
        meta: {
            authRequired: true,
            requestedRole: "salesperson"
        },
        component: dashboardSalesperson,
        redirect: '/salesperson/customer-monitoring',
        children: [
            {
                path: 'customer-monitoring',
                component: dashboardCustomerMonitoring,
                meta: {authRequired: true, requestedRole: "salesperson"}
            },
            {
                path: 'customer-order',
                component: dashboardOrder,
                meta: {authRequired: true, requestedRole: "salesperson"}
            },
        ],
    },
];
