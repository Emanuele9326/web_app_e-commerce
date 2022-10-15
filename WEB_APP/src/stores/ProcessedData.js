import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreProduct } from "./StoreProduct";

export const useProcesData = defineStore({
    id: "procesData",
    state: () => ({
        productsBlock: ref([]),
        detailProduct: ref({}),
    }),
    getters: {
        // cart total without discount;
        cartTotalAmount: () => {
            return useStoreProduct()
                .cartItems.reduce((total, product) => {
                    return total + product.price * product.quantity;
                }, 0)
                .toFixed(2);
        },

        quantityProducts: () => {
            return useStoreProduct().cartItems.reduce(
                (quantityProductsCart, product) => {
                    return quantityProductsCart + product.quantity;
                },
                0
            );
        },
        // discounted price if items> 3;
        totalPriceDiscount: (state) => {
            let discountValue = (state.cartTotalAmount * 10) / 100;
            let discountedPrice = (state.cartTotalAmount - discountValue).toFixed(2);

            return discountedPrice;
        },
        divisionBlock: () => {
            const storeProduct = useStoreProduct();
            //items for block;
            const itemsforBlock = 6;
            if (storeProduct.products.length > 6) {
                const result = storeProduct.products.reduce(
                    (resultArray, item, index) => {
                        const blockIndex = Math.floor(index / itemsforBlock);

                        if (!resultArray[blockIndex]) {
                            // start a new block;
                            resultArray[blockIndex] = [];
                        }
                        resultArray[blockIndex].push(item);

                        return resultArray;
                    }, []
                );

                return result;
            } else {
                return [storeProduct.products];
            }
        },
    },
    actions: {
        singleBlock(id) {
            this.productsBlock = this.divisionBlock[id];
        },

        productDetails(id_product) {
            useStoreProduct().products.forEach((element) => {
                if (element.id == id_product) {
                    this.detailProduct = element;
                }
            });
        },

        //unique product code;
        uniqueCode() {
            return (
                performance.now().toString(36) + Math.random().toString(10)
            ).replace(/\./g, "");
        },

        //adds products to the cartItems array;

        addToCart(identifier) {
            const storeProduct = useStoreProduct();
            let cartProduct = storeProduct.cartItems.find(
                (product) => product.id == identifier
            );

            if (cartProduct) {
                cartProduct.quantity++;
            } else {
                const addProduct = {
                    id: this.detailProduct.id,
                    product_code: this.uniqueCode(),
                    name: this.detailProduct.name,
                    image: this.detailProduct.image,
                    price: this.detailProduct.price,
                    quantity: 1,
                };
                storeProduct.cartItems.push(addProduct);
            }

            storeProduct.updateTableCartitems();
        },
    },

    persist: true,
});