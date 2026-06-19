<script setup lang="ts">
import { ref } from 'vue'
import { useWeightStore } from '@/stores/weight.store'

const store = useWeightStore()
const kg = ref<number | null>(null)

async function submit() {
  if (kg.value === null) return
  await store.recordWeight(kg.value)
  kg.value = null
}
</script>

<template>
  <div class="flex gap-2.25 mb-4">
    <input
      v-model.number="kg"
      type="number"
      step="0.1"
      min="30"
      max="300"
      placeholder="Today's weight (kg)"
      class="flex-1 px-3.5 py-3 rounded-2xl border border-line bg-bg text-[15px] text-ink outline-none font-sans"
      @keydown.enter="submit"
    />
    <button
      type="button"
      class="px-5 py-3 rounded-full font-bold text-sm cursor-pointer bg-accent text-white border-none font-sans"
      :disabled="kg === null"
      @click="submit"
    >
      Log
    </button>
  </div>
</template>
