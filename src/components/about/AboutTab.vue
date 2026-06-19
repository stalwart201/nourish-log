<script setup lang="ts">
import { DRINK_RULES, EATING_HABITS } from '@/constants/about'
import PhaseInfoCard from './PhaseInfoCard.vue'
import DosDontsCard from './DosDontsCard.vue'
import SupplementCard from './SupplementCard.vue'
import ResetButton from './ResetButton.vue'
</script>

<template>
  <div class="flex flex-col gap-3.5 pb-10">
    <PhaseInfoCard />
    <DosDontsCard
      title="☕ Drinks — Do's &amp; Don'ts"
      doHeader="✅ Sip freely"
      dontHeader="⛔ Watch out"
      :dos="DRINK_RULES.dos"
      :donts="DRINK_RULES.donts"
    />
    <DosDontsCard
      title="🍽️ Eating Habits"
      doHeader="✅ Do"
      dontHeader="⛔ Don't"
      :dos="EATING_HABITS.dos"
      :donts="EATING_HABITS.donts"
    />
    <SupplementCard />
    <ResetButton />
  </div>
</template>
