import { defineChain } from 'viem';

export const customCeloChain = defineChain({
  id: 44787,
  name: 'Celo Alfajores',
  network: 'celo-alfajores',
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://alfajores-forno.celo-testnet.org'],
      webSocket: ['wss://alfajores-forno.celo-testnet.org/ws'],
    },
    public: {
      http: ['https://alfajores-forno.celo-testnet.org'],
      webSocket: ['wss://alfajores-forno.celo-testnet.org/ws'],
    },
  },
  blockExplorers: {
    default: {
      name: 'CeloScan',
      url: 'https://alfajores.celoscan.io',
    },
  },
  testnet: true,
});

export const defaultChain = customCeloChain;
