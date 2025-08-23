import { createConfig } from '@privy-io/wagmi';
import { defaultChain } from './chain';
import { http, type Config } from 'wagmi';

export const wagmiConfig: Config = createConfig({
  chains: [defaultChain],
  transports: {
    [defaultChain.id]: http(),
  },
});
