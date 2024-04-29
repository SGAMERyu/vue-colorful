<template>
  <div
    @click="onInteractiveClick"
    class="vue-colorful-interactive"
    ref="refContainer"
  >
    <div
      :style="pointerStyle"
      @mousedown="onPointerClick"
      class="vue-colorful-pointer"
    >
      <div :style="fillStyle" class="vue-colorful-fill"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties, computed, ref } from "vue";

interface Props {
  overridePosition: Record<string, string>;
  style: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
  overridePosition: () => ({}),
  style: () => ({}),
});

const modelLeft = defineModel<number>("left", { default: 0 });
const modelTop = defineModel<number>("top", { default: 0 });
const { onInteractiveClick, onPointerClick, pointerStyle, refContainer } =
  usePointerMove();

const fillStyle = computed(() => {
  return {
    ...props.style,
  };
});

function usePointerMove() {
  const refMove = ref({
    isDrag: false,
    startLeft: 0,
    startTop: 0,
  });
  const refContainer = ref<HTMLElement | null>();

  const pointerStyle = computed(() => {
    return {
      left: modelLeft.value * 100 + "%",
      top: modelTop.value * 100 + "%",
      ...props.overridePosition,
    };
  });

  const _updateMovePosition = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { height, left, top, width } =
      refContainer.value!.getBoundingClientRect();
    let xPosition = (clientX - left) / width;
    let yPosition = (clientY - top) / height;

    xPosition = Math.max(0, Math.min(1, xPosition));
    yPosition = Math.max(0, Math.min(1, yPosition));

    modelLeft.value = xPosition;
    modelTop.value = yPosition;
  };

  function onInteractiveClick(event: MouseEvent) {
    if (refMove.value.isDrag) return;
    _updateMovePosition(event);
  }

  function onPointerClick(event: MouseEvent) {
    event.preventDefault();
    refMove.value.isDrag = true;
    document.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseup", onPointerLeave);
  }

  function onPointerMove(event: MouseEvent) {
    _updateMovePosition(event);
  }

  function onPointerLeave() {
    refMove.value.isDrag = false;
    document.removeEventListener("mousemove", onPointerMove);
    document.removeEventListener("mouseup", onPointerLeave);
  }

  return {
    onInteractiveClick,
    onPointerClick,
    pointerStyle,
    refContainer,
    refMove,
  };
}
</script>

<style>
.vue-colorful-interactive {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  outline: none;
  touch-action: none;
}
.vue-colorful-pointer {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #fff;
  box-shadow:
    0 10px 15px -3px #0000001a,
    0 4px 6px -4px #0000001a;
  z-index: 3;
}
.vue-colorful-fill {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
}
</style>
