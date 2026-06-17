import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'
import { calcStreak, type SimpleDayLog } from '@/utils/streak'

const EMPTY_LOG: SimpleDayLog = { protein: false, deficit: false, move: false, ontrack: false }

export const useSimpleStore = defineStore('simple', {
  state: () => ({
    logs: {} as Record<string, SimpleDayLog>,
  }),
  getters: {
    streak(state): number {
      return calcStreak(state.logs)
    },
  },
  actions: {
    async loadFromIDB() {
      this.logs = (await get<Record<string, SimpleDayLog>>('simple-logs')) ?? {}
    },
    async setLog(date: string, patch: Partial<SimpleDayLog>) {
      this.logs[date] = { ...(this.logs[date] ?? EMPTY_LOG), ...patch }
      await set('simple-logs', this.logs)
    },
    async markOnTrack(date: string) {
      const current = this.logs[date] ?? EMPTY_LOG
      this.logs[date] = { ...current, ontrack: !current.ontrack }
      await set('simple-logs', this.logs)
    },
  },
})
