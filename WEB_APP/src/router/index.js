import { createRouter, createWebHistory } from 'vue-router'
import { AuthServices } from '../stores/AuthService'
import ProductList from '../views/ProductList.vue'
import ProductView from '../views/ProductView.vue'
import CartProduct from '../views/CartProduct.vue'
import FullScreen_Search from '../views/FullScreen_Search.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

import RegisterForm from '../views/RegisterForm.vue'

import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'HomeView',
            component: HomeView,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/productlist/:category',
            name: 'ProductList',
            component: ProductList,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/productView/:category/:id',
            name: 'ProductView',
            component: ProductView,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/cartProduct',
            name: 'CartProduct',
            component: CartProduct,
            meta: {
                requiresAuth: true

            }
        },

        {
            path: '/login',
            name: 'LoginView',
            component: LoginView,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/register',
            name: 'RegisterForm',
            component: RegisterForm,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/forgotpassword',
            name: 'ForgotPassword',
            component: ForgotPassword,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/reset-password/:token?',
            name: 'ResetPassword',
            component: ResetPassword,
            meta: {
                requiresAuth: false

            }
        },
        {
            path: '/search',
            name: 'FullScreen_Search',
            component: FullScreen_Search,
            meta: {
                requiresAuth: false

            }
        },


    ]
})

router.beforeEach((to, from, next) => {

    //verifica utente autenticato oppure no
    const authUser = AuthServices().user_login; //boolean
    //contralla sè la richesta è autenticata oppure no
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
    console.log(authUser)

    if (reqAuth && !authUser) {
        //console.log(AuthServices().user_login);
        AuthServices().checkLoginUser().then(() => {
            if (!AuthServices().user_login) {
                next(loginQuery.path);
            } else {
                next();
            }
        });
    } else {
        next(); // make sure to always call next()!
    }

})

export default router