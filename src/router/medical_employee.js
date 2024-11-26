import landingPage from "@/views/medical_employee/LandingPage.vue";
import carouselProducts from "@/views/medical_employee/CarouselProducts.vue";
import productDetails from "@/views/medical_employee/ProductDetails.vue";
import cart from "@/views/medical_employee/Cart.vue";
import orderValidation from "@/views/medical_employee/OrderValidation.vue";

export const medicalEmployeeRoutes = [
    {
        path: '/medical_employee',
        name: 'Welcome Page',
        redirect: '/medical_employee/landing_page',
        children: [
            { path: 'landing_page', component: landingPage, name: 'Welcome Page' },
            { path: 'carousel_products', component: carouselProducts, name: 'PLP' },
            { path: 'product_details', component: productDetails, name: 'PDP' },
            { path: 'cart', component: cart, name: 'Cart Page' },
            { path: 'order_validation', component: orderValidation, name: 'Order Validation' },
        ],
    },
];
