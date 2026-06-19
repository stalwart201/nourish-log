<script setup lang="ts">
import '@/assets/main.css'
import { watchEffect } from 'vue'
import TabBar from '@/components/layout/TabBar.vue'
import DailyHeader from '@/components/plan/DailyHeader.vue'
import PhaseSelector from '@/components/plan/PhaseSelector.vue'
import { useUIStore } from '@/stores/ui.store'

const uiStore = useUIStore()

watchEffect(() => {
  document.documentElement.dataset.theme = uiStore.theme
})
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
      <button
        type="button"
        class="w-9.5 h-9.5 rounded-xl border border-line bg-card text-base cursor-pointer text-ink shadow-soft"
        :aria-label="uiStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="uiStore.toggleTheme()"
      >
        {{ uiStore.theme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>

    <DailyHeader />
    <PhaseSelector />
    <TabBar />
    <RouterView />
  </div>
</template>
