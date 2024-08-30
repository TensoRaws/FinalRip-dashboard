<script setup lang="ts">
import { LogoGithub } from '@vicons/ionicons5'

class openWebsite {
  static async github(): Promise<void> {
    const githubLink = 'https://github.com/TensoRaws/FinalRip'

    window.open(githubLink, '_blank')
  }
}
</script>

<template>
  <NFlex justify="end">
    <NGradientText size="18"> a distributed video processing tool </NGradientText>
    <NButton text size="large" @click="openWebsite.github()">
      <NIcon size="28">
        <LogoGithub />
      </NIcon>
    </NButton>
  </NFlex>
</template>
