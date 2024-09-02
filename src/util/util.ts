import { NIcon } from 'naive-ui'
import { type Component, h, type VNodeChild } from 'vue'

export function renderIcon(icon: Component, props?: any): () => VNodeChild {
  return () => h(NIcon, props, { default: () => h(icon) })
}
