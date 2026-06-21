<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import QRCode from 'qrcode'
import { useTimeoutFn } from '@vueuse/core'
import { useSyncStore } from '@/stores/sync.store'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const sync = useSyncStore()
const qrDataUrl = ref<string | null>(null)
const copied = ref(false)
const { start: startCopiedReset } = useTimeoutFn(
  () => {
    copied.value = false
  },
  2000,
  { immediate: false },
)

const syncUrl = computed(() => `${window.location.origin}/?sync=${sync.accountId}`)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      qrDataUrl.value = await QRCode.toDataURL(syncUrl.value, { width: 220, margin: 2 })
    }
  },
)

async function copyLink() {
  await navigator.clipboard.writeText(syncUrl.value)
  copied.value = true
  startCopiedReset()
}

function close() {
  emit('update:open', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="fixed inset-0 z-50 flex flex-col justify-end">
        <div class="absolute inset-0 z-0 bg-black/40 backdrop-blur-sm" @click="close" />
        <div
          data-sheet-panel
          class="relative z-10 bg-card rounded-t-2xl shadow-card px-5 pt-5 pb-10 max-w-md w-full mx-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Sync to another device"
        >
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-serif font-black text-lg text-ink m-0">Sync to another device</h2>
            <button
              type="button"
              class="w-8 h-8 rounded-lg border border-line bg-bg flex items-center justify-center text-muted cursor-pointer hover:text-ink"
              aria-label="Close"
              @click="close"
            >
              ✕
            </button>
          </div>

          <p class="text-xs text-muted leading-relaxed mb-4">
            Open this link on another device to sync your data. Anyone with this link has full
            access to your account.
          </p>

          <div class="flex items-center gap-2 bg-bg rounded-xl border border-line px-3 py-2.5 mb-4">
            <span class="text-xs text-muted font-mono truncate flex-1">{{ syncUrl }}</span>
            <button
              type="button"
              class="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-accent text-white cursor-pointer transition-colors"
              @click="copyLink"
            >
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>

          <div v-if="qrDataUrl" class="flex flex-col items-center gap-2 pt-2">
            <img
              :src="qrDataUrl"
              alt="QR code for sync link"
              class="w-[180px] h-[180px] rounded-xl"
            />
            <p class="text-[11px] text-muted">Scan with your phone camera</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-enter-active [data-sheet-panel],
.sheet-leave-active [data-sheet-panel] {
  transition: transform 0.25s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from [data-sheet-panel] {
  transform: translateY(100%);
}
.sheet-leave-to [data-sheet-panel] {
  transform: translateY(100%);
}
</style>
