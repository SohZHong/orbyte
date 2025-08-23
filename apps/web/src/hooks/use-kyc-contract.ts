'use client';

import { useState } from 'react';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { encodeFunctionData } from 'viem';
import { KYC_ABI, KYC_CONTRACT_ADDRESS } from '@/constants';
import type { UserRole } from '@/types/role';
import type { TxState } from '@/types/transaction';

export const useKycContract = () => {
  const { client } = useSmartWallets();
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [error, setError] = useState<any | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const submitKYC = async (
    role: UserRole,
    documentCid: string,
    proofOfAddressCid: string,
    certificationCid?: string
  ): Promise<TxState> => {
    try {
      if (!client) {
        throw new Error('No Privy Smart Wallet client available');
      }

      setIsPending(true);

      // Encode contract call
      const data = encodeFunctionData({
        abi: KYC_ABI,
        functionName: 'submitKYC',
        args: [role, documentCid, proofOfAddressCid, certificationCid ?? ''],
      });

      // 🚀 Send gasless tx
      const txHash = await client.sendTransaction({
        to: KYC_CONTRACT_ADDRESS,
        data,
      });

      setHash(txHash);
      setIsPending(false);
      setIsConfirmed(true);

      return {
        hash: txHash,
        isPending: false,
        isConfirmed: true,
        error: null,
      };
    } catch (err) {
      setError(err);
      setIsPending(false);
      throw err;
    }
  };

  return { submitKYC, hash, isPending, isConfirmed, error };
};
