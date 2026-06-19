<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { format, parseISO } from 'date-fns'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { useWeightStore } from '@/stores/weight.store'
import { useUIStore } from '@/stores/ui.store'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

const store = useWeightStore()
const uiStore = useUIStore()

const accentColor = computed(() => {
  void uiStore.theme
  return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
})

const lineColor = computed(() => {
  void uiStore.theme
  return getComputedStyle(document.documentElement).getPropertyValue('--color-line').trim()
})

const chartData = computed(() => ({
  labels: store.entries.map((e) => format(parseISO(e.date), 'd MMM')),
  datasets: [
    {
      label: 'Weight (kg)',
      data: store.entries.map((e) => e.kg),
      borderColor: accentColor.value,
      tension: 0.3,
      fill: false,
    },
  ],
}))

const options = computed(() => {
  const min = store.entries.length ? Math.min(...store.entries.map((e) => e.kg)) - 1 : 50
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        min,
        grid: { color: lineColor.value },
      },
      x: {
        grid: { display: false },
      },
    },
  }
})
</script>

<template>
  <div class="py-4 border-b border-line">
    <p class="text-xs font-semibold mb-3 text-muted">Weight trend</p>
    <div v-if="store.entries.length < 2" class="py-8 text-center text-sm text-muted">
      Log at least 2 entries to see the chart
    </div>
    <Line v-else :data="chartData" :options="options" />
  </div>
</template>
