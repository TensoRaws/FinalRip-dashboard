<script setup lang="ts">
import { useNotification } from 'naive-ui'

import { Ping } from '@/api'
import router from '@/router'

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
        duration: 2500,
        keepAliveOnHover: true,
      })
    })
})
</script>

<template><div class="size-80">dashboard</div></template>

<style scoped></style>
