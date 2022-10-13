<script setup>
import { ref } from "vue";
import { AuthServices } from "../stores/AuthService.js";
import { useRouter } from "vue-router";
import FormRegistration from "../components/FormRegistration.vue";

const auth = AuthServices();
const route = useRouter();

//api request error message;
const errorRegister = ref(false);
const errorMessage = ref("");

async function registerUser(payload) {
  if (errorRegister.value) {
    errorRegister.value = false;
  }

  auth.registerUser(payload).then(() => {
    if (auth.statusRegister == 201) {
      auth.userLogin = true;
      auth.getUseridRegister(payload.email);

      route.push("/");
    } else if (auth.statusRegister == 422) {
      errorRegister.value = true;
      errorMessage.value = auth.messageErrorRegister;
    } else {
      errorRegister.value = true;
      errorMessage.value = "Error, retry registration";
    }
  });
}
</script>
<template>
  <div class="container mt-5 register">
    <div style="margin: auto; text-align: center">
      <router-link to="/">
        <img
          src="../assets/logo1.jpg"
          class="rounded mx-auto d-block pe-auto logo_1"
        />
      </router-link>
    </div>
    <div v-if="errorRegister" class="errorRegister">
      {{ errorMessage }}
    </div>
    <FormRegistration @on-submit="registerUser" />
  </div>
</template>
<style lang="scss" scoped>
.logo_1 {
  width: 280px;
}
.register {
  .container {
    --bs-gutter-x: 6rem;
  }
}
.error {
  border-color: rgb(173, 28, 28);
  background-color: rgba(255, 0, 0, 0.205);
}
.errorRegister {
  text-align: center;
  padding: 2rem;
  font-size: larger;
  background-color: rgba(180, 6, 6, 0.493);
  color: black;
}
</style>
