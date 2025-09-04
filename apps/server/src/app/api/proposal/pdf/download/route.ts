import { NextRequest } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { graphClient } from '@/graphql/client';
import { ProposalDocument, type ProposalQuery } from '@/generated/graphql';
import { fail } from '@/utils/apiResponse';
import { addLine, drawWrappedText } from '@/utils/formatter';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return fail('Missing proposal id', 400);

    // Fetch proposal from GraphQL
    const { proposal } = await graphClient.request<ProposalQuery>(
      ProposalDocument,
      { id }
    );
    if (!proposal) return fail('Proposal not found', 404);

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Title
    page.drawText('Proposal Details', {
      x: 50,
      y,
      size: 16,
      font,
      color: rgb(0, 0.3, 0.6),
    });
    y -= 30;

    // Details
    y = addLine({
      page,
      label: 'Project Name',
      value: proposal.name,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Description',
      value: proposal.description,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Location',
      value: proposal.location,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Standard',
      value: proposal.standard,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Status',
      value: proposal.status,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Estimated Credits',
      value: proposal.estimatedCredits?.toString(),
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Developer',
      value: proposal.developer.id,
      y,
      font,
      boldFont,
    });

    // Links
    y = addLine({
      page,
      label: 'Project Plan',
      value: proposal.projectPlanCID
        ? `https://ipfs.io/ipfs/${proposal.projectPlanCID}`
        : null,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Environmental Impact Assessment',
      value: proposal.eiaCID ? `https://ipfs.io/ipfs/${proposal.eiaCID}` : null,
      y,
      font,
      boldFont,
    });
    y = addLine({
      page,
      label: 'Financial Projections',
      value: proposal.otherDocsCID
        ? `https://ipfs.io/ipfs/${proposal.otherDocsCID}`
        : null,
      y,
      font,
      boldFont,
    });

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=proposal-${id}.pdf`,
      },
    });
  } catch (err) {
    console.error(err);
    return fail('Failed to generate proposal PDF', 500);
  }
}
