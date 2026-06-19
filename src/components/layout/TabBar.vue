<script setup lang="ts">
const tabs = [
  { to: '/plan', label: 'Plan', icon: '📋' },
  { to: '/simple', label: 'Simple', icon: '✨' },
  { to: '/weight', label: 'Weight', icon: '⚖️' },
  { to: '/grocery', label: 'Grocery', icon: '🛒' },
  { to: '/about', label: 'Info', icon: 'ℹ️' },
]
</script>

<template>
  <nav class="flex gap-1.75 mb-4" aria-label="Main navigation">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      custom
      v-slot="{ navigate, isActive }"
    >
      <button
        type="button"
        class="flex-1 py-2.5 px-0.5 rounded-full border text-xs font-semibold cursor-pointer transition-colors shadow-soft"
        :class="isActive ? 'bg-accent text-white border-accent' : 'bg-card text-muted border-line'"
        :aria-current="isActive ? 'page' : undefined"
        @click="navigate"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </RouterLink>
  </nav>
</template>
