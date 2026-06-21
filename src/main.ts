import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { router } from './router'
import { useMealStore } from './stores/meal.store'
import { useSimpleStore } from './stores/simple.store'
import { useWeightStore } from './stores/weight.store'
import { useGroceryStore } from './stores/grocery.store'
import { useUIStore } from './stores/ui.store'
import { useSyncStore } from './stores/sync.store'
import { adoptAccountId } from './lib/account'
import { updateAvailable, setUpdateSW } from './lib/sw-update'
import { registerSW } from 'virtual:pwa-register'

// Must run before useSyncStore() so accountId ref initializes with the correct UUID
const syncUrl = new URL(window.location.href)
const incomingAccountId = syncUrl.searchParams.get('sync')
if (incomingAccountId) {
  adoptAccountId(incomingAccountId)
  syncUrl.searchParams.delete('sync')
  window.history.replaceState({}, '', syncUrl)
}

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // ui.store uses this for localStorage (theme, activeTab)

app.use(pinia)
app.use(router)

// Sequential IDB boot — order matters: meal must run first so accent color is applied
// before any child component renders, and so grocery.store can read the restored phase.
await useMealStore().loadFromIDB()
await useSimpleStore().loadFromIDB()
await useWeightStore().loadFromIDB()
await useGroceryStore().loadFromIDB()
useUIStore() // localStorage via pinia-plugin-persistedstate, no async needed

const syncStore = useSyncStore()
await syncStore.loadQueueFromIDB()
if (navigator.onLine) await syncStore.flushQueue()
if (navigator.onLine) {
  await syncStore.bootFetch()
  await useMealStore().loadFromIDB()
  await useSimpleStore().loadFromIDB()
  await useWeightStore().loadFromIDB()
  await useGroceryStore().loadFromIDB()
}

app.mount('#app')

const updateSW = registerSW({
  onNeedRefresh() {
    updateAvailable.value = true
  },
  onOfflineReady() {},
})
setUpdateSW(updateSW)
