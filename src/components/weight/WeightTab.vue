<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import WeightInput from './WeightInput.vue'
import WeightStats from './WeightStats.vue'
import WeightHistory from './WeightHistory.vue'

const WeightChart = defineAsyncComponent(() => import('./WeightChart.vue'))
</script>

<template>
  <div class="pb-10">
    <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
      <WeightInput />
      <Suspense>
        <WeightChart />
        <template #fallback>
          <div class="h-50 flex items-center justify-center text-sm text-muted">Loading…</div>
        </template>
      </Suspense>
      <WeightStats />
      <WeightHistory />
    </div>
  </div>
</template>
