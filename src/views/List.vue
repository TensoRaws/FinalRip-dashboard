<script setup lang="ts">
import { CloudDownloadOutline } from '@vicons/ionicons5'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton, useDialog, useMessage, useNotification } from 'naive-ui'
import { storeToRefs } from 'pinia'

import { ClearTask, GetTaskList } from '@/api'
import { useSettingStore } from '@/store/setting'
import { renderIconButton, renderStatusButton } from '@/util/render'

const { checkedPendingBox, checkedRunningBox, checkedCompletedBox } = storeToRefs(useSettingStore())

const notification = useNotification()
const dialog = useDialog()
const message = useMessage()

interface Task {
  create_at: string
  encode_key: string
  encode_param: string
  encode_url: string
  key: string
  script: string
  status: string
  url: string
}

const columns: DataTableColumns<Task> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: 'Video',
    key: 'key',
    fixed: 'left',
  },
  {
    title: 'Status',
    key: 'status',
    render: (row: Task) => renderStatusButton(row.status, row.key),
  },
  {
    title: 'Date',
    key: 'create_at',
  },
  {
    title: 'Download',
    key: 'download',
    render: (row: Task) => renderIconButton(CloudDownloadOutline, row.encode_url),
  },
]

const tasks = ref<Task[]>([])
onActivated(() => {
  fetchTasks()
})
function fetchTasks(): void {
  console.log('Fetch pending tasks...')
  GetTaskList({
    pending: checkedPendingBox.value,
    running: checkedRunningBox.value,
    completed: checkedCompletedBox.value,
  })
    .then((res) => {
      if (res.success) {
        const temp: Task[] = []
        res.data?.forEach((task) => {
          temp.push({
            create_at: task.create_at,
            encode_key: task.encode_key,
            encode_param: task.encode_param,
            encode_url: task.encode_url,
            key: task.key,
            script: task.script,
            status: task.status,
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

const checkedRowKeys = ref<DataTableRowKey[]>([])
function updateCheckedRowKeys(keys: DataTableRowKey[]): void {
  checkedRowKeys.value = keys
}

function deleteTasks(): void {
  if (checkedRowKeys.value.length === 0) {
    message.warning('Please select at least one task')
    return
  }

  dialog.warning({
    title: 'Delete Selected Task?',
    positiveText: 'DELETE',
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

            fetchTasks()
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
        <NSpace item-style="display: flex;" align="center">
          <NCheckbox v-model:checked="checkedPendingBox" @update-checked="fetchTasks">
            <NGradientText type="warning"> Pending</NGradientText>
          </NCheckbox>
          <NCheckbox v-model:checked="checkedRunningBox" @update-checked="fetchTasks">
            <NGradientText type="info"> Running</NGradientText>
          </NCheckbox>
          <NCheckbox v-model:checked="checkedCompletedBox" @update-checked="fetchTasks">
            <NGradientText type="success"> Completed</NGradientText>
          </NCheckbox>
        </NSpace>
        <NSpace>
          <NButton type="error" @click="deleteTasks"> Delete </NButton>
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
