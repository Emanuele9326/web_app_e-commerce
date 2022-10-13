<script setup>
import { useStoreProduct } from "../stores/StoreProduct";
import { useProcesData } from "../stores/ProcessedData";
import { watch } from "vue";
import CartItem from "../components/CartItem.vue";
import GlobalFooter from "../components/GlobalFooter.vue";

const storeProduct = useStoreProduct();
const proccesData = useProcesData();

watch(
  () => proccesData.quantityProducts,
  () => {
    storeProduct.updateTableCartitems();
  }
);
</script>

<template>
  <div class="p-0 cart_prod">
    <div class="row m-auto mb-4 cart_title">
      <div class="col row_left">
        <router-link to="/">
          <img src="../assets/logo1.jpg" class="logo" style="width: 280px"
        /></router-link>
      </div>
    </div>
    <div class="container container_items text-center">
      <CartItem />

      <div
        class="row totalprice container w-100"
        v-if="proccesData.quantityProducts < 4"
      >
        <h2 class="offset">Totale: {{ proccesData.cartTotalAmount }}€</h2>
      </div>
      <div class="row totalprice w-100" v-else>
        <h3 class="offset">{{ proccesData.cartTotalAmount }}€</h3>
        <h4 class="offset">- 10%</h4>
        <h2 class="offset">Totale: {{ proccesData.totalPriceDiscount }}€</h2>
      </div>
      <div
        class="row py-4 mx-0 justify-content-center w-100"
        style="text-align: center"
      >
        <div class="col">
          <button class="btn check-out fs-4 justify-content-center">
            Procedi all'ordine
          </button>
        </div>
      </div>
    </div>
    <GlobalFooter />
  </div>
</template>

<style lang="scss" scoped>
.cart_prod {
  font-size: 18px !important;
  .row_left {
    margin: auto;
  }

  .cart_title {
    border-bottom: 2px solid $My-Color-Theme-4-hex;
  }

  .check-out {
    width: 100%;
    background-color: #ada955;
    border-color: #ada955;
    color: #fff;
    font-weight: bolder;
  }
  .totalprice {
    text-align: end;
  }

  @media (min-width: 320px) {
    .row_left {
      text-align: center;
      margin: auto;
    }
  }
}
</style>
