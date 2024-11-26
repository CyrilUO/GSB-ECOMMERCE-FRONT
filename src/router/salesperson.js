import dashboardSalesperson from "@/views/salesperson/dashboardSalesperson.vue";
import dashboardCustomerMonitoring from "@/views/salesperson/dashboardCustomerMonitoring.vue";
import dashboardOrder from "@/views/salesperson/dashboardOrder.vue";

export const salespersonRoutes = [
    {
        path: '/salesperson',
        name: 'Salesperson Dashboard',
        component: dashboardSalesperson,
        redirect: '/salesperson/customer_monitoring',
        children: [
            { path: 'customer_monitoring', component: dashboardCustomerMonitoring },
            { path: 'customer_order', component: dashboardOrder },
        ],
    },
];
