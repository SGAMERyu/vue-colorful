<template>
  <div
    :style="{ background: props.color }"
    @click="onPointerClick"
    class="vue-colorful-gradient__pointer"
    ref="refReference"
  ></div>
  <div
    :style="floatingStyles"
    class="vue-colorful-gradient__popper"
    ref="refFloating"
    v-show="isPopper"
  >
    <Colorful v-model="refCurrentGradient" />
  </div>
</template>

<script lang="ts" setup>
import { offset, useFloating } from "@floating-ui/vue";
import { onClickOutside, useToggle } from "@vueuse/core";
import { ref, watch } from "vue";

interface Props {
  color: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "change", color: string): void;
}>();
const [isPopper, setIsPopper] = useToggle(false);
const refCurrentGradient = ref(props.color);
const refReference = ref(null);
const refFloating = ref(null);
const { floatingStyles, update } = useFloating(refReference, refFloating, {
  middleware: [offset(10)],
  placement: "right",
});

watch(refCurrentGradient, (val) => {
  emits("change", val);
});

onClickOutside(refFloating, () => setIsPopper(false));

function onPointerClick() {
  setIsPopper(true);
  update();
}
</script>

<style>
.vue-colorful-gradient__pointer {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  z-index: 2;
}
.vue-colorful-gradient__popper {
  background: #fff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
</style>
