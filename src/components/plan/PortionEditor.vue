<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useMealStore } from '@/stores/meal.store'
import { useUIStore } from '@/stores/ui.store'

const mealStore = useMealStore()
const uiStore = useUIStore()

const OPTIONS: { label: string; mult: number }[] = [
  { label: 'Skip', mult: 0 },
  { label: '0.5×', mult: 0.5 },
  { label: '1×', mult: 1 },
  { label: '1.5×', mult: 1.5 },
  { label: '2×', mult: 2 },
]

async function select(mult: number) {
  if (uiStore.portionEditorKey) {
    await mealStore.setEdit(uiStore.portionEditorKey, mult)
  }
  uiStore.closePortionEditor()
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') uiStore.closePortionEditor()
}

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="uiStore.portionEditorOpen" class="fixed inset-0 z-50 flex flex-col justify-end">
        <div
          class="absolute inset-0 bg-black/40"
          aria-hidden="true"
          @click="uiStore.closePortionEditor()"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Adjust portion"
          class="relative rounded-t-2xl p-6 pb-10 bg-card"
        >
          <p class="text-sm font-semibold mb-4 text-muted">Adjust portion</p>
          <div class="flex gap-3 justify-between">
            <button
              v-for="opt in OPTIONS"
              :key="opt.mult"
              type="button"
              class="flex-1 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors"
              :class="
                mealStore.edits[uiStore.portionEditorKey ?? ''] === opt.mult ||
                (opt.mult === 1 && mealStore.edits[uiStore.portionEditorKey ?? ''] === undefined)
                  ? 'bg-accent text-white'
                  : 'bg-bg2 text-ink'
              "
              @click="select(opt.mult)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
