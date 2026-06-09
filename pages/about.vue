<template>
  <div class="py-12 md:py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="section-title">
        <span class="gold-gradient-text">Бидний тухай</span>
      </h1>
      <p class="section-subtitle">Хаан Тунамал Хийц</p>

      <div class="space-y-12">
        <!-- About text -->
        <div class="card p-8 md:p-12">
          <p class="text-gray-300 leading-relaxed text-lg mb-6">
            <span class="text-gold font-semibold">Хаан Тунамал Хийц</span> нь Монгол үндэсний хэв маягтай
            төмөр эдлэл үйлдвэрлэгч юм. Бид монгол уламжлалт угалз хээ, дизайныг орчин үеийн
            технологитой хослуулан бат бөх, гоёмсог бүтээгдэхүүн бүтээдэг.
          </p>
          <p class="text-gray-300 leading-relaxed text-lg">
            Манай гол бүтээгдэхүүнд төмөр зуух, хүжсийн тавиур, зуухны багаж, модон авдар зэрэг
            олон төрлийн эдлэлүүд багтах бөгөөд тус бүр нь монгол соёлын онцлогийг тусгасан
            өвөрмөц загвартай.
          </p>
        </div>

        <!-- Values -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card p-6 text-center">
            <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-gold font-semibold text-lg mb-2">Чанар</h3>
            <p class="text-gray-400 text-sm">Бат бөх материал, нарийн нягт ажиллагаагаар чанартай бүтээгдэхүүн үйлдвэрлэнэ.</p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-gold font-semibold text-lg mb-2">Уламжлал</h3>
            <p class="text-gray-400 text-sm">Монгол үндэсний угалз хээ, соёлын уламжлалыг дизайндаа тусган хадгалж байна.</p>
          </div>

          <div class="card p-6 text-center">
            <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-gold font-semibold text-lg mb-2">Шинэлэг</h3>
            <p class="text-gray-400 text-sm">Орчин үеийн технологи, дизайныг уламжлалтай хослуулан шинэлэг бүтээгдэхүүн гаргана.</p>
          </div>
        </div>
      </div>
    </div>

    <ContactCTA />
  </div>
</template>
