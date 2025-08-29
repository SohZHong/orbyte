import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { defaultChain } from '@/config';

const account = privateKeyToAccount(
  process.env.OWNER_PRIVATE_KEY as `0x${string}`
);

export const walletClient = createWalletClient({
  account,
  chain: defaultChain,
  transport: http(),
});
