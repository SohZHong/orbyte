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
