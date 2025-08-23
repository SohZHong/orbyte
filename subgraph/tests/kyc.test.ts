import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { KYCSubmitted } from "../generated/schema"
import { KYCSubmitted as KYCSubmittedEvent } from "../generated/KYC/KYC"
import { handleKYCSubmitted } from "../src/kyc"
import { createKYCSubmittedEvent } from "./kyc-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let role = 123
    let documentCid = "Example string value"
    let proofOfAddressCid = "Example string value"
    let certificationCid = "Example string value"
    let timestamp = BigInt.fromI32(234)
    let newKYCSubmittedEvent = createKYCSubmittedEvent(
      user,
      role,
      documentCid,
      proofOfAddressCid,
      certificationCid,
      timestamp
    )
    handleKYCSubmitted(newKYCSubmittedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("KYCSubmitted created and stored", () => {
    assert.entityCount("KYCSubmitted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "KYCSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "KYCSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "role",
      "123"
    )
    assert.fieldEquals(
      "KYCSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "documentCid",
      "Example string value"
    )
    assert.fieldEquals(
      "KYCSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proofOfAddressCid",
      "Example string value"
    )
    assert.fieldEquals(
      "KYCSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "certificationCid",
      "Example string value"
    )
    assert.fieldEquals(
      "KYCSubmitted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
