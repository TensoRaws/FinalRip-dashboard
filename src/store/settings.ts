import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore(
  'GlobalSettings',
  () => {
    const collapsed = ref<boolean>(false)

    return {
      collapsed,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['collapsed'],
    },
  },
)
