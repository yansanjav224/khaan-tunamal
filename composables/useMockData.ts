/**
 * Shared domain types + the fallback site settings.
 *
 * `defaultSiteSettings` is the merge base for whatever is stored in Firestore
 * `settings/site`, so a partial or missing document can never leave the footer
 * / contact page reading `undefined.map(...)`.
 */

export interface SitePhone {
  number: string
  label: string
}

export interface SiteValue {
  icon: string
  title: string
  description: string
}

export interface SiteSettings {
  companyName: string
  companySlogan: string
  companyDescription: string
  phones: SitePhone[]
  facebookUrl: string
  address: string
  addressNote: string
  aboutText: string
  aboutText2: string
  values: SiteValue[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  featured: boolean
  sizes?: string
  order: number
}

export interface Category {
  id: string
  name: string
  order: number
  image?: string
}

export interface ContactMessage {
  id?: string
  name: string
  phone: string
  message: string
  createdAt: string
  read?: boolean
}

export const defaultSiteSettings: SiteSettings = {
  companyName: 'Хаан Тунамал Хийц',
  companySlogan: 'Монгол төмөр эдлэл',
  companyDescription: 'Монгол үндэсний хэв маягтай төмөр зуух, хүжсийн тавиур, модон авдар болон бусад эдлэл үйлдвэрлэгч.',
  phones: [
    { number: '99907191', label: 'Утас / Viber / WhatsApp' },
    { number: '99732244', label: 'Утас' },
  ],
  facebookUrl: 'https://www.facebook.com/profile.php?id=100095197205568',
  address: 'Улаанбаатар хот',
  addressNote: 'Дэлгэрэнгүй хаягийг утсаар лавлана уу',
  aboutText: 'Хаан Тунамал Хийц нь Монгол үндэсний хэв маягтай төмөр эдлэл үйлдвэрлэгч юм. Бид монгол уламжлалт угалз хээ, дизайныг орчин үеийн технологитой хослуулан бат бөх, гоёмсог бүтээгдэхүүн бүтээдэг.',
  aboutText2: 'Манай гол бүтээгдэхүүнд бэлэг дурсгалын төмөр зуух, хүжсийн тавиур, модон авдар, машины тавцан зэрэг олон төрлийн эдлэлүүд багтах бөгөөд тус бүр нь монгол соёлын онцлогийг тусгасан өвөрмөц загвартай.',
  values: [
    { icon: 'shield', title: 'Чанар', description: 'Бат бөх материал, нарийн нягт ажиллагаагаар чанартай бүтээгдэхүүн үйлдвэрлэнэ.' },
    { icon: 'heart', title: 'Уламжлал', description: 'Монгол үндэсний угалз хээ, соёлын уламжлалыг дизайндаа тусган хадгалж байна.' },
    { icon: 'bolt', title: 'Шинэлэг', description: 'Орчин үеийн технологи, дизайныг уламжлалтай хослуулан шинэлэг бүтээгдэхүүн гаргана.' },
  ],
}
