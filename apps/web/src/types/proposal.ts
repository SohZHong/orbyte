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
