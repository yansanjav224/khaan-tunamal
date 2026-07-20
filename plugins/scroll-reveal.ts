export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      return {}
    },
    mounted(el: HTMLElement, binding) {
      const delay = binding.value?.delay || 0
      el.style.transitionDelay = `${delay}ms`

      // If the element is already on-screen at load (above the fold), reveal it
      // immediately WITHOUT first hiding it — avoids the visible→hidden→visible
      // flash the previous version produced on every page load. Below-the-fold
      // elements still start hidden and animate in when scrolled into view.
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      const alreadyInView = rect.top < vh * 0.9 && rect.bottom > 0
      if (alreadyInView) {
        el.classList.add('reveal-visible')
        return
      }

      el.classList.add('reveal-hidden')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('reveal-visible')
              el.classList.remove('reveal-hidden')
              observer.unobserve(el)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      )

      observer.observe(el)
    },
  })
})
