import { newMockEvent } from 'matchstick-as';
import { ethereum, Address, BigInt } from '@graphprotocol/graph-ts';
import {
  ApprovalForAll,
  OwnershipTransferred,
  TransferBatch,
  TransferSingle,
  URI,
} from '../generated/CarbonCredit/CarbonCredit';

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let newEvent = newMockEvent();

  let event = new ApprovalForAll(
    newEvent.address,
    newEvent.logIndex,
    newEvent.transactionLogIndex,
    newEvent.logType,
    newEvent.block,
    newEvent.transaction,
    newEvent.parameters,
    newEvent.receipt
  );

  event.parameters = [
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account)),
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator)),
    new ethereum.EventParam('approved', ethereum.Value.fromBoolean(approved)),
  ];

  return event;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let newEvent = newMockEvent();

  let event = new OwnershipTransferred(
    newEvent.address,
    newEvent.logIndex,
    newEvent.transactionLogIndex,
    newEvent.logType,
    newEvent.block,
    newEvent.transaction,
    newEvent.parameters,
    newEvent.receipt
  );

  event.parameters = [
    new ethereum.EventParam(
      'previousOwner',
      ethereum.Value.fromAddress(previousOwner)
    ),
    new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner)),
  ];

  return event;
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let newEvent = newMockEvent();

  let event = new TransferBatch(
    newEvent.address,
    newEvent.logIndex,
    newEvent.transactionLogIndex,
    newEvent.logType,
    newEvent.block,
    newEvent.transaction,
    newEvent.parameters,
    newEvent.receipt
  );

  event.parameters = [
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator)),
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from)),
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to)),
    new ethereum.EventParam('ids', ethereum.Value.fromUnsignedBigIntArray(ids)),
    new ethereum.EventParam(
      'values',
      ethereum.Value.fromUnsignedBigIntArray(values)
    ),
  ];

  return event;
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let newEvent = newMockEvent();

  let event = new TransferSingle(
    newEvent.address,
    newEvent.logIndex,
    newEvent.transactionLogIndex,
    newEvent.logType,
    newEvent.block,
    newEvent.transaction,
    newEvent.parameters,
    newEvent.receipt
  );

  event.parameters = [
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator)),
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from)),
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to)),
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id)),
    new ethereum.EventParam('value', ethereum.Value.fromUnsignedBigInt(value)),
  ];

  return event;
}

export function createURIEvent(value: string, id: BigInt): URI {
  let newEvent = newMockEvent();

  let event = new URI(
    newEvent.address,
    newEvent.logIndex,
    newEvent.transactionLogIndex,
    newEvent.logType,
    newEvent.block,
    newEvent.transaction,
    newEvent.parameters,
    newEvent.receipt
  );

  event.parameters = [
    new ethereum.EventParam('value', ethereum.Value.fromString(value)),
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id)),
  ];

  return event;
}
