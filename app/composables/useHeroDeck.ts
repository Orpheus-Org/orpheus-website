import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Hero project-card rolodex — ports orpheus-mocks' `.deck` behavior:
 * 1. Sizes the stage so the active card sits fully below the wordmark (`acomodar`).
 * 2. Entrance: cards fan open from a stack (`st.abre` 0 → 1).
 * 3. Scroll-pinned rotation: scrubbing through the deck advances `st.p` 0 → n-1,
 *    each card's `--d`/`--ad` custom properties driving the 3D perspective transform
 *    defined in the component's scoped CSS (`.deck-card` in HeroPortada.vue).
 *
 * Mutates card styles directly via GSAP rather than Vue reactivity — this runs on
 * every scrub tick, and Vue's render cycle has no part to play in a 3D transform
 * driven by a single scroll-linked timeline.
 *
 * No-ops under `prefers-reduced-motion` (cards render in their static CSS order).
 */
export function useHeroDeck(deckRef: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!import.meta.client) return
    const deck = deckRef.value
    if (!deck) return

    const wordmark = deck.querySelector<HTMLElement>('.wordmark')
    const stage = deck.querySelector<HTMLElement>('.deck-stage')
    const cards = Array.from(deck.querySelectorAll<HTMLElement>('.deck-card'))
    const firstCard = cards[0]
    const cliente = deck.querySelector<HTMLElement>('.deck-cliente')
    const cuenta = deck.querySelector<HTMLElement>('.deck-cuenta b')
    if (!wordmark || !stage || !firstCard || !cliente || !cuenta) return

    function acomodar() {
      if (!wordmark || !stage || !firstCard) return
      if (window.matchMedia('(max-width: 860px)').matches) {
        deck!.style.removeProperty('--centro')
        deck!.style.height = ''
        return
      }
      const lh = wordmark.offsetHeight
      const ch = firstCard.offsetHeight
      const gap = 22
      const topbar = document.querySelector<HTMLElement>('.topbar')
      const vh = window.innerHeight - (topbar ? topbar.offsetHeight : 0)
      const h = Math.max(vh, lh + ch + gap * 2)
      deck!.style.height = `${h}px`
      deck!.style.setProperty('--centro', `${lh + gap + ch / 2}px`)
    }
    acomodar()
    window.addEventListener('resize', acomodar)
    document.fonts?.ready.then(acomodar)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      onUnmounted(() => window.removeEventListener('resize', acomodar))
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const n = cards.length
    const st = { p: 0, abre: 0 }
    let ultimo = -1

    function pintar() {
      cards.forEach((c, i) => {
        const d = (i - st.p) * st.abre
        const ad = Math.abs(d)
        c.style.setProperty('--d', d.toFixed(3))
        c.style.setProperty('--ad', ad.toFixed(3))
        c.style.zIndex = String(100 - Math.round(Math.abs(i - st.p) * 10))
      })
      const k = Math.round(st.p)
      if (k !== ultimo) {
        ultimo = k
        cliente!.textContent = cards[k]!.dataset.cliente ?? ''
        cuenta!.textContent = String(k + 1).padStart(2, '0')
      }
    }
    pintar()

    gsap.to(st, { abre: 1, duration: 1.3, ease: 'power3.out', delay: 0.15, onUpdate: pintar })

    const trigger = gsap.to(st, {
      p: n - 1,
      ease: 'none',
      onUpdate: pintar,
      scrollTrigger: {
        trigger: deck,
        start: () => {
          const topbar = document.querySelector<HTMLElement>('.topbar')
          return `top ${topbar ? topbar.offsetHeight : 0}px`
        },
        end: `+=${(n - 1) * 32}%`,
        pin: true,
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    })

    window.addEventListener('load', () => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    onUnmounted(() => {
      window.removeEventListener('resize', acomodar)
      trigger.scrollTrigger?.kill()
      trigger.kill()
    })
  })
}
