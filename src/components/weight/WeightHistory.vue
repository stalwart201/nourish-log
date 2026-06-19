<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { useWeightStore } from '@/stores/weight.store'

const store = useWeightStore()
</script>

<template>
  <div class="mt-2">
    <div v-if="!store.recentEntries.length" class="text-[12.5px] text-muted font-medium py-2">
      No entries yet
    </div>
    <div
      v-for="entry in store.recentEntries"
      :key="entry.date"
      class="flex justify-between py-2.25 border-b border-line text-[12.5px] text-muted font-medium"
    >
      <span>{{ format(parseISO(entry.date), 'EEE, d MMM yyyy') }}</span>
      <span class="text-ink font-semibold">{{ entry.kg }} kg</span>
    </div>
  </div>
</template>
