<template>
  <div class="w-screen h-screen flex items-center justify-center gap-[24px]">
    <div class="w-[200px]"><VueColorful v-model="color" /></div>
    <div class="w-[400px]"><VueColorGradient v-model="gradients" /></div>
    <div class="w-[50px]"><VueColorAngle v-model="angle" /></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const color = ref("#ff0000");
const gradients = ref(["#6b6b89", "#3b3bbf"]);
const angle = ref(90);
</script>
