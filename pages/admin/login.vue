<template>
  <div class="min-h-screen bg-dark-bg flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
          <span class="text-gold font-bold text-xl">ХТХ</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-100">Админ нэвтрэх</h1>
        <p class="text-gray-500 text-sm mt-1">Хаан Тунамал Хийц</p>
      </div>

      <!-- Firebase not configured warning -->
      <div v-if="!isConfigured" class="card p-4 mb-6 border-yellow-600/50">
        <p class="text-yellow-500 text-sm">
          Firebase тохируулаагүй байна. .env файлд Firebase config нэмнэ үү.
          Одоогоор mock data ашиглан ажиллаж байна.
        </p>
        <NuxtLink to="/admin" class="btn-gold w-full mt-4 block text-center text-sm">
          Админ руу орох (dev mode)
        </NuxtLink>
      </div>

      <!-- Login form -->
      <form v-else @submit.prevent="handleLogin" class="card p-6 md:p-8">
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-400 mb-2">Имэйл</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="admin@example.com"
              class="input-dark w-full"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-400 mb-2">Нууц үг</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="input-dark w-full"
            />
          </div>

          <div v-if="error" class="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loginLoading"
            class="btn-gold w-full disabled:opacity-50"
          >
            {{ loginLoading ? 'Нэвтэрч байна...' : 'Нэвтрэх' }}
          </button>
        </div>
      </form>

      <div class="text-center mt-6">
        <NuxtLink to="/" class="text-gray-500 hover:text-gold transition-colors text-sm">
          ← Нүүр хуудас руу буцах
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, loading: loginLoading, error, isAuthenticated, isConfigured } = useAuth()
const email = ref('')
const password = ref('')

// Redirect once auth resolves — covers both the already-logged-in case and the
// async session restore (the old one-shot check ran while user was still null).
watch(isAuthenticated, (v) => { if (v) navigateTo('/admin') }, { immediate: true })

const handleLogin = async () => {
  const success = await login(email.value, password.value)
  if (success) {
    navigateTo('/admin')
  }
}
</script>
