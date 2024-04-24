<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="w-[200px]"><VueColorful v-model="color" /></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const color = ref("#ff0000");
</script>
