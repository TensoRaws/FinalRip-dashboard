<script setup lang="ts">
import { DownloadOutline } from '@vicons/ionicons5'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { NButton } from 'naive-ui'
import { h, type VNodeChild } from 'vue'

import { GetTaskList } from '@/api'
import { renderIcon } from '@/util/util'

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
onMounted(() => {
  fetchPendingTasks()
})
function fetchPendingTasks(): void {
  GetTaskList({
    pending: true,
    running: false,
    completed: false,
  })
    .then((res) => {
      tasks.value = []
      res.data?.forEach((task) => {
        tasks.value.push({
          key: task.key,
          create_at: task.create_at,
          url: task.url,
        })
      })
    })
    .catch((err) => {
      console.error(err)
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
  console.log(checkedRowKeys.value)
}

function deleteTasks(): void {
  console.log(checkedRowKeys.value)
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
