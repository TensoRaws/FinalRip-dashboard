import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore(
  'GlobalSetting',
  () => {
    // menu collapsed
    const collapsed = ref(false)
    // api
    const apiURL = ref('http://localhost:8848')
    const apiToken = ref('114514')

    return {
      collapsed,
      apiURL,
      apiToken,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['collapsed', 'apiURL', 'apiToken'],
    },
  },
)
