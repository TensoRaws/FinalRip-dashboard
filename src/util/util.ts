import { NIcon } from 'naive-ui'
import type { Component, VNodeChild } from 'vue'
import { h } from 'vue'

export function renderIcon(icon: Component, props?: any): () => VNodeChild {
  return () => h(NIcon, props, { default: () => h(icon) })
}
