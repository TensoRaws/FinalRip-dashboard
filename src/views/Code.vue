<script setup lang="ts">
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import type { SelectOption } from 'naive-ui'
import { useNotification } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { shallowRef } from 'vue'

import { getGitHubTemplateContent } from '@/api/github'
import { useSettingStore } from '@/store/setting'

const { darkMode, systemDarkMode, script, encodeParam, templates } = storeToRefs(useSettingStore())

const notification = useNotification()

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

function handleUpdateTemplate(option: SelectOption): void {
  getGitHubTemplateContent(option)
    .then((res) => {
      script.value = res
    })
    .catch((err) => {
      console.error(err)
      notification['error']({
        title: 'Failed to get template content',
        content: String(err),
      })
    })
}
</script>

<template>
  <NSpace vertical>
    <NSpace justify="space-between">
      <NGradientText size="18" type="primary"> Code </NGradientText>
      <NSelect :options="templates" style="width: 50vh" @update:value="handleUpdateTemplate" />
    </NSpace>
    <NCard hoverable size="small" style="width: 100%; height: 65vh">
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
