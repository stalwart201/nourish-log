import type { FoodItem } from '@/constants/foods'

export function scaleFoodItem(item: FoodItem, servingMultiplier: number): FoodItem {
  return {
    ...item,
    kcal: item.kcal * servingMultiplier,
    protein: item.protein * servingMultiplier,
    carbs: item.carbs * servingMultiplier,
    fat: item.fat * servingMultiplier,
  }
}
