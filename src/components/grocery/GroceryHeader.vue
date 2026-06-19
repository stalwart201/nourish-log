<script setup lang="ts">
import { useMealStore } from '@/stores/meal.store'
import { useGroceryStore } from '@/stores/grocery.store'
import { PHASE_TARGETS } from '@/constants/phases'

const mealStore = useMealStore()
const groceryStore = useGroceryStore()
</script>

<template>
  <div>
    <div class="font-serif text-[18px] font-bold text-ink mb-1.5">
      Weekly shopping · {{ PHASE_TARGETS[mealStore.phase].label }}
    </div>
    <div class="text-[11.5px] text-muted font-medium mb-3.5 leading-normal">
      {{ groceryStore.checkedCount }}/{{ groceryStore.totalCount }} in cart · totals for all 7 days
      · buy-raw weights include bone/cooking loss.
    </div>
  </div>
</template>
