<script setup lang="ts">
import GroceryHeader from './GroceryHeader.vue'
import GroceryList from './GroceryList.vue'
</script>

<template>
  <div class="pb-10">
    <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
      <GroceryHeader />
      <GroceryList />
    </div>
  </div>
</template>
