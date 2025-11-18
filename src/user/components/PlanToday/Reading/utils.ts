export function htmlToPlainText(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  doc.querySelectorAll('script, style, noscript').forEach(n => n.remove())

  const text = doc.body?.innerText ?? ''
  return text.replace(/\s+/g, ' ').trim()
}

export function splitTextIntoChunksAsHtml(plainText: string, chunkSizeWords = 300) {

  const sentences = plainText.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+$/g) || []
  const chunks: string[] = []

  let currentChunk = ''
  let currentWords = 0

  for (const sentence of sentences) {
    const wordsInSentence = sentence.trim().split(/\s+/).length

    if (currentWords + wordsInSentence > chunkSizeWords && currentChunk) {
      chunks.push(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  padding: 20px;
  line-height: 1.6;
  font-size: 18px;
  color: #111;
}
</style>
</head>
<body>
<div>${escapeHtml(currentChunk.trim())}</div>
</body>
</html>`)
      currentChunk = ''
      currentWords = 0
    }

    currentChunk += sentence + ' '
    currentWords += wordsInSentence
  }

  if (currentChunk) {
    chunks.push(`<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  padding: 20px;
  line-height: 1.6;
  font-size: 18px;
  color: #111;
}
</style>
</head>
<body>
<div>${escapeHtml(currentChunk.trim())}</div>
</body>
</html>`)
  }

  return chunks
}

export function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
