<template>
  <div class="vue-colorful-angle-container">
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
