'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { appId, privyConfig, smartWalletConfig, wagmiConfig } from '@/config';
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider appId={appId} config={privyConfig}>
        <SmartWalletsProvider config={smartWalletConfig}>
          <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
        </SmartWalletsProvider>
      </PrivyProvider>
    </QueryClientProvider>
  );
}
