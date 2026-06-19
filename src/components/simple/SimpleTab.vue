<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { useSimpleStore } from '@/stores/simple.store'
import { useMealStore } from '@/stores/meal.store'
import { PHASE_TARGETS } from '@/constants/phases'
import SimpleChecklist from './SimpleChecklist.vue'
import WeekBadges from './WeekBadges.vue'

const simpleStore = useSimpleStore()
const mealStore = useMealStore()

const todayKey = format(new Date(), 'yyyy-MM-dd')
const target = computed(() => PHASE_TARGETS[mealStore.phase])
const isOnTrack = computed(() => simpleStore.logs[todayKey]?.ontrack ?? false)
</script>

<template>
  <div class="flex flex-col gap-3.5 pb-10">
    <!-- Card 1: Simple Mode intro + targets -->
    <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
      <h2 class="font-serif font-bold text-[18px] text-ink mb-1.5">✨ Simple Mode</h2>
      <p class="text-[11.5px] text-muted font-medium mb-3.5 leading-relaxed">
        For busy days — skip the per-meal logging. Just hit these three and mark the day.
        Consistency over the week beats perfection.
      </p>
      <div class="flex gap-3">
        <div class="flex-1 bg-bg border border-line rounded-2xl p-3.5 text-center">
          <span class="block text-[11px] text-muted font-semibold mb-1">🥩 Protein</span>
          <strong class="font-serif text-2xl text-ink">{{ target.protein }}g</strong>
        </div>
        <div class="flex-1 bg-bg border border-line rounded-2xl p-3.5 text-center">
          <span class="block text-[11px] text-muted font-semibold mb-1">🎯 Calorie ceiling</span>
          <strong class="font-serif text-2xl text-ink">{{ target.calories }}</strong>
        </div>
      </div>
    </div>

    <!-- Card 2: Today's 3 + checklist + button -->
    <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
      <h2 class="font-serif font-bold text-[18px] text-ink mb-1.5">Today's 3</h2>
      <SimpleChecklist />
      <button
        type="button"
        class="mt-4 w-full py-3.5 border-2 rounded-full font-black text-[14px] cursor-pointer transition-colors font-sans"
        :class="
          isOnTrack
            ? 'bg-accent text-white border-accent'
            : 'bg-transparent border-accent text-accent'
        "
        @click="simpleStore.markOnTrack(todayKey)"
      >
        {{ isOnTrack ? '✓ Day marked on track' : 'Mark today on track' }}
      </button>
    </div>

    <!-- Card 3: Streak + week strip -->
    <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
      <h2 class="font-serif font-bold text-[18px] text-ink mb-1.5">
        🔥 Streak: {{ simpleStore.streak }} {{ simpleStore.streak === 1 ? 'day' : 'days' }}
      </h2>
      <p class="text-[11.5px] text-muted font-medium mb-3.5">
        Last 7 days — green = stayed on track.
      </p>
      <WeekBadges />
    </div>
  </div>
</template>
