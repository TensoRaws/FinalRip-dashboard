<template>
  <div class="h-screen">
    <div class="p-5 h-[8vh]">
      <div v-if="!props.collapsed" class="ml-10">
        <NGradientText size="20"> FinalRip </NGradientText>
      </div>
      <div v-else>
        <NGradientText size="20"> FR </NGradientText>
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

<script setup lang="ts">
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { CloudUploadOutline, PlayCircleOutline, ListCircleOutline } from '@vicons/ionicons5'
import { DashboardOutlined } from '@vicons/antd'
import { RouterLink } from 'vue-router'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
const activeKey = ref<string | null>(null)

function renderIcon(icon: Component) {
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
