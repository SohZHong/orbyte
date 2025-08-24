export enum UserRole {
  DEVELOPER = 0,
  AUDITOR = 1,
  PUBLIC = 2,
}

export interface User {
  id: string;
  role: 'Auditor' | 'Developer' | 'Public';
  documentCid: string;
  proofOfAddressCid: string;
  certificationCid: string | null;
}
