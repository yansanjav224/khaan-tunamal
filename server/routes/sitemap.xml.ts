// Sitemap built from the same cached Firestore reads the pages use, so
// generating it costs no extra document reads.
export default defineEventHandler(async (event) => {
  const base = String(useRuntimeConfig().public.siteUrl || '').replace(/\/+$/, '')
  const today = new Date().toISOString().slice(0, 10)

  const products = await fetchProducts().catch(() => [] as Array<Record<string, any>>)

  const urls: Array<{ loc: string; priority: string; changefreq: string }> = [
    { loc: `${base}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${base}/products`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${base}/about`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${base}/contact`, priority: '0.6', changefreq: 'monthly' },
    ...products.map(p => ({
      loc: `${base}/products/${p.id}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  return body
})
