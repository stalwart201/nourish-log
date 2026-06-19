<script setup lang="ts">
import { useMealStore } from '@/stores/meal.store'
import { useGroceryStore } from '@/stores/grocery.store'
import { GROCERY_ITEMS } from '@/constants/grocery'
import GroceryItem from './GroceryItem.vue'

const mealStore = useMealStore()
const groceryStore = useGroceryStore()
</script>

<template>
  <div>
    <template v-for="item in GROCERY_ITEMS" :key="item.key">
      <GroceryItem
        v-if="groceryStore.totals[item.key]"
        :item="item"
        :amount="groceryStore.totals[item.key]!.amount"
        :checked="!!groceryStore.cart[`${mealStore.phase}|${item.key}`]"
      />
    </template>
    <button
      type="button"
      class="mt-4.5 w-full py-3 border border-line bg-bg text-accent rounded-full font-bold text-sm cursor-pointer"
      @click="groceryStore.clearCart(mealStore.phase)"
    >
      Clear cart
    </button>
  </div>
</template>
