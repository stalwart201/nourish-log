export interface SimpleDayLog {
  protein: boolean
  deficit: boolean
  move: boolean
  ontrack: boolean
}

function toLocalDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function calcStreak(logs: Record<string, SimpleDayLog>): number {
  const today = new Date()
  const todayKey = toLocalDateKey(today)
  const startOffset = logs[todayKey] !== undefined ? 0 : 1

  let streak = 0
  let daysBack = startOffset

  while (true) {
    const date = new Date(today)
    date.setDate(today.getDate() - daysBack)
    const key = toLocalDateKey(date)
    if (!logs[key]?.ontrack) break
    streak++
    daysBack++
  }

  return streak
}
