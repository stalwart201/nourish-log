export const GROCERY_KEYS = [
  'chicken',
  'mutton',
  'soya',
  'paneer',
  'curd',
  'eggs',
  'whey',
  'veg',
  'rice_raw',
  'seeds',
  'cucumber',
  'pepper',
  'mango',
  'watermelon',
  'dal_raw',
] as const

export type GroceryKey = (typeof GROCERY_KEYS)[number]

export interface GroceryBuyOption {
  label: string // "boneless" | "bone-in"
  factor: number // raw-buy multiplier applied to the cooked total, e.g. 1/0.75 for boneless chicken
}

export interface GroceryItem {
  key: GroceryKey
  label: string
  unit: string
  // foods.ts tracks cooked weight only — cooking loss varies by which cut you actually buy,
  // so that conversion isn't baked into the total. When present, the grocery list shows it
  // as a note instead: "buy ~(amount * factor)g raw" per option.
  buyOptions?: GroceryBuyOption[]
}

export const GROCERY_ITEMS: GroceryItem[] = [
  {
    key: 'chicken',
    label: 'Chicken (cooked weight)',
    unit: 'g',
    buyOptions: [
      { label: 'boneless', factor: 1 / 0.75 },
      { label: 'bone-in', factor: 1 / 0.45 },
    ],
  },
  {
    key: 'mutton',
    label: 'Mutton (cooked weight)',
    unit: 'g',
    buyOptions: [{ label: 'bone-in', factor: 1 / 0.45 }],
  },
  { key: 'soya', label: 'Soya Chunks (dry)', unit: 'g' },
  { key: 'paneer', label: 'Paneer', unit: 'g' },
  { key: 'curd', label: 'Curd / Dahi', unit: 'g' },
  { key: 'eggs', label: 'Eggs', unit: 'pc' },
  { key: 'whey', label: 'Whey Protein', unit: 'scoop' },
  { key: 'rice_raw', label: 'Rice (raw)', unit: 'g' },
  { key: 'dal_raw', label: 'Dal (raw, moong/masoor)', unit: 'g' },
  { key: 'veg', label: 'Mixed Veg (Saral/frozen)', unit: 'g' },
  { key: 'cucumber', label: 'Cucumber', unit: 'g' },
  { key: 'pepper', label: 'Bell Pepper', unit: 'g' },
  { key: 'mango', label: 'Mango', unit: 'pc' },
  { key: 'watermelon', label: 'Watermelon', unit: 'g' },
  { key: 'seeds', label: 'Seeds (Farmley + Chia)', unit: 'g' },
]
