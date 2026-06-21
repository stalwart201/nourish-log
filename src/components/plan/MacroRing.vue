<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max: number
  label: string
  unit: string
}

const props = defineProps<Props>()

const pct = computed(() => Math.min(100, Math.round((props.value / props.max) * 100)))
const offset = computed(() => 100 - pct.value)
</script>

<template>
  <div class="flex items-center gap-2.75">
    <div class="w-19.5 h-19.5 shrink-0 relative">
      <svg
        viewBox="0 0 36 36"
        class="w-full h-full -rotate-90"
        role="img"
        :aria-label="`${label}: ${Math.round(value)} of ${max} ${unit}`"
      >
        <circle cx="18" cy="18" r="15.9155" class="fill-none stroke-line" stroke-width="3" />
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          class="fill-none stroke-accent"
          stroke-width="3"
          stroke-linecap="round"
          stroke-dasharray="100"
          :stroke-dashoffset="offset"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-serif text-[21px] font-bold leading-none text-ink">{{
          Math.round(value)
        }}</span>
        <span class="text-[9px] text-muted mt-0.5 font-semibold tracking-[0.5px]">{{ unit }}</span>
      </div>
    </div>
    <div class="text-xs text-left leading-[1.35] font-semibold text-ink">
      {{ label }}<br />
      <span class="text-[10px] text-muted font-medium">{{ pct }}% of {{ max }}</span>
    </div>
  </div>
</template>
