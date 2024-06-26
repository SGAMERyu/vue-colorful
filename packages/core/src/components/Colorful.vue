<template>
  <div class="vue-colorful-container" data-vue-colorful>
    <ColorSaturation
      :saturation-color="saturationColor"
      :select-color="selectColor"
      @change="onSaturationChange"
    />
    <div class="vue-colorful-control_tool">
      <ColorHue
        :select-color="selectColor"
        @change="onHueChange"
        v-model="refHsv.h"
      />
      <ColorAlpha :select-color="selectColor" @change="onAlphaChange" />
      <div class="vue-colorful-last-control">
        <ColorDisplay :select-color="selectColor"></ColorDisplay>
        <div class="vue-color-ful-flex">
          <ColorInput
            :select-color="selectColor"
            @change="initRefHsv"
          ></ColorInput>
        </div>
        <ColorEyeDropper :color="selectColor" @on-eye-dropper="initRefHsv" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { convertHexToHsv, convertHsvToRgba, rgbaToHex } from "../utils/color";

defineOptions({
  name: "VueColorful",
});
const rawValue = defineModel<string>();
const {
  initRefHsv,
  onAlphaChange,
  onHueChange,
  onSaturationChange,
  refHsv,
  saturationColor,
  selectColor,
} = useColorful();

initRefHsv(rawValue.value!);

watch(selectColor, (color) => {
  rawValue.value = rgbaToHex(color);
});

function useColorful() {
  const refHsv = ref({
    h: 0,
    s: 0,
    v: 0,
  });
  const saturationColor = ref("");
  const alphaColor = ref(1);

  const selectColor = computed(() => {
    return convertHsvToRgba(refHsv.value, alphaColor.value);
  });

  function initRefHsv(rawColor: string) {
    refHsv.value = convertHexToHsv(rawColor);
    saturationColor.value = convertHsvToRgba(refHsv.value);
  }

  function onSaturationChange([s, v]: number[]) {
    refHsv.value.s = s;
    refHsv.value.v = v;
  }

  function onHueChange(h: number) {
    refHsv.value.h = h;
    saturationColor.value = convertHsvToRgba(refHsv.value);
  }

  function onAlphaChange(a: number) {
    alphaColor.value = a;
  }

  return {
    initRefHsv,
    onAlphaChange,
    onHueChange,
    onSaturationChange,
    refHsv,
    saturationColor,
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

.vue-colorful-last-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vue-colorful-control_tool {
  margin-top: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vue-color-ful-flex {
  flex: 1;
}
</style>
