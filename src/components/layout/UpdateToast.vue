<script setup lang="ts">
import { updateAvailable, applyUpdate } from '@/lib/sw-update'
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="updateAvailable"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-ink text-bg px-4 py-3 rounded-2xl shadow-card text-sm font-semibold whitespace-nowrap"
        role="status"
        aria-live="polite"
      >
        <span>Update available</span>
        <button
          type="button"
          class="px-3 py-1 rounded-lg bg-accent text-white text-xs font-bold cursor-pointer"
          @click="applyUpdate"
        >
          Reload
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
