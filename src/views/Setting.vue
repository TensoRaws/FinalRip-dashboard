<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useSettingStore } from '@/store/setting'
const { apiURL, apiToken } = storeToRefs(useSettingStore())
</script>

<template>
  <NCard title="API">
    <NSpace vertical>
      <NInput v-model:value="apiURL" placeholder="API URL: http://localhost:8848" />
      <NInput v-model:value="apiToken" placeholder="API Token: xxxxxx" />
    </NSpace>
  </NCard>
</template>

<style scoped></style>
