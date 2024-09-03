<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { storeToRefs } from 'pinia'
import { shallowRef } from 'vue'

import { useSettingStore } from '@/store/setting'

const { darkMode, systemDarkMode, script, encodeParam } = storeToRefs(useSettingStore())

const MONACO_EDITOR_OPTIONS: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
  acceptSuggestionOnCommitCharacter: true,
  acceptSuggestionOnEnter: 'smart',
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}

const theme = computed(() => {
  if (darkMode.value === 'system') {
    return systemDarkMode.value ? 'vs-dark' : 'vs'
  }
  return darkMode.value === 'dark' ? 'vs-dark' : 'vs'
})

const editor = shallowRef()
function handleMount(editorInstance: any): any {
  editor.value = editorInstance
}
</script>

<template>
  <NSpace vertical>
    <NCard hoverable title="Script" size="small" style="width: 100%; height: 68vh">
      <VueMonacoEditor
        v-model:value="script"
        language="python"
        :theme="theme"
        :options="MONACO_EDITOR_OPTIONS"
        class="h-screen w-screen"
        @mount="handleMount"
      />
    </NCard>
    <NCard hoverable title="Encode Param" size="small" style="width: 100%">
      <NInput v-model:value="encodeParam" type="textarea" placeholder="Encode Param" />
    </NCard>
  </NSpace>
</template>

<style scoped></style>
