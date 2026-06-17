import { defineStore } from 'pinia'

export type ActiveTab = 'plan' | 'simple' | 'weight' | 'grocery' | 'about'

export const useUIStore = defineStore('ui', {
  state: () => ({
    theme: 'light' as 'light' | 'dark',
    activeTab: 'plan' as ActiveTab,
    // NOT persisted — if the app crashes mid-edit, reopening on a stale/invalid key is worse than closing.
    portionEditorOpen: false,
    portionEditorKey: null as string | null,
  }),
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    openPortionEditor(key: string) {
      this.portionEditorOpen = true
      this.portionEditorKey = key
    },
    closePortionEditor() {
      this.portionEditorOpen = false
      this.portionEditorKey = null
    },
  },
  persist: {
    pick: ['theme', 'activeTab'],
  },
})
