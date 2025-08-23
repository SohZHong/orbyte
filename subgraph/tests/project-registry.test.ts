import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CreditsIssued } from "../generated/schema"
import { CreditsIssued as CreditsIssuedEvent } from "../generated/ProjectRegistry/ProjectRegistry"
import { handleCreditsIssued } from "../src/project-registry"
import { createCreditsIssuedEvent } from "./project-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let developer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let tokenId = BigInt.fromI32(234)
    let tokenURI = "Example string value"
    let newCreditsIssuedEvent = createCreditsIssuedEvent(
      id,
      developer,
      amount,
      tokenId,
      tokenURI
    )
    handleCreditsIssued(newCreditsIssuedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CreditsIssued created and stored", () => {
    assert.entityCount("CreditsIssued", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CreditsIssued",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "developer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CreditsIssued",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "CreditsIssued",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "CreditsIssued",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenURI",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
