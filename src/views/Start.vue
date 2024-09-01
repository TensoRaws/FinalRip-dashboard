<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { useOsTheme } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { shallowRef } from 'vue'

import { useSettingStore } from '@/store/setting'

const { script, encodeParam } = storeToRefs(useSettingStore())

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
  <NSpace vertical>
    <NCard hoverable title="Script" size="small" style="width: 110vh; height: 70vh">
      <VueMonacoEditor
        v-model:value="script"
        language="python"
        :theme="theme"
        :options="MONACO_EDITOR_OPTIONS"
        class="h-screen w-screen"
        @mount="handleMount"
      />
    </NCard>
    <NCard hoverable title="Encode Params" size="small" style="width: 110vh">
      <NInput v-model:value="encodeParam" type="textarea" placeholder="Encode Params" />
    </NCard>
  </NSpace>
</template>

<style scoped></style>
