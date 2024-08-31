<script setup lang="ts">
import { ArchiveOutline } from '@vicons/ionicons5'
import axios from 'axios'
import type { NotificationType } from 'naive-ui'
import { type UploadCustomRequestOptions, useNotification } from 'naive-ui'

import { GetOSSPresignedURL, NewTask } from '@/api'

const notification = useNotification()

const manualUploadKey = ref('')

// init video by key
async function newTask(key: string): Promise<void> {
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
        meta = 'Task: ' + key
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

// upload video
function uploadVideo(options: UploadCustomRequestOptions): void {
  console.log(options)

  GetOSSPresignedURL({
    video_key: options.file.name,
  })
    .then((res) => {
      let uploadURL: string
      if (res.success) {
        uploadURL = String(res.data?.url)
      } else {
        console.error(res.error?.message || 'Unknown error: Get presigned URL failed')
        notification['error']({
          content: 'Get presigned URL failed',
          meta: res.error?.message || 'Unknown error',
          duration: 2500,
          keepAliveOnHover: true,
        })
        return
      }

      axios
        .put(uploadURL, options.file.file, {
          headers: {
            'Content-Type': options.file.type,
          },
          onUploadProgress: (progressEvent) => {
            options.onProgress({
              percent: Math.round((progressEvent.loaded / Number(progressEvent.total)) * 100),
            })
          },
        })
        .then(() => {
          console.log(options.file.name)
          newTask(options.file.name)
        })
        .catch((error) => {
          throw error
        })
    })
    .catch((error) => {
      console.error(error)
      notification['error']({
        content: 'Upload OSS failed',
        meta: String(error) || 'Unknown error',
        duration: 2500,
        keepAliveOnHover: true,
      })
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
        style="min-width: 100vh"
      />
      <NButton type="warning" @click="newTask(manualUploadKey)">Manual Upload</NButton>
    </NSpace>
  </NCard>
  <br />
  <NCard hoverable>
    <NUpload multiple directory-dnd :custom-request="uploadVideo">
      <NUploadDragger>
        <div style="margin-bottom: 12px">
          <NIcon size="48" :depth="3">
            <ArchiveOutline />
          </NIcon>
        </div>
        <NText style="font-size: 16px"> Click or drag files to this area to upload </NText>
        <NP depth="3" style="margin: 8px 0 0 0"> Please upload the valid video file </NP>
      </NUploadDragger>
    </NUpload>
  </NCard>
</template>

<style scoped></style>
