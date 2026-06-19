import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'
import { scaleFoodItem } from '@/utils/macroCalc'
import { DAY_KEYS, MEAL_DATA, type DayKey, type PhaseKey } from '@/constants/meals'
import { PHASE_TARGETS } from '@/constants/phases'

function todayDayKey(): DayKey {
  return DAY_KEYS[new Date().getDay()]!
}

function applyAccentColor(phase: PhaseKey): void {
  document.documentElement.style.setProperty('--color-accent', PHASE_TARGETS[phase].accentColor)
}

export const useMealStore = defineStore('meal', () => {
  const phase = ref<PhaseKey>('phase1')
  const activeDay = ref<DayKey>(todayDayKey())
  const checks = ref<Record<string, true>>({})
  const edits = ref<Record<string, number>>({})
  const startDate = ref<string | null>(null)

  const phaseTarget = computed(() => PHASE_TARGETS[phase.value])

  const dayPlannedTotals = computed((): { kcal: number; protein: number } => {
    let kcal = 0
    let protein = 0
    const day = MEAL_DATA[phase.value][activeDay.value]
    for (const meal of day.meals) {
      meal.items.forEach((item, itemIdx) => {
        const key = `${phase.value}|${activeDay.value}|${meal.id}|${itemIdx}`
        const scaled = scaleFoodItem(item, edits.value[key] ?? 1)
        kcal += scaled.kcal
        protein += scaled.protein
      })
    }
    return { kcal, protein }
  })

  const dayMacroTotals = computed((): { kcal: number; protein: number } => {
    let kcal = 0
    let protein = 0
    const day = MEAL_DATA[phase.value][activeDay.value]
    for (const meal of day.meals) {
      meal.items.forEach((item, itemIdx) => {
        const key = `${phase.value}|${activeDay.value}|${meal.id}|${itemIdx}`
        if (!checks.value[key]) return
        const scaled = scaleFoodItem(item, edits.value[key] ?? 1)
        kcal += scaled.kcal
        protein += scaled.protein
      })
    }
    return { kcal, protein }
  })

  async function loadFromIDB() {
    phase.value = (await get<PhaseKey>('phase')) ?? 'phase1'
    checks.value = (await get<Record<string, true>>('checks')) ?? {}
    edits.value = (await get<Record<string, number>>('edits')) ?? {}
    startDate.value = (await get<string>('startDate')) ?? null
    applyAccentColor(phase.value)
  }

  async function setPhase(p: PhaseKey) {
    phase.value = p
    applyAccentColor(p)
    await set('phase', p)
  }

  function setDay(day: DayKey) {
    activeDay.value = day
  }

  async function toggleCheck(key: string) {
    if (checks.value[key]) delete checks.value[key]
    else checks.value[key] = true
    await set('checks', checks.value)
  }

  async function setEdit(key: string, mult: number) {
    if (mult === 0) {
      edits.value[key] = 0
      delete checks.value[key]
      await set('checks', checks.value)
    } else if (mult === 1) {
      delete edits.value[key]
    } else {
      edits.value[key] = mult
    }
    await set('edits', edits.value)
  }

  return {
    phase,
    activeDay,
    checks,
    edits,
    startDate,
    phaseTarget,
    dayMacroTotals,
    dayPlannedTotals,
    loadFromIDB,
    setPhase,
    setDay,
    toggleCheck,
    setEdit,
  }
})
