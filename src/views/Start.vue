<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { useOsTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { shallowRef } from 'vue'

import { useSettingStore } from '@/store/setting'

const { script } = storeToRefs(useSettingStore())

const MONACO_EDITOR_OPTIONS: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: 'smart',
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

const osThemeRef = useOsTheme()
const theme = computed(() => {
  return osThemeRef.value === 'dark' ? 'vs-dark' : 'vs'
})

const editor = shallowRef()
function handleMount(editorInstance: any): any {
  editor.value = editorInstance
}
</script>

<template>
  <NCard hoverable>
    <div class="w-[100vh] h-[70vh]">
      <VueMonacoEditor
        v-model:value="script"
        language="python"
        :theme="theme"
        :options="MONACO_EDITOR_OPTIONS"
        class="h-screen w-screen"
        @mount="handleMount"
      />
    </div>
  </NCard>
</template>

<style scoped></style>
