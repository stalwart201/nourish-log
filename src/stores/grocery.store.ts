import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'
import { calcGroceryTotals } from '@/utils/groceryTotals'
import type { PhaseKey } from '@/constants/meals'
import type { GroceryKey } from '@/constants/grocery'
import { useMealStore } from './meal.store'
import { useSyncStore } from './sync.store'

export const useGroceryStore = defineStore('grocery', () => {
  const cart = ref<Record<string, true>>({})

  const totals = computed(() => calcGroceryTotals(useMealStore().phase))

  const checkedCount = computed(() => {
    const prefix = `${useMealStore().phase}|`
    return Object.keys(cart.value).filter((key) => key.startsWith(prefix)).length
  })

  const totalCount = computed(() => Object.keys(totals.value).length)

  async function loadFromIDB() {
    cart.value = (await get<Record<string, true>>('grocery-cart')) ?? {}
  }

  async function toggleItem(phase: PhaseKey, key: GroceryKey) {
    const cartKey = `${phase}|${key}`
    if (cart.value[cartKey]) delete cart.value[cartKey]
    else cart.value[cartKey] = true
    await set('grocery-cart', cart.value)
    await useSyncStore().push('grocery-cart', cart.value)
  }

  async function clearCart(phase: PhaseKey) {
    const prefix = `${phase}|`
    for (const key of Object.keys(cart.value)) {
      if (key.startsWith(prefix)) delete cart.value[key]
    }
    await set('grocery-cart', cart.value)
    await useSyncStore().push('grocery-cart', cart.value)
  }

  return { cart, totals, checkedCount, totalCount, loadFromIDB, toggleItem, clearCart }
})
