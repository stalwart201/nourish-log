<script setup lang="ts">
const tabs = [
  { to: '/plan', label: 'Plan' },
  { to: '/simple', label: 'Simple' },
  { to: '/weight', label: 'Weight' },
  { to: '/grocery', label: 'Grocery' },
  { to: '/about', label: 'About' },
]
</script>

<template>
  <nav>
    <RouterLink
      v-for="tab in tabs"
      :key="tab.to"
      :to="tab.to"
      custom
      v-slot="{ navigate, isActive }"
    >
      <button
        type="button"
        :aria-label="tab.label"
        :aria-current="isActive ? 'page' : undefined"
        @click="navigate"
      >
        {{ tab.label }}
      </button>
    </RouterLink>
  </nav>
</template>
