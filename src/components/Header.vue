<script setup lang="ts">
import { LogoGithub } from '@vicons/ionicons5'
import { ContrastSharp, MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { storeToRefs } from 'pinia'

import { useSettingStore } from '@/store/setting'

const { darkMode } = storeToRefs(useSettingStore())

class openWebsite {
  static async github(): Promise<void> {
    const githubLink = 'https://github.com/TensoRaws/FinalRip'

    window.open(githubLink, '_blank')
  }
}

function handleDarkMode(): void {
  if (darkMode.value === 'system') {
    darkMode.value = 'light'
  } else if (darkMode.value === 'light') {
    darkMode.value = 'dark'
  } else {
    darkMode.value = 'system'
  }
}
</script>

<template>
  <div>
    <NFlex justify="end">
      <NButton text size="large" @click="handleDarkMode">
        <NIcon size="26">
          <div v-if="darkMode === 'light'">
            <SunnyOutline />
          </div>
          <div v-else-if="darkMode === 'dark'">
            <MoonOutline />
          </div>
          <div v-else>
            <ContrastSharp />
          </div>
        </NIcon>
      </NButton>
      <NButton text size="large" @click="openWebsite.github()">
        <NIcon size="26">
          <LogoGithub />
        </NIcon>
      </NButton>
    </NFlex>
  </div>
</template>
