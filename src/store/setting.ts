import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'
export type DarkModeType = 'system' | 'light' | 'dark'

export const useSettingStore = defineStore(
  'GlobalSetting',
  () => {
    // dark mode
    const darkMode: Ref<DarkModeType> = ref('system')
    const systemDarkMode = ref(false)
    // menu collapsed
    const collapsed = ref(false)
    // api
    const apiURL = ref('http://localhost:8848')
    const apiToken = ref('114514')
    // encode
    const script = ref(
      'import os\n' +
        'import vapoursynth as vs\n' +
        'from vapoursynth import core\n' +
        '\n' +
        "clip = core.bs.VideoSource(source=os.getenv('FINALRIP_SOURCE'))\n" +
        'clip.set_output()' +
        '\n',
    )
    const encodeParam = ref('ffmpeg -i - -vcodec libx265 -crf 16')

    return {
      darkMode,
      systemDarkMode,
      collapsed,
      apiURL,
      apiToken,
      script,
      encodeParam,
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: [
        'darkMode',
        'systemDarkMode',
        'collapsed',
        'apiURL',
        'apiToken',
        'script',
        'encodeParam',
      ],
    },
  },
)
