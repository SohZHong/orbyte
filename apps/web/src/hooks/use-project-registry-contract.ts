'use client';

import {
  PROJECT_REGISTRY_ABI,
  PROJECT_REGISTRY_CONTRACT_ADDRESS,
} from '@/constants';
import type { ReviewAction, Standard } from '@/types/proposal';
import { useTransaction } from './use-transaction';

export const useProjectRegistryContract = () => {
  const { hash, isPending, isConfirmed, error, sendTx } = useTransaction(
    PROJECT_REGISTRY_CONTRACT_ADDRESS,
    PROJECT_REGISTRY_ABI
  );

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
