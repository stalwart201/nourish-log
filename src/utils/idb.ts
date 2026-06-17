import { createStore, get as idbGet, set as idbSet, del as idbDel, keys as idbKeys } from 'idb-keyval'

const store = createStore('nourish-log', 'kv')

export function get<T>(key: string): Promise<T | undefined> {
  return idbGet<T>(key, store)
}

export function set(key: string, val: unknown): Promise<void> {
  return idbSet(key, val, store)
}

export function del(key: string): Promise<void> {
  return idbDel(key, store)
}

export function keys(): Promise<string[]> {
  return idbKeys<string>(store)
}
