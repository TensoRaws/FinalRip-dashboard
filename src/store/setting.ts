import type { SelectOption } from 'naive-ui'
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

    // templates
    const templates: Ref<SelectOption[]> = ref([])
    const templateRepo = ref('TensoRaws/vs-playground')
    const githubToken = ref('')

    // custom worker
    const videoCutCustom = ref('')
    const videoEncodeCustom = ref('')
    const videoMergeCustom = ref('')

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

    // list setting
    const checkedPendingBox = ref(false)
    const checkedRunningBox = ref(true)
    const checkedCompletedBox = ref(true)

    return {
      darkMode,
      systemDarkMode,
      collapsed,
      apiURL,
      apiToken,
      templates,
      templateRepo,
      githubToken,
      videoCutCustom,
      videoEncodeCustom,
      videoMergeCustom,
      script,
      encodeParam,
      checkedPendingBox,
      checkedRunningBox,
      checkedCompletedBox,
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
        'templates',
        'templateRepo',
        'githubToken',
        'videoCutCustom',
        'videoEncodeCustom',
        'videoMergeCustom',
        'script',
        'encodeParam',
        'checkedPendingBox',
        'checkedRunningBox',
        'checkedCompletedBox',
      ],
    },
  },
)
