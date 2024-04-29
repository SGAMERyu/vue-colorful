<template>
  <button
    :style="eyedropperStyle"
    @click="handleCopyColor"
    class="vue-colorful-eyedropper"
  >
    <svg
      @click="changeColor"
      class="vue-colorful-eyedropper__icon"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.45711 18.9539L15.0208 10.3902L13.6066 8.97596L5.04289 17.5397L6.45711 18.9539ZM12.1924 7.56174L10.7782 6.14753L12.1924 4.73331L13.9602 6.50108L16.7886 3.67265C17.1791 3.28213 17.8123 3.28213 18.2028 3.67265L20.3241 5.79397C20.7146 6.1845 20.7146 6.81766 20.3241 7.20819L17.4957 10.0366L19.2635 11.8044L17.8492 13.2186L16.435 11.8044L7.24264 20.9968H3V16.7541L12.1924 7.56174Z"
      ></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useClipboard, useEyeDropper } from "@vueuse/core";
import { CSSProperties, computed } from "vue";

interface Props {
  color: string;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "onEyeDropper", value: string): void;
}>();
const { copy } = useClipboard();
const { open: openEyeDropper } = useEyeDropper();

const eyedropperStyle = computed<CSSProperties>(() => {
  return {
    background: props.color,
  };
});

function handleCopyColor() {
  copy(props.color);
}

async function changeColor() {
  const data = await openEyeDropper();
  if (data) {
    emits("onEyeDropper", data.sRGBHex);
  }
}
</script>

<style>
.vue-colorful-eyedropper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.vue-colorful-eyedropper__icon {
  display: block;
  width: 18px;
  height: 18px;
  color: white;
}
</style>
