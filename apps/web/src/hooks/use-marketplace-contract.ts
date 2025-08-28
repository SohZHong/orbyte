'use client';

import {
  CARBON_CREDIT_MARKETPLACE_ABI,
  CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
  CARBON_CREDIT_TOKEN_ABI,
  CREDIT_TOKEN_CONTRACT_ADDRESS,
} from '@/constants';
import { useTransaction } from './use-transaction';

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
    pricePerUnitWei: bigint;
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
          params.pricePerUnitWei,
          params.startTime,
          params.endTime,
        ],
      },
    ]);
  };

  const updateListing = (params: {
    listingId: bigint;
    newPricePerUnitWei: bigint;
    newRemaining: bigint;
  }) => {
    return marketplaceTx.sendTx('updateListing', [
      params.listingId,
      params.newPricePerUnitWei,
      params.newRemaining,
    ]);
  };

  const cancelListing = (listingId: bigint) => {
    return marketplaceTx.sendTx('cancel', [listingId]);
  };

  const buy = (listingId: bigint, quantity: bigint, totalValueWei: bigint) => {
    return marketplaceTx.sendTx(
      'buy',
      [listingId, quantity, totalValueWei],
      totalValueWei // pass value for CELO payment
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
