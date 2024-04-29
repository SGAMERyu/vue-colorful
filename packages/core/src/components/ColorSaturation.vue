<template>
  <div :style="panelStyle" class="vue-colorful-saturation" ref="container">
    <ColorPointer
      :style="pointerStyle"
      v-model:left="pointerLeft"
      v-model:top="pointerTop"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from "vue";

import { computed, ref, watch } from "vue";

interface Props {
  saturationColor: string;
  selectColor: string;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", colors: number[]): void;
}>();
const pointerLeft = ref(0);
const pointerTop = ref(0);

watch([() => pointerLeft.value, () => pointerTop.value], () => {
  emits("change", [
    Math.round(pointerLeft.value * 100),
    Math.round((1 - pointerTop.value) * 100),
  ]);
});

const panelStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.saturationColor,
  };
});

const pointerStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.selectColor,
  };
});
</script>

<style>
.vue-colorful-saturation {
  position: relative;
  width: 100%;
  height: 152px;
  background-image: linear-gradient(0deg, #000, transparent),
    linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
}
</style>
