/**
 * Per-page SEO.
 *
 * Facebook is this business's main channel, and it refuses relative `og:image`
 * values — every URL emitted here is absolute, built from
 * `runtimeConfig.public.siteUrl` (set NUXT_PUBLIC_SITE_URL when the real domain
 * is connected).
 */

export function useSiteUrl() {
  const base = String(useRuntimeConfig().public.siteUrl || '').replace(/\/+$/, '')

  const abs = (path?: string | null) => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    return `${base}${path.startsWith('/') ? '' : '/'}${path}`
  }

  return { base, abs }
}

export interface PageSeo {
  title: string
  description: string
  /** Relative or absolute; made absolute for OG/Twitter. */
  image?: string
  type?: 'website' | 'article' | 'product'
}

export function usePageSeo(seo: MaybeRefOrGetter<PageSeo>) {
  const route = useRoute()
  const { base, abs } = useSiteUrl()

  const resolved = computed(() => {
    const s = toValue(seo)
    return {
      title: s.title,
      description: s.description,
      image: abs(s.image || '/images/design/design-1.webp'),
      type: s.type || 'website',
      url: `${base}${route.path}`,
    }
  })

  useSeoMeta({
    title: () => resolved.value.title,
    description: () => resolved.value.description,
    ogTitle: () => resolved.value.title,
    ogDescription: () => resolved.value.description,
    ogImage: () => resolved.value.image,
    ogType: () => resolved.value.type as any,
    ogUrl: () => resolved.value.url,
    ogSiteName: 'Хаан Тунамал Хийц',
    ogLocale: 'mn_MN',
    twitterCard: 'summary_large_image',
    twitterTitle: () => resolved.value.title,
    twitterDescription: () => resolved.value.description,
    twitterImage: () => resolved.value.image,
  })

  useHead({
    link: [{ rel: 'canonical', href: () => resolved.value.url }],
  })
}

/**
 * Emit a JSON-LD block. An array is serialised as-is — Google reads a top-level
 * array of nodes from one script tag, so a page describing several things (a
 * breadcrumb trail and the collection it sits in) needs only this one call.
 */
export function useJsonLd(data: MaybeRefOrGetter<Record<string, any> | Array<Record<string, any>>>) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: () => JSON.stringify(toValue(data)),
      },
    ],
  })
}
