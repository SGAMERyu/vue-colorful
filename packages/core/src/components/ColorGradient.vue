<template>
  <div class="vue-colorful-gradient__container">
    <div
      :style="pickerStyle"
      @click="addPointer"
      class="vue-colorful-gradient__picker"
    ></div>
    <div
      :key="index"
      :style="{ background: gradient }"
      class="vue-colorful-gradient__pointer"
      v-for="(gradient, index) in gradients"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties, computed } from "vue";

const gradients = defineModel<string[]>();

const pickerStyle = computed<CSSProperties>(() => {
  return {
    backgroundImage: `linear-gradient(90deg, ${gradients.value!.join(",")})`,
  };
});

function addPointer() {
  gradients.value?.push(gradients.value[gradients.value.length - 1]);
}
</script>

<style>
.vue-colorful-gradient__container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.vue-colorful-gradient__picker {
  width: 100%;
  height: 12px;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
}

.vue-colorful-gradient__pointer {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  z-index: 2;
}
</style>
