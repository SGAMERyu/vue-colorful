<template>
  <div class="vue-colorful-container" data-vue-colorful>
    <ColorSaturation
      :saturation-color="hueColor"
      :select-color="selectColor"
      @change="onSaturationChange"
    />
    <div class="vue-colorful-control">
      <div class="vue-colorful-control_eyedropper">
        <ColorEyeDropper :color="selectColor" @on-eye-dropper="initRefHsv" />
      </div>
      <div class="vue-colorful-control_tool">
        <ColorHue @change="onHueChange" v-model="refHsv.h" />
        <ColorAlpha v-model="refHsv.v" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { convertHexToHsv, convertHsvToRgba } from "../utils/color";

defineOptions({
  name: "VueColorful",
});
const rawValue = defineModel<string>();
const {
  hueColor,
  initRefHsv,
  onHueChange,
  onSaturationChange,
  refHsv,
  selectColor,
} = useColorful();

watch(
  rawValue,
  (rawColor) => {
    initRefHsv(rawColor!);
  },
  { immediate: true },
);

function useColorful() {
  const refHsv = ref({
    h: 0,
    s: 0,
    v: 0,
  });

  const selectColor = computed(() => {
    return convertHsvToRgba(refHsv.value);
  });

  const hueColor = computed(() => {
    return convertHsvToRgba(refHsv.value);
  });

  function initRefHsv(rawColor: string) {
    refHsv.value = convertHexToHsv(rawColor);
  }

  function onSaturationChange([s, v]: number[]) {
    refHsv.value.s = s;
    refHsv.value.v = v;
  }

  function onHueChange(h: number) {
    refHsv.value.h = h;
  }

  return {
    hueColor,
    initRefHsv,
    onHueChange,
    onSaturationChange,
    refHsv,
    selectColor,
  };
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
