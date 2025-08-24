import { Address } from '@graphprotocol/graph-ts';
import {
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
} from '../generated/CarbonCredit/CarbonCredit';
import { loadCreditBalance, loadCreditBatch, loadUser } from '../utils/util';
import { Transaction } from '../generated/schema';

function getBalanceId(user: Address, batchId: string): string {
  return user.toHex() + '-' + batchId;
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let ids = event.params.ids;
  let values = event.params.values;

  for (let i = 0; i < ids.length; i++) {
    let tokenId = ids[i];
    let amount = values[i];

    let txId = event.transaction.hash.concatI32(i).toHex();
    let transfer = new Transaction(txId);

    transfer.from = event.params.from;
    transfer.to = event.params.to;
    transfer.tokenId = tokenId;
    transfer.value = amount;
    transfer.blockNumber = event.block.number;
    transfer.timestamp = event.block.timestamp.toI64();
    transfer.transactionHash = event.transaction.hash;
    transfer.save();

    // decrease sender balance
    if (event.params.from.notEqual(Address.zero())) {
      let sender = loadUser(event.params.from.toHexString());
      let fromBalanceId = getBalanceId(event.params.from, tokenId.toString());
      let fromBalance = loadCreditBalance(fromBalanceId);

      fromBalance.user = sender.id;
      fromBalance.batch = tokenId.toString();

      fromBalance.balance = fromBalance.balance.minus(amount);
      fromBalance.save();
    }

    // increase receiver balance
    if (event.params.to.notEqual(Address.zero())) {
      let receiver = loadUser(event.params.to.toHexString());
      let toBalanceId = getBalanceId(event.params.to, tokenId.toString());
      let toBalance = loadCreditBalance(toBalanceId);

      toBalance.user = receiver.id;
      toBalance.batch = tokenId.toString();

      toBalance.balance = toBalance.balance.plus(amount);
      toBalance.save();
    }
  }
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let tokenId = event.params.id;
  let amount = event.params.value;

  let txId = event.transaction.hash.concatI32(event.logIndex.toI32()).toHex();
  let transfer = new Transaction(txId);

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.tokenId = tokenId;
  transfer.value = amount;
  transfer.blockNumber = event.block.number;
  transfer.timestamp = event.block.timestamp.toI64();
  transfer.transactionHash = event.transaction.hash;
  transfer.save();

  // decrease sender balance
  if (event.params.from.notEqual(Address.zero())) {
    let sender = loadUser(event.params.from.toHexString());
    let fromBalanceId = getBalanceId(event.params.from, tokenId.toString());
    let fromBalance = loadCreditBalance(fromBalanceId);

    fromBalance.user = sender.id;
    fromBalance.batch = tokenId.toString();

    fromBalance.balance = fromBalance.balance.minus(amount);
    fromBalance.save();
  }

  // increase receiver balance
  if (event.params.to.notEqual(Address.zero())) {
    let receiver = loadUser(event.params.to.toHexString());
    let toBalanceId = getBalanceId(event.params.to, tokenId.toString());
    let toBalance = loadCreditBalance(toBalanceId);

    toBalance.user = receiver.id;
    toBalance.batch = tokenId.toString();

    toBalance.balance = toBalance.balance.plus(amount);
    toBalance.save();
  }
}

export function handleURI(event: URIEvent): void {
  let tokenId = event.params.id;
  let batchId = tokenId.toString();
  let batch = loadCreditBatch(batchId);

  batch.tokenURI = event.params.value;
  batch.save();
}
