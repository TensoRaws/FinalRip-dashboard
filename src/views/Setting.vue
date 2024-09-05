<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useSettingStore } from '@/store/setting'

const {
  apiURL,
  apiToken,
  templateRepo,
  githubToken,
  videoCutCustom,
  videoEncodeCustom,
  videoMergeCustom,
} = storeToRefs(useSettingStore())
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
          placeholder="ghp_dddddddddweebgyserhgahhrr"
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
    <NCard hoverable title="Custom Worker" size="small">
      <NSpace vertical>
        <NSpace>
          <div class="w-[50px]"> Cut: </div>
          <NInput v-model:value="videoCutCustom" style="width: 40vh" placeholder="default" />
        </NSpace>
        <NSpace>
          <div class="w-[50px]"> Encode: </div>
          <NInput v-model:value="videoEncodeCustom" style="width: 40vh" placeholder="default" />
        </NSpace>
        <NSpace>
          <div class="w-[50px]"> Merge: </div>
          <NInput v-model:value="videoMergeCustom" style="width: 40vh" placeholder="default" />
        </NSpace>
      </NSpace>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
