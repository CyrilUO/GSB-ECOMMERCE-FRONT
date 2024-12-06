import landingPage from "@/views/medical-employee/LandingPage.vue";
import RedirectView from "@/views/medical-employee/RedirectView.vue";
import carouselProducts from "@/views/medical-employee/CarouselProducts.vue";
import productDetails from "@/views/medical-employee/ProductDetails.vue";
import cart from "@/views/medical-employee/Cart.vue";
import orderValidation from "@/views/medical-employee/OrderValidation.vue";

export const medicalEmployeeRoutes = [
    {
        path: '/medical-employee',
        name: 'Medical Employee',
        // meta: { requiresRole: "medical-employee" },

        component: RedirectView,
        redirect: '/medical-employee/landing-page',
        children: [
            { path: 'landing-page', component: landingPage, name: 'Landing Page' },
            { path: 'carousel-products', component: carouselProducts, name: 'PLP' },
            { path: 'product-details/:id', component: productDetails, name: 'PDP' },
            { path: 'cart', component: cart, name: 'Cart Page' },
            { path: 'order-validation', component: orderValidation, name: 'Order Validation' },
        ],
    },
];
