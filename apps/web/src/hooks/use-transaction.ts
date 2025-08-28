import type { TxState } from '@/types/transaction';
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';
import { useState, useCallback } from 'react';
import { encodeFunctionData } from 'viem';

export const useTransaction = (contractAddress: `0x${string}`, abi: any) => {
  const { client } = useSmartWallets();
  const [state, setState] = useState<TxState>({
    hash: undefined,
    isPending: false,
    isConfirmed: false,
    error: null,
  });

  /**
   * Single transaction
   */
  const sendTx = useCallback(
    async (functionName: string, args: any[] = [], value?: bigint) => {
      if (!client) throw new Error('No Privy Smart Wallet client available');

      try {
        setState({ ...state, isPending: true, error: null });

        const data = encodeFunctionData({
          abi,
          functionName,
          args,
        });

        const txHash = await client.sendTransaction({
          to: contractAddress,
          data,
          value: value ?? BigInt(0), // optional value
        });

        setState({
          hash: txHash,
          isPending: false,
          isConfirmed: true,
          error: null,
        });

        return txHash;
      } catch (err) {
        setState({ ...state, isPending: false, error: err as any });
        throw err;
      }
    },
    [abi, contractAddress, client]
  );

  /**
   * Batch multiple calls in a single transaction
   */
  const sendBatchTx = useCallback(
    async (
      calls: {
        to: `0x${string}`;
        abi: any;
        functionName: string;
        args?: any[];
        value?: bigint;
      }[]
    ) => {
      if (!client) throw new Error('No Privy Smart Wallet client available');

      try {
        setState((prev) => ({ ...prev, isPending: true, error: null }));

        const encodedCalls = calls.map((call) => ({
          to: call.to,
          data: encodeFunctionData({
            abi: call.abi,
            functionName: call.functionName,
            args: call.args ?? [],
          }),
          value: call.value ?? BigInt(0),
        }));

        const txHash = await client.sendTransaction({
          calls: encodedCalls,
        });

        setState({
          hash: txHash,
          isPending: false,
          isConfirmed: true,
          error: null,
        });

        return txHash;
      } catch (err) {
        setState((prev) => ({ ...prev, isPending: false, error: err as any }));
        throw err;
      }
    },
    [client]
  );

  return { ...state, sendTx, sendBatchTx };
};
