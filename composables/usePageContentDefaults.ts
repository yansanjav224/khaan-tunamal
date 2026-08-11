// ===================== HOME =====================
export interface HomeHero {
  label: string
  title: string
  titleLine2: string
  description: string
  image: string
  buttonProducts: string
  buttonContact: string
}

export interface HomeStat {
  value: string
  label: string
}

export interface HomeHeritage {
  label: string
  title: string
  description: string
  image: string
  experienceNumber: string
  experienceLabel: string
  features: string[]
}

export interface HomeContent {
  hero: HomeHero
  stats: HomeStat[]
  heritage: HomeHeritage
  featuredLabel: string
  featuredTitle: string
  categoriesLabel: string
  categoriesTitle: string
}

// ===================== ABOUT =====================
export interface AboutHero {
  label: string
  title: string
  description: string
  image: string
}

export interface AboutStat {
  value: string
  label: string
}

export interface AboutStory {
  title: string
  text1: string
  text2: string
  stats: AboutStat[]
  quote: string
  image: string
}

export interface AboutCraft {
  title: string
  description: string
  image: string
}

export interface AboutValue {
  title: string
  description: string
}

export interface AboutCTA {
  title: string
  description: string
  phone: string
  phoneDisplay: string
  buttonText: string
}

export interface AboutContent {
  hero: AboutHero
  story: AboutStory
  craftSectionTitle: string
  crafts: AboutCraft[]
  valuesSectionTitle: string
  values: AboutValue[]
  valuesImage: string
  cta: AboutCTA
}

// ===================== CONTACT =====================
export interface ContactHero {
  label: string
  titleLine1: string
  titleHighlight: string
  /** Trails the highlighted words — used to be the literal "холбоно". */
  titleTail: string
  image: string
}

export interface ContactCard {
  locationTitle: string
  phoneTitle: string
  emailTitle: string
  email: string
  businessHours: string
  instagramLabel: string
  facebookLabel: string
}

export interface ContactContent {
  hero: ContactHero
  cards: ContactCard
  mapEmbedUrl: string
  mapLabel: string
  /** Opens the pin in the Google Maps app so the customer can navigate to it. */
  mapLink: string
  /** Optional photo of the entrance, shown beside the address. */
  mapImage: string
  mapDirectionsLabel: string
}

// ===================== PRODUCTS =====================
export interface ProductsContent {
  hero: {
    label: string
    title: string
    description: string
  }
  emptyStateText: string
  emptyStateButton: string
}

// ===================== SHARED =====================
export interface SharedContactCTA {
  label: string
  title: string
  description: string
  phone: string
  phoneDisplay: string
  buttonText: string
}

export interface SharedFooter {
  brandName: string
  copyright: string
}

/**
 * Interface copy — every fixed label on the public site.
 *
 * These used to be literals in the templates, which meant the admin could edit
 * the headlines but not the word on the button underneath them.
 */
export interface SharedUi {
  nav: { brand: string; home: string; products: string; about: string; contact: string; call: string }
  chat: { label: string }
  footer: { linksTitle: string; contactTitle: string; facebook: string }
  home: { viewAll: string; viewAllShort: string }
  products: {
    searchPlaceholder: string
    all: string
    foundSuffix: string
    emptyAll: string
  }
  product: {
    back: string
    sizes: string
    ctaIntro: string
    facebookCta: string
    notFound: string
    related: string
    detail: string
    noImage: string
  }
  form: {
    title: string
    intro: string
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submit: string
    sending: string
    sent: string
    thanks: string
    errPhone: string
    errMessage: string
    errGeneric: string
  }
}

export interface SharedContent {
  contactCTA: SharedContactCTA
  footer: SharedFooter
  ui: SharedUi
}

// ===================== DEFAULTS =====================

export const defaultHomeContent: HomeContent = {
  hero: {
    label: '',
    title: 'Хаан Тунамал',
    titleLine2: 'Хийц',
    description: 'Бид зөвхөн бүтээгдэхүүн үйлдвэрлэдэггүй. Монгол ахуй, өв уламжлалыг дараагийн үед өвлүүлэх урлал бүтээдэг юм.',
    image: '/images/design/design-5.webp',
    buttonProducts: 'Бүтээгдэхүүн үзэх',
    buttonContact: 'Холбоо барих',
  },
  stats: [
    { value: '10+', label: 'Жилийн туршлага' },
  ],
  heritage: {
    label: '',
    title: 'Монгол үндэсний урлал',
    description: '"Хаан Тунамал Хийц" нь Монгол үндэсний өв соёл, уламжлалыг орчин үеийн урлалтай хослуулан, төмөр болон модон эдлэлийг хамгийн өндөр түвшинд урлан гаргаж байна. Бидний эдлэл бүр дахин давтагдашгүй түүх, өв уламжлалыг өөртөө агуулдаг.',
    image: '/images/craftsman-tools.webp',
    experienceNumber: '10',
    experienceLabel: 'Жилийн туршлага',
    features: ['100% Гар урлал', 'Дээд зэргийн чанартай материал'],
  },
  featuredLabel: '',
  featuredTitle: 'Онцлох бүтээгдэхүүн',
  categoriesLabel: '',
  categoriesTitle: 'Ангилалууд',
}

