<script setup lang="ts">
import { computed } from 'vue'
import { useMealStore } from '@/stores/meal.store'
import { useUIStore } from '@/stores/ui.store'
import { scaleFoodItem } from '@/utils/macroCalc'
import type { FoodItem } from '@/constants/foods'

interface Props {
  item: FoodItem
  itemKey: string
  mult: number
}

const props = defineProps<Props>()

const store = useMealStore()
const uiStore = useUIStore()

const checked = computed(() => !!store.checks[props.itemKey])
const scaled = computed(() => scaleFoodItem(props.item, props.mult))
const displayQty = computed(() =>
  props.mult !== 1
    ? `${(props.item.baseQty * props.mult).toFixed(0)}${props.item.qtyUnit}`
    : props.item.qty,
)
</script>

<template>
  <div
    class="flex items-center gap-2.75 px-4 py-2.75 border-t border-line transition-opacity"
    :class="checked ? 'opacity-45' : ''"
  >
    <!-- Custom checkbox -->
    <label class="relative shrink-0 cursor-pointer">
      <input
        type="checkbox"
        class="absolute opacity-0 w-6 h-6 m-0 cursor-pointer"
        :checked="checked"
        :aria-label="`Mark ${item.name} as eaten`"
        @change="store.toggleCheck(itemKey)"
      />
      <span
        class="flex w-6 h-6 border-2 rounded-[9px] transition-all items-center justify-center"
        :class="checked ? 'border-accent bg-accent' : 'border-line bg-transparent'"
      >
        <span v-if="checked" class="text-white font-black text-sm leading-none">✓</span>
      </span>
    </label>

    <!-- Food info -->
    <div class="flex-1 min-w-0">
      <div
        class="text-[13.5px] font-semibold leading-snug"
        :class="checked ? 'line-through text-muted' : 'text-ink'"
      >
        {{ item.name }}
      </div>
      <div class="text-[10.5px] text-muted mt-0.5 font-medium">{{ displayQty }}</div>
    </div>

    <!-- Macros -->
    <div class="text-right shrink-0">
      <div class="text-[13px] font-bold font-serif leading-none text-accent">
        {{ Math.round(scaled.kcal) }}
      </div>
      <div class="text-[9px] text-muted mt-0.5 font-medium">
        P{{ Math.round(scaled.protein) }}·C{{ Math.round(scaled.carbs) }}·F{{
          Math.round(scaled.fat)
        }}
      </div>
    </div>

    <!-- Edit button -->
    <button
      type="button"
      class="shrink-0 text-[18px] leading-none cursor-pointer text-muted px-0.5"
      :aria-label="`Edit portion for ${item.name}`"
      @click="uiStore.openPortionEditor(itemKey)"
    >
      ⋯
    </button>
  </div>
</template>
