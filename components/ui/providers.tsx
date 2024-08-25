'use client';

import { toast } from '@/components/ui/use-toast';
import {
  QueryCache,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from './toaster';

function makeQueryClient() {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) =>
        toast({
          title: error.name,
          description: error.message,
          variant: 'destructive',
        }),
    }),
    mutationCache: new MutationCache({
      onError: (error) =>
        toast({
          title: error.name,
          description: error.message,
          variant: 'destructive',
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries();
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: (previousData: unknown) => previousData,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
  return queryClient;
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
