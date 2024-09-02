import { NButton, NIcon } from 'naive-ui'
import type { Component, VNodeChild } from 'vue'
import { h } from 'vue'

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
