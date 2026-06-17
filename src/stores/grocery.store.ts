import { defineStore } from 'pinia'
import { get, set } from '@/utils/idb'
import { calcGroceryTotals } from '@/utils/groceryTotals'
import type { PhaseKey } from '@/constants/meals'
import type { GroceryKey } from '@/constants/grocery'
import { useMealStore } from './meal.store'

export const useGroceryStore = defineStore('grocery', {
  state: () => ({
    cart: {} as Record<string, true>, // "phase1|chicken" → true
  }),
  getters: {
    totals(): Record<string, { amount: number; unit: string; label: string }> {
      return calcGroceryTotals(useMealStore().phase)
    },
    checkedCount(state): number {
      const prefix = `${useMealStore().phase}|`
      return Object.keys(state.cart).filter((key) => key.startsWith(prefix)).length
    },
    totalCount(): number {
      return Object.keys(this.totals).length
    },
  },
  actions: {
    async loadFromIDB() {
      this.cart = (await get<Record<string, true>>('grocery-cart')) ?? {}
    },
    async toggleItem(phase: PhaseKey, key: GroceryKey) {
      const cartKey = `${phase}|${key}`
      if (this.cart[cartKey]) delete this.cart[cartKey]
      else this.cart[cartKey] = true
      await set('grocery-cart', this.cart)
    },
    async clearCart(phase: PhaseKey) {
      const prefix = `${phase}|`
      for (const key of Object.keys(this.cart)) {
        if (key.startsWith(prefix)) delete this.cart[key]
      }
      await set('grocery-cart', this.cart)
    },
  },
})
