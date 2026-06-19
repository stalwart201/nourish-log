<script setup lang="ts">
import { useWeightStore } from '@/stores/weight.store'
import { START_WEIGHT_KG } from '@/constants/phases'

const store = useWeightStore()
</script>

<template>
  <div class="flex justify-around my-4 text-center">
    <div>
      <span class="block text-[11px] text-muted font-medium">Current</span>
      <strong class="font-serif text-[20px] font-bold text-ink">
        {{ store.latestEntry ? `${store.latestEntry.kg}` : '—' }}
      </strong>
    </div>
    <div>
      <span class="block text-[11px] text-muted font-medium">Lost</span>
      <strong class="font-serif text-[20px] font-bold text-ink">
        {{ store.latestEntry ? `${store.totalWeightLost.toFixed(1)}` : '—' }}
      </strong>
    </div>
    <div>
      <span class="block text-[11px] text-muted font-medium">From</span>
      <strong class="font-serif text-[20px] font-bold text-ink">{{ START_WEIGHT_KG }} kg</strong>
    </div>
    <div>
      <span class="block text-[11px] text-muted font-medium">Entries</span>
      <strong class="font-serif text-[20px] font-bold text-ink">{{ store.entries.length }}</strong>
    </div>
  </div>
</template>
