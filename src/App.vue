<script setup lang="ts">
import { useOsTheme, darkTheme, lightTheme } from 'naive-ui'
import { themeOverrides } from '@/theme'
import Layout from '@/layout/Layout.vue'

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
