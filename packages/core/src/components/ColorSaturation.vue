<template>
  <div :style="panelStyle" class="vue-colorful-saturation" ref="container">
    <ColorPointer v-model="pointerValue" />
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from "vue";

import { computed, ref, watch } from "vue";

interface Props {
  color: string;
}
const props = defineProps<Props>();
const saturationValue = defineModel<number>();
const pointerValue = ref([]);

watch(pointerValue, () => {
  const [left] = pointerValue.value;
  // debugger;
  // saturationValue.value = left / 100;
});

const panelStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.color,
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
