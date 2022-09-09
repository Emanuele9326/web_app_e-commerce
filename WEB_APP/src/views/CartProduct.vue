<script setup>
import { storeProduct } from "../stores/StoreProduct";
import { AuthServices } from "../stores/AuthService";
import { useRouter } from "vue-router";
import GlobalFooter from "../components/GlobalFooter.vue";
import {watch} from "vue";




const auth = AuthServices();

const storeproduct = storeProduct();
const cartItem= storeproduct.cartItems;
const router= useRouter();

watch(
  ()=>storeproduct.quantityProducts,
  ()=>{
    storeproduct.updateTableCartitems();
  }
)

function removeCart_item(id) {
  let i = cartItem.findIndex((item) => item.id == id);
  let obj = cartItem[i];

  let payload = {
    user_cart_id: auth.user_id,
    product_code: obj.product_code,
  };

  storeproduct.removeCartItems(payload);

  cartItem.splice(i, 1);
  if (storeproduct.quantityProducts < 4) {
    storeproduct.cartTotalAmount;
  } else {
    storeproduct.totalPriceDiscount;
  }
}

//calculate the total price for each product
function totalitem(art) {
  let total = (art.price * art.quantity).toFixed(2);
  return total;
}


</script>

<template>
  <div class="p-0 cart_prod">
    <div class="row m-auto mb-4 cart_title">
      <div class="col  row_left">
        <router-link to="/">
        <img src="../assets/logo1.jpg" class="logo" style="width: 280px"
        /></router-link>
      </div>
    
    </div>
    <div class="container container_items text-center">
      <div
        class="row row_item justify-content-center mb-3 mx-0 w-100"
        v-for="item in cartItem"
        :key="item.id"
      >
        <div class="col col-sm-3 img m-auto">
       
        <img :src="item.image" class="img-thumbnail m-auto" />
          
          
        </div>
        <div class="col-6 col-sm-7 p-0 me-auto">
          <div class="container text-center">
            <div class="row row-cols-1 w-100 m-auto">
              <div class="col text-start">
                <h4 class="mt-2 fs-3">{{ item.name }}</h4>
              </div>

              <div class="col">
                <div class="row w-100 align-items-center">
                  <div class="col">
                    <div
                      class="btn-toolbar justify-content-center"
                      role="toolbar"
                      aria-label="Toolbar with button groups"
                    >
                      <div
                        class="btn-group ms-1 my-3"
                        role="group"
                        aria-label="First group"
                      >
                        <button
                          type="button"
                          @click="item.quantity++"
                          class="btn btn-primary plus_less"
                        >
                          +
                        </button>
                        <div>{{ item.quantity }}</div>
                        <button
                          type="button"
                          @click="item.quantity > 1 ? item.quantity-- : ''"
                          class="btn btn-primary plus_less less"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col p-0">
                    <div class="my-1 fs-5">{{ totalitem(item) }}€</div>
                  </div>
                </div>
              </div>
              <div class="col mb-3 fw-bold text-start">
                <a class="fs-6 ps-2" @click="removeCart_item(item.id)">Rimuovi</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="row totalprice container w-100"
        v-if="storeproduct.quantityProducts < 4"
      >
        <h2 class="offset">Totale: {{ storeproduct.cartTotalAmount }}€</h2>
      </div>
      <div class="row totalprice w-100" v-else>
        <h3 class="offset">{{ storeproduct.cartTotalAmount }}€</h3>
        <h4 class="offset">- 10%</h4>
        <h2 class="offset">Totale: {{ storeproduct.totalPriceDiscount }}€</h2>
      </div>
      <div class="row py-4 mx-0 justify-content-center w-100" style="text-align: center">
        <div class="col">
          <button class="btn check-out fs-3 justify-content-center">
            Procedi all'ordine
          </button>
        </div>
      </div>
    </div>
    <global-footer />
  </div>
</template>

<style lang="scss" scoped>
.cart_prod {
  font-size: 18px !important;
  .row_left {
    margin: auto;
  }
  //////
  .img-thumbnail {
    padding: 0.25rem;
    background-color: #fff;
    border: none !important;
    border-radius: 0rem !important;
    max-width: 100%;
    height: auto;
  }
  .fs-3 {
    font-size: cart_font_size_3() !important;
  }
  .fs-5 {
    font-size: cart_font_size_4() !important;
  }
  ////////
  .cart_title {
    border-bottom: 2px solid $My-Color-Theme-4-hex;
  }

  .container_items {
    .row_item {
      background-color: $My-Color-Theme-2-1-rgba;
    }
  }
  .check-out {
    width: 100%;
    background-color: #ada955;
    border-color: #ada955;
    color: #fff;
    font-weight: bold;
  }

  .btn-group div {
    padding: 0.5rem;
  }
  .plus_less {
    --bs-btn-padding-y: 0.25rem;
    --bs-btn-padding-x: 0.5rem;
    --bs-btn-font-size: 0.75rem;
    --bs-btn-border-radius: 50%;
    font-weight: bold;
    font-size: small;
    background-color: $My-Color-Theme-5-hex;
  }

  .less {
    padding-left: 8px;
  }
  .totalprice {
    text-align: end;
  }

  .btn-secondary:hover {
    color: #fff !important;
    background-color: $My-Color-Theme-5-hex;
    border-color: $My-Color-Theme-5-hex;
  }

  @media (min-width: 320px) {
    .row_left {
      text-align: center;
      margin: auto;
    }
    
    .plus_less {
      padding: 10px 10px;
    }
    .less {
      padding-left: 10px;
    }
    .btn-group span {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
  }

  @media (min-width: 576px) {
    .cart_title {
      width: 100%;
    }
  
    .img-thumbnail {
      max-width: 70%;
    }

    .totalprice {
      text-align: end;
    }
  }
  /* Medium devices (tablets, 768px and up)*/
  @media (min-width: 768px) {
    .container_items {
      .img-thumbnail {
        max-width: 45%;
      }
    }
  }
}
</style>
