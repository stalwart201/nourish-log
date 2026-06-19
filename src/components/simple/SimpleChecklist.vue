<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { useSimpleStore } from '@/stores/simple.store'
import { CHECKLIST_LABELS } from '@/constants/about'

const store = useSimpleStore()
const todayKey = format(new Date(), 'yyyy-MM-dd')
const FIELDS = ['protein', 'deficit', 'move'] as const
const log = computed(() => store.logs[todayKey])

function isChecked(field: (typeof FIELDS)[number]): boolean {
  return log.value?.[field] ?? false
}

function toggle(field: (typeof FIELDS)[number], value: boolean) {
  store.setLog(todayKey, { [field]: value })
}
</script>

<template>
  <div>
    <label
      v-for="(field, i) in FIELDS"
      :key="field"
      class="flex items-center gap-3 py-3.25 cursor-pointer"
      :class="i < FIELDS.length - 1 ? 'border-b border-line' : ''"
    >
      <!-- Custom checkbox -->
      <div class="relative shrink-0">
        <input
          type="checkbox"
          class="absolute opacity-0 w-6.5 h-6.5 m-0 cursor-pointer"
          :checked="isChecked(field)"
          :aria-label="CHECKLIST_LABELS[field]"
          @change="toggle(field, ($event.target as HTMLInputElement).checked)"
        />
        <span
          class="flex w-6.5 h-6.5 border-2 rounded-[9px] transition-all items-center justify-center"
          :class="isChecked(field) ? 'bg-accent border-accent' : 'border-line'"
        >
          <span v-if="isChecked(field)" class="text-white font-black text-sm leading-none">✓</span>
        </span>
      </div>
      <span
        class="text-[14px] font-semibold"
        :class="isChecked(field) ? 'text-accent' : 'text-ink'"
      >
        {{ CHECKLIST_LABELS[field] }}
      </span>
    </label>
  </div>
</template>
