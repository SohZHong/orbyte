import { NextRequest } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { graphClient } from '@/graphql/client';
import { ProjectDocument, type ProjectQuery } from '@/generated/graphql';
import { fail } from '@/utils/apiResponse';
import { drawWrappedText } from '@/utils/formatter';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return fail('Missing project id', 400);

    const { project } = await graphClient.request<ProjectQuery>(
      ProjectDocument,
      { id }
    );
    if (!project) return fail('Project not found', 404);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = height - 50;

    function addLine(label: string, value: string | null | undefined) {
      if (!value) return;
      const labelWidth = boldFont.widthOfTextAtSize(`${label}: `, 12);

      // Draw label
      page.drawText(`${label}: `, {
        x: 50,
        y,
        size: 12,
        font: boldFont,
        color: rgb(0, 0, 0.2),
      });

      // Draw wrapped value right after label
      y =
        drawWrappedText({
          page,
          text: value,
          x: 50 + labelWidth + 5,
          y,
          font,
          size: 12,
          maxWidth: 545 - (50 + labelWidth + 5), // right margin
          color: rgb(0, 0, 0),
        }) - 10; // add spacing after
    }

    // Header
    page.drawText('Project Details', {
      x: 50,
      y,
      size: 20,
      font: boldFont,
      color: rgb(0, 0.4, 0.7),
    });
    y -= 30;

    const p = project.proposal;

    // Project Info
    addLine('Project Name', p.name);
    addLine('Description', p.description);
    addLine('Location', p.location);
    addLine('Standard', p.standard);
    addLine('Status', project.status);
    addLine('Estimated Credits', p.estimatedCredits?.toString());
    addLine('Methodology', p.methodology);
    addLine('Vintage', p.vintage?.toString());

    // Add section separator
    y -= 10;
    page.drawLine({
      start: { x: 50, y },
      end: { x: 545, y },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });
    y -= 20;

    // Documents Section
    page.drawText('Submitted Documents', {
      x: 50,
      y,
      size: 16,
      font: boldFont,
      color: rgb(0, 0.4, 0.7),
    });
    y -= 25;

    if (p.projectPlanCID) {
      addLine('Project Plan', `https://ipfs.io/ipfs/${p.projectPlanCID}`);
    }
    if (p.eiaCID) {
      addLine(
        'Environmental Impact Assessment',
        `https://ipfs.io/ipfs/${p.eiaCID}`
      );
    }
    if (p.otherDocsCID) {
      addLine('Other Documents', `https://ipfs.io/ipfs/${p.otherDocsCID}`);
    }

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=project-${id}.pdf`,
      },
    });
  } catch (err) {
    console.error(err);
    return fail('Failed to generate project PDF', 500);
  }
}
