import { useBetStore } from '@/store/useBetStore'
import { useAuthStore } from '@/store/useAuthStore'
import { handleApiError, createBetError } from '@/lib/error-handler'
import { Bet } from '@prisma/client'

interface CreateBetData {
  amount: number;
  type: string;
  odds: number;
  // Add other bet-specific fields
}

export const useBets = () => {
  const { setBets, setLoading, addBet, updateBet } = useBetStore()
  const user = useAuthStore((state) => state.user)

  const fetchUserBets = async () => {
    if (!user?.id) {
      throw createBetError(
        'Utilisateur non connecté',
        'BET_001',
        { userId: user?.id }
      )
    }

    try {
      setLoading(true)
      const response = await fetch(`/api/bets?userId=${user.id}`)
      
      if (!response.ok) {
        throw createBetError(
          'Erreur lors de la récupération des paris',
          'BET_002',
          { status: response.status }
        )
      }
      
      const data = await response.json()
      setBets(data)
    } catch (error) {
      handleApiError(error, 'fetchUserBets')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createBet = async (betData: CreateBetData): Promise<Bet> => {
    if (!user?.id) {
      throw createBetError(
        'Utilisateur non connecté',
        'BET_003',
        { userId: user?.id }
      )
    }

    try {
      setLoading(true)
      const response = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...betData, userId: user.id }),
      })

      if (!response.ok) {
        throw createBetError(
          'Erreur lors de la création du pari',
          'BET_004',
          { status: response.status }
        )
      }

      const newBet = await response.json()
      addBet(newBet)
      return newBet
    } catch (error) {
      handleApiError(error, 'createBet')
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchUserBets,
    createBet,
    ...useBetStore((state) => ({
      bets: state.bets,
      activeBet: state.activeBet,
      isLoading: state.isLoading
    })),
  }
}
