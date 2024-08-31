<script setup lang="ts">
import { NewTask } from '@/api'
import { useNotification } from 'naive-ui'
import type { NotificationType } from 'naive-ui'

const notification = useNotification()

const manualUploadKey = ref('')
async function Upload(key: string) {
  let notifyType: NotificationType = 'error'
  let content: string = 'Upload failed'
  let meta: string

  if (!key) {
    meta = 'Please input the key of the video'
  } else {
    try {
      const res = await NewTask({
        video_key: key,
      })
      if (res.success) {
        notifyType = 'success'
        content = 'Upload success'
        meta = 'Task has been initiated'
      } else {
        meta = res.error?.message || 'Unknown error'
      }
    } catch (error) {
      meta = String(error) || 'Unknown error'
    }
  }

  notification[notifyType]({
    content: content,
    meta: meta,
    duration: 2500,
    keepAliveOnHover: true,
  })
}
</script>

<template>
  <NCard hoverable>
    <NSpace>
      <NInput
        v-model:value="manualUploadKey"
        type="text"
        placeholder="OSS video key"
        autosize
        style="min-width: 50vh"
      />
      <NButton type="warning" @click="Upload(manualUploadKey)">Manual Upload</NButton>
    </NSpace>
  </NCard>
</template>

<style scoped></style>
