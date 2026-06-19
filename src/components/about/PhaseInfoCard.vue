<script setup lang="ts">
import { computed } from 'vue'
import { useMealStore } from '@/stores/meal.store'
import { PHASE_TARGETS } from '@/constants/phases'

const store = useMealStore()
const t = computed(() => PHASE_TARGETS[store.phase])

const rules = computed(() => [
  `🎯 Target <b>${t.value.calories} kcal</b> · <b>${t.value.protein}g protein</b> · expected ↓ ${t.value.expected}`,
  `🛢️ Measure daily oil into a bowl each morning: <b>${t.value.oilGrams}g</b> (~${t.value.oilCal} kcal). Once gone, done.`,
  `💪 Whey: 1 scoop pre-gym (1:15 PM) + 1 scoop in the evening — 54g protein locked in.`,
  `🍗 Meat weights are <b>boneless cooked</b>; "buy raw" notes include bone + cooking loss.`,
  `🥒 Cucumber daily, peppers 3×/wk, Diet Coke free (1–2/day).`,
  `💧 3–4 L water · 👟 5,000+ steps · 😴 7+ hrs sleep · ⚖️ weigh weekly.`,
])
</script>

<template>
  <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
    <div class="font-serif text-[18px] font-bold text-ink mb-3.5">
      📋 {{ t.label }} — {{ t.weekRange }}
    </div>
    <ul class="about-rules">
      <li v-for="rule in rules" :key="rule" v-html="rule" />
    </ul>
  </div>
</template>

<style scoped>
.about-rules {
  padding-left: 18px;
  font-size: 12.5px;
  color: var(--color-muted);
  line-height: 1.8;
  font-weight: 500;
}
.about-rules :deep(b) {
  color: var(--color-ink);
  font-weight: 700;
}
</style>
