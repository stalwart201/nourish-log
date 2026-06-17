import type { GroceryKey } from './grocery'

export interface FoodItem {
  name: string
  qty: string
  baseQty: number
  qtyUnit: string
  kcal: number
  protein: number
  carbs: number
  fat: number
  grocery?: Partial<Record<GroceryKey, number>>
}

// ---- Fixed-portion constants ----

export const EGG2: FoodItem = {
  name: 'Urban Farm Eggs (boiled)',
  qty: '2 large',
  baseQty: 2,
  qtyUnit: 'egg',
  kcal: 140,
  protein: 12,
  carbs: 1,
  fat: 10,
  grocery: { eggs: 2 },
}

export const SARAL_VEG: FoodItem = {
  name: 'Saral Veg Mix',
  qty: '100g',
  baseQty: 100,
  qtyUnit: 'g',
  kcal: 60,
  protein: 3,
  carbs: 10,
  fat: 1,
  grocery: { veg: 100 },
}

export const CARB: FoodItem = {
  name: 'Rice or Rumali Roti',
  qty: '100g rice cooked  •OR•  1 rumali roti',
  baseQty: 100,
  qtyUnit: 'g',
  kcal: 128,
  protein: 4,
  carbs: 26,
  fat: 1,
  grocery: { rice_raw: 40 },
}

export const MANGO: FoodItem = {
  name: 'Mango',
  qty: '150g',
  baseQty: 150,
  qtyUnit: 'g',
  kcal: 100,
  protein: 1,
  carbs: 25,
  fat: 0,
  grocery: { mango: 1 },
}

export const SEEDS: FoodItem = {
  name: 'Farmley + Chia (soaked)',
  qty: '15g + 10g · 3x/wk',
  baseQty: 25,
  qtyUnit: 'g',
  kcal: 134,
  protein: 5,
  carbs: 8,
  fat: 10,
  grocery: { seeds: 25 },
}

export const CUCUMBER: FoodItem = {
  name: 'English Cucumber',
  qty: '150g · daily',
  baseQty: 150,
  qtyUnit: 'g',
  kcal: 18,
  protein: 1,
  carbs: 4,
  fat: 0,
  grocery: { cucumber: 150 },
}

export const PEPPER: FoodItem = {
  name: 'Bell Pepper (red/yellow)',
  qty: '80g · 3x/wk',
  baseQty: 80,
  qtyUnit: 'g',
  kcal: 26,
  protein: 1,
  carbs: 6,
  fat: 0,
  grocery: { pepper: 80 },
}

// ---- Builders ----

export function WHEY(scoops: number): FoodItem {
  return {
    name: 'Avvatar Whey ISO',
    qty: `${scoops} scoop`,
    baseQty: scoops,
    qtyUnit: 'scoop',
    kcal: 110 * scoops,
    protein: 27 * scoops,
    carbs: 1 * scoops,
    fat: 1, // flat in original data.js regardless of scoop count — preserved as-is
    grocery: { whey: scoops },
  }
}

export function DAHI(g: number): FoodItem {
  return {
    name: 'Amul Masti Dahi',
    qty: `${g}g`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(0.62 * g),
    protein: Math.round(0.03 * g),
    carbs: Math.round(0.04 * g),
    fat: Math.round(0.04 * g),
    grocery: { curd: g },
  }
}

export function MELON(g: number): FoodItem {
  return {
    name: 'Watermelon',
    qty: `${g}g`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 0.3),
    protein: 1, // flat in original — preserved as-is
    carbs: Math.round(g * 0.075),
    fat: 0,
    grocery: { watermelon: g },
  }
}

export function RICE(g: number): FoodItem {
  return {
    name: 'Steamed Rice',
    qty: `${g}g cooked`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 1.3),
    protein: Math.round(g * 0.026),
    carbs: Math.round(g * 0.29),
    fat: 0,
    grocery: { rice_raw: Math.round(g * 0.4) },
  }
}

export function DAL(g: number): FoodItem {
  return {
    name: 'Dal (moong/masoor)',
    qty: `${g}g cooked`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 0.87),
    protein: Math.round(g * 0.06),
    carbs: Math.round(g * 0.15),
    fat: 1, // flat in original — preserved as-is
    grocery: { dal_raw: Math.round(g * 0.33) },
  }
}

export function RAITA(g: number): FoodItem {
  return {
    name: 'Dahi Raita',
    qty: `${g}g`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 0.62),
    protein: Math.round(g * 0.03),
    carbs: Math.round(g * 0.04),
    fat: Math.round(g * 0.04),
    grocery: { curd: g },
  }
}

export function SOYA(g: number, oil: number): FoodItem {
  return {
    name: 'Soya Chunks Bhurji',
    qty: `${g}g dry + ${oil}g oil`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 4.2 + oil * 9),
    protein: Math.round(g * 0.52),
    carbs: Math.round(g * 0.3),
    fat: Math.round(g * 0.01 + oil * 0.9),
    grocery: { soya: g },
  }
}

