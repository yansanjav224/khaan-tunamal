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

export interface SharedContent {
  contactCTA: SharedContactCTA
  footer: SharedFooter
}

// ===================== DEFAULTS =====================

export const defaultHomeContent: HomeContent = {
  hero: {
    label: 'Өв уламжлалт урлал',
    title: 'Хаан Тунамал',
    titleLine2: 'Хийц',
    description: 'Монгол үндэсний хэв маягтай төмөр зуух, хүжсийн тавиур, зуухны багаж болон бусад эдлэлийг гар урлалаар бүтээнэ.',
    image: '/images/design/design-5.jpg',
    buttonProducts: 'Бүтээгдэхүүн үзэх',
    buttonContact: 'Холбоо барих',
  },
  stats: [
    { value: '10+', label: 'Жилийн туршлага' },
  ],
  heritage: {
    label: 'Тунамалын мөн чанар',
    title: 'Монгол үндэсний урлал',
    description: '"Хаан Тунамал Хийц" нь Монгол үндэсний өв соёл, уламжлалыг орчин үеийн урлалтай хослуулан, төмөр болон модон эдлэлийг хамгийн өндөр түвшинд урлан гаргаж байна. Бидний эдлэл бүр дахин давтагдашгүй түүх, өв уламжлалыг өөртөө агуулдаг.',
    image: '/images/craftsman-tools.png',
    experienceNumber: '10',
    experienceLabel: 'Жилийн туршлага',
    features: ['100% Гар урлал', 'Дээд зэргийн чанартай материал'],
  },
  featuredLabel: 'Шилдэг бүтээлүүд',
  featuredTitle: 'Онцлох бүтээгдэхүүн',
  categoriesLabel: 'Цуглуулгууд',
  categoriesTitle: 'Ангилалууд',
}

export const defaultAboutContent: AboutContent = {
  hero: {
    label: 'Талын өв уламжлал',
    title: 'Бидний тухай',
    description: 'Монгол үндэсний хэв маягтай төмөр эдлэл, гар урлалын шилдэг өв уламжлалыг орчин үеийн хэрэглээнд зохицуулан урлаж байна.',
    image: '/images/design/design-14.jpg',
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
    image: '/images/design/design-7.jpg',
  },
  craftSectionTitle: 'Гар урлалын уламжлал',
  crafts: [
    {
      title: 'Материал Сонголт',
      description: 'Хамгийн сайн чанарын ган болон цэвэр гуулийг сонгон авч, эдэлгээ даах бат бөх байдлыг эрхэмлэдэг.',
      image: '/images/design/design-10.jpg',
    },
    {
      title: 'Гар сийлбэр',
      description: 'Бүтээл бүрт монгол хээ угалзыг гараар сийлж, дахин давтагдашгүй урлагийн бүтээл болгон амилуулна.',
      image: '/images/design/design-4.jpg',
    },
    {
      title: 'Эцсийн өнгөлгөө',
      description: 'Уламжлалт аргаар өнгөлж, металлын байгалийн өнгийг тодотгон тансаг зэрэглэлийн харагдах байдлыг бүрдүүлдэг.',
      image: '/images/design/design-12.jpg',
    },
  ],
  valuesSectionTitle: 'Бидний үнэт зүйлс',
  values: [
    { title: 'Чанар', description: 'Цаг хугацааны шалгуур даах чанарыг бид хамгийн түрүүнд тавьдаг.' },
    { title: 'Өв уламжлал', description: 'Монгол дархны ухааныг хадгалж, ирээдүй хойчдоо өвлүүлэн үлдээх эрхэм зорилготой.' },
    { title: 'Үнэнч байдал', description: 'Хэрэглэгчийн хүсэл сонирхолд нийцсэн, сэтгэлд хүрсэн бүтээлийг нийлүүлнэ.' },
  ],
  valuesImage: '/images/design/design-9.jpg',
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
    label: 'Бидэнтэй холбогдох',
    titleLine1: 'Өв соёл, урлахуйн ухааныг',
    titleHighlight: 'алтан хэлхээгээр',
    image: '/images/design/design-16.jpg',
  },
  cards: {
    locationTitle: 'Showroom',
    phoneTitle: 'Утас',
    emailTitle: 'Цахим шуудан',
    email: 'contact@khaantunamal.mn',
    businessHours: 'Даваа - Бямба: 10:00 - 19:00',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
  },
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87058.24407968498!2d106.83513895!3d47.91868055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9692432795fad3%3A0x63177b0e4c3f21c1!2sUlaanbaatar%2C%20Mongolia!5e0!3m2!1sen!2s!4v1718000000000!5m2!1sen!2s',
  mapLabel: 'Улаанбаатар',
}

export const defaultProductsContent: ProductsContent = {
  hero: {
    label: 'Уламжлалт Урлал',
    title: 'Эрхэмсэг Өв',
    description: 'Монгол дархны ур ухаан, галын соёлыг шингээсэн гар урлалын дээжис. Төмөрлөг эдлэлийн төгс зохицол, мөнхөд орших өв соёл.',
  },
  emptyStateText: 'Хайлтад тохирох бараа олдсонгүй',
  emptyStateButton: 'Шүүлтүүр арилгах',
}

export const defaultSharedContent: SharedContent = {
  contactCTA: {
    label: 'Лавлагаа',
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
}
