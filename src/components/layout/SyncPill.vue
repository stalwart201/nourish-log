<script setup lang="ts">
import { computed } from 'vue'
import { useSyncStore, type SyncStatus } from '@/stores/sync.store'

defineEmits<{ openShare: [] }>()

const sync = useSyncStore()

const dotClass = computed<string>(() => {
  const map: Record<SyncStatus, string> = {
    idle: 'bg-muted',
    syncing: 'bg-amber-400 animate-pulse',
    synced: 'bg-success',
    offline: 'bg-muted',
    error: 'bg-red-400',
  }
  return map[sync.status]
})

const label = computed<string>(() => {
  const map: Record<SyncStatus, string> = {
    idle: 'Sync',
    syncing: 'Syncing…',
    synced: 'Synced',
    offline: 'Offline',
    error: 'Error',
  }
  return map[sync.status]
})
</script>

<template>
  <button
    type="button"
    class="flex items-center gap-1.5 h-9.5 px-3 rounded-xl border border-line bg-card text-xs font-semibold text-muted cursor-pointer shadow-soft transition-colors hover:text-ink"
    aria-label="Sync status — tap to share"
    @click="$emit('openShare')"
  >
    <span class="w-2 h-2 rounded-full shrink-0 transition-colors" :class="dotClass" />
    {{ label }}
  </button>
</template>
