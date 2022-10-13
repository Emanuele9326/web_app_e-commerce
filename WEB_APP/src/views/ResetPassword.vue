<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthServices } from "../stores/AuthService";
import WarningResetPassword from "../components/Modal/WarningResetPassword.vue";
import FormResetPassword from "../components/FormResetPassword.vue";

const router = useRouter();
const authservices = AuthServices();

//redirect token that is present in the mail;
const token = router.currentRoute.value.query.token;

const modalresetpassword = ref(false);

//error message relating to the password reset request;
const messagerror = ref(false);

async function passwordReset(validatedata) {
  const payload = {
    email: validatedata.email,
    password: validatedata.password,
    password_confirmation: validatedata.password_confirmation,
    token: token,
  };
  authservices.resetPassword(payload).then(() => {
    if (authservices.statusResetpassword == "200") {
      modalresetpassword.value = true;
      messagerror.value = false;

      setTimeout(() => {
        modalresetpassword.value = false;
        router.push("/login");
      }, 3000);
    } else {
      messagerror.value = true;
    }
  });
}
</script>

<template>
  <div class="container m-auto">
    <img
      src="../assets/logo1.jpg"
      class="rounded mx-auto d-block pe-auto logo_1"
    />
  </div>
  <div class="container">
    <div v-if="messagerror" style="color: red">
      <h5>{{ authservices.responseResetpassword }}</h5>
    </div>
    <WarningResetPassword v-if="modalresetpassword" />

    <FormResetPassword @on-submit="passwordReset" />
  </div>
</template>
<style lang="scss" scoped>
.logo_1 {
  width: 280px;
}
.register .container {
  --bs-gutter-x: 6rem;
}

.error_register {
  text-align: center;
  padding: 2rem;
  font-size: larger;
  background-color: rgba(180, 6, 6, 0.493);
  color: black;
}
</style>
