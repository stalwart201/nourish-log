<script setup lang="ts">
import { computed } from 'vue'
import { useMealStore } from '@/stores/meal.store'
import { scaleFoodItem } from '@/utils/macroCalc'
import type { MealSlot, MealId, PhaseKey, DayKey } from '@/constants/meals'

const DOT_CLASS: Record<MealId, string> = {
  breakfast: 'bg-(--color-dot-breakfast)',
  pre_gym: 'bg-(--color-dot-pre-gym)',
  lunch: 'bg-(--color-dot-lunch)',
  snack: 'bg-(--color-dot-snack)',
  dinner: 'bg-(--color-dot-dinner)',
}
import MealItem from './MealItem.vue'

interface Props {
  meal: MealSlot
  phase: PhaseKey
  day: DayKey
}

const props = defineProps<Props>()
const store = useMealStore()

function itemKey(itemIdx: number): string {
  return `${props.phase}|${props.day}|${props.meal.id}|${itemIdx}`
}

function multFor(itemIdx: number): number {
  return store.edits[itemKey(itemIdx)] ?? 1
}

const mealTotals = computed(() => {
  let kcal = 0
  let protein = 0
  props.meal.items.forEach((item, idx) => {
    const scaled = scaleFoodItem(item, multFor(idx))
    kcal += scaled.kcal
    protein += scaled.protein
  })
  return { kcal: Math.round(kcal), protein: Math.round(protein) }
})

const oilBadge = computed(() => {
  for (const item of props.meal.items) {
    const m = item.qty.match(/(\d+g?\s*oil)/i) ?? item.name.match(/(\d+g?\s*oil)/i)
    if (m) return m[1]
  }
  return props.meal.items.some(
    (i) => i.name.toLowerCase().includes('oil') || i.qty.toLowerCase().includes('oil'),
  )
    ? 'oil'
    : null
})
</script>

<template>
  <div class="bg-card border border-line rounded-[20px] overflow-hidden mb-3.5 shadow-card">
    <!-- Meal header -->
    <div
      class="flex justify-between items-center px-4 py-3.25 border-b border-line text-[13px] flex-wrap gap-1.5"
    >
      <span class="flex items-center">
        <i class="inline-block w-2 h-2 rounded-full mr-2 shrink-0" :class="DOT_CLASS[meal.id]" />
        <strong class="font-serif font-bold text-[15px] text-ink">{{ meal.label }}</strong>
        <small class="text-muted ml-1.5 font-medium">{{ meal.time }}</small>
        <em
          v-if="oilBadge"
          class="not-italic text-[10px] font-bold ml-1.5 px-2 py-0.5 rounded-full text-accent bg-accent-soft"
        >
          🛢 {{ oilBadge }}
        </em>
      </span>
      <span class="font-bold text-[12px] text-accent">
        {{ mealTotals.kcal }} · {{ mealTotals.protein }}g P
      </span>
    </div>

    <!-- Items -->
    <MealItem
      v-for="(item, idx) in meal.items"
      :key="itemKey(idx)"
      :item="item"
      :item-key="itemKey(idx)"
      :mult="multFor(idx)"
    />
  </div>
</template>
