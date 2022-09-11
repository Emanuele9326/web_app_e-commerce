<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { AuthServices } from "../stores/AuthService";
import { storeProduct } from "../stores/StoreProduct.js";
import { useRouter } from "vue-router";
import NoticeSingIn from "../components/Modal/NoticeSingIn.vue";

const auth_services = AuthServices();
const storeproduct = storeProduct();
const route = useRouter();

//path of the page of origin;
const back = route.options.history.state.back;

const e_mail = ref("");
const password = ref("");
const log_error = ref(false);

//handles form validation errors;
const active_error = ref({
  e_mail: { er: ref(false), message_e_mail: ref([]) },
  password: { er: ref(false), message_password: ref([]) },
});

//management of opening and closing of the warning model;
const model = ref(false);
if (back !== "/") {
  model.value = true;
}
/**** */

//validation rules
const rules = computed(() => ({
  e_mail: { required, email, $autoDirty: true },
  password: { required, $autoDirty: true },
}));
const v$ = useVuelidate(rules, { e_mail, password });

/**** */
async function login() {
  const validateform = await v$.value.$validate();

  const payload = {
    email: e_mail.value,
    password: password.value,
  };

  if (validateform) {
    //if there are previous errors they are removed;
    document.getElementById("password").classList.remove("error");
    document.getElementById("e_mail").classList.remove("error");

    active_error.value = {
      e_mail: { er: ref(false), message_e_mail: ref([]) },
      password: { er: ref(false), message_password: ref([]) },
    };

    /**** */

    auth_services.loginUser(payload).then(() => {
      let userid = auth_services.user_id;

      if (auth_services.status_login == 200) {
        storeproduct.getCartItems(userid);
        route.push('/');
      } else if (auth_services.status_login == 422) {
        document.getElementById("e_mail").className += " error";
        document.getElementById("password").className += " error";

        // log_error triggers the error message;
        log_error.value = true;
      }
    });
  } else {
    //if previously activated the error message is turned off;
    if (log_error.value) {
      log_error.value = false;
    }

    const errors = v$.value.$errors;

    errors.forEach((element) => {
      //active error class;
      document.getElementById(element.$property).className += " error";

      active_error.value[element.$property]["er"] = true;

      //the arey is emptied because there may be previous login messages
      active_error.value[element.$property]["message_" + element.$property] = [];

      v$.value[element.$property].$errors.forEach((er) => {
        active_error.value[element.$property]["message_" + element.$property].push(
          er.$message
        );
      });
    });

    //check and remove error class;
    if (errors.length < 2 && errors.length !== 0) {
      errors[0].$property == "e_mail"
        ? document.getElementById("password").classList.remove("error")
        : document.getElementById("e_mail").classList.remove("error");
    }
  }
}

/***  */
function closeModel() {
  model.value = false;
}


/*** **/
function password_show_hide() {
  var x = document.getElementById("password");
  var show_eye = document.getElementById("show_eye");
  var hide_eye = document.getElementById("hide_eye");
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}
</script>
<template>
  <div class="logo">
    <router-link to="/"
      ><img src="../assets/logo1.jpg" class="rounded mx-auto d-block pe-auto"
    /></router-link>
  </div>

  <notice-sing-in class="container m-auto" :modalActive="model" @close="closeModel()" />
  <div class="container text-center fs-4" v-if="log_error" style="color: red">
    <p>{{ auth_services.login_error }}</p>
  </div>
  <form class="container login needs-validation" novalidate>
    <div class="container mt-5">
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="e_mail">Email</label>
        <input
          type="email"
          id="e_mail"
          class="form-control"
          required
          v-model.trim="e_mail"
        />
        <div v-if="active_error.e_mail.er" class="invalid_feedback">
          <div
            v-for="(message, index) in active_error.e_mail.message_e_mail"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="pw">Password</label>
        <div class="input-group mb-3">
              <input 
              name="password" 
              type="password" 
              class="form-control" 
              id="password"  
              v-model.trim="password"
              required="true" 
              aria-label="password" 
              aria-describedby="basic-addon1" 
              />
              <div class="input-group-append ">
                <span class="input-group-text" @click="password_show_hide()">
                 <i class="fas fa-eye" id="show_eye"><img src="../assets/icon/eye-slash-fill.svg" style="width:1.5rem"/></i>
                  <i class="fas fa-eye-slash d-none" id="hide_eye"> <img src="../assets/icon/eye-fill.svg" style="width:1.5rem" /></i>
                </span>
              </div>
            </div>
        <div v-if="active_error.password.er" class="invalid_feedback">
          <div
            v-for="(message, index) in active_error.password.message_password"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>
      <!--<div class="form-outline mb-4">
        <label class="form-label" for="pw">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model.trim="password"
          required
        />
        <div v-if="active_error.password.er" class="invalid_feedback">
          <div
            v-for="(message, index) in active_error.password.message_password"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>-->

      
      <div class="row mb-4 mx-auto">
        <div class="col d-flex justify-content-center">
          
          <router-link to="/forgotpassword"
            >Password dimenticata? Recupera password</router-link
          >
        </div>
      </div>

      <!-- Login button -->

      <div class="d-grid gap-2 col-6 mx-auto my-5">
        <button class="btn btn-primary" @click="login()" type="button">LOGIN</button>
      </div>

      <!-- Register buttons -->
      <div class="text-center">
        <p>
          Non sei registrato?
          <router-link to="/register">Registrati</router-link>
        </p>
      </div>
    </div>
  </form>
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
.input-group-text{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
