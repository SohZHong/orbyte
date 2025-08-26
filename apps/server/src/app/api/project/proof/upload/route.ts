import { NextRequest } from 'next/server';
import { pinataSdk } from '@/config';
import { fail, success } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // File
    const proof = formData.get('proof') as File | null;

    if (!proof) {
      return fail('Missing required proof document', 400);
    }

    // Upload file to Pinata
    const proofRes = await pinataSdk.upload.file(proof);

    // Final payload
    const payload = {
      proofCid: proofRes.IpfsHash,
    };

    return success(payload, 200);
  } catch (error) {
    console.error('Proof upload error:', error);
    return fail('Failed to process proof submission', 500);
  }
}
