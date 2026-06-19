<script setup lang="ts">
import { computed } from 'vue'
import { useMealStore } from '@/stores/meal.store'
import { MEAL_DATA } from '@/constants/meals'
import { PHASE_TARGETS } from '@/constants/phases'
import { calcPhaseShift } from '@/utils/phaseShift'
import DayStrip from './DayStrip.vue'
import MealCard from './MealCard.vue'
import PortionEditor from './PortionEditor.vue'

const store = useMealStore()

const meals = computed(() => MEAL_DATA[store.phase][store.activeDay].meals)

const phaseShift = computed(() => calcPhaseShift(store.startDate, store.phase))
</script>

<template>
  <div class="flex flex-col gap-3 pb-24">
    <div
      v-if="phaseShift.mismatch"
      class="mx-4 mt-3 rounded-xl px-4 py-3 flex items-center gap-3 bg-bg2"
    >
      <p class="flex-1 text-sm text-ink">
        Week {{ phaseShift.currentWeek }} — you should be on
        <strong>{{ PHASE_TARGETS[phaseShift.suggestedPhase].label }}</strong>
      </p>
      <button
        type="button"
        class="shrink-0 text-sm font-semibold px-3 py-1.5 rounded-lg cursor-pointer bg-accent text-white"
        @click="store.setPhase(phaseShift.suggestedPhase)"
      >
        Switch
      </button>
    </div>

    <DayStrip />

    <div class="flex flex-col gap-3 px-4">
      <MealCard
        v-for="meal in meals"
        :key="meal.id"
        :meal="meal"
        :phase="store.phase"
        :day="store.activeDay"
      />
    </div>

    <PortionEditor />
  </div>
</template>
