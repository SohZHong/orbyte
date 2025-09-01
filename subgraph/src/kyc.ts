import { KYCSubmitted as KYCSubmittedEvent } from '../generated/KYC/KYC';
import { loadUser } from '../utils/util';

export function handleKYCSubmitted(event: KYCSubmittedEvent): void {
  let user = loadUser(event.params.user.toHexString());

  user.role = 'Public';
  user.documentCid = event.params.documentCid;
  user.proofOfAddressCid = event.params.proofOfAddressCid;
  user.certificationCid = event.params.certificationCid;

  user.save();
}
