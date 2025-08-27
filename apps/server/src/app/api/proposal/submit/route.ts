import { NextRequest } from 'next/server';
import { pinataSdk } from '@/config';
import { fail, success } from '@/utils/apiResponse';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Text fields
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const location = formData.get('location') as string | null;
    const estimatedCredits = formData.get('estimatedCredits') as string | null;
    const standard = formData.get('standard') as string | null;
    const vintage = formData.get('vintage') as string | null;
    const methodology = formData.get('methodology') as string | null;

    if (
      !name ||
      !description ||
      !location ||
      !estimatedCredits ||
      !standard ||
      !vintage
    ) {
      return fail('Missing required metadata fields', 400);
    }

    // Files
    const projectPlan = formData.get('projectPlan') as File | null;
    const eia = formData.get('eia') as File | null;
    const otherDocs = formData.get('otherDocs') as File | null;
    const cover = formData.get('cover') as File | null;

    if (!projectPlan || !eia) {
      return fail('Missing required proposal documents', 400);
    }

    // Upload files to Pinata
    const projectPlanRes = await pinataSdk.upload.file(projectPlan);
    const eiaRes = await pinataSdk.upload.file(eia);

    let coverRes = null;
    if (cover) {
      coverRes = await pinataSdk.upload.file(cover);
    }

    let otherDocsRes = null;
    if (otherDocs) {
      otherDocsRes = await pinataSdk.upload.file(otherDocs);
    }

    // Build metadata JSON
    const metadata = {
      name,
      description,
      image: coverRes ? `ipfs://${coverRes.IpfsHash}` : null,
      attributes: [
        { trait_type: 'Location', value: location },
        { trait_type: 'Standard', value: standard },
        { trait_type: 'Vintage', value: vintage },
        { trait_type: 'Estimated Credits', value: estimatedCredits },
        { trait_type: 'Methodology', value: methodology },
      ],
      documents: {
        projectPlanCID: `ipfs://${projectPlanRes.IpfsHash}`,
        eiaCID: `ipfs://${eiaRes.IpfsHash}`,
        otherDocsCID: otherDocsRes ? `ipfs://${otherDocsRes.IpfsHash}` : null,
      },
    };

    // Upload metadata JSON as file
    const uniqueName = `metadata-${Date.now()}-${crypto
      .randomBytes(4)
      .toString('hex')}.json`;

    const metadataFile = new File(
      [JSON.stringify(metadata, null, 2)],
      uniqueName,
      { type: 'application/json' }
    );

    const metadataRes = await pinataSdk.upload.file(metadataFile);

    // Final payload
    const payload = {
      projectPlanCid: projectPlanRes.IpfsHash,
      eiaCid: eiaRes.IpfsHash,
      otherDocsCid: otherDocsRes?.IpfsHash ?? null,
      metadataCid: metadataRes.IpfsHash,
    };

    return success(payload, 200);
  } catch (error) {
    console.error('Proposal upload error:', error);
    return fail('Failed to process proposal submission', 500);
  }
}
