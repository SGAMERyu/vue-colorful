<template>
  <div class="vue-colorful-hue">
    <ColorPointer :override-position="{ top: '50%' }" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";

import ColorPointer from "./ColorPointer.vue";

const hueValue = defineModel();

watch(hueValue, () => {});
</script>

<style>
.vue-colorful-hue {
  position: relative;
  width: 100%;
  height: 16px;
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    red 0,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    red
  );
}
</style>
