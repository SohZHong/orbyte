import { KYCSubmitted as KYCSubmittedEvent } from "../generated/KYC/KYC"
import { KYCSubmitted } from "../generated/schema"

export function handleKYCSubmitted(event: KYCSubmittedEvent): void {
  let entity = new KYCSubmitted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.user = event.params.user
  entity.role = event.params.role
  entity.documentCid = event.params.documentCid
  entity.proofOfAddressCid = event.params.proofOfAddressCid
  entity.certificationCid = event.params.certificationCid
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
