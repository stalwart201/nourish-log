const ACCOUNT_KEY = 'account-id'

export function getAccountId(): string {
  let id = localStorage.getItem(ACCOUNT_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(ACCOUNT_KEY, id)
  }
  return id
}

export function adoptAccountId(id: string): void {
  localStorage.setItem(ACCOUNT_KEY, id)
}
