import { useErrorStore } from '@/store/useErrorStore'
import { ErrorType } from '@/types/errors'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircle } from "lucide-react"

const getErrorTitle = (type: ErrorType): string => {
  switch (type) {
    case ErrorType.AUTHENTICATION:
      return "Erreur d'authentification"
    case ErrorType.AUTHORIZATION:
      return "Erreur d'autorisation"
    case ErrorType.VALIDATION:
      return "Erreur de validation"
    case ErrorType.DATABASE:
      return "Erreur de base de données"
    case ErrorType.NETWORK:
      return "Erreur réseau"
    case ErrorType.WALLET:
      return "Erreur de portefeuille"
    case ErrorType.BET:
      return "Erreur de pari"
    default:
      return "Erreur"
  }
}

export function ErrorDisplay() {
  const { errors, removeError } = useErrorStore()

  if (errors.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {errors.map((error) => (
        <Alert key={error.timestamp.toString()} variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>{getErrorTitle(error.type)}</AlertTitle>
          <AlertDescription>
            {error.message}
            {error.code && <span className="block text-sm">Code: {error.code}</span>}
          </AlertDescription>
          <button
            onClick={() => removeError(error.timestamp)}
            className="absolute top-2 right-2 text-red-800 hover:text-red-900"
          >
            ×
          </button>
        </Alert>
      ))}
    </div>
  )
}
