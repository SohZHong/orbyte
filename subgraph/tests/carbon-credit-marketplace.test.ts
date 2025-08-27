import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { Listed } from "../generated/schema"
import { Listed as ListedEvent } from "../generated/CarbonCreditMarketplace/CarbonCreditMarketplace"
import { handleListed } from "../src/carbon-credit-marketplace"
import { createListedEvent } from "./carbon-credit-marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenId = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let pricePerUnit = BigInt.fromI32(234)
    let startTime = BigInt.fromI32(234)
    let endTime = BigInt.fromI32(234)
    let newListedEvent = createListedEvent(
      id,
      seller,
      tokenId,
      amount,
      pricePerUnit,
      startTime,
      endTime
    )
    handleListed(newListedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Listed created and stored", () => {
    assert.entityCount("Listed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Listed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "seller",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Listed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenId",
      "234"
    )
    assert.fieldEquals(
      "Listed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "Listed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pricePerUnit",
      "234"
    )
    assert.fieldEquals(
      "Listed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startTime",
      "234"
    )
    assert.fieldEquals(
      "Listed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endTime",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
