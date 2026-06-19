<script setup lang="ts">
import { useMealStore } from '@/stores/meal.store'
import { PHASE_KEYS, PHASE_TARGETS } from '@/constants/phases'
import type { PhaseKey } from '@/constants/meals'

const store = useMealStore()

const PHASE_ACTIVE_CLASS: Record<PhaseKey, string> = {
  phase1: 'text-white border-(--color-phase1) bg-(--color-phase1)',
  phase2: 'text-white border-(--color-phase2) bg-(--color-phase2)',
  phase3: 'text-white border-(--color-phase3) bg-(--color-phase3)',
}
</script>

<template>
  <div class="flex gap-2.25 my-4.5" role="group" aria-label="Select phase">
    <button
      v-for="key in PHASE_KEYS"
      :key="key"
      type="button"
      class="flex-1 py-2.75 px-1 rounded-2xl border font-semibold cursor-pointer text-center transition-transform active:scale-[0.97] shadow-soft"
      :class="store.phase === key ? PHASE_ACTIVE_CLASS[key] : 'text-muted border-line bg-card'"
      :aria-pressed="store.phase === key"
      @click="store.setPhase(key)"
    >
      <div class="text-sm font-semibold">{{ PHASE_TARGETS[key].label }}</div>
      <div class="text-[9px] mt-0.5 opacity-85 font-semibold">
        {{ PHASE_TARGETS[key].calories }} kcal
      </div>
    </button>
  </div>
</template>
