import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreProduct } from "./StoreProduct";

export const useProcesData = defineStore({
    id: "processedData",
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
            //items for chunk;
            const forChunk = 6;
            if (storeProduct.products.length > 6) {
                const result = storeProduct.products.reduce(
                    (resultArray, item, index) => {
                        const chunkIndex = Math.floor(index / forChunk);

                        if (!resultArray[chunkIndex]) {
                            // start a new chunk;
                            resultArray[chunkIndex] = [];
                        }
                        resultArray[chunkIndex].push(item);

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

        productDetails(Id) {
            useStoreProduct().products.forEach((element) => {
                if (element.id == Id) {
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
                const add_product = {
                    id: this.detailProduct.id,
                    product_code: this.uniqueCode(),
                    name: this.detailProduct.name,
                    image: this.detailProduct.image,
                    price: this.detailProduct.price,
                    quantity: 1,
                };
                storeProduct.cartItems.push(add_product);
            }

            storeProduct.updateTableCartitems();
        },
    },

    persist: true,
});