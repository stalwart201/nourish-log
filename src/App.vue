<script setup lang="ts">
import '@/assets/main.css'
import { ref, watch } from 'vue'
import { useOnline, useDark, useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import TabBar from '@/components/layout/TabBar.vue'
import SyncPill from '@/components/layout/SyncPill.vue'
import ShareSheet from '@/components/layout/ShareSheet.vue'
import UpdateToast from '@/components/layout/UpdateToast.vue'
import DailyHeader from '@/components/plan/DailyHeader.vue'
import PhaseSelector from '@/components/plan/PhaseSelector.vue'
import { useUIStore } from '@/stores/ui.store'
import { useSyncStore } from '@/stores/sync.store'
import { useMealStore } from '@/stores/meal.store'
import { useSimpleStore } from '@/stores/simple.store'
import { useWeightStore } from '@/stores/weight.store'
import { useGroceryStore } from '@/stores/grocery.store'
import { checkForUpdate } from '@/lib/sw-update'

const uiStore = useUIStore()
const syncStore = useSyncStore()
const mealStore = useMealStore()
const simpleStore = useSimpleStore()
const weightStore = useWeightStore()
const groceryStore = useGroceryStore()
const shareOpen = ref(false)
const isOnline = useOnline()

const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})

watch(isDark, (dark) => uiStore.setTheme(dark ? 'dark' : 'light'), { immediate: true })

const visibility = useDocumentVisibility()
watch(visibility, (v) => {
  if (v === 'visible') checkForUpdate()
})

watch(isOnline, async (online) => {
  if (online) await syncStore.flushQueue()
})

async function pollRemote() {
  if (!navigator.onLine || syncStore.status === 'syncing') return
  await syncStore.bootFetch()
  await mealStore.loadFromIDB()
  await simpleStore.loadFromIDB()
  await weightStore.loadFromIDB()
  await groceryStore.loadFromIDB()
}

async function openShare() {
  shareOpen.value = true
  await pollRemote()
}

useIntervalFn(pollRemote, 30_000)
</script>

<template>
  <div>
    <div class="topbar flex items-center justify-between mb-1.5">
      <div
        class="flex items-center gap-2.25 font-serif font-black text-[21px] tracking-[-0.5px] text-ink"
      >
        <span
          class="w-7.5 h-7.5 rounded-[9px] flex items-center justify-center text-base text-white bg-accent"
          >🍴</span
        >
        NourishLog
      </div>
      <div class="flex items-center gap-2">
        <SyncPill @open-share="openShare" />
        <button
          type="button"
          class="w-9.5 h-9.5 rounded-xl border border-line bg-card text-base cursor-pointer text-ink shadow-soft"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="isDark = !isDark"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </div>

    <DailyHeader />
    <PhaseSelector />
    <TabBar />
    <RouterView />
    <ShareSheet v-model:open="shareOpen" />
    <UpdateToast />
  </div>
</template>
