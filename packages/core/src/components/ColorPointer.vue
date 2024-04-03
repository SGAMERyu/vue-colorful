<template>
  <div class="vue-colorful-interactive">
    <div class="vue-colorful-pointer" :style="pointerStyle">
      <div class="vue-colorful-fill"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  overridePosition: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  overridePosition: () => ({}),
});

const pointerStyle = computed(() => {
  return {
    top: 0,
    left: 0,
    ...props.overridePosition,
  };
});
</script>

<style>
.vue-colorful-interactive {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  outline: none;
  touch-action: none;
}
.vue-colorful-pointer {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #fff;
  box-shadow:
    0 10px 15px -3px #0000001a,
    0 4px 6px -4px #0000001a;
}
.vue-colorful-fill {
  background: red;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
}
</style>
