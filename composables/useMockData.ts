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

export const mockSiteSettings: SiteSettings = {
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
}

export const mockCategories: Category[] = [
  { id: 'zuukh-beleg', name: 'Бэлэг дурсгалын зуух', order: 1 },
  { id: 'zuukh-tom', name: 'Том зуух', order: 2 },
  { id: 'taviur', name: 'Хүжсийн тавиур', order: 3 },
  { id: 'avdar', name: 'Модон авдар', order: 4 },
  { id: 'mashin', name: 'Машины тавцан', order: 5 },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Бэлэг дурсгалын зуух "Хаан Тунамал" 16 таш (алтлаг)',
    description: 'Монгол бичигтэй, алтлаг өнгийн 16 ташмал бэлэг дурсгалын зуух.',
    price: 850000,
    category: 'zuukh-beleg',
    images: [],
    featured: true,
    sizes: '16см',
    order: 1,
  },
]
