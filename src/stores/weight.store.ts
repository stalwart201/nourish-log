import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'
import { START_WEIGHT_KG } from '@/constants/phases'

export interface WeightEntry {
  date: string
  kg: number
}

export const useWeightStore = defineStore('weight', {
  state: () => ({
    entries: [] as WeightEntry[], // sorted ascending by date
  }),
  getters: {
    latestEntry(state): WeightEntry | null {
      return state.entries.at(-1) ?? null
    },
    totalWeightLost(state): number {
      const last = state.entries.at(-1)
      return last ? START_WEIGHT_KG - last.kg : 0
    },
    recentEntries(state): WeightEntry[] {
      return state.entries.slice(-8).reverse()
    },
  },
  actions: {
    async loadFromIDB() {
      this.entries = (await get<WeightEntry[]>('weight-entries')) ?? []
    },
    async recordWeight(kg: number) {
      const date = new Date().toISOString().slice(0, 10)
      // Mirrors the original IDB store's keyPath:"date" — one entry per day, last write wins.
      const withoutToday = this.entries.filter((e) => e.date !== date)
      this.entries = [...withoutToday, { date, kg }].sort((a, b) => a.date.localeCompare(b.date))
      await set('weight-entries', this.entries)
    },
  },
})
