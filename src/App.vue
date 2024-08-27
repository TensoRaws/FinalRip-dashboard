<script setup lang="ts">
import { useOsTheme, darkTheme, lightTheme } from 'naive-ui'

const osThemeRef = useOsTheme()
const theme = computed(() => {
  return osThemeRef.value === 'dark' ? darkTheme : lightTheme
})
</script>

<template>
  <NConfigProvider :theme="theme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <RouterView v-slot="{ Component }">
              <Transition mode="out-in">
                <KeepAlive>
                  <component :is="Component" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </NNotificationProvider>
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style scoped></style>
