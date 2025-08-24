import {
  RoleBurned as RoleBurnedEvent,
  RoleMinted as RoleMintedEvent,
} from '../generated/RoleToken/RoleToken';
import { loadUser } from '../utils/util';

export function handleRoleBurned(event: RoleBurnedEvent): void {
  let user = loadUser(event.params.account.toHexString());

  user.role = 'Public';

  user.save();
}

export function handleRoleMinted(event: RoleMintedEvent): void {
  let user = loadUser(event.params.account.toHexString());

  user.role = event.params.role === 1 ? 'Auditor' : 'Developer';

  user.save();
}
