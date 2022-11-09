import {useMutation, useQueryClient} from '@tanstack/react-query'
import {addTransaction} from '@app/api/transactions'

export function useAddTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['transactions']})
    },
  })
}
