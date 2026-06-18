<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: number
  max: number
  label: string
  color: string
}

const props = defineProps<Props>()

const r = 36
const circumference = 2 * Math.PI * r

const dashFilled = computed(() => {
  const ratio = Math.min(Math.max(props.value / props.max, 0), 1)
  return ratio * circumference
})
</script>

<template>
  <div class="relative inline-flex items-center justify-center w-20 h-20">
    <svg
      viewBox="0 0 80 80"
      width="80"
      height="80"
      :aria-label="`${label}: ${Math.round(value)} of ${max}`"
      role="img"
    >
      <circle cx="40" cy="40" :r="r" fill="none" stroke="var(--color-line)" stroke-width="6" />
      <circle
        cx="40"
        cy="40"
        :r="r"
        fill="none"
        :stroke="color"
        stroke-width="6"
        stroke-linecap="round"
        :stroke-dasharray="`${dashFilled} ${circumference}`"
        transform="rotate(-90 40 40)"
      />
    </svg>
    <div class="absolute flex flex-col items-center pointer-events-none">
      <span class="text-sm font-semibold leading-none" style="color: var(--color-ink)">
        {{ Math.round(value) }}
      </span>
      <span class="text-[10px] leading-none mt-1" style="color: var(--color-muted)">
        {{ label }}
      </span>
    </div>
  </div>
</template>
