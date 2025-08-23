import type { PrivyClientConfig } from '@privy-io/react-auth';
import { defaultChain } from './chain';
import type { SmartWalletsProviderProps } from '@privy-io/react-auth/smart-wallets';

export const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';

export const privyConfig: PrivyClientConfig = {
  defaultChain: defaultChain,
  loginMethods: ['email'],
  embeddedWallets: { ethereum: { createOnLogin: 'all-users' } },
};

export const smartWalletConfig: SmartWalletsProviderProps['config'] = {
  paymasterContext: {
    mode: 'SPONSORED',
    calculateGasLimits: true,
    expiryDuration: 300,
    sponsorshipInfo: {
      webhookData: {},
      smartAccountInfo: {
        name: 'ALCHEMY',
        version: '2.0.0',
      },
    },
  },
};
