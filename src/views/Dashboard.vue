<script setup lang="ts">
import { useNotification } from 'naive-ui'

import { Ping } from '@/api'
import router from '@/router'
import List from '@/views/List.vue'

const notification = useNotification()

onMounted(() => {
  Ping()
    .then((res) => {
      if (!res.success) {
        router.push('/setting')
        notification['error']({
          content: 'Server is not available',
          meta: res.error?.message || 'Unknown error',
          duration: 2500,
          keepAliveOnHover: true,
        })
      }
    })
    .catch((error) => {
      router.push('/setting')
      notification['error']({
        content: 'Server is not available',
        meta: String(error) || 'Unknown error',
      })
    })
})
</script>

<template>
  <List />
</template>

<style scoped></style>
