import { ref } from 'vue'

export const updateAvailable = ref(false)

let _updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined

export function setUpdateSW(fn: (reloadPage?: boolean) => Promise<void>): void {
  _updateSW = fn
}

export function checkForUpdate(): void {
  _updateSW?.()
}

export function applyUpdate(): void {
  _updateSW?.(true)
}
