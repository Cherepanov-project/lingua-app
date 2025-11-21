import { RouterType } from '../../router'

export default function registerProxyRoutes(router: RouterType) {
  router.get('/api/proxy', async request => {
    const url = new URL(request.url).searchParams.get('url')
    if (!url) {
      return new Response(JSON.stringify({ error: 'Missing ?url=' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    try {
      const response = await fetch(url, {
        headers: { 'Accept-Encoding': 'identity' },
      })
      const html = await response.text()

      return new Response(html, {
        status: response.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        },
      })
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to fetch', detail: `${err}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  })
}
