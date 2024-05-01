<template>
  <div
    :style="displayStyle"
    @click="copy(selectColor)"
    class="vue-colorful-display"
  ></div>
</template>

<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
import { CSSProperties, computed } from "vue";

interface Props {
  selectColor: string;
}

const props = defineProps<Props>();
const { copy } = useClipboard();
const displayStyle = computed<CSSProperties>(() => {
  return {
    background: props.selectColor,
  };
});
</script>
<style>
.vue-colorful-display {
  width: 24px;
  height: 24px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
