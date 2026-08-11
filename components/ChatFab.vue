<template>
  <!-- A link, not Meta's Customer Chat Plugin: that widget was discontinued,
       and it cost ~200 kB of third-party JavaScript and a set of tracking
       cookies for something a href does natively. On a phone this opens the
       Messenger app directly; on a desktop, messenger.com. -->
  <a
    v-if="settings.messengerUrl"
    :href="settings.messengerUrl"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${ui.chat.label} — ${settings.companyName}`"
    class="chat-fab group fixed z-40 right-4 md:right-6 flex items-center gap-2.5 pl-3.5 pr-4 py-3
           bg-surface-container-low/95 backdrop-blur-sm border border-secondary/35
           text-on-surface text-[14px] tracking-wide
           hover:border-secondary hover:bg-surface-container-high transition-colors"
  >
    <!-- The Messenger mark rather than a generic speech bubble: older visitors
         recognise the logo instantly, and a label alone would not say which
         app is about to open. -->
    <svg class="w-[22px] h-[22px] shrink-0 fill-secondary" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
    </svg>
    <span class="whitespace-nowrap">{{ ui.chat.label }}</span>
  </a>
</template>

<script setup lang="ts">
const { settings } = useSiteSettings()
const { content: shared } = useSharedContent()
const ui = computed(() => shared.value.ui)
</script>

<style scoped>
/* env() keeps the button clear of the iPhone home indicator, which otherwise
   sits right on top of it. */
.chat-fab {
  bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
}

@media (min-width: 768px) {
  .chat-fab {
    bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  }
}
</style>
