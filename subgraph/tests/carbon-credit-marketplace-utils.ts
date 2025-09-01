import { newMockEvent } from 'matchstick-as';
import { ethereum, BigInt, Address } from '@graphprotocol/graph-ts';
import {
  Listed,
  ListingCancelled,
  ListingUpdated,
  OwnershipTransferred,
  Purchased,
} from '../generated/CarbonCreditMarketplace/CarbonCreditMarketplace';

export function createListedEvent(
  listingId: BigInt,
  seller: Address,
  tokenId: BigInt,
  amount: BigInt,
  pricePerUnit: BigInt,
  startTime: BigInt,
  endTime: BigInt
): Listed {
  let newEvent = newMockEvent();

  let event = new Listed(
    newEvent.address,
    newEvent.logIndex,
    newEvent.transactionLogIndex,
    newEvent.logType,
    newEvent.block,
    newEvent.transaction,
    newEvent.parameters,
    newEvent.receipt // ✅ include receipt
  );

  event.parameters = [
    new ethereum.EventParam(
      'listingId',
      ethereum.Value.fromUnsignedBigInt(listingId)
    ),
    new ethereum.EventParam('seller', ethereum.Value.fromAddress(seller)),
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ),
    new ethereum.EventParam(
      'amount',
      ethereum.Value.fromUnsignedBigInt(amount)
    ),
    new ethereum.EventParam(
      'pricePerUnit',
      ethereum.Value.fromUnsignedBigInt(pricePerUnit)
    ),
    new ethereum.EventParam(
      'startTime',
      ethereum.Value.fromUnsignedBigInt(startTime)
    ),
    new ethereum.EventParam(
      'endTime',
      ethereum.Value.fromUnsignedBigInt(endTime)
    ),
  ];

  return event;
}

export function createListingCancelledEvent(id: BigInt): ListingCancelled {
  let listingCancelledEvent = changetype<ListingCancelled>(newMockEvent());

  listingCancelledEvent.parameters = new Array();

  listingCancelledEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );

  return listingCancelledEvent;
}

export function createListingUpdatedEvent(
  id: BigInt,
  pricePerUnit: BigInt,
  newRemaining: BigInt
): ListingUpdated {
  let listingUpdatedEvent = changetype<ListingUpdated>(newMockEvent());

  listingUpdatedEvent.parameters = new Array();

  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      'pricePerUnit',
      ethereum.Value.fromUnsignedBigInt(pricePerUnit)
    )
  );
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      'newRemaining',
      ethereum.Value.fromUnsignedBigInt(newRemaining)
    )
  );

  return listingUpdatedEvent;
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent());

  ownershipTransferredEvent.parameters = new Array();

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      'previousOwner',
      ethereum.Value.fromAddress(previousOwner)
    )
  );
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam('newOwner', ethereum.Value.fromAddress(newOwner))
  );

  return ownershipTransferredEvent;
}

export function createPurchasedEvent(
  id: BigInt,
  buyer: Address,
  quantity: BigInt,
  totalPaid: BigInt,
  feePaid: BigInt
): Purchased {
  let purchasedEvent = changetype<Purchased>(newMockEvent());

  purchasedEvent.parameters = new Array();

  purchasedEvent.parameters.push(
    new ethereum.EventParam('id', ethereum.Value.fromUnsignedBigInt(id))
  );
  purchasedEvent.parameters.push(
    new ethereum.EventParam('buyer', ethereum.Value.fromAddress(buyer))
  );
  purchasedEvent.parameters.push(
    new ethereum.EventParam(
      'quantity',
      ethereum.Value.fromUnsignedBigInt(quantity)
    )
  );
  purchasedEvent.parameters.push(
    new ethereum.EventParam(
      'totalPaid',
      ethereum.Value.fromUnsignedBigInt(totalPaid)
    )
  );
  purchasedEvent.parameters.push(
    new ethereum.EventParam(
      'feePaid',
      ethereum.Value.fromUnsignedBigInt(feePaid)
    )
  );

  return purchasedEvent;
}