export const defaultAboutContent: AboutContent = {
  hero: {
    label: '',
    title: 'Бидний тухай',
    description: 'Монгол үндэсний хэв маягтай төмөр эдлэл, гар урлалын шилдэг өв уламжлалыг орчин үеийн хэрэглээнд зохицуулан урлаж байна.',
    image: '/images/design/design-14.webp',
  },
  story: {
    title: 'Бидний түүх',
    text1: '10 гаруй жилийн туршлагатай Хаан Тунамал Хийц нь Монгол дархны ухаан, төмөрлөг урлалыг шинэ түвшинд гаргахыг зорьж байна.',
    text2: 'Бид уламжлалт зуух, хүжсийн тавиур, зуухны багаж болон модон авдрыг гар аргаар, чин сэтгэлээсээ урлан бүтээдэг. Бүтээл бүр нь монгол хүний өв соёл, бахархлын илэрхийлэл юм.',
    stats: [
      { value: '10+', label: 'Жилийн туршлага' },
      { value: '50+', label: 'Бүтээгдэхүүн' },
    ],
    quote: 'Урлаг бол сэтгэлийн илэрхийлэл, харин дархны ур бол өв соёлын тамга юм.',
    image: '/images/design/design-7.webp',
  },
  craftSectionTitle: 'Гар урлалын уламжлал',
  crafts: [
    {
      title: 'Материал Сонголт',
      description: 'Хамгийн сайн чанарын ган болон цэвэр гуулийг сонгон авч, эдэлгээ даах бат бөх байдлыг эрхэмлэдэг.',
      image: '/images/design/design-10.webp',
    },
    {
      title: 'Гар сийлбэр',
      description: 'Бүтээл бүрт монгол хээ угалзыг гараар сийлж, дахин давтагдашгүй урлагийн бүтээл болгон амилуулна.',
      image: '/images/design/design-4.webp',
    },
    {
      title: 'Эцсийн өнгөлгөө',
      description: 'Уламжлалт аргаар өнгөлж, металлын байгалийн өнгийг тодотгон тансаг зэрэглэлийн харагдах байдлыг бүрдүүлдэг.',
      image: '/images/design/design-12.webp',
    },
  ],
  valuesSectionTitle: 'Бидний үнэт зүйлс',
  values: [
    { title: 'Чанар', description: 'Цаг хугацааны шалгуур даах чанарыг бид хамгийн түрүүнд тавьдаг.' },
    { title: 'Өв уламжлал', description: 'Монгол дархны ухааныг хадгалж, ирээдүй хойчдоо өвлүүлэн үлдээх эрхэм зорилготой.' },
    { title: 'Үнэнч байдал', description: 'Хэрэглэгчийн хүсэл сонирхолд нийцсэн, сэтгэлд хүрсэн бүтээлийг нийлүүлнэ.' },
  ],
  valuesImage: '/images/design/design-9.webp',
  cta: {
    title: 'Бидэнтэй холбогдох',
    description: 'Бүтээгдэхүүнтэй холбоотой мэдээлэл авах, захиалга өгөхийг хүсвэл бидэнтэй холбогдоорой.',
    phone: '99907191',
    phoneDisplay: '9990-7191',
    buttonText: 'Холбоо барих хуудас',
  },
}

export const defaultContactContent: ContactContent = {
  hero: {
    label: '',
    titleLine1: 'Өв соёл, урлахуйн ухааныг',
    titleHighlight: 'алтан хэлхээгээр',
    titleTail: 'холбоно',
    image: '/images/design/design-16.webp',
  },
  cards: {
    locationTitle: 'Хаяг, байршил',
    phoneTitle: 'Утас',
    emailTitle: 'Цахим шуудан',
    email: 'khaantunamal@khaantunamal.mn',
    businessHours: 'Даваа - Бямба: 10:00 - 19:00',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
  },
  // `output=embed` needs no API key and no billing account, unlike the Maps
  // Embed API. The workshop is a dropped pin rather than a listed business, so
  // the coordinates are the address as far as Google is concerned.
  mapEmbedUrl: 'https://www.google.com/maps?q=47.930322,107.020728&z=16&hl=mn&output=embed',
  mapLabel: 'Хаан Тунамал Хийц',
  mapLink: 'https://maps.app.goo.gl/jFURZAhd3tAGLdvA6',
  mapImage: '',
  mapDirectionsLabel: 'Замын заавар',
}

