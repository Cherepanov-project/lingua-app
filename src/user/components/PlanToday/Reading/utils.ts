export function splitHtmlByParagraphs(html: string, maxCharsPerChunk = 300, maxParagraphsPerChunk = 10) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const paragraphs = Array.from(doc.querySelectorAll('p'))
    .map(p => p.outerHTML)
    .filter(p => p.trim() !== '')

  const chunks: string[] = []
  let currentChunk: string[] = []
  let currentChars = 0

  const countChars = (htmlString: string) =>
    htmlString.replace(/<[^>]+>/g, '').length

  for (const paragraph of paragraphs) {
    const charsInParagraph = countChars(paragraph)

    if (
      (currentChars + charsInParagraph > maxCharsPerChunk && currentChunk.length > 0) ||
      currentChunk.length >= maxParagraphsPerChunk
    ) {
      chunks.push(wrapChunkHtml(currentChunk))
      currentChunk = []
      currentChars = 0
    }

    currentChunk.push(paragraph)
    currentChars += charsInParagraph
  }

  if (currentChunk.length > 0) {
    chunks.push(wrapChunkHtml(currentChunk))
  }

  return chunks
}

function wrapChunkHtml(paragraphs: string[]) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; 
    padding:20px; line-height:1.6; font-size:18px; color:#111; overflow: 'hidden';
  }
  p { margin: 0; }
</style>
</head>
<body>
${paragraphs.join('\n')}
</body>
</html>`
}


export function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
