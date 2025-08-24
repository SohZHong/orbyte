import { BigInt } from '@graphprotocol/graph-ts';
import {
  CreditsIssued as CreditsIssuedEvent,
  ProjectProposed as ProjectProposedEvent,
  ProjectStatusChanged as ProjectStatusChangedEvent,
  ProofAudited as ProofAuditedEvent,
  ProofSubmitted as ProofSubmittedEvent,
  ProposalReviewed as ProposalReviewedEvent,
  ProposalStatusChanged as ProposalStatusChangedEvent,
} from '../generated/ProjectRegistry/ProjectRegistry';
import {
  CreditsIssued,
  ProjectProposed,
  Proof,
  ProofAudited,
  ProposalReview,
} from '../generated/schema';
import {
  loadCreditBatch,
  loadProject,
  loadProof,
  loadProofAudit,
  loadProposal,
  loadUser,
  projectStatusFromIndex,
  proofStatusFromIndex,
  proposalStatusFromIndex,
  reviewActionFromIndex,
} from '../utils/util';

export function handleCreditsIssued(event: CreditsIssuedEvent): void {
  let tokenId = event.params.tokenId.toString();
  let batch = loadCreditBatch(tokenId);
  let user = loadUser(event.params.developer.toHexString());

  batch.project = event.params.id.toString();
  batch.developer = user.id;
  batch.amount = event.params.amount;
  batch.tokenURI = event.params.tokenURI;
  batch.save();

  let entity = new CreditsIssued(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.internal_id = event.params.id;
  entity.developer = event.params.developer;
  entity.amount = event.params.amount;
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = event.params.tokenURI;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProjectProposed(event: ProjectProposedEvent): void {
  let proposalId = event.params.id.toString();
  let proposal = loadProposal(proposalId);
  let user = loadUser(event.params.developer.toHexString());

  proposal.developer = user.id;
  proposal.name = event.params.meta.name;
  proposal.description = event.params.meta.description;
  proposal.location = event.params.meta.location;
  proposal.estimatedCredits = event.params.meta.estimatedCredits;
  proposal.standard = event.params.meta.standard;
  proposal.vintage = event.params.meta.vintage;
  proposal.methodology = event.params.meta.methodology;
  proposal.projectPlanCID = event.params.meta.projectPlanCID;
  proposal.eiaCID = event.params.meta.eiaCID;
  proposal.otherDocsCID = event.params.meta.otherDocsCID;
  proposal.metadataCID = event.params.meta.metadataCID;
  proposal.status = 'PendingReview';

  proposal.save();

  let entity = new ProjectProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.internal_id = event.params.id;
  entity.developer = event.params.developer;
  entity.meta_name = event.params.meta.name;
  entity.meta_description = event.params.meta.description;
  entity.meta_location = event.params.meta.location;
  entity.meta_estimatedCredits = event.params.meta.estimatedCredits;
  entity.meta_standard = event.params.meta.standard;
  entity.meta_vintage = event.params.meta.vintage;
  entity.meta_methodology = event.params.meta.methodology;
  entity.meta_projectPlanCID = event.params.meta.projectPlanCID;
  entity.meta_eiaCID = event.params.meta.eiaCID;
  entity.meta_otherDocsCID = event.params.meta.otherDocsCID;
  entity.meta_metadataCID = event.params.meta.metadataCID;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProjectStatusChanged(
  event: ProjectStatusChangedEvent
): void {
  let projectId = event.params.id.toString();
  let project = loadProject(projectId);
  if (project == null) return;

  project.status = projectStatusFromIndex(event.params.newStatus);
  project.save();
}

export function handleProofAudited(event: ProofAuditedEvent): void {
  let auditId = event.transaction.hash
    .concatI32(event.logIndex.toI32())
    .toHex();
  let audit = loadProofAudit(auditId);
  let user = loadUser(event.params.auditor.toHexString());

  audit.proof = event.params.id.toString();
  audit.auditor = user.id;
  audit.action = reviewActionFromIndex(event.params.action);
  audit.commentCID = event.params.commentCID;
  audit.timestamp = event.block.timestamp;
  audit.save();

  // update proof status
  let proof = loadProof(event.params.id.toString());
  if (event.params.action == 0) {
    // Approve
    proof.status = proofStatusFromIndex(1);
  } else if (event.params.action == 2) {
    // Reject
    proof.status = proofStatusFromIndex(2);
  }
  proof.save();

  let entity = new ProofAudited(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.internal_id = event.params.id;
  entity.auditor = event.params.auditor;
  entity.action = BigInt.fromI32(event.params.action);
  entity.commentCID = event.params.commentCID;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProofSubmitted(event: ProofSubmittedEvent): void {
  let proofId = event.params.id.toString();
  let proof = new Proof(proofId);
  let user = loadUser(event.params.developer.toHexString());

  proof.project = event.params.id.toString();
  proof.developer = user.id;
  proof.proofCID = event.params.proofCID;
  proof.status = 'Pending';

  proof.save();
}

export function handleProposalReviewed(event: ProposalReviewedEvent): void {
  let reviewId = event.transaction.hash
    .concatI32(event.logIndex.toI32())
    .toHex();
  let review = new ProposalReview(reviewId);
  let user = loadUser(event.params.auditor.toHexString());

  let action = reviewActionFromIndex(event.params.action);
  review.proposal = event.params.id.toString();
  review.auditor = user.id;
  review.action = action;
  review.commentCID = event.params.commentCID;
  review.timestamp = event.block.timestamp;
  review.save();

  let proposal = loadProposal(event.params.id.toString());

  if (action == 'Approve') {
    proposal.status = 'Approved';
  } else if (action == 'Reject') {
    proposal.status = 'Rejected';
  } else if (action == 'RequestChanges') {
    proposal.status = 'ChangesRequested';
  }
  proposal.save();
}

export function handleProposalStatusChanged(
  event: ProposalStatusChangedEvent
): void {
  let proposal = loadProposal(event.params.id.toString());

  proposal.status = proposalStatusFromIndex(event.params.newStatus);
  proposal.save();
}
