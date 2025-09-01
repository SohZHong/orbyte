import {
  assert,
  clearStore,
  test,
  describe,
  afterAll,
} from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  handleListed,
  handleListingCancelled,
  handleListingUpdated,
  handlePurchased,
} from '../src/carbon-credit-marketplace';
import {
  createListedEvent,
  createListingCancelledEvent,
  createListingUpdatedEvent,
  createPurchasedEvent,
} from './carbon-credit-marketplace-utils';

const SELLER = Address.fromString('0x000000000000000000000000000000000000dEaD');
const BUYER = Address.fromString('0x000000000000000000000000000000000000bEEF');

describe('CarbonCreditMarketplace mappings', () => {
  afterAll(() => {
    clearStore();
  });

  test('handleListed', () => {
    let event = createListedEvent(
      BigInt.fromI32(1), // listing id
      SELLER,
      BigInt.fromI32(101), // token id
      BigInt.fromI32(50), // amount
      BigInt.fromI32(10), // price per unit
      BigInt.fromI32(1000), // start time
      BigInt.fromI32(2000) // end time
    );
    handleListed(event);

    // MarketplaceListing should be created
    assert.fieldEquals(
      'MarketplaceListing',
      '1',
      'seller',
      SELLER.toHexString()
    );
    assert.fieldEquals('MarketplaceListing', '1', 'amount', '50');
    assert.fieldEquals('MarketplaceListing', '1', 'remaining', '50');
    assert.fieldEquals('MarketplaceListing', '1', 'pricePerUnit', '10');
    assert.fieldEquals('MarketplaceListing', '1', 'status', 'Active');

    // Listed event entity should exist
    assert.fieldEquals(
      'Listed',
      event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString(),
      'internal_id',
      '1'
    );
  });

  test('handleListingCancelled', () => {
    let event = createListingCancelledEvent(BigInt.fromI32(1));
    handleListingCancelled(event);

    assert.fieldEquals('MarketplaceListing', '1', 'status', 'Cancelled');
  });

  test('handleListingUpdated', () => {
    let event = createListingUpdatedEvent(
      BigInt.fromI32(1),
      BigInt.fromI32(15),
      BigInt.fromI32(30)
    );
    handleListingUpdated(event);

    assert.fieldEquals('MarketplaceListing', '1', 'pricePerUnit', '15');
    assert.fieldEquals('MarketplaceListing', '1', 'remaining', '30');
  });

  test('handlePurchased_partial', () => {
    let event = createPurchasedEvent(
      BigInt.fromI32(1),
      BUYER,
      BigInt.fromI32(10),
      BigInt.fromI32(100),
      BigInt.fromI32(5)
    );
    handlePurchased(event);

    // Remaining should decrease
    assert.fieldEquals('MarketplaceListing', '1', 'remaining', '20');
    assert.fieldEquals('MarketplaceListing', '1', 'status', 'Active');

    // Purchase entity created
    assert.fieldEquals(
      'MarketplacePurchase',
      event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString(),
      'quantity',
      '10'
    );
    assert.fieldEquals(
      'MarketplacePurchase',
      event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString(),
      'buyer',
      BUYER.toHexString()
    );
  });

  test('handlePurchased_full', () => {
    let event = createPurchasedEvent(
      BigInt.fromI32(1),
      BUYER,
      BigInt.fromI32(20),
      BigInt.fromI32(200),
      BigInt.fromI32(10)
    );
    handlePurchased(event);

    // Remaining should be zero, status Filled
    assert.fieldEquals('MarketplaceListing', '1', 'remaining', '0');
    assert.fieldEquals('MarketplaceListing', '1', 'status', 'Filled');
  });
});
