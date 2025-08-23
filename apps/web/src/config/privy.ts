import type { PrivyClientConfig } from '@privy-io/react-auth';
import { defaultChain } from './chain';

export const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';

export const privyConfig: PrivyClientConfig = {
  defaultChain: defaultChain,
  loginMethods: ['email'],
  embeddedWallets: { ethereum: { createOnLogin: 'all-users' } },
};
