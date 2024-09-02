import { NButton, NIcon } from 'naive-ui'
import type { Component, VNodeChild } from 'vue'
import { h } from 'vue'

import router from '@/router'

export function renderIcon(icon: Component, props?: any): () => VNodeChild {
  return () => h(NIcon, props, { default: () => h(icon) })
}

export function renderIconButton(icon: Component, url: string): VNodeChild {
  return h(
    NButton,
    {
      text: true,
      onClick: () => window.open(url, '_blank'),
    },
    {
      default: renderIcon(icon, {
        size: 20,
      }),
    },
  )
}

export function renderStatusButton(status: string, link: string): VNodeChild {
  let type: 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning' | undefined
  if (status === 'pending') {
    type = 'warning'
  } else if (status === 'running') {
    type = 'info'
  } else if (status === 'completed') {
    type = 'success'
  } else {
    type = 'error'
  }

  return h(
    NButton,
    {
      round: true,
      bordered: true,
      type: type,
      onClick: () => router.push(link),
    },
    {
      default: () => status,
    },
  )
}
