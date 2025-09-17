import { createConfig } from '@privy-io/wagmi';
import { defaultChain } from './chain';
import { http } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [defaultChain],
  transports: {
    [defaultChain.id]: http(),
  },
});
