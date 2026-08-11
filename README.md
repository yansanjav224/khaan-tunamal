# Хаан Тунамал Хийц — вэбсайт

Монгол үндэсний төмөр эдлэл, гар урлалын үйлдвэрлэгчийн танилцуулга сайт, өөрийн
контент удирдах системтэй.

**Live:** https://khaan-tunamal-69w5.vercel.app
**Админ:** https://khaan-tunamal-69w5.vercel.app/admin

---

## 1. Юугаар хийгдсэн

| Давхарга | Технологи | Тайлбар |
|---|---|---|
| Frontend / SSR | Nuxt 4 (Vue 3) + Tailwind CSS 3 | `pages/`, `components/`, `composables/` |
| Сервер | Nitro (Vercel serverless) | `server/api/`, `server/routes/` |
| Дата | Firebase Firestore | 5 цуглуулга — доор үзнэ үү |
| Нэвтрэлт | Firebase Auth (email/нууц үг) | зөвхөн админ |
| Зураг | Cloudinary | unsigned upload preset |
| Хостинг | Vercel | `main` салбар руу push хийхэд автоматаар deploy |

## 2. Зардал — **энэ сайт үнэгүй ажиллах ёстой**

Энэ бол архитектурын хатуу шаардлага, санамсаргүй зүйл биш.

- **Firestore Spark (үнэгүй) багц: өдөрт 50,000 уншилт.** Нэг хуудас бүрэн
  render хийхэд ~25 уншилт зарцуулагдана. Тиймээс:
  - `server/utils/firestore.ts` доторх бүх уншилт `defineCachedFunction`-оор
    **900 секунд** кэшлэгддэг;
  - `nuxt.config.ts`-ийн `routeRules` нийтийн хуудсуудыг **ISR**-ээр
    үйлчилдэг.
  - Үр дүн: уншилтын тоо **зочны тооноос биш, цагаас** хамаарна. Өдөрт
    ~500 уншилт зарцуулагддаг, хязгаар нь 50,000.
  - ⚠️ **Кэшийг битгий болиул.** ISR-ийг унтраах, `maxAge`-ийг багасгах нь
    үнэгүй багцаас хальж, төлбөр гаргана.
- **Зураг Cloudinary-аас шууд** ирдэг, Vercel-ийн Image Optimization
  (төлбөртэй) ашигладаггүй. `utils/image.ts` дахь `imgUrl()` нь
  `c_limit,w_...,q_auto,f_auto` хувиргалтыг URL-д нэмдэг.
- **Газрын зураг** `output=embed` хэлбэрээр орсон — Maps Embed API биш,
  API түлхүүр ч, billing данс ч шаардахгүй.
- **Firebase Admin SDK ашигладаггүй.** Сервер талын уншилт нь нийтийн REST
  API + нийтийн API түлхүүрээр явдаг тул service-account key хадгалах
  шаардлагагүй.

## 3. Локал ажиллуулах

```bash
npm install
cp .env.example .env    # утгуудыг Firebase/Cloudinary консолоос авна
npm run dev             # http://localhost:3000
```

Build-ийг шалгах:

```bash
npm run build
set -a; . ./.env; set +a          # .output нь .env-ийг ӨӨРӨӨ уншдаггүй
PORT=3000 node .output/server/index.mjs
```

> `.env`-гүйгээр build хийсэн сервер ажиллана, гэхдээ Firestore-т холбогдож
> чадахгүй тул кодод бичигдсэн үндсэн (default) контентыг харуулна. Бараа
> харагдахгүй байвал хамгийн түрүүнд үүнийг шалга.

## 4. Орчны хувьсагчид (Vercel → Settings → Environment Variables)

