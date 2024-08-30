import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore(
  'GlobalSetting',
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
