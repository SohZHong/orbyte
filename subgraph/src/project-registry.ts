import { BigInt } from '@graphprotocol/graph-ts';
import {
  CreditsIssued as CreditsIssuedEvent,
  ProjectProposed as ProjectProposedEvent,
  ProjectStatusChanged as ProjectStatusChangedEvent,
  ProofAudited as ProofAuditedEvent,
  ProofSubmitted as ProofSubmittedEvent,
  ProposalReviewed as ProposalReviewedEvent,
  ProposalStatusChanged as ProposalStatusChangedEvent,
  CreditsRetired as CreditsRetiredEvent,
} from '../generated/ProjectRegistry/ProjectRegistry';
import {
  CreditsIssued,
  CreditsRetired,
  ProjectProposed,
  Proof,
  ProofAudit,
  ProofAudited,
  ProposalReview,
  ProposalReviewed,
} from '../generated/schema';
import {
  loadCreditBatch,
  loadProject,
  loadProposal,
  loadUser,
  projectStatusFromIndex,
  proposalStatusFromIndex,
  reviewActionFromIndex,
  standardFromIndex,
} from '../utils/util';

export function handleCreditsIssued(event: CreditsIssuedEvent): void {
  let tokenId = event.params.tokenId.toString();
  let batch = loadCreditBatch(tokenId);
  let user = loadUser(event.params.developer.toHexString());

  batch.project = event.params.id.toString();
  batch.developer = user.id;
  batch.amount = event.params.amount;
  batch.tokenURI = event.params.tokenURI;
  batch.issuedAt = event.block.timestamp.toI64();
  batch.save();

  let entity = new CreditsIssued(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.internal_id = event.params.id;
  entity.developer = user.id;
  entity.amount = event.params.amount;
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = event.params.tokenURI;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProjectProposed(event: ProjectProposedEvent): void {
  let projectId = event.params.id.toString();
  let project = loadProject(projectId);
  let proposal = loadProposal(projectId);
  let user = loadUser(event.params.developer.toHexString());

  proposal.developer = user.id;
  proposal.name = event.params.meta.name;
  proposal.description = event.params.meta.description;
  proposal.location = event.params.meta.location;
  proposal.estimatedCredits = event.params.meta.estimatedCredits;
  proposal.standard = standardFromIndex(event.params.meta.standard);
  proposal.vintage = event.params.meta.vintage;
  proposal.methodology = event.params.meta.methodology;
  proposal.projectPlanCID = event.params.meta.projectPlanCID;
  proposal.eiaCID = event.params.meta.eiaCID;
  proposal.otherDocsCID = event.params.meta.otherDocsCID;
  proposal.metadataCID = event.params.meta.metadataCID;
  proposal.status = 'PendingReview';
  proposal.submittedAt = event.block.timestamp.toI64();
  proposal.save();

  // initialize Project
  project.proposal = proposal.id;
  project.developer = user.id;
  project.createdAt = event.block.timestamp.toI64();
  project.save();

  // create Proposal snapshot
  let entity = new ProjectProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.internal_id = event.params.id;
  entity.developer = user.id;
  entity.meta_name = event.params.meta.name;
  entity.meta_description = event.params.meta.description;
  entity.meta_location = event.params.meta.location;
  entity.meta_estimatedCredits = event.params.meta.estimatedCredits;
  entity.meta_standard = standardFromIndex(event.params.meta.standard);
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

  project.status = projectStatusFromIndex(event.params.newStatus);

  project.save();
}

export function handleProofAudited(event: ProofAuditedEvent): void {
  let auditId = event.transaction.hash
    .concatI32(event.logIndex.toI32())
    .toHex();
  let audit = new ProofAudit(auditId);
  let user = loadUser(event.params.auditor.toHexString());

  audit.proof = event.params.id.toString();
  audit.auditor = user.id;
  audit.action = reviewActionFromIndex(event.params.action);
  audit.commentCID = event.params.commentCID;
  audit.timestamp = event.block.timestamp.toI64();
  audit.save();

  let entity = new ProofAudited(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.internal_id = event.params.id;
  entity.auditor = user.id;
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
  proof.submittedAt = event.block.timestamp.toI64();

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
  review.timestamp = event.block.timestamp.toI64();
  review.save();

  let entity = new ProposalReviewed(reviewId);
  entity.internal_id = event.params.id;
  entity.auditor = user.id;
  entity.action = event.params.action;
  entity.commentCID = event.params.commentCID;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposalStatusChanged(
  event: ProposalStatusChangedEvent
): void {
  let proposal = loadProposal(event.params.id.toString());

  proposal.status = proposalStatusFromIndex(event.params.newStatus);
  proposal.save();
}

export function handleCreditsRetired(event: CreditsRetiredEvent): void {
  let holder = loadUser(event.params.holder.toHexString());

  let batchId = event.params.tokenId.toString();
  let batch = loadCreditBatch(batchId);

  batch.retiredAmount = batch.retiredAmount.plus(event.params.amount);
  batch.save();

  // Create a CreditsRetired event entity (timeseries)
  let entity = new CreditsRetired(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHex()
  );
  entity.holder = holder.id;
  entity.tokenId = event.params.tokenId;
  entity.amount = event.params.amount;
  entity.retirementCID = event.params.retirementCID;

  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}
