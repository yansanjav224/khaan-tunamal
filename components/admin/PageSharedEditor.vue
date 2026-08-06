<template>
  <div class="space-y-8">
    <!-- ContactCTA -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">ContactCTA (бүх хуудас дахь CTA)</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Шошго</label>
          <input v-model="form.contactCTA.label" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Гарчиг</label>
          <input v-model="form.contactCTA.title" class="input w-full" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-400 mb-1">Тайлбар</label>
          <textarea v-model="form.contactCTA.description" rows="2" class="input w-full"></textarea>
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утасны дугаар</label>
          <input v-model="form.contactCTA.phone" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Утас (харагдах)</label>
          <input v-model="form.contactCTA.phoneDisplay" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Товч текст</label>
          <input v-model="form.contactCTA.buttonText" class="input w-full" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-4">Footer</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Брэнд нэр</label>
          <input v-model="form.footer.brandName" class="input w-full" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Зохиогчийн эрх текст</label>
          <input v-model="form.footer.copyright" class="input w-full" />
        </div>
      </div>
    </div>

    <!-- Interface copy. Everything the site says that is not a heading or a
         product: menu items, buttons, form labels, empty states. -->
    <div v-for="group in UI_GROUPS" :key="group.key" class="card p-6">
      <h3 class="text-lg font-semibold text-gray-100 mb-1">{{ group.title }}</h3>
      <p class="text-gray-500 text-sm mb-4">{{ group.hint }}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="f in group.fields" :key="f.key" :class="f.wide ? 'md:col-span-2' : ''">
          <label class="block text-sm text-gray-400 mb-1">{{ f.label }}</label>
          <textarea
            v-if="f.wide"
            v-model="(form.ui as any)[group.key][f.key]"
            rows="2"
            class="input w-full"
          ></textarea>
          <input v-else v-model="(form.ui as any)[group.key][f.key]" class="input w-full" />
        </div>
      </div>
    </div>

    <button @click="$emit('save', form)" :disabled="saving" class="bg-gold text-black px-6 py-2 rounded-lg font-medium hover:bg-gold/90 disabled:opacity-50">
      {{ saving ? 'Хадгалж байна...' : 'Хадгалах' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SharedContent } from '~/composables/usePageContentDefaults'

const UI_GROUPS = [
  {
    key: 'nav', title: 'Цэс', hint: 'Дээд цэс болон footer-ийн холбоосын нэр. Хаяг нь өөрчлөгдөхгүй.',
    fields: [
      { key: 'home', label: 'Нүүр' },
      { key: 'products', label: 'Бүтээгдэхүүн' },
      { key: 'about', label: 'Бидний тухай' },
      { key: 'contact', label: 'Холбоо барих' },
      { key: 'call', label: 'Залгах товч (утсан дээр)' },
    ],
  },
  {
    key: 'footer', title: 'Footer гарчгууд', hint: 'Хөлийн баганын толгой бичвэрүүд.',
    fields: [
      { key: 'linksTitle', label: 'Холбоосуудын гарчиг' },
      { key: 'contactTitle', label: 'Холбоо барихын гарчиг' },
      { key: 'facebook', label: 'Facebook холбоосын текст' },
    ],
  },
  {
    key: 'home', title: 'Нүүр хуудасны товч', hint: 'Онцлох хэсгийн баруун дээд холбоос.',
    fields: [
      { key: 'viewAll', label: 'Бүгдийг үзэх (том дэлгэц)' },
      { key: 'viewAllShort', label: 'Бүгдийг үзэх (утас)' },
    ],
  },
  {
    key: 'products', title: 'Бүтээгдэхүүний жагсаалт', hint: 'Хайлт, шүүлтүүр, хоосон төлөв.',
    fields: [
      { key: 'searchPlaceholder', label: 'Хайлтын талбарын текст' },
      { key: 'all', label: '«Бүгд» шүүлтүүр' },
      { key: 'foundSuffix', label: 'Олдсон тоо (араас нь бичигдэх үг)' },
      { key: 'emptyAll', label: 'Бараа огт байхгүй үеийн текст', wide: true },
    ],
  },
  {
    key: 'product', title: 'Барааны дэлгэрэнгүй', hint: 'Нэг барааны хуудасны тогтмол бичвэрүүд.',
    fields: [
      { key: 'back', label: 'Буцах холбоос' },
      { key: 'sizes', label: '«Хэмжээ» гарчиг' },
      { key: 'detail', label: '«Дэлгэрэнгүй» (картан дээр)' },
      { key: 'noImage', label: 'Зураг байхгүй үеийн текст' },
      { key: 'related', label: 'Төстэй бүтээгдэхүүний гарчиг' },
      { key: 'notFound', label: 'Бараа олдоогүй үеийн текст' },
      { key: 'ctaIntro', label: 'Захиалгын товчны өмнөх текст', wide: true },
      { key: 'facebookCta', label: 'Facebook-ээр бичих товч' },
    ],
  },
  {
    key: 'form', title: 'Зурвасын маягт', hint: 'Холбоо барих хуудасны маягтын бүх бичвэр.',
    fields: [
      { key: 'title', label: 'Маягтын гарчиг' },
      { key: 'submit', label: 'Илгээх товч' },
      { key: 'intro', label: 'Тайлбар', wide: true },
      { key: 'nameLabel', label: 'Нэр — шошго' },
      { key: 'namePlaceholder', label: 'Нэр — жишээ текст' },
      { key: 'phoneLabel', label: 'Утас — шошго' },
      { key: 'phonePlaceholder', label: 'Утас — жишээ текст' },
      { key: 'messageLabel', label: 'Зурвас — шошго' },
      { key: 'messagePlaceholder', label: 'Зурвас — жишээ текст' },
      { key: 'sending', label: 'Илгээж байх үед' },
      { key: 'sent', label: 'Илгээгдсэн үед' },
      { key: 'thanks', label: 'Талархлын мессеж', wide: true },
      { key: 'errPhone', label: 'Алдаа — утас буруу' },
      { key: 'errMessage', label: 'Алдаа — зурвас хоосон' },
      { key: 'errGeneric', label: 'Алдаа — илгээж чадсангүй', wide: true },
    ],
  },
] as const

const props = defineProps<{
  modelValue: SharedContent
  saving: boolean
}>()

defineEmits<{
  save: [data: SharedContent]
}>()

const form = reactive(structuredClone(toRaw(props.modelValue)))

watch(() => props.modelValue, (val) => {
  Object.assign(form, structuredClone(toRaw(val)))
}, { deep: true })
</script>
