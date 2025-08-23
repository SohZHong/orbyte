import { NextRequest } from 'next/server';
import { pinataSdk } from '@/config';
import { fail, success } from '@/utils/apiResponse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const role = Number(formData.get('role') as string | null);
    const document = formData.get('document') as File | null;
    const proofOfAddress = formData.get('proofOfAddress') as File | null;
    const certification = formData.get('certification') as File | null;

    if (!document || !proofOfAddress) {
      return fail('Missing required KYC fields', 400);
    }

    const documentRes = await pinataSdk.upload.file(document);
    const proofRes = await pinataSdk.upload.file(proofOfAddress);

    let certRes = null;
    if (certification) {
      certRes = await pinataSdk.upload.file(certification);
    }

    const kycPayload = {
      role,
      documentCid: documentRes.IpfsHash,
      proofOfAddressCid: proofRes.IpfsHash,
      certificationCid: certRes?.IpfsHash ?? null,
    };

    return success(kycPayload, 200);
  } catch (error) {
    console.error('KYC upload error:', error);
    return fail('Failed to process KYC submission', 500);
  }
}
