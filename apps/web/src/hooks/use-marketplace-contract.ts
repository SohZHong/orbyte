'use client';

import { useState } from 'react';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { encodeFunctionData } from 'viem';
import {
  CARBON_CREDIT_MARKETPLACE_ABI,
  CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
} from '@/constants';
import type { TxState } from '@/types/transaction';

export const useMarketplaceContract = () => {
  const { client } = useSmartWallets();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<any | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const sendTx = async (
    functionName: string,
    args: any[]
  ): Promise<TxState> => {
    try {
      if (!client) throw new Error('No Privy Smart Wallet client available');
      setIsPending(true);

      const data = encodeFunctionData({
        abi: CARBON_CREDIT_MARKETPLACE_ABI,
        functionName,
        args,
      });

      const txHash = await client.sendTransaction({
        to: CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
        data,
        value: args.includes('buy') ? args[1] : 0, // optional CELO value for buys
      });

      setHash(txHash);
      setIsPending(false);
      setIsConfirmed(true);

      return { hash: txHash, isPending: false, isConfirmed: true, error: null };
    } catch (err) {
      setError(err);
      setIsPending(false);
      throw err;
    }
  };

  const list = (params: {
    tokenId: bigint;
    amount: bigint;
    pricePerUnitWei: bigint;
    startTime: bigint;
    endTime: bigint;
  }) => {
    return sendTx('list', [
      params.tokenId,
      params.amount,
      params.pricePerUnitWei,
      params.startTime,
      params.endTime,
    ]);
  };

  const updateListing = (params: {
    listingId: bigint;
    newPricePerUnitWei: bigint;
    newRemaining: bigint;
  }) => {
    return sendTx('updateListing', [
      params.listingId,
      params.newPricePerUnitWei,
      params.newRemaining,
    ]);
  };

  const cancelListing = (listingId: bigint) => {
    return sendTx('cancel', [listingId]);
  };

  const buy = (listingId: bigint, quantity: bigint, totalValueWei: bigint) => {
    return sendTx('buy', [listingId, quantity, totalValueWei]);
  };

  return {
    hash,
    isPending,
    isConfirmed,
    error,
    list,
    updateListing,
    cancelListing,
    buy,
  };
};
