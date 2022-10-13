<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const emit = defineEmits(["onSubmit"]);

const mail = ref("");
const password = ref("");

//handles form validation errors;
const activError = ref({
  mail: { er: ref(false), message_mail: ref([]) },
  password: { er: ref(false), message_password: ref([]) },
});

//validation rules
const rules = computed(() => ({
  mail: { required, email, $autoDirty: true },
  password: { required, $autoDirty: true },
}));
const v$ = useVuelidate(rules, { mail, password });

async function validateForm() {
  const validateform = await v$.value.$validate();
  const payload = {
    email: mail.value,
    password: password.value,
  };

  if (validateform) {
    //if there are previous errors they are removed;
    document.getElementById("password").classList.remove("error");
    document.getElementById("mail").classList.remove("error");
    activError.value = {
      mail: { er: ref(false), message_mail: ref([]) },
      password: { er: ref(false), message_password: ref([]) },
    };

    emit("onSubmit", payload);
  } else {
    const errors = v$.value.$errors;

    errors.forEach((element) => {
      //active error class;
      document.getElementById(element.$property).className += " error";

      activError.value[element.$property]["er"] = true;
      //the arey is emptied because there may be previous login messages
      activError.value[element.$property]["message_" + element.$property] = [];

      v$.value[element.$property].$errors.forEach((er) => {
        activError.value[element.$property][
          "message_" + element.$property
        ].push(er.$message);
      });
    });
    //check and remove error class;
    if (errors.length < 2 && errors.length !== 0) {
      if (errors[0].$property == "mail") {
        document.getElementById("password").classList.remove("error");
        activError.value["password"]["er"] = false;
      } else {
        document.getElementById("mail").classList.remove("error");
        activError.value["mail"]["er"] = false;
      }
    }
  }
}

function passwordShowhide() {
  var x = document.getElementById("password");
  var showEye = document.getElementById("showEye");
  var hideEye = document.getElementById("hideEye");
  hideEye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    showEye.style.display = "none";
    hideEye.style.display = "block";
  } else {
    x.type = "password";
    showEye.style.display = "block";
    hideEye.style.display = "none";
  }
}
</script>
<template>
  <form
    class="container login needs-validation"
    @submit.prevent="validateForm()"
    novalidate
  >
    <div class="container mt-5">
      <div class="form-outline mb-4">
        <label class="form-label" for="mail">Email</label>
        <input
          type="email"
          id="mail"
          class="form-control"
          required
          v-model.trim="mail"
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
          <div class="input-group-append">
            <span class="input-group-text" @click="passwordShowhide()">
              <i class="fas fa-eye" id="showEye"
                ><img
                  src="../assets/icon/eye-slash-fill.svg"
                  style="width: 1.5rem"
              /></i>
              <i class="fas fa-eye-slash d-none" id="hideEye">
                <img src="../assets/icon/eye-fill.svg" style="width: 1.5rem"
              /></i>
            </span>
          </div>
        </div>
        <div v-if="activError.password.er" class="invalid_feedback">
          <div
            v-for="(message, index) in activError.password.message_password"
            :key="index"
          >
            {{ message }}
          </div>
        </div>
      </div>
      <div class="row mb-4 mx-auto">
        <div class="col d-flex justify-content-center">
          <router-link to="/forgotpassword"
            >Password dimenticata? Recupera password</router-link
          >
        </div>
      </div>

      <!-- Login button -->

      <div class="d-grid gap-2 col-6 mx-auto my-5">
        <button class="btn btn-primary" type="submit">LOGIN</button>
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
