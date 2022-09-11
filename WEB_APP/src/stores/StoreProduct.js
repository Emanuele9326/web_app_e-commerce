import { defineStore } from "pinia";
import instanceAxios from "../http/instanceAxios";
import { AuthServices } from "./AuthService";
import { ref } from "vue";

export const storeProduct = defineStore({
    id: "storeproduct",
    state: () => ({
        user_id: ref(""),
        user_login: ref(false),

        categories: [],
        products: [],
        productsBlock: [],
        detailproduct: {},

        number_block: [],

        cartItems: [],
    }),

    getters: {
        // cart total without discount;
        cartTotalAmount: (state) => {
            return state.cartItems
                .reduce((total, product) => {
                    let totalPriceint = total + product.price * product.quantity;

                    return totalPriceint;
                }, 0)
                .toFixed(2);
        },

        //quantity of products in the cart;
        quantityProducts: (state) => {
            return state.cartItems.reduce((quantityProductsCart, product) => {
                return quantityProductsCart + product.quantity;
            }, 0);
        },

        // discounted price if items> 3;
        totalPriceDiscount: (state) => {
            let discountValue = (state.cartTotalAmount * 10) / 100;
            let discountedPrice = (state.cartTotalAmount - discountValue).toFixed(2);

            return discountedPrice;
        },
    },

    actions: {
        authuser() {
            this.user_login = AuthServices().user_login;

            this.user_id = AuthServices().user_id;
        },

        async getCategories() {
            try {
                await instanceAxios.axiosInstance
                    .get("/api/category")
                    .then((response) => {
                        this.categories = response.data;

                        this.products.length !== 0 ? (this.products = []) : "";
                        this.productsBlock.length !== 0 ? (this.productsBlock = []) : "";
                        this.number_block.length !== 0 ? (this.number_block = []) : "";
                    });
            } catch (error) {
                console.error(error);
            }
        },

        //splits the products array into blocks of 'n' (n = 6) elements;
        divisionProducts() {
            //number of blocks based on the number of products;
            let float_number_block = this.products.length / 6;

            let number_block = Math.floor(float_number_block);

            //number product for block;
            let numberitems_forblock = Math.floor(
                this.products.length / number_block
            );

            let numberitems_forblock_2 = [];
            let number_product = this.products.length;

            for (let i = 0; i < number_block; i++) {
                number_product = number_product - numberitems_forblock;
                if (number_product !== 0) {
                    if (i == number_block - 1) {
                        numberitems_forblock_2.push(number_product);
                    } else {
                        numberitems_forblock_2.push(numberitems_forblock);
                    }
                } else {
                    numberitems_forblock_2.push(numberitems_forblock);
                }
            }

            //each element in "number_block" is the number of products for each block;
            this.number_block = numberitems_forblock_2;
        },

        itemsPage(number, beforenumber) {
            //number= number of products for the current block;
            //beforenumber= number of products for the previous block;
            //productsBlock : contains the products for each single block;

            if (this.productsBlock.length !== 0) {
                this.productsBlock = [];
            }

            //"beforenumber = 0" : it means that we have only one block of "n" products or it is in the first block;
            if (!beforenumber) {
                for (let i = 0; i < number; i++) {
                    this.productsBlock.push(this.products[i]);
                }
            } else {
                let ind = +beforenumber;

                for (let i = ind; i < ind + number; i++) {
                    this.productsBlock.push(this.products[i]);
                }
            }
        },

        async getProducts(category) {
            await instanceAxios.axiosInstance
                .get("/api/listproduct/" + category)
                .then((response) => {
                    let listproducts = response.data;

                    this.products = listproducts;

                    this.divisionProducts();

                    this.itemsPage(this.number_block[0], 0);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        productDetails(Id) {
            this.products.forEach((element) => {
                if (element.id == Id) {
                    this.detailproduct = element;
                }
            });
        },

        async getCartItems(user_id) {
            try {
                await instanceAxios.axiosInstance
                    .get("/api/getcartitems/" + user_id)
                    .then((response) => {
                        this.cartItems = response.data;
                    });
            } catch (error) {
                console.error(error);
            }
        },

        //adds products to the cart_items table;
        async cartsItems(payload) {
            try {
                await instanceAxios.axiosInstance.post("/api/addcartitems", payload);
            } catch (error) {
                let error_status = error.response.status;
                if (error_status == 401) {
                    // window.location.replace('/login')
                }

            }
        },

        //unique product code;
        unique_code() {
            return (
                performance.now().toString(36) + Math.random().toString(10)
            ).replace(/\./g, "");
        },

        //updates the cart_items table;
        updateTableCartitems() {
            this.authuser();

            let cart = [];

            this.cartItems.forEach((element) => {
                cart.push({
                    user_id: this.user_id,
                    product_code: element.product_code,
                    product_id: element.id,
                    quantity: element.quantity,
                });
            });

            this.cartsItems(cart);
        },

        //adds products to the cartItems array;

        addToCart(identifier) {
            let cartProduct = this.cartItems.find(
                (product) => product.id == identifier
            );

            if (cartProduct) {
                cartProduct.quantity++;
            } else {
                const add_product = {
                    id: this.detailproduct.id,
                    product_code: this.unique_code(),
                    name: this.detailproduct.name,
                    image: this.detailproduct.image,
                    price: this.detailproduct.price,
                    quantity: 1,
                };
                this.cartItems.push(add_product);
            }

            if (this.quantityProducts < 4) {
                this.cartTotalAmount;
            } else {
                this.totalPriceDiscount;
            }

            this.updateTableCartitems();
        },

        async removeCartItems(payload) {
            try {
                await instanceAxios.axiosInstance.post("/api/removecartitems", payload);
            } catch (error) {
                console.error(error);
            }
        },
    },

    persist: true,
});