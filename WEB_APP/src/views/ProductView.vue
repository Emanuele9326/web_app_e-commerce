<script setup>
import { useRoute, useRouter } from "vue-router";
import { storeProduct } from "../stores/StoreProduct.js";
import { AuthServices } from "../stores/AuthService";
import NavBar from "../components/NavBar.vue";
import GlobalFooter from "../components/GlobalFooter.vue";

const route = useRoute();
const router = useRouter();
let id = route.params.id;
let category = route.params.category;

const productStore = storeProduct();
productStore.productDetails(id);
const detail = productStore.detailproduct;

function addCart(id) {
  let user_login = AuthServices().user_login;

  if (user_login) {
    productStore.addToCart(id);
  } else {
    router.push("/login");
  }
}
</script>

<template>
  <NavBar />
  <div class="detailProduct">
    <div class="tipcategory">
      <h4 class="ms-3 fs-1 fw-bold">{{ category }}</h4>
      <p class="ms-3 pb-2 fs-5 fw-bold">
        Home ><router-link :to="'/productlist/' + category">{{ category }}</router-link>
      </p>
    </div>
    <div class="container description">
      <div class="row productPage">
        <div class="col-12 col-md-5 colimg">
          <img :src="detail.image" class="card-img-top img-fluid" alt="..." />
        </div>
        <div class="col-12 col-md-7">
          <div class="row">
            <div class="col-12 title">
              <h3 class="card-title m-2">{{ detail.name }}</h3>
            </div>
            <div class="col-12 price">
              <h5 class="card-text m-2">{{ detail.price }} €</h5>
            </div>
            <div class="col-12">
              <p class="card-text m-2">
                {{ detail.description }}
              </p>
            </div>

            <div class="col-12 d-grid gap-2 col-6">
              <button type="button" class="btn addcart my-3" @click="addCart(id)">
                <h5>Aggiungi al Carrello</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container date_product mt-5">
      <div class="fw-bold">Informazioni Aggiuntive</div>
      <div class="row row-cols-2 rowinf">
        <div class="col-4 browinf">Peso</div>
        <div class="col-8">{{ detail.quantity }} {{ detail.unit_of_measure }}</div>

        <div class="col-4 browinf">Produzione</div>
        <div class="col-8">Artigianale</div>
      </div>
    </div>
  </div>
  <GlobalFooter style="margin: 0px !important" />
</template>

<style lang="scss" scoped>
.detailProduct {
  display: block;
  padding-top: 1rem;

  .tipcategory {
    text-transform: capitalize;
    color: $secondary;
  }
  .description {
    .row {
      margin: 0;
    }
    .productPage {
      margin: auto;
      .colimg {
        text-align: center;
      }
    }
    .addcart {
      color: #fff;
      background-color: $My-Color-Theme-5-hex;
      border-color: $My-Color-Theme-5-hex;
      padding: 0.5em 0.5em;
      margin: auto;
    }
    .addcart h5 {
      margin: 0;
      font-size: 16px;
    }
    .btn:hover {
      color: #fff$My-Color-Theme-2-1-rgba !important ;
    }
    .btn-check:focus + .btn,
    .btn:focus {
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0);
    }
  }
  .rowinf {
    background-color: rgba($My-Color-Theme-2-hex, 0.5);

    .browinf {
      border-right: 2px solid $My-Color-Theme-5-hex;
    }
  }

  @media (min-width: 576px) {
    font-size: 17px;
    background: $My-Color-Theme-2-1-rgba;
    border-top: 2px solid $My-Color-Theme-5-hex;
    color: $secondary;
    height: 100%;
    padding-bottom: 2rem;
    .description {
      text-align: -webkit-center;
      margin-top: 2rem;
      .productPage {
        width: 100%;

        .colimg {
          padding: 0px;
        }
        color: $secondary;
        .card-img-top {
          width: max-content;
          height: auto;
          margin: auto;
          border-bottom: 2px solid $My-Color-Theme-5-hex;
        }
        .title {
          margin-top: 1rem;
          .card-title {
            text-align: start;
          }
        }

        .card-text {
          text-align: start;
        }
      }
    }

    .addcart {
      width: max-content;
      background-color: $My-Color-Theme-5-hex;
    }
  }

  /* Medium devices (tablets, 768px and up)*/
  @media (min-width: 768px) {
    .title {
      margin-top: 5rem;
    }
  }
}
</style>
