import { createRouter, createWebHistory } from "vue-router";
import { AuthServices } from "../stores/AuthService";
import ProductList from "../views/ProductList.vue";
import ProductView from "../views/ProductView.vue";
import CartProduct from "../views/CartProduct.vue";
import FullScreen_Search from "../views/FullScreen_Search.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

import RegisterForm from "../views/RegisterForm.vue";

import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "HomeView",
            component: HomeView,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/productlist/:category",
            name: "ProductList",
            component: ProductList,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/productView/:category/:id",
            name: "ProductView",
            component: ProductView,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/cartProduct",
            name: "CartProduct",
            component: CartProduct,
            meta: {
                requiresAuth: true,
            },
        },

        {
            path: "/login",
            name: "LoginView",
            component: LoginView,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/register",
            name: "RegisterForm",
            component: RegisterForm,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/forgotpassword",
            name: "ForgotPassword",
            component: ForgotPassword,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/reset-password/:token?",
            name: "ResetPassword",
            component: ResetPassword,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/search",
            name: "FullScreen_Search",
            component: FullScreen_Search,
            meta: {
                requiresAuth: false,
            },
        },
    ],
});

//Navigation Guards;
router.beforeEach((to, from, next) => {
    //verifies if the user is authenticated or not;
    //authUser = boolean;
    const authUser = AuthServices().user_login;
    //check if the request is authenticated or not;
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };

    if (reqAuth && !authUser) {
        AuthServices()
            .checkLoginUser()
            .then(() => {
                if (!AuthServices().user_login) {
                    next(loginQuery.path);
                } else {
                    next();
                }
            });
    } else {
        next();
    }
});

export default router;