<script setup lang="ts">
defineProps<{
  title: string
  doHeader: string
  dontHeader: string
  dos: string[]
  donts: string[]
}>()
</script>

<template>
  <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
    <div class="font-serif text-[18px] font-bold text-ink mb-3.5">{{ title }}</div>

    <div class="mb-3.5">
      <div class="do-hdr ok">{{ doHeader }}</div>
      <ul class="about-rules">
        <li v-for="item in dos" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div>
      <div class="do-hdr no">{{ dontHeader }}</div>
      <ul class="about-rules">
        <li v-for="item in donts" :key="item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-rules {
  padding-left: 18px;
  font-size: 12.5px;
  color: var(--color-muted);
  line-height: 1.8;
  font-weight: 500;
}
.do-hdr {
  font-size: 13px;
  font-weight: 800;
  margin: 4px 0 4px;
  padding: 5px 11px;
  border-radius: 30px;
  display: inline-block;
}
.do-hdr.ok {
  background: rgba(58, 155, 110, 0.14);
  color: #3a9b6e;
}
.do-hdr.no {
  background: rgba(224, 57, 47, 0.12);
  color: var(--color-accent);
}
</style>
