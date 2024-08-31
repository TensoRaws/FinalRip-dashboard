<script setup lang="ts">
import { NewTask } from '@/api'
import { useNotification } from 'naive-ui'

const notification = useNotification()

const manualUploadKey = ref('')
async function Upload(key: string) {
  if (!key) {
    console.error('Please input the key of the video')
    notification['error']({
      content: 'Upload failed',
      meta: 'Please input the key of the video',
      duration: 2500,
      keepAliveOnHover: true,
    })
    return
  }

  try {
    const res = await NewTask({
      video_key: key,
    })
    console.log(res)
    if (res.success) {
      console.log('Upload success')
      notification['success']({
        content: 'Upload success',
        meta: 'Task has been initiated',
        duration: 2500,
        keepAliveOnHover: true,
      })
    } else {
      console.error('Upload failed: ' + res.error?.message)
      notification['error']({
        content: 'Upload failed',
        meta: res.error?.message,
        duration: 2500,
        keepAliveOnHover: true,
      })
    }
  } catch (error) {
    console.error(error)
    notification['error']({
      content: 'Upload failed',
      meta: String(error),
      duration: 2500,
      keepAliveOnHover: true,
    })
  }
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
