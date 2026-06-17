import type { PhaseKey } from './meals'

export interface PhaseTarget {
  calories: number
  protein: number
  oilGrams: number
  accentColor: string
  label: string
  weekRange: string
}

export const PHASE_TARGETS: Record<PhaseKey, PhaseTarget> = {
  phase1: { calories: 2400, protein: 200, oilGrams: 25, accentColor: '#f07a4a', label: 'Phase 1', weekRange: 'Weeks 1–4' },
  phase2: { calories: 2100, protein: 200, oilGrams: 18, accentColor: '#f0533d', label: 'Phase 2', weekRange: 'Weeks 5–12' },
  phase3: { calories: 1935, protein: 200, oilGrams: 12, accentColor: '#e0392f', label: 'Phase 3', weekRange: 'Week 13+' },
}

export const PHASE_KEYS: PhaseKey[] = ['phase1', 'phase2', 'phase3']

export const START_WEIGHT_KG = 116
