import { BigInt } from '@graphprotocol/graph-ts';
import {
  Listed as ListedEvent,
  ListingCancelled as ListingCancelledEvent,
  ListingUpdated as ListingUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Purchased as PurchasedEvent,
} from '../generated/CarbonCreditMarketplace/CarbonCreditMarketplace';
import {
  Listed,
  MarketplaceListing,
  MarketplacePurchase,
} from '../generated/schema';
import {
  loadCreditBatch,
  loadMarketplaceListing,
  loadUser,
} from '../utils/util';

export function handleListed(event: ListedEvent): void {
  let user = loadUser(event.params.seller.toHexString());
  let batch = loadCreditBatch(event.params.tokenId.toString());

  // Create main listing state
  let listing = new MarketplaceListing(event.params.id.toString());
  listing.seller = user.id;
  listing.token = batch ? batch.id : event.params.tokenId.toString();
  listing.amount = event.params.amount;
  listing.remaining = event.params.amount;
  listing.pricePerUnit = event.params.pricePerUnit;
  listing.startTime = event.params.startTime.toI64();
  listing.endTime = event.params.endTime.toI64();
  listing.status = 'Active';
  listing.createdAt = event.block.timestamp.toI64();
  listing.updatedAt = event.block.timestamp.toI64();
  listing.save();

  let entity = new Listed(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
  );
  entity.internal_id = event.params.id;
  entity.seller = event.params.seller;
  entity.tokenId = event.params.tokenId;
  entity.amount = event.params.amount;
  entity.pricePerUnit = event.params.pricePerUnit;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp.toI64();
  entity.transactionHash = event.transaction.hash;
  entity.save();
}

export function handleListingCancelled(event: ListingCancelledEvent): void {
  let listing = loadMarketplaceListing(event.params.id.toString());

  listing.status = 'Cancelled';
  listing.endTime = event.block.timestamp.toI64();

  listing.save();
}

export function handleListingUpdated(event: ListingUpdatedEvent): void {
  let listing = loadMarketplaceListing(event.params.id.toString());

  listing.pricePerUnit = event.params.pricePerUnit;
  listing.remaining = event.params.newRemaining;
  listing.updatedAt = event.block.timestamp.toI64();

  listing.save();
}

export function handlePurchased(event: PurchasedEvent): void {
  let buyer = loadUser(event.params.buyer.toHexString());
  let listing = loadMarketplaceListing(event.params.id.toString());

  listing.remaining = listing.remaining.minus(event.params.quantity);
  listing.updatedAt = event.block.timestamp.toI64();
  if (listing.remaining.equals(BigInt.zero())) {
    listing.status = 'Filled';
    listing.endTime = event.block.timestamp.toI64();
  }
  listing.save();

  // Create purchase entity
  let purchase = new MarketplacePurchase(
    event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
  );
  purchase.listing = event.params.id.toString();
  purchase.buyer = buyer.id;
  purchase.quantity = event.params.quantity;
  purchase.totalPaid = event.params.totalPaid;
  purchase.feePaid = event.params.feePaid;
  purchase.blockNumber = event.block.number;
  purchase.timestamp = event.block.timestamp.toI64();
  purchase.transactionHash = event.transaction.hash;
  purchase.save();
}
