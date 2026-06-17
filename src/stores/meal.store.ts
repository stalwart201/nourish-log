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

export const useMealStore = defineStore('meal', {
  state: () => ({
    phase: 'phase1' as PhaseKey,
    activeDay: todayDayKey(),
    checks: {} as Record<string, true>,
    edits: {} as Record<string, number>,
    startDate: null as string | null,
  }),
  getters: {
    phaseTarget(state) {
      return PHASE_TARGETS[state.phase]
    },
    dayMacroTotals(state): { kcal: number; protein: number } {
      let kcal = 0
      let protein = 0
      const day = MEAL_DATA[state.phase][state.activeDay]
      for (const meal of day.meals) {
        meal.items.forEach((item, itemIdx) => {
          const key = `${state.phase}|${state.activeDay}|${meal.id}|${itemIdx}`
          if (!state.checks[key]) return
          const scaled = scaleFoodItem(item, state.edits[key] ?? 1)
          kcal += scaled.kcal
          protein += scaled.protein
        })
      }
      return { kcal, protein }
    },
  },
  actions: {
    async loadFromIDB() {
      this.phase = (await get<PhaseKey>('phase')) ?? 'phase1'
      this.checks = (await get<Record<string, true>>('checks')) ?? {}
      this.edits = (await get<Record<string, number>>('edits')) ?? {}
      this.startDate = (await get<string>('startDate')) ?? null
      applyAccentColor(this.phase)
    },
    async setPhase(phase: PhaseKey) {
      this.phase = phase
      applyAccentColor(phase)
      await set('phase', phase)
    },
    setDay(day: DayKey) {
      this.activeDay = day
    },
    async toggleCheck(key: string) {
      if (this.checks[key]) delete this.checks[key]
      else this.checks[key] = true
      await set('checks', this.checks)
    },
    async setEdit(key: string, mult: number) {
      if (mult === 0) {
        // Skip wins: an item cannot be both checked and have mult=0.
        this.edits[key] = 0
        delete this.checks[key]
        await set('checks', this.checks)
      } else if (mult === 1) {
        delete this.edits[key]
      } else {
        this.edits[key] = mult
      }
      await set('edits', this.edits)
    },
  },
})
