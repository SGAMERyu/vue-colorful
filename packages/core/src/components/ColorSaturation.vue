<template>
  <div :style="panelStyle" class="vue-colorful-saturation" ref="container">
    <ColorPointer :style="pointerStyle" v-model="pointerValue" />
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
const pointerValue = ref([]);

watch(pointerValue, () => {
  const [left, top] = pointerValue.value;
  emits("change", [Math.round(left), Math.round(100 - top)]);
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
