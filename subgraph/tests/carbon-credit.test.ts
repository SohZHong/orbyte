import {
  assert,
  clearStore,
  test,
  describe,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  handleTransferBatch,
  handleTransferSingle,
  handleURI,
} from '../src/carbon-credit';
import {
  createTransferBatchEvent,
  createTransferSingleEvent,
  createURIEvent,
} from './carbon-credit-utils';

const USER1 = Address.fromString('0x000000000000000000000000000000000000dEaD');
const USER2 = Address.fromString('0x000000000000000000000000000000000000bEEF');
const ZERO = Address.zero();

describe('CarbonCredit mappings', () => {
  afterAll(() => {
    clearStore();
  });

  test('handleTransferBatch', () => {
    let ids = [BigInt.fromI32(1), BigInt.fromI32(2)];
    let values = [BigInt.fromI32(10), BigInt.fromI32(20)];

    let event = createTransferBatchEvent(USER1, USER1, USER2, ids, values);
    handleTransferBatch(event);

    // Transactions created
    assert.fieldEquals(
      'Transaction',
      event.transaction.hash.concatI32(0).toHex(),
      'value',
      '10'
    );
    assert.fieldEquals(
      'Transaction',
      event.transaction.hash.concatI32(1).toHex(),
      'value',
      '20'
    );

    // Balance checks
    assert.fieldEquals('CreditBalance', USER2.toHex() + '-1', 'balance', '10');
    assert.fieldEquals('CreditBalance', USER2.toHex() + '-2', 'balance', '20');
  });

  test('handleTransferSingle', () => {
    let event = createTransferSingleEvent(
      USER1,
      USER1,
      USER2,
      BigInt.fromI32(3),
      BigInt.fromI32(5)
    );
    handleTransferSingle(event);

    // Transaction created
    assert.fieldEquals(
      'Transaction',
      event.transaction.hash.concatI32(event.logIndex.toI32()).toHex(),
      'value',
      '5'
    );

    // Balance updated
    assert.fieldEquals('CreditBalance', USER2.toHex() + '-3', 'balance', '5');
  });

  test('handleTransferBatch_mint', () => {
    let ids = [BigInt.fromI32(4)];
    let values = [BigInt.fromI32(100)];

    let event = createTransferBatchEvent(USER1, ZERO, USER2, ids, values);
    handleTransferBatch(event);

    // Only receiver balance updated
    assert.fieldEquals('CreditBalance', USER2.toHex() + '-4', 'balance', '100');
  });

  test('handleTransferSingle_burn', () => {
    let event = createTransferSingleEvent(
      USER1,
      USER2,
      ZERO,
      BigInt.fromI32(3),
      BigInt.fromI32(5)
    );
    handleTransferSingle(event);

    // Receiver should not be updated, only sender decreased
    assert.fieldEquals('CreditBalance', USER2.toHex() + '-3', 'balance', '0');
  });

  test('handleURI', () => {
    let event = createURIEvent('ipfs://token-uri', BigInt.fromI32(5));
    handleURI(event);

    assert.fieldEquals('CreditBatch', '5', 'tokenURI', 'ipfs://token-uri');
    assert.fieldEquals(
      'CreditBatch',
      '5',
      'issuedAt',
      event.block.timestamp.toString()
    );
  });
});
