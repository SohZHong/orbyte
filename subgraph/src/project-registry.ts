import {
  CreditsIssued as CreditsIssuedEvent,
  ProjectProposed as ProjectProposedEvent,
  ProjectStatusChanged as ProjectStatusChangedEvent,
  ProofAudited as ProofAuditedEvent,
  ProofSubmitted as ProofSubmittedEvent,
  ProposalReviewed as ProposalReviewedEvent,
  ProposalStatusChanged as ProposalStatusChangedEvent
} from "../generated/ProjectRegistry/ProjectRegistry"
import {
  CreditsIssued,
  ProjectProposed,
  ProjectStatusChanged,
  ProofAudited,
  ProofSubmitted,
  ProposalReviewed,
  ProposalStatusChanged
} from "../generated/schema"

export function handleCreditsIssued(event: CreditsIssuedEvent): void {
  let entity = new CreditsIssued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.developer = event.params.developer
  entity.amount = event.params.amount
  entity.tokenId = event.params.tokenId
  entity.tokenURI = event.params.tokenURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProjectProposed(event: ProjectProposedEvent): void {
  let entity = new ProjectProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.developer = event.params.developer
  entity.meta_name = event.params.meta.name
  entity.meta_description = event.params.meta.description
  entity.meta_location = event.params.meta.location
  entity.meta_estimatedCredits = event.params.meta.estimatedCredits
  entity.meta_standard = event.params.meta.standard
  entity.meta_vintage = event.params.meta.vintage
  entity.meta_methodology = event.params.meta.methodology
  entity.meta_projectPlanCID = event.params.meta.projectPlanCID
  entity.meta_eiaCID = event.params.meta.eiaCID
  entity.meta_otherDocsCID = event.params.meta.otherDocsCID
  entity.meta_metadataCID = event.params.meta.metadataCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProjectStatusChanged(
  event: ProjectStatusChangedEvent
): void {
  let entity = new ProjectStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.newStatus = event.params.newStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProofAudited(event: ProofAuditedEvent): void {
  let entity = new ProofAudited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.auditor = event.params.auditor
  entity.action = event.params.action
  entity.commentCID = event.params.commentCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProofSubmitted(event: ProofSubmittedEvent): void {
  let entity = new ProofSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.developer = event.params.developer
  entity.proofCID = event.params.proofCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalReviewed(event: ProposalReviewedEvent): void {
  let entity = new ProposalReviewed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.auditor = event.params.auditor
  entity.action = event.params.action
  entity.commentCID = event.params.commentCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProposalStatusChanged(
  event: ProposalStatusChangedEvent
): void {
  let entity = new ProposalStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.internal_id = event.params.id
  entity.newStatus = event.params.newStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
