import { createConfig, http, type Config } from 'wagmi';
import { defaultChain } from './chain';
export const wagmiConfig: Config = createConfig({
  chains: [defaultChain],
  transports: {
    [defaultChain.id]: http(),
  },
});
