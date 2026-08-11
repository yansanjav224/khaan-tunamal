<template>
  <!-- Standalone on purpose: the error page must render even when the data
       layer is what failed, so it pulls in no composables and no layout. -->
  <div class="min-h-screen bg-background text-on-surface flex flex-col items-center justify-center px-6 text-center">
    <NuxtLink to="/" class="font-headline-md text-headline-md text-secondary tracking-tighter mb-16">
      ХААН ТУНАМАЛ ХИЙЦ
    </NuxtLink>

    <p class="font-display-lg text-[96px] md:text-[160px] leading-none text-secondary/20 select-none">
      {{ statusCode }}
    </p>

    <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg italic mt-[-1rem] mb-6">
      {{ heading }}
    </h1>

    <div class="w-16 h-px bg-secondary/50 mb-8"></div>

    <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-12">
      {{ description }}
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <button
        class="px-10 py-4 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-widest hover:brightness-110 transition-all"
        @click="handleError"
      >
        Нүүр хуудас
      </button>
      <NuxtLink
        to="/products"
        class="px-10 py-4 ghost-border font-label-md text-label-md uppercase tracking-widest text-on-surface hover:border-secondary hover:text-secondary transition-all"
        @click="clearError"
      >
        Бүтээгдэхүүн үзэх
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error?.statusCode || 500)

const heading = computed(() =>
  statusCode.value === 404 ? 'Хуудас олдсонгүй' : 'Алдаа гарлаа',
)

const description = computed(() =>
  statusCode.value === 404
    ? 'Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна. Доорх холбоосоор үргэлжлүүлнэ үү.'
    : 'Түр зуурын саатал гарлаа. Хэсэг хүлээгээд дахин оролдоно уу, эсвэл утсаар холбогдоно уу.',
)

useHead({
  title: computed(() => `${statusCode.value} — ${heading.value} | Хаан Тунамал Хийц`),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const handleError = () => clearError({ redirect: '/' })
</script>
