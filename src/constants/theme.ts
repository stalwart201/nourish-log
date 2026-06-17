import type { MealId } from './meals'

export const MEAL_DOT_COLORS: Record<MealId, string> = {
  breakfast: '#FB923C',
  pre_gym: '#a78bfa',
  lunch: '#4ADE80',
  snack: '#FB7185',
  dinner: '#60A5FA',
}

export const FONT_FAMILIES = {
  heading: "'Fraunces', Georgia, serif",
  body: "'Plus Jakarta Sans', system-ui, sans-serif",
} as const
