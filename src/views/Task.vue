<script setup lang="ts">
const props = defineProps({
  videoKey: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div>
    {{ props.videoKey }}
  </div>
</template>

<style scoped></style>
