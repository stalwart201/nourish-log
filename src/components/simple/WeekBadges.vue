<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { useSimpleStore } from '@/stores/simple.store'

const store = useSimpleStore()
</script>

<template>
  <div class="flex justify-between gap-1">
    <div
      v-for="day in store.last7Days"
      :key="day.date"
      class="flex flex-col items-center gap-1 flex-1"
    >
      <span class="text-[10px] text-muted">
        {{ format(parseISO(day.date), 'EEE')[0] }}
      </span>
      <div
        class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
        :class="[
          day.ontrack ? 'bg-success text-white' : 'bg-bg2 text-muted',
          day.isToday ? 'ring-2 ring-accent ring-offset-1' : '',
        ]"
        :aria-label="`${day.date}${day.ontrack ? ' — on track' : ''}${day.isToday ? ' (today)' : ''}`"
      >
        {{ format(parseISO(day.date), 'd') }}
      </div>
    </div>
  </div>
</template>
