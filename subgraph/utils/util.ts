import { Bytes, BigInt } from '@graphprotocol/graph-ts';
import {
  User,
  Proposal,
  ProposalReview,
  Project,
  Proof,
  ProofAudit,
  CreditBatch,
  CreditBalance,
} from '../generated/schema';

export function loadUser(id: string): User {
  let user = User.load(id);
  if (!user) {
    user = new User(id);

    user.role = 'Public';

    user.save();
  }
  return user;
}

export function loadProposal(id: string): Proposal {
  let proposal = Proposal.load(id);
  if (!proposal) {
    proposal = new Proposal(id);
    proposal.name = '';
    proposal.description = '';
    proposal.location = '';
    proposal.estimatedCredits = BigInt.fromI32(0);
    proposal.vintage = 0;
    proposal.methodology = '';
    proposal.projectPlanCID = '';
    proposal.eiaCID = '';
    proposal.otherDocsCID = '';
    proposal.metadataCID = '';
  }
  return proposal;
}

export function loadProposalReview(id: string): ProposalReview {
  let review = ProposalReview.load(id);
  if (!review) {
    review = new ProposalReview(id);
    review.action = 'Approve'; // Approve
    review.commentCID = '';
    review.timestamp = BigInt.fromI32(0);
  }
  return review;
}

export function loadProject(id: string): Project {
  let project = Project.load(id);
  if (!project) {
    project = new Project(id);
    project.status = 'None';
  }
  return project;
}

export function loadProof(id: string): Proof {
  let proof = Proof.load(id);
  if (!proof) {
    proof = new Proof(id);
    proof.proofCID = '';
    proof.status = 'Pending';
  }
  return proof;
}

export function loadProofAudit(id: string): ProofAudit {
  let audit = ProofAudit.load(id);
  if (!audit) {
    audit = new ProofAudit(id);
    audit.action = 'Approve';
    audit.commentCID = '';
    audit.timestamp = BigInt.fromI32(0);
  }
  return audit;
}

export function loadCreditBatch(id: string): CreditBatch {
  let batch = CreditBatch.load(id);
  if (!batch) {
    batch = new CreditBatch(id);
    batch.amount = BigInt.fromI32(0);
    batch.tokenURI = '';
  }
  return batch;
}

export function loadCreditBalance(id: string): CreditBalance {
  let balance = CreditBalance.load(id);
  if (!balance) {
    balance = new CreditBalance(id);
    balance.balance = BigInt.zero();
  }
  return balance;
}

export function roleFromIndex(index: i32): string {
  let roles: string[] = ['Public', 'Developer', 'Auditor'];
  return index >= 0 && index < roles.length ? roles[index] : 'Public';
}

export function standardFromIndex(index: i32): string {
  let standards: string[] = ['GoldStandard', 'VCS', 'Shariah'];
  return index >= 0 && index < standards.length
    ? standards[index]
    : 'GoldStandard';
}

export function proposalStatusFromIndex(index: i32): string {
  let statuses: string[] = [
    'PendingReview',
    'ChangesRequested',
    'Rejected',
    'Approved',
  ];
  return index >= 0 && index < statuses.length
    ? statuses[index]
    : 'PendingReview';
}

export function projectStatusFromIndex(index: i32): string {
  let statuses: string[] = [
    'None',
    'InProgress',
    'ProofSubmitted',
    'AuditRejected',
    'Finalized',
  ];
  return index >= 0 && index < statuses.length ? statuses[index] : 'None';
}

export function proofStatusFromIndex(index: i32): string {
  let statuses: string[] = ['Pending', 'Approved', 'Rejected'];
  return index >= 0 && index < statuses.length ? statuses[index] : 'Pending';
}

export function reviewActionFromIndex(index: i32): string {
  let actions: string[] = ['Approve', 'RequestChanges', 'Reject'];
  return index >= 0 && index < actions.length ? actions[index] : 'Reject';
}
