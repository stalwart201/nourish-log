import {
  createStore,
  get as idbGet,
  set as idbSet,
  del as idbDel,
  keys as idbKeys,
} from 'idb-keyval'

const store = createStore('nourish-log', 'kv')

export function get<T>(key: string): Promise<T | undefined> {
  return idbGet<T>(key, store)
}

export function set(key: string, val: unknown): Promise<void> {
  // JSON round-trip strips Vue reactive Proxy wrappers before IDB's structured clone
  const plain = val === undefined ? undefined : JSON.parse(JSON.stringify(val))
  return idbSet(key, plain, store)
}

export function del(key: string): Promise<void> {
  return idbDel(key, store)
}

export function keys(): Promise<string[]> {
  return idbKeys<string>(store)
}
