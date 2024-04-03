<template>
  <div data-vue-colorful class="vue-colorful-container">
    <ColorSaturation :color="hueColor" />
    <div class="vue-colorful-control">
      <div class="vue-colorful-control_eyedropper">
        <ColorEyeDropper />
      </div>
      <div class="vue-colorful-control_tool"><ColorHue /> <ColorAlpha /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "VueColorful",
});

const { hueColor } = useColorful();

function useColorful() {
  const hueColor = ref("rgb(255, 0, 0)");

  return { hueColor };
}
</script>

<style>
.vue-colorful-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.vue-colorful-control {
  display: flex;
  align-items: center;
  gap: 14px;
}

.vue-colorful-control_eyedropper {
  flex: 0 1 24px;
}

.vue-colorful-control_tool {
  margin-top: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
