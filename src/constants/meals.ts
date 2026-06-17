import {
  WHEY, DAHI, MELON, RICE, DAL, RAITA, SOYA, PANEER, CHK_CURRY, CHK_THIGH, MUTTON,
  KEEMA, EGG_PANEER, SOYA_EGG, BIRYANI, CHK_BREAST,
  EGG2, SARAL_VEG, CARB, MANGO, SEEDS, CUCUMBER, PEPPER,
  type FoodItem,
} from './foods'

export type PhaseKey = 'phase1' | 'phase2' | 'phase3'
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
export type MealId = 'breakfast' | 'pre_gym' | 'lunch' | 'snack' | 'dinner'

export interface MealSlot {
  id: MealId
  label: string
  time: string
  items: FoodItem[]
}

export interface DayPlan {
  day: DayKey
  label: string
  meals: [MealSlot, MealSlot, MealSlot, MealSlot, MealSlot]
}

export type MealData = Record<PhaseKey, Record<DayKey, DayPlan>>

export const DAY_KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
}

export const MEAL_DATA: MealData = {
  phase1: {
    mon: {
      day: 'mon', label: 'Mon',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(60, 5), DAHI(150)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(180, 10), RICE(200), SARAL_VEG] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MANGO, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [PANEER(90, 7), CARB, DAL(150), RICE(190)] },
      ],
    },
    tue: {
      day: 'tue', label: 'Tue',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA(70, 5), EGG2] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [MUTTON(150, 10), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), DAHI(150), MELON(200), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 7, true), CARB, DAL(150), RICE(200)] },
      ],
    },
    wed: {
      day: 'wed', label: 'Wed',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [EGG_PANEER(40, 5), DAHI(100)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(200, 10), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), SEEDS, DAHI(100), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [KEEMA(150, 7), SARAL_VEG, PEPPER, DAL(150), RICE(200)] },
      ],
    },
    thu: {
      day: 'thu', label: 'Thu',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(60, 5), DAHI(150)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_BREAST(200, 10), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MANGO, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [PANEER(90, 7), SARAL_VEG, CARB, DAL(150), RICE(160)] },
      ],
    },
    fri: {
      day: 'fri', label: 'Fri',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [EGG_PANEER(50, 5), DAHI(100)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [MUTTON(180, 10), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MELON(200), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 7, true), CARB, DAL(150), RICE(200)] },
      ],
    },
    sat: {
      day: 'sat', label: 'Sat',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:30 AM', items: [SOYA_EGG(60, 5), DAHI(150)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [BIRYANI(300, 10), RAITA(100), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), SEEDS, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [MUTTON(150, 7), SARAL_VEG, DAL(150), RICE(90)] },
      ],
    },
    sun: {
      day: 'sun', label: 'Sun',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '9:00 AM', items: [EGG_PANEER(50, 5), DAHI(100)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(200, 10), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MANGO, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 7, true), CARB, DAL(150), RICE(200)] },
      ],
    },
  },
  phase2: {
    mon: {
      day: 'mon', label: 'Mon',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(60, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(180, 7), RICE(200), SARAL_VEG] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), DAHI(100), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [PANEER(70, 5), CARB, DAL(150), RICE(140)] },
      ],
    },
    tue: {
      day: 'tue', label: 'Tue',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA(70, 5), EGG2] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [MUTTON(150, 7), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MELON(200), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 5, true), DAL(150), RICE(180)] },
      ],
    },
    wed: {
      day: 'wed', label: 'Wed',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [EGG_PANEER(30, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(200, 7), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), SEEDS, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [KEEMA(150, 5), SARAL_VEG, PEPPER, DAL(150), RICE(200)] },
      ],
    },
    thu: {
      day: 'thu', label: 'Thu',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(60, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_BREAST(200, 7), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), DAHI(100), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_THIGH(150, 5), DAL(150), RICE(200)] },
      ],
    },
    fri: {
      day: 'fri', label: 'Fri',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [EGG_PANEER(40, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [MUTTON(180, 7), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MELON(200), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 5, true), DAL(150), RICE(200)] },
      ],
    },
    sat: {
      day: 'sat', label: 'Sat',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:30 AM', items: [SOYA_EGG(60, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [BIRYANI(250, 7), RAITA(80), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), SEEDS, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [MUTTON(150, 5), DAL(150), RICE(80)] },
      ],
    },
    sun: {
      day: 'sun', label: 'Sun',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '9:00 AM', items: [EGG_PANEER(40, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(200, 7), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), DAHI(100), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 5), DAL(150), RICE(200)] },
      ],
    },
  },
  phase3: {
    mon: {
      day: 'mon', label: 'Mon',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(50, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(180, 5), RICE(200), SARAL_VEG] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 2, true), DAL(150), RICE(100)] },
      ],
    },
    tue: {
      day: 'tue', label: 'Tue',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA(60, 5), EGG2] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [MUTTON(150, 5), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MELON(150), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(200, 2), DAL(150), RICE(150)] },
      ],
    },
    wed: {
      day: 'wed', label: 'Wed',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(50, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(200, 5), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), DAHI(100), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [KEEMA(150, 2), PEPPER, DAL(150), RICE(150)] },
      ],
    },
    thu: {
      day: 'thu', label: 'Thu',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [SOYA_EGG(50, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_BREAST(200, 5), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_THIGH(150, 2), DAL(150), RICE(200)] },
      ],
    },
    fri: {
      day: 'fri', label: 'Fri',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', items: [EGG_PANEER(30, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [MUTTON(180, 5), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), MELON(150), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(180, 2), DAL(150), RICE(200)] },
      ],
    },
    sat: {
      day: 'sat', label: 'Sat',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '8:30 AM', items: [SOYA_EGG(50, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [BIRYANI(180, 5), RAITA(80), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), SEEDS, CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [MUTTON(150, 2), DAL(150), RICE(110)] },
      ],
    },
    sun: {
      day: 'sun', label: 'Sun',
      meals: [
        { id: 'breakfast', label: 'Breakfast', time: '9:00 AM', items: [EGG_PANEER(30, 5)] },
        { id: 'pre_gym', label: 'Pre-Gym', time: '1:15 PM', items: [WHEY(1)] },
        { id: 'lunch', label: 'Lunch', time: '3:15 PM', items: [CHK_CURRY(200, 5), RICE(200)] },
        { id: 'snack', label: 'Snack', time: '6:00 PM', items: [WHEY(1), DAHI(100), CUCUMBER] },
        { id: 'dinner', label: 'Dinner', time: '8:00 PM', items: [CHK_BREAST(200, 2, true), DAL(150), RICE(150)] },
      ],
    },
  },
}
