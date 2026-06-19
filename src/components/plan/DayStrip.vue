<script setup lang="ts">
import { computed } from 'vue'
import { useMealStore } from '@/stores/meal.store'
import { MEAL_DATA, DAY_LABELS, type DayKey } from '@/constants/meals'

const store = useMealStore()

const DISPLAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const dayKcal = computed(() => {
  const phase = store.phase
  return Object.fromEntries(
    DISPLAY_ORDER.map((day) => [
      day,
      MEAL_DATA[phase][day].meals.flatMap((m) => m.items).reduce((sum, item) => sum + item.kcal, 0),
    ]),
  ) as Record<DayKey, number>
})
</script>

<template>
  <div
    class="scrollbar-none snap-x snap-mandatory flex gap-1.75 overflow-x-auto pb-1.25 mb-4"
    role="group"
    aria-label="Select day"
  >
    <button
      v-for="day in DISPLAY_ORDER"
      :key="day"
      type="button"
      class="flex flex-col items-center shrink-0 px-3.5 py-2.25 rounded-full border font-semibold cursor-pointer transition-colors text-center shadow-soft"
      :class="
        store.activeDay === day
          ? 'text-white border-accent bg-accent'
          : 'border-line bg-card text-muted'
      "
      :aria-pressed="store.activeDay === day"
      @click="store.setDay(day)"
    >
      <span class="text-xs font-semibold">{{ DAY_LABELS[day] }}</span>
      <span class="text-[10px] mt-0.5 font-semibold">{{ dayKcal[day] }}</span>
    </button>
  </div>
</template>
