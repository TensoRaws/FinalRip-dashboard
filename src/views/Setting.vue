<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useSettingStore } from '@/store/setting'

const { apiURL, apiToken, templateRepo, githubToken } = storeToRefs(useSettingStore())
</script>

<template>
  <NSpace vertical>
    <NCard hoverable title="Server API" size="small">
      <NSpace vertical>
        <NSpace>
          <div class="w-[50px]"> URL: </div>
          <NInput v-model:value="apiURL" style="width: 40vh" placeholder="http://localhost:8848" />
        </NSpace>
        <NSpace>
          <div class="w-[50px]"> Token: </div>
          <NInput
            v-model:value="apiToken"
            style="width: 40vh"
            type="password"
            show-password-on="click"
            placeholder="xxxxxx"
          />
        </NSpace>
      </NSpace>
    </NCard>
    <NCard hoverable title="Github API" size="small">
      <NSpace>
        <div class="w-[50px]"> Token: </div>
        <NInput
          v-model:value="githubToken"
          style="width: 40vh"
          type="password"
          show-password-on="click"
          placeholder="ghp_ddddddddd1111111114514"
        />
      </NSpace>
    </NCard>
    <NCard hoverable title="Template Repo" size="small">
      <NSpace>
        <div class="w-[50px]"> Name: </div>
        <NInput
          v-model:value="templateRepo"
          style="width: 40vh"
          placeholder="TensoRaws/vs-playground"
        />
      </NSpace>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
