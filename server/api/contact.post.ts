/**
 * Contact form intake.
 *
 * The write goes through Firestore's REST API from the server rather than the
 * client SDK, so public pages never have to load Firebase. Firestore rules
 * permit unauthenticated `create` on `messages` only, with the shape enforced
 * there as well — this handler is the friendly gate, the rules are the real one.
 *
 * Abuse control is deliberately free-tier only: a honeypot field plus a
 * best-effort in-memory per-IP window. Firestore's Spark plan allows 20k
 * writes/day, so even a burst that slips through cannot generate a bill.
 */

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3
const recent = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (recent.get(ip) || []).filter(t => now - t < WINDOW_MS)
  hits.push(now)
  recent.set(ip, hits)

  // Keep the map from growing without bound on a long-lived instance.
  if (recent.size > 500) {
    for (const [k, v] of recent) {
      if (!v.length || now - v[v.length - 1] > WINDOW_MS) recent.delete(k)
    }
  }

  return hits.length > MAX_PER_WINDOW
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  const name = String(body?.name ?? '').trim()
  const phone = String(body?.phone ?? '').trim()
  const message = String(body?.message ?? '').trim()
  const honeypot = String(body?.website ?? '').trim()

  // A bot filled the hidden field. Report success so it stops retrying.
  if (honeypot) return { ok: true }

  if (name.length < 2 || name.length > 80) {
    throw createError({ statusCode: 400, statusMessage: 'Нэрээ зөв оруулна уу.', message: 'Нэрээ зөв оруулна уу.' })
  }
  if (phone.replace(/\D/g, '').length < 6 || phone.length > 20) {
    throw createError({ statusCode: 400, statusMessage: 'Утасны дугаараа зөв оруулна уу.', message: 'Утасны дугаараа зөв оруулна уу.' })
  }
  if (message.length < 5 || message.length > 1000) {
    throw createError({ statusCode: 400, statusMessage: 'Зурвас 5-1000 тэмдэгт байх ёстой.', message: 'Зурвас 5-1000 тэмдэгт байх ёстой.' })
  }

  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || getRequestHeader(event, 'x-real-ip')
    || 'unknown'

  if (rateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Хэт олон хүсэлт. Түр хүлээгээд дахин оролдоно уу.', message: 'Хэт олон хүсэлт. Түр хүлээгээд дахин оролдоно уу.' })
  }

  const { public: pub } = useRuntimeConfig()
  const projectId = pub.firebaseProjectId as string
  const apiKey = pub.firebaseApiKey as string
  if (!projectId || !apiKey) {
    throw createError({ statusCode: 503, statusMessage: 'Түр ашиглах боломжгүй байна.', message: 'Түр ашиглах боломжгүй байна.' })
  }

  try {
    await $fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/messages`,
      {
        method: 'POST',
        query: { key: apiKey },
        body: {
          fields: {
            name: { stringValue: name },
            phone: { stringValue: phone },
            message: { stringValue: message },
            createdAt: { timestampValue: new Date().toISOString() },
            read: { booleanValue: false },
          },
        },
      },
    )
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Илгээхэд алдаа гарлаа. Утсаар холбогдоно уу.', message: 'Илгээхэд алдаа гарлаа. Утсаар холбогдоно уу.' })
  }

  return { ok: true }
})
