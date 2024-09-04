<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useSettingStore } from '@/store/setting'
const { apiURL, apiToken, templateRepo, githubToken } = storeToRefs(useSettingStore())
</script>

<template>
  <NSpace vertical>
    <NCard title="API" size="small">
      <NSpace vertical>
        <NInput v-model:value="apiURL" placeholder="API URL: http://localhost:8848" />
        <NInput v-model:value="apiToken" placeholder="API Token: xxxxxx" />
      </NSpace>
    </NCard>
    <NCard title="Github Token" size="small">
      <NInput v-model:value="githubToken" placeholder="ghp_dddddddddweebgyserhgahhrr" />
    </NCard>
    <NCard title="Template Repo" size="small">
      <NInput v-model:value="templateRepo" placeholder="TensoRaws/vs-playground" />
    </NCard>
  </NSpace>
</template>

<style scoped></style>