| Хувьсагч | Заавал эсэх | Тайлбар |
|---|---|---|
| `NUXT_PUBLIC_FIREBASE_API_KEY` | ✅ | Firebase вэб апп |
| `NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | ✅ | |
| `NUXT_PUBLIC_FIREBASE_PROJECT_ID` | ✅ | `khaan-tunamal` |
| `NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | ✅ | |
| `NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | ✅ | |
| `NUXT_PUBLIC_FIREBASE_APP_ID` | ✅ | |
| `NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | `dbortkwap` |
| `NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | ✅ | unsigned preset |
| `NUXT_PUBLIC_SITE_URL` | **домэйн холбосны дараа** | canonical, sitemap, og:image, JSON-LD бүгд эндээс гарна |
| `NUXT_PUBLIC_GSC_VERIFICATION` | сонголт | Google Search Console-ын баталгаажуулах код |
| `NUXT_PUBLIC_GA_MEASUREMENT_ID` | сонголт | Google Analytics 4 (`G-XXXX`) |

## 5. Firestore бүтэц

| Цуглуулга | Баримт | Агуулга |
|---|---|---|
| `products` | автомат ID | нэр, тайлбар, үнэ, ангилал, зурагнууд, `featured`, `order` |
| `categories` | гар ID (`zuukh-tulga` гэх мэт) | нэр, зураг, `order` |
| `settings` | `site` | компанийн нэр, утас, хаяг, Facebook, «Бидний тухай» бичвэр |
| `pageContent` | `home` `about` `contact` `products` `shared` | хуудас бүрийн БҮХ бичвэр, зураг |
| `messages` | автомат ID | холбоо барих маягтын зурвас |

**Дүрэм** (`firestore.rules`): бүх зүйл нийтэд УНШИГДАНА (сервер нийтийн
түлхүүрээр render хийдэг), бичих эрх нь `isAdmin()` доторх UID-ийн жагсаалтаар
хязгаарлагдана. `messages` нь зөвхөн үүсгэх боломжтой, унших нь админд.

Дүрэм солих:

```bash
firebase deploy --only firestore:rules
```

**Шинэ админ нэмэх:** Firebase Console → Authentication → хэрэглэгч үүсгэ →
UID-г нь `firestore.rules`-ийн `isAdmin()`-д нэм → дээрх командаар deploy хий.
Хоёуланг хийх ёстой: зөвхөн бүртгэл үүсгэвэл нэвтрэх боловч юу ч хадгалж
чадахгүй.

## 6. Админ панель

| Цэс | Юу засах вэ |
|---|---|
| Хянах самбар | тойм |
| Бараа | бүтээгдэхүүн нэмэх/засах/устгах, зураг байршуулах, «Онцлох» тэмдэглэх |
| Ангилал | ангилал + ангиллын зураг |
| Зурвас | холбоо барих маягтаар ирсэн зурвасууд |
| Хуудас | **сайтын бүх бичвэр, зураг** — 5 таб, 125 талбар |
| Тохиргоо | компанийн нэр, утас, хаяг, Facebook |

Сайтын бараг бүх бичвэр CMS-д байдаг. Санаатайгаар кодод үлдээсэн зүйлс:
`error.vue` (дата давхарга унасан ч ажиллах ёстой), `aria-label`-ууд, маягтын
honeypot шошго.

⚠️ **Кэшийн саатал:** админаас хадгалсны дараа нийтийн хуудсанд гарч ирэхэд
**15 хүртэлх минут** зарцуулагдана (ISR + сервер кэш). Энэ нь эвдрэл биш,
үнэгүй багцад багтах механизм. Шууд шалгах бол `/api/products` гэх мэт
API замыг нээж үзэж болно.

## 7. Deploy

`main` руу push хийхэд Vercel автоматаар build хийж, гаргана. Гараар хийх
алхам байхгүй.

```bash
git push origin main
```

Deploy дууссаны дараа ~30 секундын турш хуучин кэшлэгдсэн HTML нь устсан JS
chunk руу заасаар байж `net::ERR_ABORTED` алдаа өгч болно. Өөрөө засагдана.

## 8. Домэйн холбох

1. Vercel → Project → Settings → Domains → домэйнээ нэм.
2. Бүртгэгчийн DNS дээр Vercel-ийн зааж өгсөн бичлэгийг оруул.
3. **`NUXT_PUBLIC_SITE_URL`-г шинэ домэйн болго** → redeploy.
   Үүнийг хийхгүй бол `sitemap.xml`, `robots.txt`, `canonical`, `og:image`,
   JSON-LD бүгд `.vercel.app` хаяг рүү заасаар байх бөгөөд Google
   индексжүүлэлт эвдэрнэ.
4. Google Search Console дээр шинэ домэйнийг property болгон нэмж,
   `sitemap.xml`-ээ дахин илгээ.

## 9. Санаж байх зүйлс

- **Кэш кодоор тодорхойлогдоно** (`server/utils/firestore.ts` дахь `CACHE`
  тогтмол ба `nuxt.config.ts` дахь `routeRules`). Эдгээрийг өөрчлөх нь шууд
  зардалд нөлөөлнө.
- **`/products?category=...`** нь ISR кэшэд query-тэйгээ хамт хадгалагддаг
  (`allowQuery`). Үүнийг авбал шүүлтүүрийн таб буруу тэмдэглэгдэнэ.
- **Nuxt-ийн компонентын нэршил:** `components/admin/Foo.vue` →
  `<AdminFoo />`. Лавлахын нэр угтвар болдог; үүнийг мартвал компонент
  чимээгүйхэн render хийгдэхгүй.
- **Cloudinary-ийн upload preset нь unsigned** тул хөтөч рүү очдог. Cloudinary
  консол дээр preset-д хэмжээ/формат/лавлахын хязгаарлалт тавьсан байх ёстой.
