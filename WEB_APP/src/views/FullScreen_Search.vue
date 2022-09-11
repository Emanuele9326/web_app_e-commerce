<script setup>
import { useRouter } from "vue-router";
import { storeProduct } from "../stores/StoreProduct";
import instanceAxios from "../http/instanceAxios";
import { ref } from "vue";

const router = useRouter();

const productStore = storeProduct();
const products = ref([]);

const resultsearch = ref([]);
const input = ref("");
const input_category = ref("");

function closeSearch() {
  router.back();
}

async function searchProduct(category) {
  document.getElementById("product").removeAttribute("disabled");

  let cat = category.toLowerCase();

  productStore.getProducts(category);

  await instanceAxios.axiosInstance.get("/api/listproduct/" + cat).then((response) => {
    products.value = response.data;
  });
}

function filteredList(input) {
  let results = products.value.filter((product) =>
    product.name.toLowerCase().includes(input.toLowerCase())
  );
  resultsearch.value = results;
}

function detailProduct(category, id_product) {
  productStore.getCategories(category);
  router.push({ name: "ProductView", params: { category: category, id: id_product } });
}
</script>

<template>
  <div id="myOverlay" class="overlay overflow-auto">
    <div class="header_search">
      <span class="logo"
        ><img src="../assets/logo1.jpg" class="rounded mx-auto d-block"
      /></span>
      <span class="closebtn" @click="closeSearch()" title="Close Overlay">×</span>
    </div>

    <div class="overlay-content">
      <form>
        <div class="container row m-auto">
          <div class="col-12">
            <select
              class="form-select category"
              aria-label="Default select example"
              v-model="input_category"
              @change="searchProduct(input_category)"
            >
              <option disabled value="">Seleziona una categoria</option>
              <option>Pasta</option>
              <option>Vini</option>
              <option>Confetture</option>
              <option>Biscotti</option>
            </select>
          </div>
          <div class="col-12 mt-3">
            <input
              disabled
              type="text"
              id="product"
              v-model="input"
              @input="filteredList(input)"
              placeholder="Orechiette.."
              name="search"
            />
          </div>
        </div>
      </form>
      <div class="result">
        <div
          class="row p-0 my-3 mx-0 group"
          style="display: inline color: #fff; width: 100%; height: 100%"
          v-for="item in resultsearch"
          :key="item.id"
        >
          <div class="col col-sm-3 p-0 my-3">
            <img class="imgscr" :src="item.image" />
          </div>
          <div class="col col-sm-9 p-0">
            <div class="row row_name m-0 mt-5">
              <div class="col p-0">
                <div @click="detailProduct(input_category, item.id)">
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  display: block;
  width: 100%;
  background: $My-Color-Theme-2-v2-rgba;

  .header_search {
    display: block;
    width: 100%;
    background-color: #fff;
  }
  .overlay-content {
    display: block;

    width: 100%;
    height: 100vh;
    padding-top: 3rem;
    text-align: center;

    .category {
      width: 80%;
      margin: auto;
    }
    #product {
      width: 80%;
      border-radius: 0.375rem;
      padding: 0.5rem;
    }
  }

  .closebtn {
    position: absolute;
    top: -10px;
    right: 20px;
    font-size: 60px;
    cursor: pointer;
    color: $My-Color-Theme-1-hex;
  }

  .closebtn:hover {
    color: $My-Color-Theme-1-hex;
  }
  button {
    float: left;
    width: 20%;
    padding: 15px;
    background: #ddd;
    font-size: 17px;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #bbb;
  }
  .imgscr {
    width: 70%;
  }
  .result {
    width: 85%;
    text-align: start;
    margin-top: 2.5rem;
    font-size: large;
    margin: 10px;
  }

  #myOverlay .row_name {
    margin-top: 2rem !important;
  }

  .result a {
    color: #fff;
    cursor: pointer;
  }

  /* Medium devices (tablets, 768px and up)*/
  @media (min-width: 768px) {
    .result {
      margin-top: 2.5rem;
      margin-left: 5rem;
      font-size: x-large;
    }
  }
}
</style>
