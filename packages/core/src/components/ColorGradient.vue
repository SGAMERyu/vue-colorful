<template>
  <div class="vue-colorful-gradient__container">
    <div
      :style="pickerStyle"
      @click="addPointer"
      class="vue-colorful-gradient__picker"
      ref="refPointer"
    ></div>
    <GradientPointer
      :color="gradient"
      :key="index"
      @change="(color) => changeGradient(color, index)"
      v-for="(gradient, index) in gradients"
    />
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties, computed, ref } from "vue";

import { lightenDarkenColor } from "../utils/color";
import GradientPointer from "./GradientPointer.vue";

const gradients = defineModel<string[]>();

const refPointer = ref<HTMLElement | null>(null);

const pickerStyle = computed<CSSProperties>(() => {
  return {
    backgroundImage: `linear-gradient(90deg, ${gradients.value!.join(",")})`,
  };
});

function addPointer(event: MouseEvent) {
  const rect = refPointer.value!.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  const gradientLength = gradients.value!.length;
  const index = Math.floor(gradientLength * percent);
  const midIndex = Math.floor(gradientLength / 2);
  if (index < midIndex) {
    gradients.value?.splice(index + 1, 0, gradients.value[0]);
  } else {
    const newGradient = lightenDarkenColor(gradients.value![midIndex], 0.2);
    gradients.value?.splice(midIndex, 0, newGradient);
  }
}

function changeGradient(color: string, index: number) {
  gradients.value![index] = color;
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
</style>
