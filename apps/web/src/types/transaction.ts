/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TxState {
  hash: `0x${string}` | undefined;
  isPending: boolean;
  isConfirmed: boolean;
  error: any | null;
}
