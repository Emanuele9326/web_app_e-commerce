<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

const emit = defineEmits(["onSubmit"]);

//castom validators;
const specialCharacters = helpers.regex(/[$.|'?*+()]/);

const mail = ref("");
const password = ref("");
const passwordConfirmation = ref("");

//validation rules;
const rules = computed(() => ({
  mail: { required, email, $autoDirty: true },
  password: {
    $autoDirty: true,
    required,
    minLength: minLength(8),
    specialCharacters: helpers.withMessage(
      "The password must contain at least one of the following special characters:[  $ . | ? * + ( ) ]",
      specialCharacters
    ),
  },
  passwordConfirmation: {
    required,
    $autoDirty: true,
    minLength: minLength(8),
    sameAs: sameAs(password.value),
    specialCharacters: helpers.withMessage(
      "The password must contain at least one of the following special characters:[  $ . | ? * + ( ) ]",
      specialCharacters
    ),
  },
}));

const v$ = useVuelidate(rules, {
  mail,
  password,
  passwordConfirmation,
});
// manages the validation error messages;
const activError = ref({
  name: { er: ref(false), message_name: ref([]) },
  mail: { er: ref(false), message_mail: ref([]) },
  password: { er: ref(false), message_password: ref([]) },
  passwordConfirmation: {
    er: ref(false),
    message_passwordConfirmation: ref([]),
  },
});

async function validateForm() {
  const validateform = await v$.value.$validate();

  const payload = {
    email: mail.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
  };

  if (validateform) {
    activError.value = {
      mail: { er: ref(false), message_mail: ref([]) },
      password: { er: ref(false), message_password: ref([]) },
      passwordConfirmation: {
        er: ref(false),
        message_passwordConfirmation: ref([]),
      },
    };

    let classElement = document.getElementsByClassName("error");

    for (let i = 0; i < classElement.length; i++) {
      classElement[i].classList.remove("error");
    }
    emit("onSubmit", payload);
  } else {
    const errors = v$.value.$errors;
    let inCurrent = {};

    errors.forEach((e_input) => {
      document.getElementById(e_input.$property).className += " error";

      // field name;
      let inputname = e_input.$property;

      inCurrent[e_input.$property] = true;

      activError.value[inputname]["er"] = true;
      activError.value[inputname]["message_" + inputname] = [];

      v$.value[inputname].$errors.forEach((er) => {
        activError.value[inputname]["message_" + inputname].push(er.$message);
      });
    });

    const inputname = ["mail", "password", "passwordConfirmation"];

    let inputok = inputname.filter((x) => {
      return !inCurrent[x];
    });

    inputok.forEach((y) => {
      document.getElementById(y).classList.remove("error");
      activError.value[y]["er"] = false;
      activError.value[y]["message_" + y] = "";
    });
  }
}
</script>
<template>
  <form @submit.prevent="validateForm" class="needs-validation" novalidate>
    <!-- Email input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="email">Email</label>
      <input
        type="email"
        id="mail"
        name="mail"
        placeholder="mariorossi@libero.it"
        v-model.trim="mail"
        class="form-control"
      />
      <div v-if="activError.mail.er" class="invalid_feedback">
        <div
          v-for="(message, index) in activError.mail.message_mail"
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
      <div v-if="activError.password.er" class="invalid_feedback">
        <div
          v-for="(message, index) in activError.password.message_password"
          :key="index"
        >
          {{ message }}
        </div>
      </div>
    </div>
    <!-- Password confirm -->
    <div class="form-outline mb-4">
      <label class="form-label" for="passwordConfirmation"
        >Conferma Password</label
      >
      <input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        v-model.trim="passwordConfirmation"
        class="form-control"
      />
    </div>
    <div v-if="activError.passwordConfirmation.er" class="invalid_feedback">
      <div
        v-for="(message, index) in activError.passwordConfirmation
          .message_passwordConfirmation"
        :key="index"
      >
        {{ message }}
      </div>
    </div>
    <!-- Submit button -->

    <div class="d-grid gap-2 col-6 mx-auto my-5">
      <button class="btn btn-primary" type="submit">Reset Password</button>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.error {
  border-color: rgb(173, 28, 28);
  background-color: rgba(255, 0, 0, 0.205);
}
</style>
