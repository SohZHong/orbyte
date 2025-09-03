import { PDFPage } from 'pdf-lib';

export function drawWrappedText(opts: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  font: any;
  size: number;
  maxWidth: number;
  color?: any;
}) {
  const { page, text, x, y, font, size, maxWidth, color } = opts;
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const testWidth = font.widthOfTextAtSize(testLine, size);
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let currentY = y;
  for (const line of lines) {
    page.drawText(line, { x, y: currentY, size, font, color });
    currentY -= size + 4; // line spacing
  }
  return currentY;
}
