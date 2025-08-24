export interface User {
  id: string;
  role: 'Auditor' | 'Developer' | 'Public';
  documentCid: string;
  proofOfAddressCid: string;
  certificationCid: string | null;
}
