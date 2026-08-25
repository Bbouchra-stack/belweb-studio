/**
 * Directive v-reveal : fait apparaître un élément lorsqu'il entre dans le
 * champ de vision.
 *
 * Usage :
 *   <div v-reveal>…</div>            fondu + glissement vers le haut (défaut)
 *   <div v-reveal="120">…</div>      même chose, retardée de 120 ms (cascade)
 *   <div v-reveal:fade>…</div>       fondu seul, sans mouvement
 *   <div v-reveal:scale="80">…</div> fondu + léger zoom avant, retardé de 80 ms
 *   <div v-reveal:gauche>…</div>     fondu + glissement depuis la gauche
 *   <div v-reveal:droite>…</div>     fondu + glissement depuis la droite
 *
 * L'animation est neutralisée si la personne a demandé à son système de
 * réduire les animations (prefers-reduced-motion).
 */

const animationsReduites =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const VARIANTES = new Set(['fade', 'scale', 'gauche', 'droite'])

let observateur = null

function obtenirObservateur() {
  if (observateur) return observateur

  observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (!entree.isIntersecting) return
        entree.target.classList.add('reveal--visible')
        observateur.unobserve(entree.target)
      })
    },
    // Marge généreuse : un défilement rapide (molette, flick tactile) ne
    // doit jamais faire « sauter » un élément sans qu'il soit révélé.
    { threshold: 0.01, rootMargin: '0px 0px 0px 0px' },
  )

  return observateur
}

export default {
  mounted(element, liaison) {
    const variante = VARIANTES.has(liaison.arg) ? liaison.arg : null
    const classes = variante ? ['reveal', `reveal--${variante}`] : ['reveal']

    if (animationsReduites || typeof IntersectionObserver === 'undefined') {
      element.classList.add(...classes, 'reveal--visible')
      return
    }

    const delai = Number(liaison.value) || 0
    if (delai) element.style.setProperty('--delai', `${delai}ms`)

    element.classList.add(...classes)
    obtenirObservateur().observe(element)
  },

  unmounted(element) {
    observateur?.unobserve(element)
  },
}
