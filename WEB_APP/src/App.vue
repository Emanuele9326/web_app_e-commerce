<script setup>
import { RouterView } from "vue-router";
import { AuthServices } from "./stores/AuthService";
import { useStoreProduct } from "./stores/StoreProduct";
import { useRouter } from "vue-router";

const auth_services = AuthServices();
const productStore = useStoreProduct();
const router = useRouter();
//check if the user authentication is valid;
if (auth_services.userLogin) {
  auth_services.checkLoginUser().then(() => {
    if (auth_services.statuslogin == "401") {
      auth_services.statuslogin = "";
      auth_services.statusRegister = "";

      productStore.userLogin = false;
      productStore.userId = "";
      productStore.cartItems = [];

      router.go();
    }
  });
}
</script>

<template>
  <RouterView />
</template>

<style lang="scss">

#app {
  background-color: #fff;
  color: $secondary;


  a {
    color: $My-Color-Theme-3-hex;
    text-decoration: none;
  }
  .nav-link {
    color: $secondary;
    text-decoration-color: $secondary;
  }
  .nav_icon {
    width: 23px;
    height: 23px;
  }

  .btn-primary {
  background-color: #ada955;
  border-color: #ada955;
}

.btn-primary {
    --bs-btn-color: #fff;
    --bs-btn-bg: $primary;
    --bs-btn-border-color: $My-Color-Theme-3-rgba:;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: $primary;
    --bs-btn-hover-border-color: $primary;
    --bs-btn-focus-shadow-rgb: 49,132,253;
    --bs-btn-active-color: #fff;
    --bs-btn-active-bg: $primary;
    --bs-btn-active-border-color: $primary;
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: #fff;
    --bs-btn-disabled-bg: $primary;
    --bs-btn-disabled-border-color: $primary;
}


  @media (hover: hover) {
    a:hover {
      background-color: transparent;
      cursor: pointer;
    }

  }
  @media (min-width: 300px) {
    .nav_icon {
      width: 25px;
      height: 25px;
    }
  }

  @media (min-width: 400px) {

    .nav_icon {
      width: 30px;
      height: 30px;
    }
  }
  @media (min-width: 768px) {
    .nav_icon {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
