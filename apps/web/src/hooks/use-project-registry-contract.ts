'use client';

import { useState } from 'react';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { encodeFunctionData } from 'viem';
import {
  PROJECT_REGISTRY_ABI,
  PROJECT_REGISTRY_CONTRACT_ADDRESS,
} from '@/constants';
import type { TxState } from '@/types/transaction';
import type { ReviewAction, Standard } from '@/types/proposal';

export const useProjectRegistryContract = () => {
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
        abi: PROJECT_REGISTRY_ABI,
        functionName,
        args,
      });

      const txHash = await client.sendTransaction({
        to: PROJECT_REGISTRY_CONTRACT_ADDRESS,
        data,
      });

      setHash(txHash);
      setIsPending(false);
      setIsConfirmed(true);

      return {
        hash: txHash,
        isPending: false,
        isConfirmed: true,
        error: null,
      };
    } catch (err) {
      setError(err);
      setIsPending(false);
      throw err;
    }
  };

  // Developers submit proposal
  const submitProposal = (meta: {
    name: string;
    description: string;
    location: string;
    estimatedCredits: bigint;
    standard: Standard;
    vintage: number;
    methodology: string;
    projectPlanCID: string;
    eiaCID: string;
    otherDocsCID: string;
    metadataCID: string;
  }) => {
    return sendTx('submitProposal', [meta]);
  };

  // Auditors review proposal
  const reviewProposal = (
    projectId: bigint,
    action: ReviewAction,
    commentCID: string
  ) => {
    return sendTx('reviewProposal', [projectId, action, commentCID]);
  };

  // Developer resubmits after changes requested
  const resubmitProposal = (
    projectId: bigint,
    newMeta: Parameters<typeof submitProposal>[0]
  ) => {
    return sendTx('resubmitProposal', [projectId, newMeta]);
  };

  // Developer submits proof
  const submitProof = (projectId: bigint, proofCID: string) => {
    return sendTx('submitProof', [projectId, proofCID]);
  };

  // Auditor audits proof
  const auditProof = (
    projectId: bigint,
    action: ReviewAction,
    commentCID: string
  ) => {
    return sendTx('auditProof', [projectId, action, commentCID]);
  };

  // Carbon credit owner retires credits
  const retireCredits = (
    tokenId: bigint,
    amount: bigint,
    retirementCID: string
  ) => {
    return sendTx('retireCredits', [tokenId, amount, retirementCID]);
  };

  return {
    hash,
    isPending,
    isConfirmed,
    error,
    submitProposal,
    reviewProposal,
    resubmitProposal,
    submitProof,
    auditProof,
    retireCredits,
  };
};
