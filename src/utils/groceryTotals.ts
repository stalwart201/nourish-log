import { DAY_KEYS, MEAL_DATA, type PhaseKey } from '@/constants/meals'
import { GROCERY_ITEMS, type GroceryKey } from '@/constants/grocery'

export function calcGroceryTotals(
  phase: PhaseKey,
): Record<string, { amount: number; unit: string; label: string }> {
  const amounts: Partial<Record<GroceryKey, number>> = {}

  for (const day of DAY_KEYS) {
    for (const meal of MEAL_DATA[phase][day].meals) {
      for (const item of meal.items) {
        if (!item.grocery) continue
        for (const [key, value] of Object.entries(item.grocery) as [GroceryKey, number][]) {
          amounts[key] = (amounts[key] ?? 0) + value
        }
      }
    }
  }

  const totals: Record<string, { amount: number; unit: string; label: string }> = {}
  for (const item of GROCERY_ITEMS) {
    const amount = amounts[item.key]
    if (amount === undefined) continue
    totals[item.key] = { amount, unit: item.unit, label: item.label }
  }
  return totals
}
