<script setup>
import { useStoreProduct } from "../stores/StoreProduct";

const storeProduct = useStoreProduct();
const cartItem = storeProduct.cartItems;

function removeCartItem(id) {
  let i = cartItem.findIndex((item) => item.id == id);
  let obj = cartItem[i];

  let idProduct = obj.product_code;

  storeProduct.removeCartItems(idProduct);
  cartItem.splice(i, 1);
}
//calculate the total price for each product
function totalItem(art) {
  let total = (art.price * art.quantity).toFixed(2);
  return total;
}
</script>
<template>
  <div
    class="row row_item justify-content-center mb-3 mx-0 w-100"
    v-for="item in storeProduct.cartItems"
    :key="item.id"
  >
    <div class="col col-sm-3 img m-auto">
      <img :src="item.image" class="img-thumbnail m-auto" />
    </div>
    <div class="col-6 col-sm-7 p-0 me-auto">
      <div class="container text-center">
        <div class="row row-cols-1 w-100 m-auto">
          <div class="col text-start">
            <h4 class="mt-2 font-size-3">{{ item.name }}</h4>
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
                <div class="my-1 font-size-4">{{ totalItem(item) }}€</div>
              </div>
            </div>
          </div>
          <div class="col mb-3 fw-bold text-start">
            <a class="fs-6 ps-2" @click="removeCartItem(item.id)">Rimuovi </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.img-thumbnail {
  padding: 0.25rem;
  background-color: #fff;
  border: none !important;
  border-radius: 0rem !important;
  max-width: 100%;
  height: auto;
}

.row_item {
  background-color: $My-Color-Theme-2-1-rgba;
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

@media (min-width: 320px) {
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
  .img-thumbnail {
    max-width: 100%;
  }
}
/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {
  .img-thumbnail {
    max-width: 60%;
  }
}
</style>
