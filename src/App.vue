<script setup lang="ts">
import { useOsTheme, darkTheme, lightTheme } from 'naive-ui'
import { ref } from 'vue'
import Menu from '@/components/Menu.vue'
const osThemeRef = useOsTheme()
const theme = computed(() => {
  return osThemeRef.value === 'dark' ? darkTheme : lightTheme
})

const collapsed = ref<boolean>(true)
</script>

<template>
  <NConfigProvider :theme="theme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <NSpace vertical>
              <NLayout has-sider>
                <NLayoutSider
                  bordered
                  collapse-mode="width"
                  :collapsed-width="64"
                  :width="240"
                  :collapsed="collapsed"
                  show-trigger
                  @collapse="collapsed = true"
                  @expand="collapsed = false"
                >
                  <Menu v-model:collapsed="collapsed" />
                </NLayoutSider>
                <NLayout>
                  <NLayoutContent>
                    <RouterView v-slot="{ Component }">
                      <Transition mode="out-in">
                        <KeepAlive>
                          <component :is="Component" />
                        </KeepAlive>
                      </Transition>
                    </RouterView>
                  </NLayoutContent>
                </NLayout>
              </NLayout>
            </NSpace>
          </NNotificationProvider>
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style scoped></style>
