<script setup lang="ts">
import { DownloadOutline } from '@vicons/ionicons5'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton, useDialog, useMessage, useNotification } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { VNodeChild } from 'vue'
import { h } from 'vue'

import { ClearTask, GetTaskList, StartTask } from '@/api'
import { useSettingStore } from '@/store/setting'
import { renderIcon } from '@/util/util'

const { script, encodeParam } = storeToRefs(useSettingStore())

const notification = useNotification()
const dialog = useDialog()
const message = useMessage()

interface pendingTask {
  key: string
  create_at: string
  url: string
}

const columns: DataTableColumns<pendingTask> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: 'Video',
    key: 'key',
  },
  {
    title: 'Date',
    key: 'create_at',
  },
  {
    title: 'Download',
    key: 'download',
    render: renderDownloadButton,
  },
]

const tasks = ref<pendingTask[]>([])
onActivated(() => {
  fetchPendingTasks()
})
function fetchPendingTasks(): void {
  console.log('Fetch pending tasks...')
  GetTaskList({
    pending: true,
    running: false,
    completed: false,
  })
    .then((res) => {
      if (res.success) {
        const temp: pendingTask[] = []
        res.data?.forEach((task) => {
          temp.push({
            key: task.key,
            create_at: task.create_at,
            url: task.url,
          })
        })
        tasks.value = temp
      } else {
        console.error(res)
        notification['error']({
          content: 'Fetch task list failed',
          meta: String(res) || 'Unknown error',
        })
      }
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        content: 'Fetch task list failed',
        meta: String(err) || 'Unknown error',
      })
    })
}

function renderDownloadButton(row: pendingTask): VNodeChild {
  return h(
    NButton,
    {
      text: true,
      onClick: () => window.open(row.url, '_blank'),
    },
    {
      default: renderIcon(DownloadOutline, {
        size: 20,
      }),
    },
  )
}

const checkedRowKeys = ref<DataTableRowKey[]>([])
function updateCheckedRowKeys(keys: DataTableRowKey[]): void {
  checkedRowKeys.value = keys
}

function submitTasks(): void {
  if (checkedRowKeys.value.length === 0) {
    message.warning('Please select at least one task')
    return
  }

  dialog.success({
    title: 'Start Selected Task?',
    positiveText: 'YES',
    negativeText: 'NO',
    maskClosable: false,
    onMaskClick: () => {
      message.warning('Cannot close')
    },
    onPositiveClick: () => {
      checkedRowKeys.value.forEach((key) => {
        console.log(key.toString())
        StartTask({
          encode_param: encodeParam.value,
          script: script.value,
          video_key: key.toString(),
        })
          .then((res) => {
            if (res.success) {
              notification['success']({
                content: 'Task started successfully',
                meta: 'Task: ' + key,
                duration: 2500,
                keepAliveOnHover: true,
              })
            } else {
              notification['error']({
                content: 'Task start failed',
                meta: res.error?.message || 'Unknown error',
              })
            }

            fetchPendingTasks()
          })
          .catch((err) => {
            console.error(err)
            notification['error']({
              content: 'Task start failed',
              meta: String(err) || 'Unknown error',
            })
          })
      })
    },
  })
}

function deleteTasks(): void {
  if (checkedRowKeys.value.length === 0) {
    message.warning('Please select at least one task')
    return
  }

  dialog.warning({
    title: 'Delete Selected Task?',
    positiveText: 'YES',
    negativeText: 'NO',
    maskClosable: false,
    onMaskClick: () => {
      message.warning('Cannot close')
    },
    onPositiveClick: () => {
      checkedRowKeys.value.forEach((key) => {
        ClearTask({
          video_key: key.toString(),
        })
          .then((res) => {
            if (res.success) {
              notification['success']({
                content: 'Task deleted successfully',
                meta: 'Task: ' + key,
                duration: 2500,
                keepAliveOnHover: true,
              })
            } else {
              notification['error']({
                content: 'Delete task failed',
                meta: res.error?.message || 'Unknown error',
              })
            }

            fetchPendingTasks()
          })
          .catch((err) => {
            console.error(err)
            notification['error']({
              content: 'Delete task failed',
              meta: String(err) || 'Unknown error',
            })
          })
      })
    },
  })
}
</script>

<template>
  <NCard>
    <NSpace vertical>
      <NSpace justify="space-between">
        <NGradientText size="18" type="warning"> Pending </NGradientText>
        <NSpace>
          <NButton type="error" @click="deleteTasks"> Delete </NButton>
          <NButton type="primary" @click="submitTasks"> Submit </NButton>
        </NSpace>
      </NSpace>
      <NDataTable
        :columns="columns"
        :data="tasks"
        :row-key="(record: any) => record.key"
        max-height="70vh"
        virtual-scroll
        striped
        @update:checked-row-keys="updateCheckedRowKeys"
      />
    </NSpace>
  </NCard>
</template>

<style scoped></style>
