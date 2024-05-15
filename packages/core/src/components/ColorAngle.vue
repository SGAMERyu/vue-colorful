<template>
  <div
    @mouseenter="onMouseEnter"
    class="vue-colorful-angle-container"
    ref="refAngleContainer"
  >
    <span
      :key="i"
      :style="genTransform(i)"
      class="vue-colorful-angle-line"
      v-for="i in 24"
    >
      <i></i>
    </span>
    <span class="vue-colorful-angle-display">270</span>
  </div>
</template>

<script lang="ts" setup>
import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

const refAngleContainer = ref<HTMLElement | null>();
const refPosition = ref({
  centerX: 0,
  centerY: 0,
});

function onMouseEnter() {
  const { height, left, top, width } =
    refAngleContainer.value!.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  refPosition.value = {
    centerX,
    centerY,
  };
  useEventListener(window, "mousemove", calculateAngle);
}

function calculateAngle(e: MouseEvent): number {
  const { centerX, centerY } = refPosition.value;
  const x = e.clientX - centerX;
  const y = e.clientY - centerY;
  const angleInRadians = Math.atan2(y, x);

  // 将弧度转换为角度
  let angleInDegrees = angleInRadians * (180 / Math.PI);

  // 保证角度为正值
  angleInDegrees = angleInDegrees < 0 ? angleInDegrees + 360 : angleInDegrees;
  console.log(angleInDegrees);

  return angleInDegrees;
}

function genTransform(i: number) {
  return {
    transform: `rotate(${15 * i}deg)`,
  };
}
</script>

<style>
.vue-colorful-angle-container {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.vue-colorful-angle-line {
  height: 48px;
  width: 8px;
  position: absolute;
  inset: 0px;
  margin: auto;
  > i {
    height: 4px;
    width: 1px;
    background: #e2e8f0;
    position: absolute;
    left: 0px;
    right: 0px;
    top: -2px;
    margin: auto;
  }
}
.vue-colorful-angle-display {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 36px;
  height: 36px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
