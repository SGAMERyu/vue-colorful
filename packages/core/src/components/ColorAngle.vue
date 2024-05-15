<template>
  <div
    @click="onClick"
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
    <span class="vue-colorful-angle-display">{{ refAngle }}°</span>
    <span
      :style="{ transform: `rotate(${refAngle}deg)` }"
      @mousedown="onMouseDown"
      class="vue-colorful-angle-pointer"
    >
      <i></i>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useEventListener } from "@vueuse/core";
import { onMounted, ref } from "vue";

const refAngle = defineModel<number>();
const refAngleContainer = ref<HTMLElement | null>();
const refPosition = ref({
  centerX: 0,
  centerY: 0,
});
const refIsDrag = ref(false);

onMounted(() => {
  genCenter();
});

function genCenter() {
  const { scrollX, scrollY } = window;
  const { height, left, top, width } =
    refAngleContainer.value!.getBoundingClientRect();
  const centerX = left + scrollX + window.scrollX + width / 2;
  const centerY = top + scrollY + height / 2;
  refPosition.value = {
    centerX,
    centerY,
  };
}

function onClick(event: MouseEvent) {
  if (refIsDrag.value) return;
  calculateAngle(event);
}

function onMouseDown() {
  refIsDrag.value = true;
  const cleanupMouseMove = useEventListener(
    window,
    "mousemove",
    calculateAngle,
  );
  useEventListener(window, "mouseup", () => {
    refIsDrag.value = false;
    cleanupMouseMove();
  });
}

function calculateAngle(event: MouseEvent) {
  const clickX = event.clientX + window.scrollX;
  const clickY = event.clientY + window.scrollY;
  const { centerX, centerY } = refPosition.value;

  // 计算夹角
  let diffX = clickX - centerX;
  let diffY = clickY - centerY;

  const radians = Math.atan2(diffY, diffX); // radians
  let angle = (radians * (180 / Math.PI) + 90) % 360;

  // 由于Math.atan2返回的结果是-180到180，我们把负值转化成正值
  if (angle < 0) angle += 360;

  // 取整来获得整数的角度
  const scale = 15;
  const scaledAngle = Math.round(angle / scale) * scale;
  refAngle.value = scaledAngle;
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
    background: #bac1cc;
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
  color: 14px;
}

.vue-colorful-angle-pointer {
  height: 48px;
  width: 8px;
  position: absolute;
  inset: 0px;
  margin: auto;
  > i {
    width: 8px;
    height: 8px;
    background: #cbd5e0;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    left: 0px;
    right: 0px;
    top: -4px;
    margin: auto;
    cursor: pointer;
    transition: all 0.5s ease-out 0s;
  }
}
</style>
