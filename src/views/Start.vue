<script setup lang="ts">
import { DownloadOutline } from '@vicons/ionicons5'
import { type DataTableColumns, NButton } from 'naive-ui'
import { h, type VNodeChild } from 'vue'

import { renderIcon } from '@/util/util'

interface Task {
  key: string
  url: string
  create_at: string
}

function renderDownloadButton(row: Task): VNodeChild {
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

const tasks = ref<Task[]>([
  {
    key: '1example.comexample.com',
    url: 'https://example.com',
    create_at: '2021-09-01',
  },
  {
    key: '2',
    url: 'https://example.com',
    create_at: '2021-09-01',
  },
  {
    key: '3',
    url: 'https://example.com',
    create_at: '2021-09-01',
  },
  {
    key: '4',
    url: 'https://example.com',
    create_at: '2021-09-01',
  },
])
const selectedRows = ref<Task[]>([])

const columns: DataTableColumns<Task> = [
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

const submitTasks = (): void => {
  if (selectedRows.value.length > 0) {
    console.log('Submitted tasks:', selectedRows.value)
    // Here you can add the logic to submit the selected tasks
  } else {
    console.log('No tasks selected')
  }
}
</script>

<template>
  <NCard>
    <NSpace vertical>
      <NSpace justify="space-between">
        <NGradientText size="18" type="warning"> Pending </NGradientText>
        <NSpace>
          <NButton type="error" @click="submitTasks"> Delete </NButton>
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
      />
    </NSpace>
  </NCard>
</template>

<style scoped></style>
