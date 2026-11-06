import gsap from 'gsap'

/**
 * Magnetic hover effect for pills/CTAs — ports orpheus-mocks' `[data-magnetic]` behavior.
 * Mouse-only (checks `(hover: hover) and (pointer: fine)`); no-ops on touch devices and
 * under `prefers-reduced-motion`.
 *
 * Takes refs rather than creating them so callers can use `useTemplateRef()` — a ref only
 * ever bound via a template's `ref="…"` string isn't visible to `noUnusedLocals`, so the
 * caller needs to hold (and thus "use") it directly.
 *
 * @param elRef - template ref to the magnetic element
 * @param innerRef - template ref to its inner content wrapper (moves at a dampened rate)
 * @param strength - displacement factor (mock default 0.35, hero CTAs use 0.3)
 */
export function useMagnetic(
  elRef: Readonly<Ref<HTMLElement | null>>,
  innerRef: Readonly<Ref<HTMLElement | null>>,
  strength = 0.35
) {
  onMounted(() => {
    if (!import.meta.client) return
    const el = elRef.value
    if (!el) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduceMotion) return

    const inner = innerRef.value
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.5, ease: 'power3.out' }) : null
    const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.5, ease: 'power3.out' }) : null

    let rest: { x: number; y: number } | null = null
    const centro = () => {
      const b = el.getBoundingClientRect()
      return {
        x: b.left + b.width / 2 - (gsap.getProperty(el, 'x') as number),
        y: b.top + b.height / 2 - (gsap.getProperty(el, 'y') as number),
      }
    }

    const onEnter = () => {
      rest = centro()
    }
    const onMove = (e: PointerEvent) => {
      if (!rest) rest = centro()
      const dx = e.clientX - rest.x
      const dy = e.clientY - rest.y
      xTo(dx * strength)
      yTo(dy * strength)
      if (inner) {
        ixTo?.(dx * strength * 0.4)
        iyTo?.(dy * strength * 0.4)
      }
    }
    const onLeave = () => {
      rest = null
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    onUnmounted(() => {
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    })
  })
}
