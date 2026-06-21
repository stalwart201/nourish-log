import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { format, subDays } from 'date-fns'
import { get, set } from '@/utils/idb'
import { calcStreak, type SimpleDayLog } from '@/utils/streak'
import { useSyncStore } from './sync.store'

const EMPTY_LOG: SimpleDayLog = { protein: false, deficit: false, move: false, ontrack: false }

export const useSimpleStore = defineStore('simple', () => {
  const logs = ref<Record<string, SimpleDayLog>>({})

  const streak = computed(() => calcStreak(logs.value))

  const last7Days = computed((): { date: string; ontrack: boolean; isToday: boolean }[] => {
    const today = new Date()
    const todayKey = format(today, 'yyyy-MM-dd')
    return Array.from({ length: 7 }, (_, i) => {
      const d = subDays(today, 6 - i)
      const key = format(d, 'yyyy-MM-dd')
      return { date: key, ontrack: logs.value[key]?.ontrack ?? false, isToday: key === todayKey }
    })
  })

  async function loadFromIDB() {
    logs.value = (await get<Record<string, SimpleDayLog>>('simple-logs')) ?? {}
  }

  async function setLog(date: string, patch: Partial<SimpleDayLog>) {
    logs.value[date] = { ...(logs.value[date] ?? EMPTY_LOG), ...patch }
    await set('simple-logs', logs.value)
    await useSyncStore().push('simple-logs', logs.value)
  }

  async function markOnTrack(date: string) {
    const current = logs.value[date] ?? EMPTY_LOG
    logs.value[date] = { ...current, ontrack: !current.ontrack }
    await set('simple-logs', logs.value)
    await useSyncStore().push('simple-logs', logs.value)
  }

  return { logs, streak, last7Days, loadFromIDB, setLog, markOnTrack }
})
