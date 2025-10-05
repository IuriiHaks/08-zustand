'use client'

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from '@tanstack/react-query'
import type { DehydratedState } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
  dehydratedState?: DehydratedState | null
}

export default function TanStackProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}
