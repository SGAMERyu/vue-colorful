<template>
  <div data-vue-colorful class="vue-colorful-panel">
      <ColorPanel></ColorPanel>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "VueColorful",
});
</script>

<style>
.vue-colorful-panel {
  display: flex;
}
</style>
