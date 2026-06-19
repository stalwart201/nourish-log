<script setup lang="ts">
import { SUPPLEMENTS } from '@/constants/about'
import type { SupplementTier } from '@/constants/about'

const TIERS: { key: SupplementTier; label: string; cls: string }[] = [
  { key: 'worth-it', label: '⭐ Worth it (most Indians)', cls: 'ok' },
  { key: 'situational', label: '👍 Situational', cls: 'meh' },
  { key: 'skip', label: '🗑️ Skip', cls: 'no' },
]

function supplementsForTier(tier: SupplementTier) {
  return SUPPLEMENTS.filter((s) => s.tier === tier)
}
</script>

<template>
  <div class="bg-card border border-line rounded-[20px] p-4.5 shadow-card">
    <div class="font-serif text-[18px] font-bold text-ink mb-3.5">💊 Supplements</div>

    <div v-for="tier in TIERS" :key="tier.key" class="mb-3.5 last:mb-0">
      <div class="do-hdr" :class="tier.cls">{{ tier.label }}</div>
      <ul class="about-rules">
        <li v-for="supp in supplementsForTier(tier.key)" :key="supp.name">
          <b>{{ supp.name }}</b> — {{ supp.note }}
        </li>
      </ul>
    </div>

    <div class="text-[11.5px] text-muted font-medium leading-normal mt-3.5">
      🧪 <b class="text-ink font-bold">Before supplementing:</b> get a basic blood panel (Vitamin D,
      B12, thyroid/TSH, fasting glucose, lipids). At 116 kg starting a cut, a baseline tells you
      what you actually need and rules out anything (like low thyroid) that makes fat loss harder.
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
.about-rules :deep(b) {
  color: var(--color-ink);
  font-weight: 700;
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
.do-hdr.meh {
  background: rgba(240, 133, 61, 0.14);
  color: #d97a32;
}
</style>
