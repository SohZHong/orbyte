import { newMockEvent } from 'matchstick-as';
import { ethereum, BigInt, Address } from '@graphprotocol/graph-ts';
import {
  CreditsIssued,
  ProjectProposed,
  ProjectStatusChanged,
  ProofAudited,
  ProofSubmitted,
  ProposalReviewed,
  ProposalStatusChanged,
} from '../generated/ProjectRegistry/ProjectRegistry';

export function createCreditsIssuedEvent(
  id: BigInt,
  developer: Address,
  amount: BigInt,
  tokenId: BigInt,
  tokenURI: string
): CreditsIssued {
  let creditsIssuedEvent = changetype<CreditsIssued>(newMockEvent());

  creditsIssuedEvent.parameters = new Array();

  creditsIssuedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  creditsIssuedEvent.parameters.push(
    new ethereum.EventParam('developer', ethereum.Value.fromAddress(developer))
  );
  creditsIssuedEvent.parameters.push(
    new ethereum.EventParam('amount', ethereum.Value.fromUnsignedBigInt(amount))
  );
  creditsIssuedEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  creditsIssuedEvent.parameters.push(
    new ethereum.EventParam('tokenURI', ethereum.Value.fromString(tokenURI))
  );

  return creditsIssuedEvent;
}

export function createProjectProposedEvent(
  id: BigInt,
  developer: Address,
  meta: ethereum.Tuple
): ProjectProposed {
  let projectProposedEvent = changetype<ProjectProposed>(newMockEvent());

  projectProposedEvent.parameters = new Array();

  projectProposedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  projectProposedEvent.parameters.push(
    new ethereum.EventParam('developer', ethereum.Value.fromAddress(developer))
  );
  projectProposedEvent.parameters.push(
    new ethereum.EventParam('meta', ethereum.Value.fromTuple(meta))
  );

  return projectProposedEvent;
}

export function createProjectStatusChangedEvent(
  id: BigInt,
  newStatus: i32
): ProjectStatusChanged {
  let projectStatusChangedEvent =
    changetype<ProjectStatusChanged>(newMockEvent());

  projectStatusChangedEvent.parameters = new Array();

  projectStatusChangedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  projectStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      'newStatus',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newStatus))
    )
  );

  return projectStatusChangedEvent;
}

export function createProofAuditedEvent(
  id: BigInt,
  auditor: Address,
  action: i32,
  commentCID: string
): ProofAudited {
  let proofAuditedEvent = changetype<ProofAudited>(newMockEvent());

  proofAuditedEvent.parameters = new Array();

  proofAuditedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  proofAuditedEvent.parameters.push(
    new ethereum.EventParam('auditor', ethereum.Value.fromAddress(auditor))
  );
  proofAuditedEvent.parameters.push(
    new ethereum.EventParam(
      'action',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(action))
    )
  );
  proofAuditedEvent.parameters.push(
    new ethereum.EventParam('commentCID', ethereum.Value.fromString(commentCID))
  );

  return proofAuditedEvent;
}

export function createProofSubmittedEvent(
  id: BigInt,
  developer: Address,
  proofCID: string
): ProofSubmitted {
  let proofSubmittedEvent = changetype<ProofSubmitted>(newMockEvent());

  proofSubmittedEvent.parameters = new Array();

  proofSubmittedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  proofSubmittedEvent.parameters.push(
    new ethereum.EventParam('developer', ethereum.Value.fromAddress(developer))
  );
  proofSubmittedEvent.parameters.push(
    new ethereum.EventParam('proofCID', ethereum.Value.fromString(proofCID))
  );

  return proofSubmittedEvent;
}

export function createProposalReviewedEvent(
  id: BigInt,
  auditor: Address,
  action: i32,
  commentCID: string
): ProposalReviewed {
  let proposalReviewedEvent = changetype<ProposalReviewed>(newMockEvent());

  proposalReviewedEvent.parameters = new Array();

  proposalReviewedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  proposalReviewedEvent.parameters.push(
    new ethereum.EventParam('auditor', ethereum.Value.fromAddress(auditor))
  );
  proposalReviewedEvent.parameters.push(
    new ethereum.EventParam(
      'action',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(action))
    )
  );
  proposalReviewedEvent.parameters.push(
    new ethereum.EventParam('commentCID', ethereum.Value.fromString(commentCID))
  );

  return proposalReviewedEvent;
}

export function createProposalStatusChangedEvent(
  id: BigInt,
  newStatus: i32
): ProposalStatusChanged {
  let proposalStatusChangedEvent =
    changetype<ProposalStatusChanged>(newMockEvent());

  proposalStatusChangedEvent.parameters = new Array();

  proposalStatusChangedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  proposalStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      'newStatus',
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newStatus))
    )
  );

  return proposalStatusChangedEvent;
}
