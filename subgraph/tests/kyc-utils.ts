import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { KYCSubmitted } from "../generated/KYC/KYC"

export function createKYCSubmittedEvent(
  user: Address,
  role: i32,
  documentCid: string,
  proofOfAddressCid: string,
  certificationCid: string,
  timestamp: BigInt
): KYCSubmitted {
  let kycSubmittedEvent = changetype<KYCSubmitted>(newMockEvent())

  kycSubmittedEvent.parameters = new Array()

  kycSubmittedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  kycSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "role",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(role))
    )
  )
  kycSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "documentCid",
      ethereum.Value.fromString(documentCid)
    )
  )
  kycSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "proofOfAddressCid",
      ethereum.Value.fromString(proofOfAddressCid)
    )
  )
  kycSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "certificationCid",
      ethereum.Value.fromString(certificationCid)
    )
  )
  kycSubmittedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return kycSubmittedEvent
}
