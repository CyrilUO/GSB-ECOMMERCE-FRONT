import dashboardSalesperson from "@/views/salesperson/dashboardSalesperson.vue";
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
        redirect: '/salesperson/customer-monitoring', // Route par défaut
        children: [
            {
                path: 'customer-monitoring',
                name: 'CustomerMonitoring',
                component: dashboardOrder,
                meta: { authRequired: true, requestedRole: "salesperson" }
            },
            // Vous pourrez ajouter d'autres routes enfants ici, par exemple :
            // {
            //   path: 'customer-order',
            //   name: 'CustomerOrder',
            //   component: dashboardAnotherComponent,
            //   meta: { authRequired: true, requestedRole: "salesperson" }
            // },
        ]
    }
];
