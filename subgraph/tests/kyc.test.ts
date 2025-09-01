import {
  assert,
  clearStore,
  test,
  newMockEvent,
} from 'matchstick-as/assembly/index';
import { BigInt, Address } from '@graphprotocol/graph-ts';
import { handleKYCSubmitted } from '../src/kyc';
import { createKYCSubmittedEvent } from './kyc-utils';

const ADDRESS = Address.fromString(
  '0x000000000000000000000000000000000000dEaD'
);

// User gets stored correctly
test('handleKYCSubmitted creates and stores user with correct fields', () => {
  let documentCid = 'doc123';
  let proofOfAddressCid = 'proof456';
  let certificationCid = 'cert789';
  let timestamp = BigInt.fromI32(12345);

  let event = createKYCSubmittedEvent(
    ADDRESS,
    0, // role not used in handler
    documentCid,
    proofOfAddressCid,
    certificationCid,
    timestamp
  );

  handleKYCSubmitted(event);

  let id = ADDRESS.toHexString();

  assert.fieldEquals('User', id, 'role', 'Public');
  assert.fieldEquals('User', id, 'documentCid', documentCid);
  assert.fieldEquals('User', id, 'proofOfAddressCid', proofOfAddressCid);
  assert.fieldEquals('User', id, 'certificationCid', certificationCid);

  clearStore();
});

// // Missing certificationCid should store empty string
// test('handleKYCSubmitted stores empty string if certificationCid is empty', () => {
//   let documentCid = 'doc999';
//   let proofOfAddressCid = 'proof000';
//   let certificationCid = ''; // simulate missing data
//   let timestamp = BigInt.fromI32(67890);

//   let event = createKYCSubmittedEvent(
//     ADDRESS,
//     0,
//     documentCid,
//     proofOfAddressCid,
//     certificationCid,
//     timestamp
//   );

//   handleKYCSubmitted(event);

//   let id = ADDRESS.toHexString();

//   assert.fieldEquals('User', id, 'role', 'Public');
//   assert.fieldEquals('User', id, 'documentCid', documentCid);
//   assert.fieldEquals('User', id, 'proofOfAddressCid', proofOfAddressCid);
//   assert.fieldEquals('User', id, 'certificationCid', certificationCid);

//   clearStore();
// });
