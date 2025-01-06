import { useAuthStore } from '@/store/useAuthStore'
import { useWalletStore } from '@/store/useWalletStore'
import { useSession } from 'next-auth/react'

export const useHeader = () => {
  const { data: session, status } = useSession()
  const user = useAuthStore((state) => state.user)
  const balance = useWalletStore((state) => state.balance)

  return {
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    user,
    balance,
    session
  }
}
