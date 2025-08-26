import {
  Standard as GeneratedStandard,
  ProposalStatus as GeneratedProposalStatus,
  ReviewAction as GeneratedReviewAction,
} from '@/generated/graphql';
import type { LucideIcon } from 'lucide-react';
import {
  BadgeAlertIcon,
  BadgeCheckIcon,
  BadgeHelpIcon,
  BanIcon,
} from 'lucide-react';

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

export const actionMap: Record<ReviewAction, string> = {
  0: 'Approved',
  1: 'Changes Requested',
  2: 'Rejected',
};

export const graphQLActionMap: Record<GeneratedReviewAction, string> = {
  Approve: 'Approved',
  RequestChanges: 'Changes Requested',
  Reject: 'Rejected',
};

export const generatedToReviewActionMap: Record<
  GeneratedReviewAction,
  ReviewAction
> = {
  Approve: ReviewAction.APPROVE,
  RequestChanges: ReviewAction.REQUEST_CHANGES,
  Reject: ReviewAction.REJECT,
};

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

export const generatedToProjectStandardMap: Record<
  GeneratedStandard,
  Standard
> = {
  GoldStandard: Standard.GOLD_STANDARD,
  VCS: Standard.VCS,
  Shariah: Standard.SHARIAH,
};

export const statusMap: Record<
  GeneratedProposalStatus,
  {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: LucideIcon;
  }
> = {
  [GeneratedProposalStatus.PendingReview]: {
    text: 'Pending Review',
    variant: 'secondary',
    icon: BadgeAlertIcon,
  },
  [GeneratedProposalStatus.ChangesRequested]: {
    text: 'Changes Requested',
    variant: 'outline',
    icon: BadgeHelpIcon,
  },
  [GeneratedProposalStatus.Approved]: {
    text: 'Approved',
    variant: 'default',
    icon: BadgeCheckIcon,
  },
  [GeneratedProposalStatus.Rejected]: {
    text: 'Rejected',
    variant: 'destructive',
    icon: BanIcon,
  },
};

export const actionUIMap: Record<
  GeneratedReviewAction,
  {
    text: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
    icon: LucideIcon;
  }
> = {
  [GeneratedReviewAction.Approve]: {
    text: 'Approved',
    variant: 'default',
    icon: BadgeCheckIcon,
  },
  [GeneratedReviewAction.RequestChanges]: {
    text: 'Changes Requested',
    variant: 'outline',
    icon: BadgeAlertIcon,
  },
  [GeneratedReviewAction.Reject]: {
    text: 'Rejected',
    variant: 'destructive',
    icon: BanIcon,
  },
};
