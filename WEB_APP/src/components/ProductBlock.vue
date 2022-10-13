<script setup>
import { ref } from "vue";
import { useProcesData } from "../stores/ProcessedData";

const processData = useProcesData();
const props = defineProps(["parameters"]);
const category = ref(props.parameters[0]);
const idCategory = ref(props.parameters[1]);
</script>

<template>
  <div class="items">
    <div class="container">
      <div class="row row-cols-2">
        <div
          class="col-12 col-sm-6 col-md-4 colcard"
          v-for="(item, id) in processData.productsBlock"
          :key="id"
          data-test="card_product"
        >
          <div class="card position-relative">
            <img
              :src="item.image"
              class="card-img-top"
              alt="..."
              style="width: 100%"
            />
            <div class="card-body">
              <router-link
                class="stretched-link"
                :to="{
                  name: 'ProductView',
                  params: {
                    id_category: idCategory,
                    category: category,
                    id: item.id,
                  },
                }"
              >
                <ul class="m-auto p-0" style="list-style: none">
                  <li class="title-product">
                    {{ item.name }}
                  </li>
                  <li>{{ item.price }} €</li>
                </ul>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
    }
  }
}

@media (min-width: 300px) {
  .card-body {
    .title-product {
      font-size: 10px;
    }
  }
}
</style>
