<script setup>
import { ref } from "vue";

import { AuthServices } from "../stores/AuthService";
import { useStoreProduct } from "../stores/StoreProduct.js";
import { useRouter } from "vue-router";
import NoticeSingIn from "../components/Modal/NoticeSingIn.vue";
import FormLogin from "../components/FormLogin.vue";

const authServices = AuthServices();
const storeproduct = useStoreProduct();
const route = useRouter();

//path of the page of origin;
const back = route.options.history.state.back;
const logError = ref(false);

//management of opening and closing of the warning model;
const model = ref(false);
if (back !== "/") {
  model.value = true;
}

async function login(payload) {
  authServices.loginUser(payload).then(() => {
    if (authServices.statuslogin == 200) {
      storeproduct.getCartItems();
      route.push("/");
    } else if (authServices.statuslogin == 422) {
      document.getElementById("mail").className += " error";
      document.getElementById("password").className += " error";
      // logError triggers the error message;
      logError.value = true;
    }
  });
}

/***  */
function closeModel() {
  model.value = false;
}
/*** **/
</script>

<template>
  <div class="logo">
    <router-link to="/">
      <img src="../assets/logo1.jpg" class="rounded mx-auto d-block pe-auto" />
    </router-link>
  </div>

  <NoticeSingIn
    class="container m-auto"
    :modalActive="model"
    @close="closeModel()"
  />
  <div class="container text-center fs-4" v-if="logError" style="color: red">
    <p>{{ authServices.loginerror }}</p>
  </div>
  <FormLogin @on-submit="login" />
</template>

<style lang="scss" scoped>
.logo {
  img {
    width: 280px;
  }
}
.login .container {
  --bs-gutter-x: 4rem;
}
.error {
  border-color: red;
  background-color: rgba(255, 0, 0, 0.192);
}
.input-group-text {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
