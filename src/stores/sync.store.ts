import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'error'

export interface SyncQueueEntry {
  key: string
  value: unknown
  ts: number
}

export const useSyncStore = defineStore('sync', () => {
  const status = ref<SyncStatus>('idle')
  const session = ref<unknown>(null)
  const queue = ref<SyncQueueEntry[]>([])
  const lastSyncedAt = ref<string | null>(null)

  async function loadQueueFromIDB() {
    queue.value = (await get<SyncQueueEntry[]>('sync-queue')) ?? []
  }

  async function push(key: string, value: unknown) {
    queue.value = [...queue.value, { key, value, ts: Date.now() }]
    await set('sync-queue', queue.value)
  }

  return { status, session, queue, lastSyncedAt, loadQueueFromIDB, push }
})
