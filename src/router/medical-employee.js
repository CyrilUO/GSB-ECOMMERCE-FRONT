import landingPage from "@/views/medical-employee/LandingPage.vue";
import RedirectView from "@/views/medical-employee/RedirectView.vue";
import carouselProducts from "@/views/medical-employee/CarouselProducts.vue";
import productDetails from "@/views/medical-employee/ProductDetails.vue";
import cart from "@/views/medical-employee/Cart.vue";
import orderValidation from "@/views/medical-employee/OrderValidation.vue";
import orderList from "@/views/medical-employee/OrderList.vue";

export const medicalEmployeeRoutes = [
    {
        path: "/medical-employee",
        name: "Medical Employee",
        meta: {
            authRequired: true,
            requestedRole: "medical-employee",
        },
        component: RedirectView,
        redirect: "/medical-employee/landing-page",
        children: [
            {
                path: "landing-page",
                component: landingPage,
                name: "Landing Page",
                meta: {
                    authRequired: true,
                    requestedRole: "medical-employee",
                },
            },
            {
                path: "carousel-products",
                component: carouselProducts,
                name: "PLP",
                meta: {
                    authRequired: true,
                    requestedRole: "medical-employee",
                },
            },
            {
                path: "product-details/:id",
                component: productDetails,
                name: "PDP",
                meta: {
                    authRequired: true,
                    requestedRole: "medical-employee",
                },
            },
            {
                path: "cart",
                component: cart,
                name: "Cart Page",
                meta: {
                    authRequired: true,
                    requestedRole: "medical-employee",
                },
            },
            {
                path: "order-validation/:orderId",
                component: orderValidation,
                name: "Order Validation",
                meta: {
                    authRequired: true,
                    requestedRole: "medical-employee",
                },
            },
            {
                path: "order-list",
                component: orderList,
                name: "Order List",
                meta: {
                    authRequired: true,
                    requestedRole: "medical-employee",
                },
            },
        ],
    },
];
