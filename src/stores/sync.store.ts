import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'error'

export interface SyncQueueEntry {
  key: string
  value: unknown
  ts: number
}

export const useSyncStore = defineStore('sync', {
  state: () => ({
    status: 'idle' as SyncStatus,
    session: null as unknown,
    queue: [] as SyncQueueEntry[],
    lastSyncedAt: null as string | null,
  }),
  actions: {
    async loadQueueFromIDB() {
      this.queue = (await get<SyncQueueEntry[]>('sync-queue')) ?? []
    },
    async push(key: string, value: unknown) {
      this.queue = [...this.queue, { key, value, ts: Date.now() }]
      await set('sync-queue', this.queue)
    },
  },
})
