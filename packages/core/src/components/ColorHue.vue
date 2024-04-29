<template>
  <div class="vue-colorful-hue">
    <ColorPointer :override-position="{ top: '50%' }" v-model="pointerValue" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import ColorPointer from "./ColorPointer.vue";

const hueValue = defineModel<number>();
const emits = defineEmits<{
  (e: "change", colors: number): void;
}>();
const pointerValue = ref<number[]>([]);

watch(pointerValue, () => {
  const [left] = pointerValue.value;
  emits("change", Math.round(left * 360));
});

watch(hueValue, (hue) => {
  if (hue === undefined) return;
  const left = Math.round((hue / 360) * 100);
});
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
