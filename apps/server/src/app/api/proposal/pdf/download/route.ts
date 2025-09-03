import { NextRequest } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { graphClient } from '@/graphql/client';
import { ProposalDocument, type ProposalQuery } from '@/generated/graphql';
import { fail } from '@/utils/apiResponse';
import { drawWrappedText } from '@/utils/formatter';

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

    function addLine(label: string, value: string | null | undefined) {
      if (!value) return;

      // Draw label
      page.drawText(`${label}:`, {
        x: 50,
        y,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0.3),
      });

      // Wrap value after label
      y =
        drawWrappedText({
          page,
          text: value,
          x: 150, // indent values
          y,
          font,
          size: 12,
          maxWidth: 545 - 150,
          color: rgb(0, 0, 0),
        }) - 10; // extra spacing
    }

    // Add proposal details
    page.drawText('Proposal Details', {
      x: 50,
      y,
      size: 16,
      font,
      color: rgb(0, 0.3, 0.6),
    });
    y -= 30;

    addLine('Project Name', proposal.name);
    addLine('Description', proposal.description);
    addLine('Location', proposal.location);
    addLine('Standard', proposal.standard);
    addLine('Status', proposal.status);
    addLine('Estimated Credits', proposal.estimatedCredits?.toString());
    addLine('Developer', proposal.developer.id);

    // Add links
    if (proposal.projectPlanCID) {
      addLine(
        'Project Plan',
        `https://ipfs.io/ipfs/${proposal.projectPlanCID}`
      );
    }
    if (proposal.eiaCID) {
      addLine(
        'Environmental Impact Assessment',
        `https://ipfs.io/ipfs/${proposal.eiaCID}`
      );
    }
    if (proposal.otherDocsCID) {
      addLine(
        'Financial Projections',
        `https://ipfs.io/ipfs/${proposal.otherDocsCID}`
      );
    }

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
