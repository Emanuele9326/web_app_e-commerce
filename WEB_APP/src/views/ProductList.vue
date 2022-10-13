<script setup>
import { useProcesData } from "../stores/ProcessedData";
import { useStoreProduct } from "../stores/StoreProduct.js";
import { useRoute } from "vue-router";
import { watch } from "vue";
import NavBar from "../components/NavBar.vue";
import ProductBlock from "../components/ProductBlock.vue";

const route = useRoute();
const productStore = useStoreProduct();
const processData = useProcesData();
let category = route.params.category;
let idCategory = route.params.id_category;
const parameter = [category, idCategory];
productStore.getProducts(idCategory);

processData.singleBlock(0);

watch(
  () => category,

  () => {
    processData.productsBlock = processData.divisionBlock[0];
  }
);

//block "tipcategory";
const regex = /\//gi;
const regex2 = /Productslist/i;
let sost = route.fullPath.replace(regex2, "Lista Prodotti").split("/");
let string = "/" + sost[1] + "/" + sost[3];
let fullpath = string.replace(regex, ">");
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
      <ProductBlock :parameters="parameter" />
      <nav class="container">
        <ul class="pagination justify-content-center">
          <li
            class="page-item"
            v-for="(item, id) in processData.divisionBlock"
            :key="id"
          >
            <span class="page-link" @click="processData.singleBlock(id)">
              {{ id + 1 }}
            </span>
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

  .page-link {
    color: $secondary;
  }
  .pagination {
    --bs-pagination-focus-bg: $My-Color-Theme-2-1-rgba;
    --bs-pagination-focus-box-shadow: $My-Color-Theme-2-1-rgba;
    cursor: pointer;
  }
}
</style>
