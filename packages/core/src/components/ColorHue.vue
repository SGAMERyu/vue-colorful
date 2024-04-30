<template>
  <div class="vue-colorful-hue">
    <ColorPointer
      :override-position="{ top: '50%' }"
      :style="pointerStyle"
      v-model:left="pointerLeft"
    />
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, ref, watch } from "vue";

import ColorPointer from "./ColorPointer.vue";

interface Props {
  selectColor: string;
}

const props = defineProps<Props>();

const hueValue = defineModel<number>();
const emits = defineEmits<{
  (e: "change", colors: number): void;
}>();
const pointerLeft = ref<number>(0);

const pointerStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.selectColor,
  };
});

watch(pointerLeft, (left) => {
  emits("change", Math.round(left * 360));
});

watch(hueValue, (hue) => {
  if (typeof hue === "undefined") return;
  pointerLeft.value = hue / 360;
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
