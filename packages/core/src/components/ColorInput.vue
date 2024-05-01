<template>
  <div class="vue-colorful-input">{{ hexText }}</div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { rgbaToHex } from "../utils/color";

interface Props {
  selectColor: string;
}

const props = defineProps<Props>();
const hexText = computed(() => {
  return rgbaToHex(props.selectColor);
});
</script>
