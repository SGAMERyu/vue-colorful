<template>
  <div class="vue-colorful-alpha">
    <div :style="alphaStyle" class="vue-colorful-alpha__gradient">
      <ColorPointer
        :override-position="{ top: '50%' }"
        :style="pointerStyle"
        v-model:left="pointerLeft"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties, computed, ref, watch } from "vue";

import { extractRGBAValues } from "../utils/color";

interface Props {
  selectColor: string;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", colors: number): void;
}>();
const pointerLeft = ref<number>(1);

watch(pointerLeft, (left) => {
  emits("change", parseFloat(left.toFixed(2)));
});

const alphaStyle = computed<CSSProperties>(() => {
  const rgba = extractRGBAValues(props.selectColor);
  if (!rgba) {
    return {
      backgroundImage: "transparent",
    };
  }
  const { b, g, r } = rgba;
  const fromColor = `rgba(${r},${g},${b},0)`;
  const toColor = `rgba(${r},${g},${b}, 1)`;
  return {
    backgroundImage: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
  };
});

const pointerStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: props.selectColor,
  };
});
</script>

<style>
.vue-colorful-alpha {
  position: relative;
  width: 100%;
  height: 16px;
  border-radius: 16px;
  background-color: #fff;
  background-image: url("../icon/alpha.svg");
}

.vue-colorful-alpha__gradient {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
}
</style>
