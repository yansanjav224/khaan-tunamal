<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-100">
        Зурвасууд
        <span v-if="unreadCount" class="ml-2 text-sm align-middle bg-gold/20 text-gold px-2 py-1 rounded">{{ unreadCount }} шинэ</span>
      </h1>
      <button class="btn-outline text-sm" :disabled="loading" @click="reload">
        {{ loading ? 'Ачаалж байна...' : 'Шинэчлэх' }}
      </button>
    </div>

    <p v-if="error" class="text-red-400 text-sm mb-4">{{ error }}</p>

    <div v-if="!loading && !messages.length" class="card p-8 text-center text-gray-500">
      Одоогоор зурвас ирээгүй байна.
    </div>

    <div v-else class="space-y-4">
      <article
        v-for="m in messages"
        :key="m.id"
        class="card p-5"
        :class="m.read ? 'opacity-60' : 'border border-gold/30'"
      >
        <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <span class="text-gray-100 font-semibold">{{ m.name }}</span>
            <a :href="`tel:${m.phone}`" class="ml-3 text-gold hover:underline">{{ m.phone }}</a>
          </div>
          <span class="text-gray-500 text-xs">{{ formatDate(m.createdAt) }}</span>
        </div>

        <p class="text-gray-300 text-sm whitespace-pre-line mb-4">{{ m.message }}</p>

        <div class="flex gap-4 text-sm">
          <button v-if="!m.read" class="text-gray-400 hover:text-gold transition-colors" @click="markRead(m)">
            Уншсан болгох
          </button>
          <a :href="`tel:${m.phone}`" class="text-gray-400 hover:text-gold transition-colors">Залгах</a>
          <button class="text-gray-400 hover:text-red-400 transition-colors" @click="remove(m)">Устгах</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactMessage } from '~/composables/useMockData'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { requireDb } = useFirebase()

const messages = ref<ContactMessage[]>([])
const loading = ref(false)
const error = ref('')

const unreadCount = computed(() => messages.value.filter(m => !m.read).length)

const reload = async () => {
  loading.value = true
  error.value = ''
  try {
    const db = await requireDb()
    const { collection, getDocs, query, orderBy, limit } = await import('firebase/firestore')
    const snap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(200)))
    messages.value = snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage))
  } catch (e: any) {
    error.value = e?.message || 'Зурвас уншихад алдаа гарлаа'
  } finally {
    loading.value = false
  }
}

const markRead = async (m: ContactMessage) => {
  try {
    const db = await requireDb()
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db, 'messages', m.id!), { read: true })
    m.read = true
  } catch (e: any) {
    alert(e?.message || 'Алдаа гарлаа')
  }
}

const remove = async (m: ContactMessage) => {
  if (!confirm(`"${m.name}"-ийн зурвасыг устгах уу?`)) return
  try {
    const db = await requireDb()
    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db, 'messages', m.id!))
    messages.value = messages.value.filter(x => x.id !== m.id)
  } catch (e: any) {
    alert(e?.message || 'Алдаа гарлаа')
  }
}

const formatDate = (iso: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString('mn-MN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

onMounted(reload)
</script>