export function PANEER(g: number, oil: number): FoodItem {
  return {
    name: 'Amul Malai Paneer (grilled)',
    qty: `${g}g + ${oil}g oil`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 2.9 + oil * 9),
    protein: Math.round(g * 0.18),
    carbs: Math.round(g * 0.04),
    fat: Math.round(g * 0.23 + oil * 0.9),
    grocery: { paneer: g },
  }
}

export function CHK_CURRY(cooked: number, oil: number): FoodItem {
  return {
    name: 'Chicken Curry (onion)',
    qty: `${cooked}g boneless cooked · +${oil}g oil`,
    baseQty: cooked,
    qtyUnit: 'g',
    kcal: Math.round(cooked * 1.65 + oil * 9),
    protein: Math.round(cooked * 0.29),
    carbs: 5,
    fat: Math.round(cooked * 0.04 + oil * 0.9),
    grocery: { chicken: cooked },
  }
}

export function CHK_THIGH(cooked: number, oil: number): FoodItem {
  return {
    name: 'Chicken Thigh + palak',
    qty: `${cooked}g boneless cooked · +${oil}g oil`,
    baseQty: cooked,
    qtyUnit: 'g',
    kcal: Math.round(cooked * 1.7 + oil * 9),
    protein: Math.round(cooked * 0.27),
    carbs: 5,
    fat: Math.round(cooked * 0.08 + oil * 0.9),
    grocery: { chicken: cooked },
  }
}

export function CHK_BREAST(cooked: number, oil: number, withVeg = false): FoodItem {
  return {
    name: withVeg ? 'Chicken Breast + veg' : 'Chicken Breast (grilled)',
    qty: `${cooked}g boneless cooked · +${oil}g oil`,
    baseQty: cooked,
    qtyUnit: 'g',
    kcal: Math.round(cooked * 1.65 + oil * 9 + (withVeg ? 60 : 0)),
    protein: Math.round(cooked * 0.31),
    carbs: withVeg ? 8 : 0,
    fat: Math.round(cooked * 0.03 + oil * 0.9),
    grocery: { chicken: cooked },
  }
}

export function MUTTON(cooked: number, oil: number): FoodItem {
  return {
    name: 'Mutton Curry (lean)',
    qty: `${cooked}g boneless cooked · +${oil}g oil`,
    baseQty: cooked,
    qtyUnit: 'g',
    kcal: Math.round(cooked * 1.6 + oil * 9),
    protein: Math.round(cooked * 0.25),
    carbs: 4,
    fat: Math.round(cooked * 0.1 + oil * 0.9),
    grocery: { mutton: cooked },
  }
}

export function KEEMA(cooked: number, oil: number): FoodItem {
  return {
    name: 'Mutton Keema (lean)',
    qty: `${cooked}g boneless cooked · +${oil}g oil`,
    baseQty: cooked,
    qtyUnit: 'g',
    kcal: Math.round(cooked * 1.55 + oil * 9),
    protein: Math.round(cooked * 0.24),
    carbs: 4,
    fat: Math.round(cooked * 0.1 + oil * 0.9),
    grocery: { mutton: cooked },
  }
}

export function EGG_PANEER(g: number, oil: number): FoodItem {
  return {
    name: 'Egg + Paneer Bhurji',
    qty: `2 egg + ${g}g paneer + ${oil}g oil`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(140 + g * 2.9 + oil * 9),
    protein: Math.round(12 + g * 0.18),
    carbs: 4,
    fat: Math.round(10 + g * 0.23 + oil * 0.9),
    grocery: { eggs: 2, paneer: g },
  }
}

export function SOYA_EGG(g: number, oil: number): FoodItem {
  return {
    name: 'Soya + Egg Bhurji',
    qty: `${g}g soya + 2 egg + ${oil}g oil`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 4.2 + 140 + oil * 9),
    protein: Math.round(g * 0.52 + 12),
    carbs: Math.round(g * 0.3 + 1),
    fat: Math.round(10 + oil * 0.9),
    grocery: { soya: g, eggs: 2 },
  }
}

export function BIRYANI(g: number, oil: number): FoodItem {
  return {
    name: 'Chicken Biryani (lean)',
    qty: `${g}g cooked (boneless meat + rice) · +${oil}g oil`,
    baseQty: g,
    qtyUnit: 'g',
    kcal: Math.round(g * 1.6 + oil * 9),
    protein: Math.round(g * 0.14),
    carbs: Math.round(g * 0.18),
    fat: Math.round(g * 0.04 + oil * 0.9),
    grocery: { chicken: Math.round(g * 0.3), rice_raw: Math.round(g * 0.2) },
  }
}
