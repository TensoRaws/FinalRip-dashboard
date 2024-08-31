<script setup lang="ts">
import { ArchiveOutline } from '@vicons/ionicons5'
import axios from 'axios'
import type { NotificationType } from 'naive-ui'
import { type UploadCustomRequestOptions, useNotification } from 'naive-ui'

import { GetOSSPresignedURL, NewTask } from '@/api'

const notification = useNotification()

const manualUploadKey = ref('')

// init video by key
async function newTask(key: string) {
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

// upload video
async function uploadVideo(options: UploadCustomRequestOptions): Promise<void> {
  console.log(options)

  let uploadURL: string
  const key = options.file.name
  try {
    const res = await GetOSSPresignedURL({
      video_key: key,
    })
    console.log(res)

    if (res.success) {
      uploadURL = String(res.data?.url)
    } else {
      console.error(res.error?.message || 'Unknown error')
      return
    }
  } catch (error) {
    console.error(error)
    return
  }

  axios
    .put(uploadURL, options.file, {
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
      console.log('Upload success')
    })
    .catch((error) => {
      console.error(error)
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
  <NSpace justify="space-between">
    <NCard hoverable>
      <NUpload multiple directory-dnd :custom-request="uploadVideo">
        <NUploadDragger>
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <ArchiveOutline />
            </NIcon>
          </div>
          <NText style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </NText>
          <NP depth="3" style="margin: 8px 0 0 0">
            请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
          </NP>
        </NUploadDragger>
      </NUpload>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
