<script setup>
import { storeProduct } from "../stores/StoreProduct.js";
import { useRoute } from "vue-router";
import NavBar from "../components/NavBar.vue";

const route = useRoute();

let category = route.params.category;

/**** */
//block "tipcategory";

const regex = /\//gi;
const regex2 = /Productlist/i;
let sost = route.fullPath.replace(regex2, "Lista Prodotti");

let fullpath = sost.replace(regex, ">");
/**** */

const productStore = storeProduct();
productStore.getProducts(category);

productStore.divisionProducts();
const numberblock = productStore.number_block;

productStore.itemsPage(numberblock[0], 0);
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <div class="productlist">
      <div class="tipcategory">
        <h4 class="ms-3 pt-5 fs-1 fw-bold">{{ category }}</h4>
        <p class="ms-3 pb-5 fs-6 fw-bold"><a href="/">Home</a>{{ fullpath }}</p>
      </div>

      <div class="items">
        <div class="container">
          <div class="row row-cols-2">
            <div
              class="col-12 col-sm-6 col-md-4 colcard"
              v-for="(item, id) in productStore.productsBlock"
              :key="id"
              data-test="card_product"
            >
              <router-link
                :to="{
                  name: 'ProductView',
                  params: { id: item.id },
                }"
              >
                <div class="card">
                  <img
                    :src="item.image"
                    class="card-img-top"
                    alt="..."
                    style="width: 100%"
                  />
                  <div class="card-body">
                    <ul class="m-auto p-0" style="list-style: none">
                      <li class="title-product">{{ item.name }}</li>
                      <li>{{ item.price }} €</li>
                    </ul>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav class="container">
        <ul class="pagination justify-content-center">
          <li class="page-item" v-for="(item, id) in productStore.number_block" :key="id">
            <span
              class="page-link"
              @click="productStore.itemsPage(item, productStore.number_block[id - 1])"
              >{{ id + 1 }}</span
            >
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.productlist {
  .tipcategory {
    text-transform: capitalize;
    background-color: $My-Color-Theme-2-1-rgba;
    color: $secondary;
  }

  .items {
    width: 100%;
    height: 100%;
    padding: 0%;
    text-align: -webkit-center;

    .card {
      background-color: #fff;
      background-clip: border-box;
      margin-bottom: 1rem;
      border: none;
      margin-top: 1rem;
      .card-body {
        .title-product {
          font-size: 19px;
          color: $secondary;
        }

        .price {
          h4 {
            color: $tertiary;
          }
        }
      }
    }
  }
  .page-link {
    color: $secondary;
  }
  .pagination {
    --bs-pagination-focus-bg: $My-Color-Theme-2-1-rgba;
    --bs-pagination-focus-box-shadow: $My-Color-Theme-2-1-rgba;
    cursor: pointer;
  }
  @media (min-width: 300px) {
    .card-body {
      .title-product {
        font-size: 10px;
      }

      .price {
        h4 {
          color: $tertiary;
        }
      }
    }
  }
}
</style>
