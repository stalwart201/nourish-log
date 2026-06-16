import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    theme: 'light' as 'light' | 'dark',
  }),
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
  },
})
