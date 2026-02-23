import { cookies } from 'next/headers'

export function isAuthenticated(): boolean {
  const cookieStore = cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

export function checkPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD
}
