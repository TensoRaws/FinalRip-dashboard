<script setup lang="ts">
import { DashboardOutlined } from '@vicons/antd'
import { CloudUploadOutline, Code, ListCircleOutline, PlayCircleOutline } from '@vicons/ionicons5'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import type { Component, VNodeChild } from 'vue'
import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
const activeKey = ref<string | null>(null)

function renderIcon(icon: Component): () => VNodeChild {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/',
          },
        },
        { default: () => 'Dashboard' },
      ),
    key: 'Dashboard',
    icon: renderIcon(DashboardOutlined),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/upload',
          },
        },
        { default: () => 'Upload' },
      ),
    key: 'Upload',
    icon: renderIcon(CloudUploadOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/code',
          },
        },
        { default: () => 'Code' },
      ),
    key: 'Code',
    icon: renderIcon(Code),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/start',
          },
        },
        { default: () => 'Start' },
      ),
    key: 'Start',
    icon: renderIcon(PlayCircleOutline),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/list',
          },
        },
        { default: () => 'List' },
      ),
    key: 'List',
    icon: renderIcon(ListCircleOutline),
  },
]
</script>

<template>
  <div class="h-screen">
    <div class="pt-[2vh] h-[6vh]">
      <div v-if="!props.collapsed" class="ml-14">
        <NGradientText size="18"> FinalRip </NGradientText>
      </div>
      <div v-else class="ml-6">
        <NGradientText size="18"> R </NGradientText>
      </div>
    </div>
    <NMenu
      v-model:value="activeKey"
      :collapsed="props.collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </div>
</template>
