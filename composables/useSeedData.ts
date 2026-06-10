import type { Category, Product, SiteSettings } from './useMockData'

const C = 'https://res.cloudinary.com/dbortkwap/image/upload'

export const seedCategories: Category[] = [
  { id: 'zuukh-beleg', name: 'Бэлэг дурсгалын зуух', order: 1 },
  { id: 'zuukh-tom', name: 'Том зуух', order: 2 },
  { id: 'taviur', name: 'Хүжсийн тавиур', order: 3 },
  { id: 'avdar', name: 'Модон авдар', order: 4 },
  { id: 'mashin', name: 'Машины тавцан', order: 5 },
]

export const seedProducts: Omit<Product, 'id'>[] = [
  // ==================== БЭЛЭГ ДУРСГАЛЫН ЗУУХ ====================
  {
    name: 'Бэлэг дурсгалын зуух "Хаан Тунамал" 16 таш (алтлаг)',
    description: 'Монгол бичигтэй, алтлаг өнгийн 16 ташмал бэлэг дурсгалын зуух. Угалзан суурь, түлшний хайрцаг, зуухны хайч, яндан бүрэн иж бүрдэлтэй. Гэр бүлд бэлэг, оффисын чимэглэлд тохиромжтой. ХТХ брэнд.',
    price: 850000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074654/khaan-tunamal/products/ydowuaqm6pcxfvuzija1.jpg`,
      `${C}/v1781074656/khaan-tunamal/products/hh4vhb2cv9aapy6xnm2q.jpg`,
      `${C}/v1781074658/khaan-tunamal/products/bdlrddxqqihoqtaxysxh.jpg`,
      `${C}/v1781074674/khaan-tunamal/products/fzxuewxhald89bw310tg.jpg`,
    ],
    featured: true,
    sizes: '16см',
    order: 1,
  },
  {
    name: 'Бэлэг дурсгалын зуух "Хаан Тунамал" 16 таш (хар)',
    description: 'Монгол бичигтэй, хар өнгийн 16 ташмал бэлэг дурсгалын зуух. Хар матт өнгөөр будсан, минималист загвар. Суурь, түлшний хайрцаг, яндан иж бүрдэлтэй. Орчин үеийн интерьерт тохирсон загвар.',
    price: 750000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074715/khaan-tunamal/products/lijsbmc7vwy7yz2fq8fu.jpg`,
      `${C}/v1781074847/khaan-tunamal/products/yp9ntc6srohatsw14m2e.jpg`,
    ],
    featured: true,
    sizes: '16см',
    order: 2,
  },
  {
    name: 'Бэлэг дурсгалын зуух "Хаан Тунамал" 10 таш',
    description: 'Хамгийн жижиг хэмжээний 10 ташмал бэлэг дурсгалын зуух. Ширээний чимэглэл, бэлэг дурсгалд тохиромжтой. Монгол бичигтэй, иж бүрэн дагалдах хэрэгсэлтэй.',
    price: 450000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074838/khaan-tunamal/products/h42e8r6k6gifowfpbd8c.jpg`,
      `${C}/v1781074840/khaan-tunamal/products/dr4trevapyhirfrshqbg.jpg`,
    ],
    featured: false,
    sizes: '10см',
    order: 3,
  },
  {
    name: 'Бэлэг дурсгалын зуух "Хаан Тунамал" 24 таш',
    description: 'Хамгийн том хэмжээний 24 ташмал бэлэг дурсгалын зуух. Гал тогтон асах, бодит халаалт өгөх чадвартай. Монгол бичигтэй, угалзан суурьтай. Том гэр, зуслангийн байшинд тохиромжтой.',
    price: 1500000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074845/khaan-tunamal/products/zxymqvnkue3llaxzcaof.jpg`,
      `${C}/v1781074842/khaan-tunamal/products/arclg4xnqx7nrjo0svsa.jpg`,
      `${C}/v1781074662/khaan-tunamal/products/ssfuznko8nmb9jcrro1b.jpg`,
    ],
    featured: true,
    sizes: '24см',
    order: 4,
  },
  {
    name: 'Бэлэг дурсгалын зуух иж бүрдэл (тавиуртай)',
    description: 'Бэлэг дурсгалын зуух + өндөр хөлтэй тавиур иж бүрдэл. Монгол бичигтэй тавиур дээр зуух бүрэн иж бүрдэлтэй байрлана. Гэр, байшинд гоёмсог чимэглэл болно.',
    price: 1100000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074697/khaan-tunamal/products/twac3z5x7kxnni33nt9o.jpg`,
      `${C}/v1781074699/khaan-tunamal/products/oudlbdxg1l2zxy6pzbgy.jpg`,
    ],
    featured: true,
    sizes: '16см + тавиур',
    order: 5,
  },
  {
    name: 'Бэлэг дурсгалын зуух "Давхар" иж бүрдэл',
    description: 'Том ба жижиг зуух хоёулаа нэг суурин дээр байрласан давхар зуухны иж бүрдэл. Том зуух дээр тогоо тавьж болно. Монгол бичигтэй, ХТХ брэнд.',
    price: 1350000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074708/khaan-tunamal/products/wek1supvh4por3asw5qd.jpg`,
      `${C}/v1781074711/khaan-tunamal/products/ab4qi15rm4q6fyedtoe0.jpg`,
      `${C}/v1781074713/khaan-tunamal/products/wutmctybvoif5dfzchbz.jpg`,
    ],
    featured: false,
    order: 6,
  },
  {
    name: 'Бэлэг дурсгалын зуух (галтай)',
    description: 'Бэлэг дурсгалын зуух бодит гал асаасан байдлаар. Жижиг мод, нүүрсээр ажиллана. Халуухан уур амьсгал, гэрийн дулаан мэдрэмж төрүүлнэ.',
    price: 850000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074676/khaan-tunamal/products/clvb53bufjowldac8kcf.jpg`,
      `${C}/v1781074664/khaan-tunamal/products/m033innmcu6twamvwnhh.jpg`,
      `${C}/v1781074842/khaan-tunamal/products/arclg4xnqx7nrjo0svsa.jpg`,
    ],
    featured: false,
    order: 7,
  },
  {
    name: 'Бэлэг дурсгалын зуух (үйлдвэрийн бүтээл)',
    description: 'Бэлэг дурсгалын зуухнуудын үйлдвэрлэлийн явц. Олон төрлийн хэмжээ, загварын зуухнууд бэлэн болсон байдал.',
    price: 750000,
    category: 'zuukh-beleg',
    images: [
      `${C}/v1781074718/khaan-tunamal/products/v5epar9dfwq8ltuuefoz.jpg`,
    ],
    featured: false,
    order: 8,
  },

  // ==================== ТОМ ЗУУХ ====================
  {
    name: 'Том зуух "Өлзій" (алтлаг)',
    description: 'Том хэмжээний дугуй зуух. Өлзій угалзтай, алтлаг өнгөөр будсан. Гэр, байшинд зориулсан бодит халаалтын зуух. Монгол уламжлалт загвар, орчин үеийн чанар.',
    price: 2500000,
    category: 'zuukh-tom',
    images: [
      `${C}/v1781074849/khaan-tunamal/products/mfqo6cdzpqkysyqi4egb.jpg`,
      `${C}/v1781074858/khaan-tunamal/products/o7duvfqxwf2xaqmescn1.jpg`,
    ],
    featured: true,
    order: 9,
  },
  {
    name: 'Том зуух "Хаан" (алтлаг)',
    description: 'Том хэмжээний алтлаг угалзан зуух. Монгол хээ угалзтай суурьтай, түлшний хайрцагтай. Гэр, байшинд тохиромжтой бодит халаалтын зуух.',
    price: 2200000,
    category: 'zuukh-tom',
    images: [
      `${C}/v1781074910/khaan-tunamal/products/vczz7mh6ygsbumybkyxd.jpg`,
      `${C}/v1781074912/khaan-tunamal/products/n5m1rmoosr2dvwxwcgho.jpg`,
      `${C}/v1781074914/khaan-tunamal/products/enuy1sxjdtghc0ioeumb.jpg`,
    ],
    featured: false,
    order: 10,
  },
  {
    name: 'Том зуух "Монгол бичиг" (мөнгөлөг)',
    description: 'Мөнгөлөг өнгийн том зуух. Монгол бичиг, угалзан чимэглэлтэй. Бат бөх төмөр хийцтэй, дулаан тогтоолт сайтай.',
    price: 2800000,
    category: 'zuukh-tom',
    images: [
      `${C}/v1781074917/khaan-tunamal/products/yejojlakenjjv5bmklxr.jpg`,
    ],
    featured: false,
    order: 11,
  },
  {
    name: 'Халаалтын зуух (үйлдвэрийн)',
    description: 'Том хэмжээний үйлдвэрийн хэв маягийн халаалтын зуух. Нүүрс, модоор ажиллах. Том байшин, хашаа байшинд зориулсан. Бат бөх бүтэц, урт хугацаанд тэсвэртэй.',
    price: 1800000,
    category: 'zuukh-tom',
    images: [
      `${C}/v1781074853/khaan-tunamal/products/sucegyvn9na0dkvpo5r4.jpg`,
      `${C}/v1781074856/khaan-tunamal/products/pppvanmhyv36gqa0aqep.jpg`,
    ],
    featured: false,
    order: 12,
  },
  {
    name: 'Зуухны дугуй суурь (алтлаг)',
    description: 'Том зуухны дугуй суурь. Алтлаг өнгийн угалзан чимэглэлтэй, шургуулга татуургатай. Зуухыг тавих, хадгалахад зориулсан.',
    price: 350000,
    category: 'zuukh-tom',
    images: [
      `${C}/v1781074851/khaan-tunamal/products/l8jsvs0rjwdud0syjval.jpg`,
    ],
    featured: false,
    order: 13,
  },

  // ==================== ХҮЖСИЙН ТАВИУР ====================
  {
    name: 'Хүжсийн тавиур "Лотус"',
    description: 'Монгол угалзан чимэглэлтэй хүжсийн тавиур. LED лотус дэнлүүтэй, хүж, ганга тавихад зориулсан. Гоёмсог дизайн, гэр бүлийн шүтлэгийн булангийн чимэглэлд тохиромжтой.',
    price: 280000,
    category: 'taviur',
    images: [
      `${C}/v1781074667/khaan-tunamal/products/yuz4bmyrknrpl6tfvfhp.jpg`,
      `${C}/v1781074664/khaan-tunamal/products/m033innmcu6twamvwnhh.jpg`,
      `${C}/v1781074703/khaan-tunamal/products/bvzetk1atrzmnonzzrq1.jpg`,
      `${C}/v1781074706/khaan-tunamal/products/evtjrgwvw2p4u43rap5e.jpg`,
    ],
    featured: true,
    order: 14,
  },
  {
    name: 'Хүжсийн тавиур (тавиуртай иж бүрдэл)',
    description: 'Хүжсийн тавиур + өндөр хөлтэй тавиур иж бүрдэл. Монгол бичигтэй тавиур дээр хүжсийн тавиур байрлана. Шүтлэгийн булангийн чимэглэлд тохиромжтой.',
    price: 380000,
    category: 'taviur',
    images: [
      `${C}/v1781074701/khaan-tunamal/products/n7gyw3yspybojle0kwbw.jpg`,
    ],
    featured: false,
    order: 15,
  },

  // ==================== МОДОН АВДАР ====================
  {
    name: 'Модон авдар "Лүү"',
    description: 'Монгол уламжлалт лүү, амьтны сийлбэртэй модон авдар. Гар урлалаар хийсэн, нарийн сийлбэр хийцтэй. Хувцас, эд зүйлс хадгалах, гэрийн тавилга болно.',
    price: 580000,
    category: 'avdar',
    images: [
      `${C}/v1781074672/khaan-tunamal/products/ov8nobhzbc9mt7rbmvgc.jpg`,
      `${C}/v1781074669/khaan-tunamal/products/vik37uw6iy8o4hh1ere5.jpg`,
    ],
    featured: false,
    order: 16,
  },

  // ==================== МАШИНЫ ТАВЦАН ====================
  {
    name: 'Машины тавцан Toyota (хар)',
    description: 'Toyota машинд зориулсан хар өнгийн дээврийн тавцан. TOYOTA бичигтэй, бат бөх төмөр хийцтэй. Аялал, ачаа тээвэрлэхэд тохиромжтой. Суурилуулахад хялбар.',
    price: 650000,
    category: 'mashin',
    images: [
      `${C}/v1781074919/khaan-tunamal/products/e2nsjd0a1l7zhgsoj9um.jpg`,
      `${C}/v1781074921/khaan-tunamal/products/db4py9rettoevvamlkum.jpg`,
    ],
    featured: false,
    order: 17,
  },
  {
    name: 'Машины тавцан Toyota (шар)',
    description: 'Toyota машинд зориулсан шар өнгийн дээврийн тавцан. TOYOTA бичигтэй, тод өнгийн будагтай. Аялал, кемпингд тохиромжтой.',
    price: 650000,
    category: 'mashin',
    images: [
      `${C}/v1781074924/khaan-tunamal/products/snwp0cpzvpvjstjeywj1.jpg`,
      `${C}/v1781074926/khaan-tunamal/products/aprf6rci0kw2xnk6hpei.jpg`,
    ],
    featured: false,
    order: 18,
  },
]

export const seedSiteSettings: SiteSettings = {
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
