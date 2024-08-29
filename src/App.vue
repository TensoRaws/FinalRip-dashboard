<script setup lang="ts">
import { useOsTheme, darkTheme, lightTheme } from 'naive-ui'
import { ref } from 'vue'
const osThemeRef = useOsTheme()
const theme = computed(() => {
  return osThemeRef.value === 'dark' ? darkTheme : lightTheme
})

const collapsed = ref<boolean>(false)
</script>

<template>
  <NConfigProvider :theme="theme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NMessageProvider>
          <NNotificationProvider>
            <NLayout has-sider position="absolute" :native-scrollbar="false">
              <NLayoutSider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="200"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
              >
                <Menu v-model:collapsed="collapsed" />
              </NLayoutSider>
              <NLayout>
                <NLayoutHeader bordered>
                  <Header />
                </NLayoutHeader>
                <NLayoutContent>
                  <RouterView v-slot="{ Component }">
                    <Transition mode="out-in">
                      <KeepAlive>
                        <component :is="Component" />
                      </KeepAlive>
                    </Transition>
                  </RouterView>
                </NLayoutContent>
                <NLayoutFooter position="absolute">
                  <Footer />
                </NLayoutFooter>
              </NLayout>
            </NLayout>
          </NNotificationProvider>
        </NMessageProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
