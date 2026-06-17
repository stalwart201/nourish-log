import type { PhaseKey } from '@/constants/meals'

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

function suggestPhaseForWeek(week: number): PhaseKey {
  if (week <= 4) return 'phase1'
  if (week <= 12) return 'phase2'
  return 'phase3'
}

export function calcPhaseShift(
  startDate: string | null,
  currentPhase: PhaseKey,
): { currentWeek: number | null; suggestedPhase: PhaseKey; mismatch: boolean } {
  if (startDate === null) {
    return { currentWeek: null, suggestedPhase: currentPhase, mismatch: false }
  }
  const currentWeek = Math.floor((Date.now() - new Date(startDate).getTime()) / MS_PER_WEEK) + 1
  const suggestedPhase = suggestPhaseForWeek(currentWeek)
  return { currentWeek, suggestedPhase, mismatch: suggestedPhase !== currentPhase }
}
