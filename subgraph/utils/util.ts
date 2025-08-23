import { Bytes, BigInt } from '@graphprotocol/graph-ts';
import {
  User,
  Proposal,
  ProposalReview,
  Project,
  Proof,
  ProofAudit,
  CreditBatch,
} from '../generated/schema';

export function loadUser(id: Bytes): User {
  let user = User.load(id);
  if (!user) {
    user = new User(id);

    user.role = 'Public';
    user.documentCid = '';
    user.proofOfAddressCid = '';

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
    proposal.standard = 0;
    proposal.vintage = 0;
    proposal.methodology = '';
    proposal.projectPlanCID = '';
    proposal.eiaCID = '';
    proposal.otherDocsCID = '';
    proposal.metadataCID = '';
    proposal.status = 'Pending Review';
    proposal.save();
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
    review.save();
  }
  return review;
}

export function loadProject(id: string): Project {
  let project = Project.load(id);
  if (!project) {
    project = new Project(id);
    project.status = 'None';
    project.save();
  }
  return project;
}

export function loadProof(id: string): Proof {
  let proof = Proof.load(id);
  if (!proof) {
    proof = new Proof(id);
    proof.proofCID = '';
    proof.status = 'Pending';
    proof.save();
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
    audit.save();
  }
  return audit;
}

export function loadCreditBatch(id: string): CreditBatch {
  let batch = CreditBatch.load(id);
  if (!batch) {
    batch = new CreditBatch(id);
    batch.amount = BigInt.fromI32(0);
    batch.standard = '';
    batch.vintage = 0;
    batch.tokenURI = '';
    batch.save();
  }
  return batch;
}
