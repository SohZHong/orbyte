import {
  Standard as GeneratedStandard,
  ProposalStatus as GeneratedProposalStatus,
} from '@/generated/graphql';

// Standards supported
export enum Standard {
  GOLD_STANDARD,
  VCS,
  SHARIAH,
}

// Proposal states
export enum ProposalStatus {
  PENDING_REVIEW,
  CHANGES_REQUESTED,
  REJECTED,
  APPROVED,
}

export enum ReviewAction {
  APPROVE,
  REQUEST_CHANGES,
  REJECT,
}

export const standardMap: Record<Standard, string> = {
  0: 'Gold Standard',
  1: 'VCS',
  2: 'Shariah',
};

export const graphQLStandardMap: Record<GeneratedStandard, string> = {
  GoldStandard: 'Gold Standard',
  VCS: 'VCS',
  Shariah: 'Shariah',
};

export const statusMap: Record<
  GeneratedProposalStatus,
  { text: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
> = {
  [GeneratedProposalStatus.PendingReview]: {
    text: 'Pending Review',
    variant: 'secondary',
  },
  [GeneratedProposalStatus.ChangesRequested]: {
    text: 'Changes Requested',
    variant: 'outline',
  },
  [GeneratedProposalStatus.Approved]: {
    text: 'Approved',
    variant: 'default',
  },
  [GeneratedProposalStatus.Rejected]: {
    text: 'Rejected',
    variant: 'destructive',
  },
};
