<script setup>
const props = defineProps(["modalActive"]);
const emit = defineEmits(["close"]);

function close() {
  emit("close");
}
</script>
<template>
  <div class="mod p-4" v-if="props.modalActive">
    <div class="tex_model container">
      <div class="text-end">
        <button type="button" class="btn-close fs-4" @click="close()"></button>
      </div>
      <div class="text text-center p-4 fs-5 fw-bold">
        Accedi per proseguire!
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mod {
  background-color: $My-Color-Theme-2-1-rgba;
  color: $My-Color-Theme-4-hex;
  position: absolute;
  top: 4rem;
  left: 4rem;
  z-index: 99999;
  width: 80%;
  height: 50%;
  .text_model {
    margin: auto;
  }
  .text {
    color: $My-Color-Theme-5-hex !important;
  }
}
</style>
