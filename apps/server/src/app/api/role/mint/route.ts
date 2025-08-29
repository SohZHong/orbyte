import { NextRequest } from 'next/server';
import { walletClient } from '@/config';
import { ROLE_TOKEN_ABI, ROLE_TOKEN_CONTRACT_ADDRESS } from '@/constants';
import { fail, success } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const { address, role } = await request.json();

    if (!address || role === null) {
      return fail('Missing address or role', 400);
    }

    const txHash = await walletClient.writeContract({
      address: ROLE_TOKEN_CONTRACT_ADDRESS,
      abi: ROLE_TOKEN_ABI,
      functionName: 'mint',
      args: [address as `0x${string}`, BigInt(role)],
    });

    return success(txHash);
  } catch (err) {
    console.error('Mint error:', err);
    return fail((err as Error).message ?? 'Failed to mint role token');
  }
}
