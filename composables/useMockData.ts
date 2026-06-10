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
  companyDescription: 'Монгол үндэсний хэв маягтай төмөр зуух, хүжсийн тавиур, зуухны багаж болон бусад эдлэл үйлдвэрлэгч.',
  phones: [
    { number: '99907191', label: 'Утас / Viber / WhatsApp' },
    { number: '99732244', label: 'Утас' },
  ],
  facebookUrl: 'https://facebook.com',
  address: 'Улаанбаатар хот',
  addressNote: 'Дэлгэрэнгүй хаягийг утсаар лавлана уу',
  aboutText: 'Хаан Тунамал Хийц нь Монгол үндэсний хэв маягтай төмөр эдлэл үйлдвэрлэгч юм. Бид монгол уламжлалт угалз хээ, дизайныг орчин үеийн технологитой хослуулан бат бөх, гоёмсог бүтээгдэхүүн бүтээдэг.',
  aboutText2: 'Манай гол бүтээгдэхүүнд төмөр зуух, хүжсийн тавиур, зуухны багаж, модон авдар зэрэг олон төрлийн эдлэлүүд багтах бөгөөд тус бүр нь монгол соёлын онцлогийг тусгасан өвөрмөц загвартай.',
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
  { id: 'zuukh', name: 'Төмөр зуух', order: 1 },
  { id: 'taviur', name: 'Хүжсийн тавиур', order: 2 },
  { id: 'bagaj', name: 'Зуухны багаж', order: 3 },
  { id: 'avdar', name: 'Модон авдар', order: 4 },
  { id: 'mashin', name: 'Машины хэрэгсэл', order: 5 },
  { id: 'beleg', name: 'Бэлэг дурсгал', order: 6 },
]

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Төмөр зуух "Хаан" 10 таш',
    description: 'Монгол хээтэй 10 ташмал төмөр зуух. Гэр болон байшинд тохирох, удаан халаалттай, бат бөх бүтэцтэй. Хаан тунамал хийцийн шилдэг загвар.',
    price: 850000,
    category: 'zuukh',
    images: ['/images/products/zuukh-2.jpg', '/images/products/zuukh-1.jpg', '/images/products/zuukh-4.jpg'],
    featured: true,
    sizes: '16см, 10см',
    order: 1,
  },
  {
    id: '2',
    name: 'Төмөр зуух "Тунамал" 8 таш',
    description: 'Монгол угалзан чимэглэлтэй 8 ташмал төмөр зуух. Жижиг гэр, зуслангийн байшинд тохиромжтой.',
    price: 650000,
    category: 'zuukh',
    images: ['/images/products/zuukh-3.jpg', '/images/products/zuukh-5.jpg'],
    featured: true,
    sizes: '14см, 8см',
    order: 2,
  },
  {
    id: '3',
    name: 'Хүжсийн тавиур "Алтан"',
    description: 'Хар ба алтан өнгийн суурьтай хүжсийн тавиур. Монгол уламжлалт хээтэй, гоёмсог дизайн.',
    price: 280000,
    category: 'taviur',
    images: ['/images/products/taviur-1.jpg', '/images/products/taviur-2.jpg'],
    featured: true,
    order: 3,
  },
  {
    id: '8',
    name: 'Төмөр зуух "Өргөө" 12 таш',
    description: 'Том хэмжээний 12 ташмал төмөр зуух. Том гэр, байшинд зориулсан. Угалзан чимэглэлтэй.',
    price: 1200000,
    category: 'zuukh',
    images: ['/images/products/zuukh-tom-1.jpg', '/images/products/zuukh-tom-2.jpg'],
    featured: true,
    sizes: '20см, 14см',
    order: 8,
  },
  {
    id: '4',
    name: 'Зуухны багаж иж бүрдэл',
    description: 'Төмөр зуухны бүрэн багаж: хавчаар, хүрэх, сэвгэр, нүүргийн хүрэх. Монгол хээтэй бариултай.',
    price: 180000,
    category: 'bagaj',
    images: ['/images/products/zuukh-1.jpg'],
    featured: false,
    order: 4,
  },
  {
    id: '5',
    name: 'Модон авдар "Үндэсний"',
    description: 'Монгол уламжлалт хээтэй модон авдар. Гар урлалаар хийсэн, төмөр бэхэлгээтэй.',
    price: 450000,
    category: 'avdar',
    images: ['/images/products/taviur-1.jpg'],
    featured: false,
    order: 5,
  },
  {
    id: '6',
    name: 'Хүжсийн тавиур "Мөнгөн"',
    description: 'Мөнгөлөг өнгийн суурьтай хүжсийн тавиур. Орчин үеийн дизайн, монгол угалзтай.',
    price: 320000,
    category: 'taviur',
    images: ['/images/products/taviur-2.jpg'],
    featured: false,
    order: 6,
  },
  {
    id: '7',
    name: 'Бэлэг дурсгал "Галын аяга"',
    description: 'Төмөр зуухны загварын жижиг бэлэг дурсгал. Ширээний чимэглэлд тохиромжтой.',
    price: 95000,
    category: 'beleg',
    images: ['/images/products/zuukh-3.jpg'],
    featured: false,
    order: 7,
  },
  {
    id: '9',
    name: 'Төмөр зуух "Дөрвөлжин" 6 таш',
    description: 'Жижиг зуслангийн зуух. 6 ташмал, зөөвөрлөхөд хялбар, бат бөх.',
    price: 480000,
    category: 'zuukh',
    images: ['/images/products/zuukh-5.jpg'],
    featured: false,
    sizes: '12см, 6см',
    order: 9,
  },
  {
    id: '10',
    name: 'Зуухны хүрэх "Угалзат"',
    description: 'Монгол угалзан чимэглэлтэй зуухны хүрэх. Урт бариултай, аюулгүй.',
    price: 65000,
    category: 'bagaj',
    images: ['/images/products/zuukh-4.jpg'],
    featured: false,
    order: 10,
  },
  {
    id: '11',
    name: 'Машины гал тогоо',
    description: 'Автомашинд зориулсан жижиг зөөврийн зуух. Аялалд тохиромжтой.',
    price: 350000,
    category: 'mashin',
    images: ['/images/products/zuukh-tom-1.jpg'],
    featured: false,
    order: 11,
  },
  {
    id: '12',
    name: 'Модон авдар "Хаан"',
    description: 'Том хэмжээний модон авдар. Хаан угалзтай, төмөр оосортой, гэрийн тавилгад тохирно.',
    price: 580000,
    category: 'avdar',
    images: ['/images/products/taviur-2.jpg'],
    featured: false,
    order: 12,
  },
]
