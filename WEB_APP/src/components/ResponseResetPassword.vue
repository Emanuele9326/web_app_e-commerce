<script setup>
import { ref } from "vue";
//props
const props = defineProps(["activeResponse"]);
const active = ref(true);

if (props.activeResponse.status !== 200) {
  active.value = false;
}
</script>
<template>
  <div class="text-center" v-if="active">
    <p class="st200">The password reset request for your account was successful!</p>
  </div>
  <div v-else class="error">
    <h5>Errore: {{ props.activeResponse.status }}</h5>
    {{ props.activeResponse.body }}
  </div>
</template>

<style lang="scss" scoped>
.st200 {
  color: rgb(32, 109, 32);
}
.error {
  color: rgb(105, 8, 8);
}
</style>
