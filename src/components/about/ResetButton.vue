<script setup lang="ts">
import { del } from '@/utils/idb'
import { useMealStore } from '@/stores/meal.store'
import { useSimpleStore } from '@/stores/simple.store'
import { useWeightStore } from '@/stores/weight.store'
import { useGroceryStore } from '@/stores/grocery.store'
import { useSyncStore } from '@/stores/sync.store'

const mealStore = useMealStore()
const simpleStore = useSimpleStore()
const weightStore = useWeightStore()
const groceryStore = useGroceryStore()
const syncStore = useSyncStore()

async function reset() {
  if (!confirm('Reset all data? This cannot be undone.')) return

  await Promise.all([
    del('phase'),
    del('checks'),
    del('edits'),
    del('startDate'),
    del('simple-logs'),
    del('weight-entries'),
    del('grocery-cart'),
    del('sync-queue'),
  ])

  await mealStore.setPhase('phase1')
  mealStore.checks = {}
  mealStore.edits = {}
  mealStore.startDate = null

  simpleStore.logs = {}
  weightStore.entries = []
  groceryStore.cart = {}
  syncStore.queue = []
}
</script>

<template>
  <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
    <p class="text-[11.5px] text-muted font-medium leading-normal mb-4.5">
      📊 Estimates for guidance. Adjust to real weekly progress. ⚕️ Not medical advice — consult a
      doctor for anything health-specific.
    </p>
    <button
      type="button"
      class="w-full py-3 border border-line bg-bg text-accent rounded-full font-bold text-sm cursor-pointer"
      @click="reset"
    >
      🗑️ Reset all checks &amp; data
    </button>
  </div>
</template>
