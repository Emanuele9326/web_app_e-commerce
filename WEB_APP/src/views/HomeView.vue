<script setup>
import { storeProduct } from "../stores/StoreProduct.js";
import { AuthServices } from "../stores/AuthService";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue"
import GlobalFooter from "../components/GlobalFooter.vue";


const productStore = storeProduct();
const auth_services = AuthServices();

const router = useRouter();

productStore.getCategories();
 

</script>
<template>
  <header class="mx-3">
    <NavBar/>
  </header>

  <main class="d-block">
    <div class="d-block mt-5">
      <div class="desch4"><h2>Prodotti Tipici Italiani</h2></div>
      <div class="container my-5 intro fs-3">
        <h3>Vendita online di prodotti tipici delle varie località italane</h3>
        <p class="mt-5 fs-5">
          Scoprirai i migliori prodotti dell’enogastronomia italiana con un
          click Cosa aspetti, scopri il nostro negozio online <br />
          <strong>L'Angolo della Bontà</strong>
        </p>
      </div>
    </div>
    <div class="container text-center d-block">
      <div
        class="row home justify-content-center overflow-auto"
       
      >
        <router-link
          class=" col-12 col-sm-5 m-2 p-3"
          v-for="category in productStore.categories"
          :key="category"
          :to="{
            name: 'ProductList',
            params: { category: category },
          }"
        >
          <div class="card bg-dark text-white" style="border: none">
            <img
              :src="'./src/assets/img_home/' + category + '.jpg'"
              class="card-img"
              alt="..."
            />
            <div class="card-img-overlay m-auto">
              <h5 class="card-text align-middle  fs-1 m-auto ">
                {{ category.toUpperCase() }}
              </h5>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </main>
  <footer class="footer mt-4">
    <h4>L'Angolo della Bontà il tuo negozio di fiducia</h4>
    <div class="container mt-5">
      <div class="row">
        <div class="col service me-2 p-4">
          <span
            ><img src="../assets/icon/package.svg" style="width: 30px" /></span
          ><span style="display: inline-block"><h5>IMBALLAGGI SICURI</h5></span>
          <p class="mt-4">Ogni pacco viene accuratamente preparato</p>
        </div>
        <div class="col service me-2 p-4">
          <span
            ><img src="../assets/icon/payment.svg" style="width: 30px" /></span
          ><span style="display: inline-block"><h5>PAGAMENETI SICURI</h5></span>
          <p class="mt-4">Visa, Mastercard, Bonifico bancario o PayPal</p>
        </div>
        <div class="col service me-2 p-4">
          <span
            ><img
              src="../assets/icon/chat-text.svg"
              style="width: 30px" /></span
          ><span style="display: inline-block"><h5>SUPPORTO CLIENTE</h5></span>
          <p class="mt-4">
            Cell, email e Social <br />
            Lun-Ven 9-13 14:30-18:30
          </p>
        </div>
        
      </div>
      
    </div>
    <GlobalFooter/>
  </footer>
</template>

<style lang="scss" scoped >
  
  .fs-1{
    font-size: cart_font_size_1() !important;
  }

  .desch4 {
  text-align: center;
  background-color: $My-Color-Theme-2-v2-rgba;
  color: $My-Color-Theme-4-rgba;
  padding: 0.5rem;
}

.intro {
  text-align: center;
}

.home {
  margin-top: 0rem !important;
}
.img_logo {
  align-items: center;
  vertical-align: middle;
}
.icon {
  width: 26px !important;
  height: 26px !important;
  fill: #3b3310;
}

.text-white {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;
}
.card-text {
  line-height: 10rem;
}

.footer {
  text-align: center;
}

.service {
 background-color: $My-Color-Theme-2-1-rgba;
  border-radius: 2px;
  margin-bottom: 1rem;
}
.form-control-dark {
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}


.navbar-toggler:focus {
  box-shadow: 0 0 0 0rem;
}
.icon_menu {
  width: 100px !important;
  height: 100px !important;
  color: #fff !important;
}

@media only screen and (min-device-width: 576px) and (max-device-width: 991px) {
  .card-text{
    display: none;
  }
}


</style>
