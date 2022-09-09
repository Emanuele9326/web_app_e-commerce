<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { AuthServices } from "../stores/AuthService.js";
import { useRouter } from "vue-router";

const auth = AuthServices();
const route = useRouter();

//castom validators
const special_characters = helpers.regex(/[$.|'?*+()]/);

//input
const name = ref("");
const e_mail = ref("");
const password = ref("");
const password_confirmation = ref("");

//api request error message
const error_register = ref(false);
const error_message = ref("");

//validation rules
const rules = computed(() => ({
  name: { required, $autoDirty: true },
  e_mail: { required, email, $autoDirty: true },
  password: {
    $autoDirty: true,
    required,
    minLength: minLength(8),
    special_characters: helpers.withMessage(
      "The password must contain at least one of the following special characters:[  $ . | ? * + ( ) ]",
      special_characters
    ),
  },
  password_confirmation: {
    required,
    $autoDirty: true,
    minLength: minLength(8),
    sameAs: sameAs(password.value),
    special_characters: helpers.withMessage(
      "The password must contain at least one of the following special characters:[  $ . | ? * + ( ) ]",
      special_characters
    ),
  },
}));
const v$ = useVuelidate(rules, {
  name,
  e_mail,
  password,
  password_confirmation,
});

// manages the validation error messages;
const active_error = ref({
  name: { er: ref(false), message_name: ref([]) },
  e_mail: { er: ref(false), message_e_mail: ref([]) },
  password: { er: ref(false), message_password: ref([]) },
  password_confirmation: {
    er: ref(false),
    message_password_confirmation: ref([]),
  },
});

async function registerUser() {
  const validateform = await v$.value.$validate();

  const payload = {
    name: name.value,
    email: e_mail.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
  };

  if (validateform) {
    if (!error_register.value) {
      error_register.value = false;
    }

    active_error.value = {
      name: { er: ref(false), message_name: ref([]) },
      e_mail: { er: ref(false), message_e_mail: ref([]) },
      password: { er: ref(false), message_password: ref([]) },
      password_confirmation: {
        er: ref(false),
        message_password_confirmation: ref([]),
      },
    };

    let class_element = document.getElementsByClassName("error");
  
    for (let i = 0; i < class_element.length; i++) {
      //console.log(class_element[i].classList);
      class_element[i].classList.remove("error");
    }

    auth.registerUser(payload).then(() => {
      if (auth.status_register == 201) {
        auth.user_login= true;
         auth.getUseridRegister(e_mail.value);

        route.push("/");
      } else if (auth.status_register == 422) {
        error_register.value = true;
        error_message.value = auth.message_error_register;
        console.log(auth.status_register);
        console.log(auth.message_error_register);
      } else {
        error_register.value = true;
        error_message.value = "Error, retry registration";
      }
    });
  } else {
    //contains validation errors
    const errors = v$.value.$errors;
    let inCurrent = {};

    errors.forEach((e_input) => {
      document.getElementById(e_input.$property).className += " error";

      // field name;
      let input_name = e_input.$property;

      inCurrent[e_input.$property] = true;

      active_error.value[input_name]["er"] = true;
      active_error.value[input_name]["message_" + input_name] = [];

      v$.value[input_name].$errors.forEach((er) => {
        active_error.value[input_name]["message_" + input_name].push(
          er.$message
        );
      });
    });

    const input_name = ["name", "e_mail", "password", "password_confirmation"];

    let input_ok = input_name.filter((x) => {
      return !inCurrent[x];
    });

    input_ok.forEach((y) => {
      document.getElementById(y).classList.remove("error");
      active_error.value[y]["er"] = false;
      active_error.value[y]["message_" + y] = "";
    });
  }
}
</script>
<template>
  <div class="container mt-5 register">
    <div style="margin: auto; text-align: center">
      <router-link to="/"><img src="../assets/logo1.jpg" class="rounded mx-auto d-block pe-auto" /></router-link>
    </div>
    <div v-if="error_register" class="error_register">{{ error_message }}</div>
    <form class="needs-validation" novalidate>
      <!--Name-->
      <div class="form-outline mb-4">
        <label class="form-label" for="name">Nome Utente</label>
        <input
          type="text"
          id="name"
          name="name"
          label="name"
          placeholder="Ex: Mario"
          v-model.trim="name"
          class="form-control"
          required
        />
        <div v-if="active_error.name.er" class="invalid_feedback">
          <div
            v-for="(message, index) in active_error.name.message_name"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="e_mail">Email</label>
        <input
          type="email"
          id="e_mail"
          name="e_mail"
          placeholder="mariorossi@libero.it"
          v-model.trim="e_mail"
          class="form-control"
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
        <input
          type="password"
          id="password"
          name="password"
          v-model.trim="password"
          class="form-control"
        />
        <div v-if="active_error.password.er" class="invalid_feedback">
          <div
            v-for="(message, index) in active_error.password.message_password"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>
      <!-- Password confirm -->
      <div class="form-outline mb-4">
        <label class="form-label" for="password_confirmation"
          >Conferma Password</label
        >
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          v-model.trim="password_confirmation"
          class="form-control"
        />
        <div
          v-if="active_error.password_confirmation.er"
          class="invalid_feedback"
        >
          <div
            v-for="(message, index) in active_error.password_confirmation
              .message_password_confirmation"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>

      <!-- Submit button -->

      <div class="d-grid gap-2 col-6 mx-auto my-5">
        <button class="btn btn-primary" type="button" @click="registerUser()">
          Registrati
        </button>
      </div>
    </form>
  </div>
</template>
<style>
.register .container {
  --bs-gutter-x: 6rem;
}
.error {
  border-color: rgb(173, 28, 28);
  background-color: rgba(255, 0, 0, 0.205);
}
.error_register {
  text-align: center;
  padding: 2rem;
  font-size: larger;
  background-color: rgba(180, 6, 6, 0.493);
  color: black;
}
</style>
