import { createRouter, createWebHistory } from "vue-router";
import { AuthServices } from "../stores/AuthService";
import ProductList from "../views/ProductList.vue";
import ProductView from "../views/ProductView.vue";
import CartProduct from "../views/CartProduct.vue";
import FullScreenSearch from "../views/FullScreenSearch.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

import RegisterUser from "../views/RegisterUser.vue";

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
            path: "/productslist/:id_category/:category",
            name: "ProductsList",
            component: ProductList,
            meta: {
                requiresAuth: false,
            },
        },
        {
            path: "/productView/:id_category/:category/:id",
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
            name: "RegisterUser",
            component: RegisterUser,
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
            name: "FullScreenSearch",
            component: FullScreenSearch,
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
    const authUser = AuthServices().userLogin;
    //check if the request is authenticated or not;
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };

    if (reqAuth && !authUser) {
        AuthServices()
            .checkLoginUser()
            .then(() => {
                if (!AuthServices().userLogin) {
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