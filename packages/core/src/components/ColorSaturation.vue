<template>
  <div class="vue-colorful-saturation" :style="panelStyle">
    <ColorPointer />
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { computed } from "vue";

interface Props {
  color: string;
}
const props = defineProps<Props>();

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
