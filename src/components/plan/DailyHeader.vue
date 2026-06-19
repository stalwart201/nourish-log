<script setup lang="ts">
import { useMealStore } from '@/stores/meal.store'
import MacroRing from './MacroRing.vue'

const store = useMealStore()
</script>

<template>
  <div class="text-center mb-4">
    <div
      class="inline-block text-[10px] font-bold tracking-[1.5px] uppercase px-3.5 py-1.5 rounded-full mb-2.5 bg-accent-soft text-accent"
    >
      {{ store.phaseTarget.label }} · {{ store.phaseTarget.weekRange }}
    </div>
    <h1 class="font-serif font-black text-[33px] leading-[1.05] tracking-[-1px] m-0 text-ink">
      Eat with <em class="not-italic text-accent">intent</em>, today.
    </h1>
    <p class="text-[12.5px] text-muted font-medium mt-2">
      116 kg · Male · 31 · target {{ store.phaseTarget.calories }} kcal ·
      {{ store.phaseTarget.protein }}g protein
    </p>
    <div class="flex justify-center gap-3.5 my-5">
      <MacroRing
        :value="store.dayMacroTotals.kcal"
        :max="store.phaseTarget.calories"
        label="Eaten"
        unit="kcal"
      />
      <MacroRing
        :value="store.dayMacroTotals.protein"
        :max="store.phaseTarget.protein"
        label="Protein"
        unit="g"
      />
    </div>
    <p class="text-[11.5px] text-muted font-medium">
      Planned today:
      <strong class="text-ink">{{ store.dayPlannedTotals.kcal }}</strong> kcal ·
      <strong class="text-ink">{{ store.dayPlannedTotals.protein }}g</strong> protein
    </p>
  </div>
</template>
