import { defineStore } from "pinia";
import { AuthServices } from "./AuthService";
import { useProcesData } from "./ProcessedData";
import instanceAxios from "../http/instanceAxios";

export const useStoreProduct = defineStore({
    id: "storeProduct",
    state: () => ({
        categories: {},
        products: [],
        cartItems: [],
    }),

    actions: {
        //category;
        async getCategories() {
            try {
                await instanceAxios.axiosInstance
                    .get("/api/categories")
                    .then((response) => {
                        this.categories = response.data;
                        if (this.products.length !== 0) {
                            this.products = [];
                        }
                        if (useProcesData().productsBlock.length !== 0) {
                            useProcesData().productsBlock = [];
                        }
                    });
            } catch (error) {
                console.error(error);
            }
        },
        //products by category;
        async getProducts(idCategory) {
            await instanceAxios.axiosInstance
                .get("/api/categories/" + idCategory + "/products")
                .then((response) => {
                    this.products = response.data;
                    useProcesData().singleBlock(0);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        //products in the cart for the authenticated user;
        async getCartItems() {
            try {
                await instanceAxios.axiosInstance.get("/api/cart").then((response) => {
                    this.cartItems = response.data;
                });
            } catch (error) {
                console.error(error);
            }
        },

        //adds products to the cart_items table;
        async cartsItems(payload) {
            try {
                await instanceAxios.axiosInstance.post("/api/cart", payload);
            } catch (error) {
                console.error(error);
            }
        },
        //updates the cart_items table;
        updateTableCartitems() {
            let cart = [];

            this.cartItems.forEach((element) => {
                cart.push({
                    user_id: AuthServices().userId,
                    product_code: element.product_code,
                    product_id: element.id,
                    quantity: element.quantity,
                });
            });

            this.cartsItems(cart);
        },

        //removes products from the cart;
        async removeCartItems(idProduct) {
            try {
                await instanceAxios.axiosInstance.delete("/api/cart/" + idProduct);
            } catch (error) {
                console.error(error);
            }
        },
    },

    persist: true,
});