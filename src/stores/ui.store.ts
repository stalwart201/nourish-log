import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ActiveTab = 'plan' | 'simple' | 'weight' | 'grocery' | 'about'

export const useUIStore = defineStore(
  'ui',
  () => {
    const theme = ref<'light' | 'dark'>('light')
    const activeTab = ref<ActiveTab>('plan')
    const portionEditorOpen = ref(false)
    const portionEditorKey = ref<string | null>(null)

    function setTheme(t: 'light' | 'dark') {
      theme.value = t
    }

    function toggleTheme() {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function openPortionEditor(key: string) {
      portionEditorOpen.value = true
      portionEditorKey.value = key
    }

    function closePortionEditor() {
      portionEditorOpen.value = false
      portionEditorKey.value = null
    }

    return {
      theme,
      activeTab,
      portionEditorOpen,
      portionEditorKey,
      setTheme,
      toggleTheme,
      openPortionEditor,
      closePortionEditor,
    }
  },
  {
    persist: { pick: ['theme', 'activeTab'] },
  },
)
