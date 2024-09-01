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
    // encode
    const script = ref(
      'import os\n' +
        'import vapoursynth as vs\n' +
        'from vapoursynth import core\n' +
        '\n' +
        "clip = core.bs.VideoSource(source=os.getenv('FINALRIP_SOURCE'))\n" +
        'clip.set_output()',
    )
    const encodeParam = ref('ffmpeg -i - -vcodec libx265 -crf 16')

    return {
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
      paths: ['collapsed', 'apiURL', 'apiToken', 'script', 'encodeParam'],
    },
  },
)
