import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {AccessTokenProvider, AccessToken} from './hooks/auth.ts';

type ProvidersProps = {
  children: React.ReactNode,
};

const queryClient = new QueryClient();

export function Providers({children}: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessTokenProvider value={new AccessToken()}>
        {children}
      </AccessTokenProvider>
    </QueryClientProvider>
  );
}
