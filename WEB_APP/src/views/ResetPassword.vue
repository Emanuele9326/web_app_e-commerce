<script setup>
import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useRouter } from 'vue-router';
import {AuthServices} from '../stores/AuthService';
import WarningResetPassword from '../components/Modal/WarningResetPassword.vue'



const router= useRouter();
const authservices= AuthServices();
const er= ref('');
//castom validators;
const special_characters = helpers.regex(/[$.|'?*+()]/);

const e_mail= ref('');
const password= ref('');
const password_confirmation=ref('');

//redirect token that is present in the mail;
const token = router.currentRoute.value.query.token;

//validation rules;
const rules = computed(() => ({
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

const  modalresetpassword= ref(false); 

//error message relating to the password reset request;
const messagerror= ref(false)

async function resetPassword(){

  const validateform = await v$.value.$validate();

    const payload= {
        email:e_mail.value,
        password:password.value,
        password_confirmation: password_confirmation.value,
        token: token
    }

    if(validateform){

      active_error.value = {
      e_mail: { er: ref(false), message_e_mail: ref([]) },
      password: { er: ref(false), message_password: ref([]) },
      password_confirmation: {
        er: ref(false),
        message_password_confirmation: ref([]),
      },
    };

    let class_element = document.getElementsByClassName("error");
  
    for (let i = 0; i < class_element.length; i++) {
      class_element[i].classList.remove("error");
    }

    authservices.resetPassword(payload)
    .then(()=>{
        if(authservices.status_resetpassword == '200'){
           modalresetpassword.value=true;
           messagerror.value=false;

           setTimeout(()=>{
             modalresetpassword.value=false;
             router.push('/login');
           },3000)
           
        }else{
           messagerror.value=true;
        }

    })
    }else{
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

    const input_name = ["e_mail", "password", "password_confirmation"];

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
  <div class="container m-auto"><img src="../assets/logo1.jpg" class="rounded mx-auto d-block pe-auto logo_1"
    /></div>
<div class="container">
<div v-if="messagerror" style="color:red"><h5 >{{ authservices.response_resetpassword }}</h5></div>
<WarningResetPassword v-if="modalresetpassword"/>
<form @submit.prevent="resetPassword" class="needs-validation" novalidate>
      <!-- Email input -->
      <div class="form-outline mb-4">
        <label class="form-label" for="email">Email</label>
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
        <label class="form-label" for="password_confirmation">Conferma Password</label>
        <input
          type="password"
          id="password_confirmation"
          name="password_confirmation"
          v-model.trim="password_confirmation"
          class="form-control"
        />
      </div>
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
      <!-- Submit button -->

      <div class="d-grid gap-2 col-6 mx-auto my-5">
        <button class="btn btn-primary" type="submit">Reset Password</button>
      </div>
    </form>
</div>

</template>
<style lang="scss" scoped>
  .logo_1{
    width: 280px;
  }
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