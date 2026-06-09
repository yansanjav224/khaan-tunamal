<template>
  <div class="min-h-screen bg-dark-bg">
    <!-- Admin Top Nav -->
    <nav class="bg-dark-surface border-b border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-6">
            <NuxtLink to="/admin" class="text-gold font-bold text-lg">ХТХ Админ</NuxtLink>
            <div class="hidden sm:flex items-center gap-4">
              <NuxtLink
                to="/admin"
                class="text-sm text-gray-400 hover:text-gold transition-colors"
                active-class="!text-gold"
                :class="{ '!text-gold': $route.path === '/admin' }"
              >
                Хянах самбар
              </NuxtLink>
              <NuxtLink
                to="/admin/products"
                class="text-sm text-gray-400 hover:text-gold transition-colors"
                active-class="!text-gold"
              >
                Бараа
              </NuxtLink>
              <NuxtLink
                to="/admin/categories"
                class="text-sm text-gray-400 hover:text-gold transition-colors"
                active-class="!text-gold"
              >
                Ангилал
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              Сайт харах →
            </NuxtLink>
            <button @click="handleLogout" class="text-sm text-red-400 hover:text-red-300 transition-colors">
              Гарах
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile nav -->
    <div class="sm:hidden bg-dark-surface border-b border-dark-border px-4 py-2 flex gap-4">
      <NuxtLink to="/admin" class="text-sm text-gray-400 hover:text-gold" active-class="!text-gold">Хянах</NuxtLink>
      <NuxtLink to="/admin/products" class="text-sm text-gray-400 hover:text-gold" active-class="!text-gold">Бараа</NuxtLink>
      <NuxtLink to="/admin/categories" class="text-sm text-gray-400 hover:text-gold" active-class="!text-gold">Ангилал</NuxtLink>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>
