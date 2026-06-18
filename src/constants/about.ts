import type { PhaseKey } from './meals'

export interface PhaseInfo {
  oilAllowance: string
  wheySchedule: string
  meatWeightNote: string
  dailyHabits: string[]
}

export interface DosDonts {
  dos: string[]
  donts: string[]
}

export type SupplementTier = 'worth-it' | 'situational' | 'skip'

export interface Supplement {
  name: string
  tier: SupplementTier
  note: string
}

const DAILY_HABITS: string[] = [
  'Cucumber daily, peppers 3×/week.',
  'Diet Coke — 1–2/day.',
  '2–3 L water.',
  '5,000+ steps.',
  '7+ hrs sleep.',
  'Weigh weekly.',
]

const WHEY_SCHEDULE = '1 scoop pre-gym (1:15 PM) + 1 scoop in the evening — 54g protein locked in.'

const MEAT_WEIGHT_NOTE =
  'Meat weights are boneless cooked — "buy raw" notes include bone and cooking loss.'

export const PHASE_INFO: Record<PhaseKey, PhaseInfo> = {
  phase1: {
    oilAllowance:
      "25g (~225 kcal) — measure into a bowl each morning. Once it's gone, you're done.",
    wheySchedule: WHEY_SCHEDULE,
    meatWeightNote: MEAT_WEIGHT_NOTE,
    dailyHabits: DAILY_HABITS,
  },
  phase2: {
    oilAllowance:
      "18g (~162 kcal) — measure into a bowl each morning. Once it's gone, you're done.",
    wheySchedule: WHEY_SCHEDULE,
    meatWeightNote: MEAT_WEIGHT_NOTE,
    dailyHabits: DAILY_HABITS,
  },
  phase3: {
    oilAllowance:
      "12g (~108 kcal) — measure into a bowl each morning. Once it's gone, you're done.",
    wheySchedule: WHEY_SCHEDULE,
    meatWeightNote: MEAT_WEIGHT_NOTE,
    dailyHabits: DAILY_HABITS,
  },
}

export const DRINK_RULES: DosDonts = {
  dos: [
    '☕ Black coffee — appetite curb + great pre-gym energy. Max ~3–4/day, none after 4 PM.',
    '🥤 Diet Coke — fine, 1–2/day. Zero sugar.',
    '🍵 Green or black tea, water, sparkling water, lemon water — all good.',
  ],
  donts: [
    '🍮 Milky or sugary coffee/chai — a latte is 150–250 kcal. Count it.',
    '🧃 Fruit juice — sugar bomb, no fibre. Eat the fruit instead.',
    '🍺 Alcohol — 7 kcal/g and blunts fat-burning for hours. Easiest thing to cut.',
    '🥤 Extra protein shakes — your whey is already counted (~110 kcal/scoop).',
  ],
}

export const EATING_HABITS: DosDonts = {
  dos: [
    '🥩 Protein first every meal — meat, egg, or paneer before rice or roti.',
    '⚖️ Weigh when unsure — rice, oil, and paneer especially.',
    '🧊 Water before meals — a glass cuts intake naturally.',
    '😴 Sleep 7+ hrs — poor sleep spikes hunger the next day.',
    '🚶 Keep moving — nudge toward 8,000 steps when easy.',
  ],
  donts: [
    '🥤 Drink your calories — the #1 silent saboteur.',
    '🍞 Go zero-carb — you train hard; post-gym carbs fuel recovery.',
    '🎢 Blow out weekends — 5 good days + 2 bad days = zero progress.',
    '📉 Trust the daily scale — water swings are noise. Weigh weekly.',
  ],
}

export const SUPPLEMENTS: Supplement[] = [
  {
    name: 'Vitamin D3',
    tier: 'worth-it',
    note: "Deficiency is very common. ~1,000–2,000 IU/day maintenance, with a fatty meal. Test first — a diagnosed deficiency may need a doctor's high-dose course.",
  },
  {
    name: 'Vitamin B12',
    tier: 'worth-it',
    note: 'Commonly low; check on the same blood panel.',
  },
  {
    name: 'Omega-3 (fish oil)',
    tier: 'worth-it',
    note: 'Recovery, joints, heart. ~1–2g EPA+DHA/day.',
  },
  {
    name: 'Whey',
    tier: 'situational',
    note: "You've already got it — it's hitting your protein target.",
  },
  {
    name: 'Creatine',
    tier: 'situational',
    note: '5g/day, best-proven supplement for strength. Safe, cheap.',
  },
  {
    name: 'Magnesium',
    tier: 'situational',
    note: 'Helps sleep + cramps. Glycinate form, taken in the evening.',
  },
  {
    name: 'Fat burners, detox teas, BCAAs, "test boosters"',
    tier: 'skip',
    note: 'Marketing, not results.',
  },
]
