<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { h } from 'vue'
interface Task {
  key: string
  url: string
}

const tasks = ref<Task[]>([
  {
    key: '1',
    url: 'https://example.com',
  },
  {
    key: '2',
    url: 'https://example.com',
  },
  {
    key: '3',
    url: 'https://example.com',
  },
  {
    key: '4',
    url: 'https://example.com',
  },
])
const selectedRows = ref<Task[]>([])

const columns: DataTableColumns<Task> = [
  {
    type: 'selection',
    fixed: 'left',
  },
  {
    title: 'Key',
    key: 'key',
    fixed: 'left',
  },
  {
    title: 'URL',
    key: 'url',
    fixed: 'right',
  },
]

const fetchTasks = async () => {
  try {
    const response = await fetch('/api/v1/task/list', {
      headers: {
        Authorization: 'Bearer 2f68dbbf-519d-4f01-9636-e2421b68f379',
      },
    })
    const data = await response.json()
    if (data.success) {
      tasks.value = data.data
    } else {
      console.error('Failed to fetch tasks:', data.error?.message)
    }
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const submitTasks = () => {
  if (selectedRows.value.length > 0) {
    console.log('Submitted tasks:', selectedRows.value)
    // Here you can add the logic to submit the selected tasks
  } else {
    console.log('No tasks selected')
  }
}

onMounted(fetchTasks)
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
        :row-key="(record) => record.key"
        max-height="70vh"
        :scroll-x="1800"
        virtual-scroll striped
      />
    </NSpace>
  </NCard>
</template>

<style scoped></style>
