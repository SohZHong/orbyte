'use client';

import {
  CARBON_CREDIT_MARKETPLACE_ABI,
  CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
  CARBON_CREDIT_TOKEN_ABI,
  CREDIT_TOKEN_CONTRACT_ADDRESS,
} from '@/constants';
import { useTransaction } from './use-transaction';
import { parseEther } from 'viem';

export const useMarketplaceContract = () => {
  const marketplaceTx = useTransaction(
    CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
    CARBON_CREDIT_MARKETPLACE_ABI
  );

  /**
   * List credits with behind-the-scenes approval
   * Uses sendBatchTx to combine approval + list into one atomic tx
   */
  const list = async (params: {
    tokenId: bigint;
    amount: bigint;
    pricePerUnitWei: string;
    startTime: bigint;
    endTime: bigint;
  }) => {
    return marketplaceTx.sendBatchTx([
      {
        to: CREDIT_TOKEN_CONTRACT_ADDRESS,
        abi: CARBON_CREDIT_TOKEN_ABI,
        functionName: 'setApprovalForAll',
        args: [CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS, true],
      },
      {
        to: CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
        abi: CARBON_CREDIT_MARKETPLACE_ABI,
        functionName: 'list',
        args: [
          params.tokenId,
          params.amount,
          parseEther(params.pricePerUnitWei, 'wei'),
          params.startTime,
          params.endTime,
        ],
      },
    ]);
  };

  const updateListing = (params: {
    listingId: bigint;
    newPricePerUnitWei: string;
    newRemaining: bigint;
  }) => {
    return marketplaceTx.sendTx('updateListing', [
      params.listingId,
      parseEther(params.newPricePerUnitWei, 'wei'),
      params.newRemaining,
    ]);
  };

  const cancelListing = (listingId: bigint) => {
    return marketplaceTx.sendTx('cancel', [listingId]);
  };

  const buy = (listingId: bigint, quantity: bigint, totalValueWei: string) => {
    return marketplaceTx.sendTx(
      'buy',
      [listingId, quantity],
      parseEther(totalValueWei, 'wei') // pass value for CELO payment
    );
  };

  return {
    ...marketplaceTx, // hash, isPending, isConfirmed, error
    list,
    updateListing,
    cancelListing,
    buy,
  };
};
