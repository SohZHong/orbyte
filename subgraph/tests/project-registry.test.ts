import {
  assert,
  describe,
  test,
  clearStore,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import {
  handleCreditsIssued,
  handleProjectProposed,
  handleProjectStatusChanged,
  handleProofAudited,
  handleProofSubmitted,
  handleProposalReviewed,
  handleProposalStatusChanged,
} from '../src/project-registry';
import {
  createCreditsIssuedEvent,
  createProjectProposedEvent,
  createProjectStatusChangedEvent,
  createProofAuditedEvent,
  createProofSubmittedEvent,
  createProposalReviewedEvent,
  createProposalStatusChangedEvent,
} from './project-registry-utils';
import { Project } from '../generated/schema';
import { projectStatusFromIndex, proposalStatusFromIndex } from '../utils/util';

const DEV = Address.fromString('0x000000000000000000000000000000000000dEaD');
const AUDITOR = Address.fromString(
  '0x000000000000000000000000000000000000aAaA'
);

describe('ProjectRegistry mappings', () => {
  afterAll(() => {
    clearStore();
  });

  test('handleCreditsIssued', () => {
    let event = createCreditsIssuedEvent(
      BigInt.fromI32(1),
      DEV,
      BigInt.fromI32(100),
      BigInt.fromI32(1),
      'ipfs://token-uri'
    );
    handleCreditsIssued(event);

    assert.fieldEquals(
      'CreditsIssued',
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
      'amount',
      '100'
    );
    assert.fieldEquals('CreditBatch', '1', 'developer', DEV.toHexString());
  });

  test('handleProjectProposed', () => {
    let metaTuple = new ethereum.Tuple();
    metaTuple.push(ethereum.Value.fromString('Cool Project'));
    metaTuple.push(ethereum.Value.fromString('Save the trees'));
    metaTuple.push(ethereum.Value.fromString('Amazon'));
    metaTuple.push(ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1000)));
    metaTuple.push(ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1)));
    metaTuple.push(ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(2023)));
    metaTuple.push(ethereum.Value.fromString('Meth-1'));
    metaTuple.push(ethereum.Value.fromString('planCID'));
    metaTuple.push(ethereum.Value.fromString('eiaCID'));
    metaTuple.push(ethereum.Value.fromString('otherDocsCID'));
    metaTuple.push(ethereum.Value.fromString('metaCID'));

    // Pass the Tuple to the event factory
    let event = createProjectProposedEvent(BigInt.fromI32(1), DEV, metaTuple);

    handleProjectProposed(event);

    assert.fieldEquals('Proposal', '1', 'name', 'Cool Project');
    assert.fieldEquals('Project', '1', 'developer', DEV.toHexString());
  });

  test('handleProjectStatusChanged', () => {
    let event = createProjectStatusChangedEvent(BigInt.fromI32(1), 2);
    handleProjectStatusChanged(event);

    assert.fieldEquals('Project', '1', 'status', proposalStatusFromIndex(2));
  });

  test('handleProofAudited', () => {
    let event = createProofAuditedEvent(
      BigInt.fromI32(1),
      AUDITOR,
      1,
      'auditCID'
    );
    handleProofAudited(event);

    assert.fieldEquals(
      'ProofAudit',
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
      'commentCID',
      'auditCID'
    );
    assert.fieldEquals(
      'ProofAudited',
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
      'auditor',
      AUDITOR.toHexString()
    );
  });

  test('handleProofSubmitted', () => {
    let event = createProofSubmittedEvent(BigInt.fromI32(1), DEV, 'proofCID');
    handleProofSubmitted(event);

    assert.fieldEquals('Proof', '1', 'proofCID', 'proofCID');
    assert.fieldEquals('Proof', '1', 'developer', DEV.toHexString());
  });

  test('handleProposalReviewed', () => {
    let event = createProposalReviewedEvent(
      BigInt.fromI32(1),
      AUDITOR,
      2,
      'reviewCID'
    );
    handleProposalReviewed(event);

    assert.fieldEquals(
      'ProposalReview',
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
      'commentCID',
      'reviewCID'
    );
    assert.fieldEquals(
      'ProposalReviewed',
      event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
      'auditor',
      AUDITOR.toHexString()
    );
  });

  test('handleProposalStatusChanged', () => {
    let event = createProposalStatusChangedEvent(BigInt.fromI32(1), 3);
    handleProposalStatusChanged(event);

    assert.fieldEquals('Proposal', '1', 'status', proposalStatusFromIndex(3));
  });
});
