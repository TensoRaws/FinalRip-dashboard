<script setup lang="ts">
import { useOsTheme, darkTheme, lightTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/settings'

const osThemeRef = useOsTheme()
const theme = computed(() => {
  return osThemeRef.value === 'dark' ? darkTheme : lightTheme
})

const { collapsed } = storeToRefs(useSettingsStore())
</script>

<template>
  <NConfigProvider :theme="theme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <NLayout has-sider position="absolute" :native-scrollbar="false">
              <NLayoutSider
                collapse-mode="width"
                :collapsed-width="64"
                :width="200"
                :collapsed="collapsed"
                show-trigger
                :native-scrollbar="false"
                @collapse="collapsed = true"
                @expand="collapsed = false"
              >
                <Menu v-model:collapsed="collapsed" />
              </NLayoutSider>
              <NLayout :native-scrollbar="false">
                <NLayoutHeader class="p-5 h-[8vh]">
                  <Header />
                </NLayoutHeader>
                <NLayoutContent>
                  <NLayout :native-scrollbar="false" class="p-5 h-[92vh]">
                    <RouterView v-slot="{ Component }">
                      <Transition mode="out-in">
                        <KeepAlive>
                          <component :is="Component" />
                        </KeepAlive>
                      </Transition>
                    </RouterView>
                  </NLayout>
                </NLayoutContent>
              </NLayout>
            </NLayout>
          </NNotificationProvider>
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
