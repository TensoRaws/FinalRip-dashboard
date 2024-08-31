<script setup lang="ts">
import { darkTheme, lightTheme, useOsTheme } from 'naive-ui'

import Layout from '@/layout/Layout.vue'
import { themeOverrides } from '@/theme'

const osThemeRef = useOsTheme()
const theme = computed(() => {
  return osThemeRef.value === 'dark' ? darkTheme : lightTheme
})
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <Layout />
          </NNotificationProvider>
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
