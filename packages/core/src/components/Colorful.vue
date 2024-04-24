<template>
  <div class="vue-colorful-container" data-vue-colorful>
    <ColorSaturation :color="hueColor" v-model="refHsv.s" />
    <div class="vue-colorful-control">
      <div class="vue-colorful-control_eyedropper">
        <ColorEyeDropper />
      </div>
      <div class="vue-colorful-control_tool">
        <ColorHue v-model="refHsv.h" /> <ColorAlpha v-model="refHsv.v" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

import { convertHexToHsv, convertHsvToRgba } from "../utils/color";

defineOptions({
  name: "VueColorful",
});
const rawValue = defineModel<string>();
const { hueColor, initRefHsv, refHsv } = useColorful();

watchEffect(() => {
  initRefHsv(rawValue.value!);
});

function useColorful() {
  const refHsv = ref({
    h: 0,
    s: 0,
    v: 0,
  });

  const hueColor = computed(() => {
    return convertHsvToRgba(refHsv.value);
  });

  function initRefHsv(rawColor: string) {
    refHsv.value = convertHexToHsv(rawColor);
  }

  return { hueColor, initRefHsv, refHsv };
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
