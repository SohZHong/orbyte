import { NextRequest } from 'next/server';
import { pinataSdk } from '@/config';
import { fail, success } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // File
    const retirementDoc = formData.get('retirementDoc') as File | null;

    if (!retirementDoc) {
      return fail('Missing required retirement document', 400);
    }

    // Upload file to Pinata
    const retirementRes = await pinataSdk.upload.file(retirementDoc);

    // Final payload
    const payload = {
      retirementCID: retirementRes.IpfsHash,
    };

    return success(payload, 200);
  } catch (error) {
    console.error('Retirement document upload error:', error);
    return fail('Failed to process retirement document submission', 500);
  }
}
