<script setup>
import { useStoreProduct } from "../stores/StoreProduct";

const storeProduct = useStoreProduct();
</script>
<template>
  <div
    class="col-12 col-sm-5 m-2 p-3"
    v-for="(category, index) in storeProduct.categories"
    :key="index"
  >
    <div class="card bg-dark position-relative" style="border: none">
      <img
        :src="'./src/assets/img_home/' + category + '.jpg'"
        class="card-img"
        alt="..."
      />
      <div class="card-img-overlay m-auto">
        <router-link
          :to="{
            name: 'ProductsList',
            params: { id_category: index, category: category },
          }"
          class="stretched-link text-white"
        >
          <h5 class="card-text align-middle font-size-1 m-auto">
            {{ category.toUpperCase() }}
          </h5>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-text {
  line-height: 10rem;
}
.text-white {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;
}

@media only screen and (min-device-width: 576px) and (max-device-width: 991px) {
  .card-text {
    display: none;
  }
}
</style>
