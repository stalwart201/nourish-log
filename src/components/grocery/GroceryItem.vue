<script setup lang="ts">
import { useMealStore } from '@/stores/meal.store'
import { useGroceryStore } from '@/stores/grocery.store'
import type { GroceryItem } from '@/constants/grocery'

defineProps<{
  item: GroceryItem
  amount: number
  checked: boolean
}>()

const mealStore = useMealStore()
const groceryStore = useGroceryStore()

function displayAmount(amount: number, unit: string): string {
  if (unit === 'g' && amount >= 1000) return `${(amount / 1000).toFixed(1)}kg`
  return `${amount}${unit}`
}
</script>

<template>
  <label
    class="flex items-center gap-2.75 py-2.75 border-b border-line last:border-b-0 text-[13.5px] font-medium cursor-pointer"
  >
    <!-- Custom checkbox 22px rounded-[7px] -->
    <div class="relative shrink-0">
      <input
        type="checkbox"
        :checked="checked"
        class="absolute opacity-0 w-5.5 h-5.5 m-0 cursor-pointer"
        @change="groceryStore.toggleItem(mealStore.phase, item.key)"
      />
      <span
        class="flex w-5.5 h-5.5 border-2 rounded-[7px] items-center justify-center transition-all"
        :class="checked ? 'bg-accent border-accent' : 'border-line'"
      >
        <span v-if="checked" class="text-white font-black text-xs leading-none">✓</span>
      </span>
    </div>
    <!-- Name -->
    <span class="flex-1 text-ink" :class="checked ? 'line-through opacity-50' : ''">
      {{ item.label }}
    </span>
    <!-- Amount in accent -->
    <strong class="text-accent font-bold shrink-0" :class="checked ? 'opacity-50' : ''">
      {{ displayAmount(amount, item.unit) }}
    </strong>
  </label>
</template>
