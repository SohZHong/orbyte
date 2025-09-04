import { PDFPage, PDFFont, rgb } from 'pdf-lib';

interface WrapOptions {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  font: PDFFont;
  size: number;
  maxWidth: number;
  color?: ReturnType<typeof rgb>;
  lineHeight?: number;
}

interface AddLineOptions {
  page: PDFPage;
  label: string;
  value?: string | null;
  y: number;
  font: PDFFont;
  boldFont: PDFFont;
  size?: number;
  maxWidth?: number;
  labelX?: number;
  valueX?: number;
  colorLabel?: ReturnType<typeof rgb>;
  colorValue?: ReturnType<typeof rgb>;
}

/**
 * Draw text with wrapping, including forced breaks for long unbroken strings.
 * Returns the new Y position after drawing.
 */
export function drawWrappedText({
  page,
  text,
  x,
  y,
  font,
  size,
  maxWidth,
  color = rgb(0, 0, 0),
  lineHeight = size * 1.2,
}: WrapOptions): number {
  const words = text.split(/\s+/);

  const lines: string[] = [];
  let currentLine = '';

  function pushLine(line: string) {
    if (line.trim()) lines.push(line);
  }

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = font.widthOfTextAtSize(testLine, size);

    if (width > maxWidth) {
      // If the word itself is too long (CID/URL), force split it
      if (font.widthOfTextAtSize(word, size) > maxWidth) {
        const chars = word.split('');
        let chunk = '';
        for (const ch of chars) {
          const testChunk = chunk + ch;
          if (font.widthOfTextAtSize(testChunk, size) > maxWidth) {
            pushLine(chunk);
            chunk = ch;
          } else {
            chunk = testChunk;
          }
        }
        if (chunk) {
          pushLine(chunk);
        }
        if (currentLine) {
          pushLine(currentLine);
          currentLine = '';
        }
      } else {
        pushLine(currentLine);
        currentLine = word;
      }
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) pushLine(currentLine);

  // Draw the lines
  for (const line of lines) {
    page.drawText(line, { x, y, size, font, color });
    y -= lineHeight;
  }

  return y;
}

export function addLine({
  page,
  label,
  value,
  y,
  font,
  boldFont,
  size = 12,
  labelX = 50,
  rightMargin = 50,
  colorLabel = rgb(0, 0, 0.3),
  colorValue = rgb(0, 0, 0),
}: AddLineOptions & { rightMargin?: number }): number {
  if (!value) return y;

  // Draw label
  page.drawText(`${label}:`, {
    x: labelX,
    y,
    size,
    font: boldFont,
    color: colorLabel,
  });

  // Calculate where label ends
  const labelWidth = boldFont.widthOfTextAtSize(`${label}: `, size);
  const valueX = labelX + labelWidth + 10; // add some padding

  // Calculate usable width for value
  const pageWidth = page.getWidth();
  const maxWidth = pageWidth - rightMargin - valueX;

  // Draw wrapped value
  return (
    drawWrappedText({
      page,
      text: value,
      x: valueX,
      y,
      font,
      size,
      maxWidth,
      color: colorValue,
    }) - 10 // spacing after
  );
}
