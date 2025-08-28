'use client';

import { KYC_ABI, KYC_CONTRACT_ADDRESS } from '@/constants';
import type { TxState } from '@/types/transaction';
import type { UserRole } from '@/types/user';
import { useTransaction } from './use-transaction';

export const useKycContract = () => {
  const { hash, isPending, isConfirmed, error, sendTx } = useTransaction(
    KYC_CONTRACT_ADDRESS,
    KYC_ABI
  );

  const submitKYC = async (
    role: UserRole,
    documentCid: string,
    proofOfAddressCid: string,
    certificationCid?: string
  ): Promise<TxState> => {
    return sendTx('submitKYC', [
      role,
      documentCid,
      proofOfAddressCid,
      certificationCid ?? '',
    ]);
  };

  return { submitKYC, hash, isPending, isConfirmed, error };
};
