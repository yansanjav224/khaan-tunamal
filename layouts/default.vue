<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <!-- Outside <main> so it stays put while the page scrolls, and so screen
         readers reach it as a site-wide action rather than page content. -->
    <ChatFab />
  </div>
</template>
