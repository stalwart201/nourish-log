import { ref } from 'vue'
import { defineStore } from 'pinia'
import { get, set, del } from '@/utils/idb'
import { supabase } from '@/lib/supabase'
import { getAccountId } from '@/lib/account'

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'error'

export interface SyncQueueEntry {
  key: string
  value: unknown
  ts: number
}

export const useSyncStore = defineStore('sync', () => {
  const status = ref<SyncStatus>('idle')
  const accountId = ref<string>(getAccountId())
  const queue = ref<SyncQueueEntry[]>([])
  const lastSyncedAt = ref<string | null>(null)

  async function loadQueueFromIDB() {
    queue.value = (await get<SyncQueueEntry[]>('sync-queue')) ?? []
  }

  async function push(key: string, value: unknown) {
    if (!navigator.onLine) {
      queue.value = [...queue.value, { key, value, ts: Date.now() }]
      await set('sync-queue', queue.value)
      status.value = 'offline'
      return
    }
    status.value = 'syncing'
    try {
      const { error } = await supabase
        .from('meal_state')
        .upsert({ account_id: accountId.value, key, value })
      if (error) {
        status.value = 'error'
        return
      }
    } catch {
      status.value = 'error'
      return
    }
    lastSyncedAt.value = new Date().toISOString()
    status.value = 'synced'
  }

  async function flushQueue() {
    if (queue.value.length === 0) return
    status.value = 'syncing'
    try {
      for (const item of queue.value) {
        const { error } = await supabase
          .from('meal_state')
          .upsert({ account_id: accountId.value, key: item.key, value: item.value })
        if (error) {
          status.value = 'error'
          return
        }
      }
    } catch {
      status.value = 'error'
      return
    }
    queue.value = []
    await del('sync-queue')
    lastSyncedAt.value = new Date().toISOString()
    status.value = 'synced'
  }

  async function bootFetch() {
    if (!navigator.onLine) return
    status.value = 'syncing'
    try {
      const { data, error } = await supabase
        .from('meal_state')
        .select('key, value')
        .eq('account_id', accountId.value)
      if (error || !data) {
        status.value = 'error'
        return
      }
      for (const row of data) {
        await set(row.key, row.value)
      }
      lastSyncedAt.value = new Date().toISOString()
      status.value = 'synced'
    } catch {
      status.value = 'error'
    }
  }

  return { status, accountId, queue, lastSyncedAt, loadQueueFromIDB, push, flushQueue, bootFetch }
})