export const defaultProductsContent: ProductsContent = {
  hero: {
    label: '',
    title: 'Эрхэмсэг Өв',
    description: 'Монгол дархны ур ухаан, галын соёлыг шингээсэн гар урлалын дээжис. Төмөрлөг эдлэлийн төгс зохицол, мөнхөд орших өв соёл.',
  },
  emptyStateText: 'Хайлтад тохирох бараа олдсонгүй',
  emptyStateButton: 'Шүүлтүүр арилгах',
}

export const defaultSharedContent: SharedContent = {
  contactCTA: {
    label: '',
    title: 'Сонирхож байна уу?',
    description: 'Бүтээгдэхүүнтэй холбоотой мэдээлэл авах, захиалга өгөхийг хүсвэл бидэнтэй холбогдоорой. Бид таны хүссэн загвараар урлаж өгнө.',
    phone: '99907191',
    phoneDisplay: '9990-7191',
    buttonText: 'Холбоо барих',
  },
  footer: {
    brandName: 'ХААН ТУНАМАЛ ХИЙЦ',
    copyright: 'ХААН ТУНАМАЛ ХИЙЦ. Бүх эрх хуулиар хамгаалагдсан.',
  },
  ui: {
    nav: {
      brand: 'ХААН ТУНАМАЛ ХИЙЦ ХХК',
      home: 'Нүүр',
      products: 'Бүтээгдэхүүн',
      about: 'Бидний тухай',
      contact: 'Холбоо барих',
      call: 'Залгах',
    },
    chat: {
      label: 'Мессенжер',
    },
    footer: {
      linksTitle: 'Холбоосууд',
      contactTitle: 'Холбоо барих',
      facebook: 'Facebook хуудас',
    },
    home: {
      viewAll: 'Бүх бүтээгдэхүүн үзэх',
      viewAllShort: 'Бүгд',
    },
    products: {
      searchPlaceholder: 'Бараа хайх...',
      all: 'Бүгд',
      foundSuffix: 'бүтээгдэхүүн олдлоо',
      emptyAll: 'Одоогоор бараа бүртгэгдээгүй байна.',
    },
    product: {
      back: 'Бүтээгдэхүүн рүү буцах',
      sizes: 'Хэмжээ',
      ctaIntro: 'Захиалга өгөх, дэлгэрэнгүй мэдээлэл авахыг хүсвэл:',
      facebookCta: 'Facebook-ээр бичих',
      notFound: 'Бүтээгдэхүүн олдсонгүй',
      related: 'Төстэй бүтээгдэхүүн',
      detail: 'Дэлгэрэнгүй',
      noImage: 'Зураг байхгүй',
    },
    form: {
      title: 'Зурвас үлдээх',
      intro: 'Утсаар холбогдох боломжгүй бол доорх маягтыг бөглөнө үү. Бид эргэн холбогдоно.',
      nameLabel: 'Нэр *',
      namePlaceholder: 'Таны нэр',
      phoneLabel: 'Утас *',
      phonePlaceholder: '99112233',
      messageLabel: 'Зурвас *',
      messagePlaceholder: 'Ямар бүтээгдэхүүн сонирхож байна вэ?',
      submit: 'Илгээх',
      sending: 'Илгээж байна...',
      sent: 'Илгээгдлээ',
      thanks: 'Баярлалаа! Бид тантай удахгүй холбогдоно.',
      errPhone: 'Утасны дугаараа зөв оруулна уу.',
      errMessage: 'Зурвасаа бичнэ үү.',
      errGeneric: 'Илгээхэд алдаа гарлаа. Утсаар холбогдоно уу.',
    },
  },
}

// ===================== REGISTRY =====================
// Shared by the client composable and the /api/page-content/[key] handler, so
// both sides merge stored content over exactly the same defaults.

export type PageKey = 'home' | 'about' | 'contact' | 'products' | 'shared'

export type PageContentMap = {
  home: HomeContent
  about: AboutContent
  contact: ContactContent
  products: ProductsContent
  shared: SharedContent
}

export const pageContentDefaults: PageContentMap = {
  home: defaultHomeContent,
  about: defaultAboutContent,
  contact: defaultContactContent,
  products: defaultProductsContent,
  shared: defaultSharedContent,
}
