<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-100">Сайтын тохиргоо</h1>
      <button @click="save" :disabled="loading" class="btn-gold">
        {{ loading ? 'Хадгалж байна...' : 'Хадгалах' }}
      </button>
    </div>

    <div v-if="saveSuccess" class="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-400 text-sm">
      Амжилттай хадгаллаа!
    </div>

    <div class="space-y-8">
      <!-- Company info -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gold mb-4">Компани</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Компани нэр</label>
            <input v-model="form.companyName" type="text" class="input-dark w-full" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Слоган</label>
            <input v-model="form.companySlogan" type="text" class="input-dark w-full" />
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm text-gray-400 mb-1">Товч тайлбар (Footer)</label>
          <textarea v-model="form.companyDescription" rows="2" class="input-dark w-full"></textarea>
        </div>
      </div>

      <!-- Contact info -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gold mb-4">Холбоо барих</h2>

        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm text-gray-400">Утасны дугаарууд</label>
            <button @click="addPhone" class="text-sm text-gold hover:text-gold-light transition-colors">+ Нэмэх</button>
          </div>
          <div v-for="(phone, i) in form.phones" :key="i" class="flex gap-2 mb-2">
            <input v-model="phone.number" type="text" placeholder="99907191" class="input-dark flex-1" />
            <input v-model="phone.label" type="text" placeholder="Утас / Viber" class="input-dark flex-1" />
            <button v-if="form.phones.length > 1" @click="removePhone(i)" class="text-red-400 hover:text-red-300 px-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Facebook URL</label>
            <input v-model="form.facebookUrl" type="url" class="input-dark w-full" />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Хаяг</label>
            <input v-model="form.address" type="text" class="input-dark w-full" />
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-sm text-gray-400 mb-1">Хаягийн нэмэлт тайлбар</label>
          <input v-model="form.addressNote" type="text" class="input-dark w-full" />
        </div>
      </div>

      <!-- About page -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gold mb-4">Тухай хуудас</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-1">Үндсэн текст</label>
            <textarea v-model="form.aboutText" rows="3" class="input-dark w-full"></textarea>
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-1">Нэмэлт текст</label>
            <textarea v-model="form.aboutText2" rows="3" class="input-dark w-full"></textarea>
          </div>
        </div>

        <div class="mt-6">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm text-gray-400">Үнэт зүйлс (Values)</label>
            <button v-if="form.values.length < 6" @click="addValue" class="text-sm text-gold hover:text-gold-light transition-colors">+ Нэмэх</button>
          </div>
          <div v-for="(val, i) in form.values" :key="i" class="card p-4 mb-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-500">#{{ i + 1 }}</span>
              <button v-if="form.values.length > 1" @click="removeValue(i)" class="text-red-400 hover:text-red-300 text-sm">Устгах</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs text-gray-500 mb-1">Icon</label>
                <select v-model="val.icon" class="input-dark w-full">
                  <option value="shield">Shield (Чанар)</option>
                  <option value="heart">Heart (Уламжлал)</option>
                  <option value="bolt">Bolt (Шинэлэг)</option>
                  <option value="star">Star (Од)</option>
                  <option value="fire">Fire (Гал)</option>
                  <option value="globe">Globe (Дэлхий)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Гарчиг</label>
                <input v-model="val.title" type="text" class="input-dark w-full" />
              </div>
              <div>
                <label class="block text-xs text-gray-500 mb-1">Тайлбар</label>
                <input v-model="val.description" type="text" class="input-dark w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom save button -->
    <div class="mt-8 flex justify-end">
      <button @click="save" :disabled="loading" class="btn-gold">
        {{ loading ? 'Хадгалж байна...' : 'Хадгалах' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SiteSettings, SitePhone, SiteValue } from '~/composables/useMockData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { settings, loading, getSettings, updateSettings } = useSiteSettings()

await useAsyncData('site-settings', () => getSettings())

const form = reactive<SiteSettings>({
  companyName: '',
  companySlogan: '',
  companyDescription: '',
  phones: [],
  facebookUrl: '',
  address: '',
  addressNote: '',
  aboutText: '',
  aboutText2: '',
  values: [],
})

const saveSuccess = ref(false)

const loadForm = () => {
  const s = settings.value
  form.companyName = s.companyName
  form.companySlogan = s.companySlogan
  form.companyDescription = s.companyDescription
  form.phones = s.phones.map(p => ({ ...p }))
  form.facebookUrl = s.facebookUrl
  form.address = s.address
  form.addressNote = s.addressNote
  form.aboutText = s.aboutText
  form.aboutText2 = s.aboutText2
  form.values = s.values.map(v => ({ ...v }))
}

loadForm()

const addPhone = () => {
  form.phones.push({ number: '', label: '' })
}

const removePhone = (i: number) => {
  form.phones.splice(i, 1)
}

const addValue = () => {
  form.values.push({ icon: 'star', title: '', description: '' })
}

const removeValue = (i: number) => {
  form.values.splice(i, 1)
}

const save = async () => {
  try {
    await updateSettings({ ...form })
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  } catch (e) {
    alert('Хадгалахад алдаа гарлаа')
  }
}
</script>
