<script setup>
import { storeProduct } from "../stores/StoreProduct.js";
import { AuthServices } from "../stores/AuthService";
import { useRouter } from "vue-router";

const productStore = storeProduct();
const auth_services = AuthServices();

const router = useRouter();

//user login logout;
let login_logout = auth_services.user_login;

function Logouth() {
  auth_services.logout().then(() => {
    auth_services.user_id = "";
    auth_services.user_login = false;
    productStore.user_id = "";
    productStore.user_login = false;
    productStore.cartItems.splice(0, productStore.cartItems.length);

    router.go();
  });
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-ligth">
    <div class="container-fluid px-0 intro_navbar">
      <div class="logo ms-sm-3">
        <router-link to="/">
          <img class="w-100 img_logo align-middle m" src="../assets/logo1.jpg" alt=""
        /></router-link>
      </div>

      <button
        class="navbar-toggler mx-4"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasMenu"
        aria-controls="offcanvasMenu"
      >
        <img src="../assets/icon/icon_justify.svg" class="sandwich_menu" />
      </button>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasMenuLabel">Menu</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <ul class="offcanvas-body mb-lg-0 p-0 mr-2 list_nav">
          <li class="nav-item my-2 fs-5" v-if="!login_logout">
            <router-link to="/login" class="nav-link p-0">
              <div class="row">
                <div class="col-2 col-sm log_in_outh">
                  <img src="../assets/icon/user.svg" class="icon" />
                </div>
                <div class="col-3 col-sm text-navbar"><h4 class="">Accedi</h4></div>
                <div class="col-6 chevron-right">
                  <img src="../assets/icon/chevron-right.svg" class="icon" />
                </div>
              </div>
            </router-link>
          </li>
          <li class="nav-item my-2 fs-5" v-else>
            <div>
              <div @click="Logouth()" class="nav-link p-0">
                <div class="row">
                  <div class="col-2 col-sm log_in_outh">
                    <img src="../assets/icon/user.svg" class="icon" />
                  </div>
                  <div class="col-3 col-sm text-navbar"><h4 class="">Esci</h4></div>
                  <div class="col-6 chevron-right">
                    <img src="../assets/icon/chevron-right.svg" class="icon" />
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="nav-item my-2 fs-5">
            <div>
              <router-link to="/cartProduct" class="nav-link active p-0">
                <div class="row">
                  <div class="col-2 col-sm log_in_outh">
                    <!---->
                    <i style="font-size: 24px">
                      <img class="icon" src="../assets/icon/basket.svg" />
                    </i>
                    <span
                      v-if="productStore.quantityProducts > 0"
                      class="badge badge-warning"
                      id="lblCartCount"
                    >
                      {{ productStore.quantityProducts }}
                    </span>
                    <!----->
                  </div>
                  <div class="col-3 col-sm text-navbar"><h4>Carrello</h4></div>
                  <div class="col-6 chevron-right">
                    <img src="../assets/icon/chevron-right.svg" class="icon" />
                  </div>
                </div>
              </router-link>
            </div>
          </li>
          <li class="nav-item my-2 fs-5">
            <a class="nav-link active p-0">
              <router-link to="/search" class="nav-link p-0">
                <div class="row">
                  <div class="col-2 col-sm log_in_outh">
                    <img src="../assets/icon/search.svg" class="icon" />
                  </div>
                  <div class="col-3 col-sm text-navbar"><h4>Search</h4></div>
                  <div class="col-6 chevron-right">
                    <img src="../assets/icon/chevron-right.svg" class="icon" />
                  </div>
                </div>
              </router-link>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.navbar-toggler {
  color: $My-Color-Theme-5-rgba;
  background-color: transparent;
  border: var(--bs-border-width) solid $My-Color-Theme-3-rgba;
}
.text-navbar {
  cursor: pointer;
}
.logo {
  width: 280px;
  height: auto;
  margin: auto;
}
.sandwich_menu {
  width: 50px;
}

ul {
  list-style: none;
  li {
    text-align: center;
  }
}
.icon {
  width: 26px;
  height: 26px;
  fill: #3b3310;
}
.chevron-right {
  display: none;
}
span {
  width: auto;
  height: auto;
  padding-left: 0.9rem;
  padding-right: 0.5rem;
}
.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}
.badge-warning {
  background-color: $My-Color-Theme-3-hex;
}

#offcanvasMenu {
  ul {
    li {
      text-align: start;
    }
  }
}

@media (max-width: 389px) {
  .intro_navbar {
    display: block;

    .logo {
      margin: auto;
    }
    .button_sandwich {
      margin-top: 2rem;
    }
  }
}
@media (max-width: 575px) {
  .log_in_outh {
    padding-right: 0px;
  }
  .badge {
    font-size: small;
    padding-left: 4px;
    padding-right: 4px;
    border-radius: 7px;
  }
  .sandwich_menu {
    width: 40px;
  }
}
@media (max-width: 991px) {
  li:nth-child(odd) {
    background-color: $My-Color-Theme-2-v2-rgba;
    padding: 10px 0px;
  }
  .chevron-right {
    display: inline-block;

    text-align: end;
  }
  .icon {
    margin-left: 0.5rem;
  }
}
@media (min-width: 992px) {
  .navbar-expand-lg .offcanvas-body {
    justify-content: end;
  }

  #offcanvasMenu {
    ul {
      li {
        text-align: center;
      }
    }
  }
  .icon {
    width: 35px;
    height: 35px;
    margin: 0.7rem 0rem;
  }

  .text-navbar {
    margin: 1rem 0rem;
    padding: 0rem 1rem;

    font-size: medium;
  }
  .log_in_outh {
    padding-right: 0px;
  }
  .list_nav {
    margin-right: 1.5rem;
  }
  .nav-item {
    margin: 0 1.5rem;
  }
}
</style>
