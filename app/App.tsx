import * as React from 'react'
import {AppStateStatus, Platform} from 'react-native'
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {useAppState} from '@app/hooks/use-app-state'
import {useOnlineManager} from '@app/hooks/use-online-manager'
import {App} from '@app/navigation'

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
})

export default function BudgetApp() {
  useOnlineManager()

  useAppState(onAppStateChange)

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
