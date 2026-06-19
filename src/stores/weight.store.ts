import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'
import { START_WEIGHT_KG } from '@/constants/phases'

export interface WeightEntry {
  date: string
  kg: number
}

export const useWeightStore = defineStore('weight', () => {
  const entries = ref<WeightEntry[]>([])

  const latestEntry = computed((): WeightEntry | null => entries.value.at(-1) ?? null)

  const totalWeightLost = computed((): number => {
    const last = entries.value.at(-1)
    return last ? START_WEIGHT_KG - last.kg : 0
  })

  const recentEntries = computed((): WeightEntry[] => entries.value.slice(-8).reverse())

  async function loadFromIDB() {
    entries.value = (await get<WeightEntry[]>('weight-entries')) ?? []
  }

  async function recordWeight(kg: number) {
    const date = new Date().toISOString().slice(0, 10)
    const withoutToday = entries.value.filter((e) => e.date !== date)
    entries.value = [...withoutToday, { date, kg }].sort((a, b) => a.date.localeCompare(b.date))
    await set('weight-entries', entries.value)
  }

  return { entries, latestEntry, totalWeightLost, recentEntries, loadFromIDB, recordWeight }
})
