import {
  CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
  CARBON_CREDIT_TOKEN_ABI,
  CREDIT_TOKEN_CONTRACT_ADDRESS,
} from '@/constants';
import { useTransaction } from './use-transaction';

export function useCarbonCreditTokenContract() {
  const { hash, isPending, isConfirmed, error, sendTx } = useTransaction(
    CREDIT_TOKEN_CONTRACT_ADDRESS,
    CARBON_CREDIT_TOKEN_ABI
  );

  // approve marketplace to move seller’s tokens
  const approveMarketplace = () => {
    return sendTx('setApprovalForAll', [
      CARBON_CREDIT_MARKETPLACE_CONTRACT_ADDRESS,
      true,
    ]);
  };

  return {
    hash,
    isPending,
    isConfirmed,
    error,
    approveMarketplace,
  };
}
