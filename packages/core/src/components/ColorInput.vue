<template>
  <div class="vue-colorful-input__container">
    <input @input="onInput" class="vue-colorful-input" v-model="refText" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { isValidHexColor, rgbaToHex } from "../utils/color";

interface Props {
  selectColor: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", color: string): void;
}>();
const refText = ref("");

watch(
  () => props.selectColor,
  () => {
    const hexText = rgbaToHex(props.selectColor);
    if (hexText === refText.value) return;
    refText.value = hexText;
  },
  { immediate: true },
);

function onInput() {
  const isValid = isValidHexColor(refText.value);
  if (!isValid) return;
  emits("change", refText.value);
}
</script>

<style>
.vue-colorful-input__container {
  width: 100%;
  border-radius: 4px;
  padding: 0px;
  border: 1px solid #e4e4e7;
  color: #0f172a;
}

.vue-colorful-input {
  width: 100%;
  padding: 0 8px;
  border: none;
  outline: none;
  color: #0f172a;
  font-weight: 500;
}
</style>
