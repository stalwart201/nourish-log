<script setup lang="ts">
import '@/assets/main.css'
import TabBar from '@/components/layout/TabBar.vue'
import { useUIStore } from '@/stores/ui.store'

const uiStore = useUIStore()
</script>

<template>
  <!-- Binding for future -->
  <div :data-theme="uiStore.theme">
    <TabBar />
    <RouterView />
  </div>
</template>
