<script setup>
import { AuthServices } from "../stores/AuthService";
import ResponseResetPassword from "../components/ResponseResetPassword.vue";
import { ref } from "vue";

const authservices = AuthServices();

const email = ref("");
const removeform = ref(false);
const objforgot = ref({});

function forgotPassword() {
  const payload = {
    email: email.value,
  };
  authservices.forgotPassword(payload).then(() => {
    objforgot.value = {
      status: authservices.statusForgotpassword,
      body: authservices.responseForgotpassword,
    };
    removeform.value = true;
  });
}
</script>
<template>
  <div class="logo">
    <router-link to="/"
      ><img src="../assets/logo1.jpg" class="rounded mx-auto d-block pe-auto"
    /></router-link>
  </div>
  <ResponseResetPassword :activeResponse="objforgot" v-if="removeform" />
  <div class="container">
    <form class="login" v-if="!removeform">
      <div class="container mt-5">
        <!-- Email input -->
        <div class="form-outline mb-4">
          <label class="form-label" for="email">Email address</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model.trim="email"
            required
          />
        </div>

        <!-- Submit button -->

        <div class="d-grid gap-2 col-6 mx-auto my-5">
          <button class="btn btn-primary" @click="forgotPassword" type="button">
            Invia
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<style lang="scss" scoped>
.logo {
  img {
    width: 280px;
  }
}
</style>
