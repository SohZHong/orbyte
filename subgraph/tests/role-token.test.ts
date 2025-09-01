import { assert, clearStore, test } from 'matchstick-as/assembly/index';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  createRoleBurnedEvent,
  createRoleMintedEvent,
} from './role-token-utils';
import { handleRoleBurned, handleRoleMinted } from '../src/role-token';

const ADDRESS = Address.fromString(
  '0x000000000000000000000000000000000000dE02'
);

// Test burning sets role back to Public
test('handleRoleBurned resets user role to Public', () => {
  let tokenId = BigInt.fromI32(1);

  // First mint to give user a role
  let mintEvent = createRoleMintedEvent(ADDRESS, tokenId, 1);
  handleRoleMinted(mintEvent);

  // Burn event
  let burnEvent = createRoleBurnedEvent(ADDRESS, tokenId, 1);
  handleRoleBurned(burnEvent);

  let id = ADDRESS.toHexString();
  assert.fieldEquals('User', id, 'role', 'Public');

  clearStore();
});

// Test minting Auditor
test('handleRoleMinted assigns Auditor when role=1', () => {
  let tokenId = BigInt.fromI32(2);

  let event = createRoleMintedEvent(ADDRESS, tokenId, 1);
  handleRoleMinted(event);

  let id = ADDRESS.toHexString();
  assert.fieldEquals('User', id, 'role', 'Auditor');

  clearStore();
});

// Test minting Developer
test('handleRoleMinted assigns Developer when role!=1', () => {
  let tokenId = BigInt.fromI32(3);

  // role as BigInt
  let event = createRoleMintedEvent(ADDRESS, tokenId, i32(0));

  handleRoleMinted(event);

  let id = ADDRESS.toHexString();
  assert.fieldEquals('User', id, 'role', 'Developer');

  clearStore();
});
