<script setup>
/**
 * Marque BELWEB — hexagone et point central, dégradé violet → magenta →
 * corail → orange (identique à --bw-gradient, même angle ~horizontal) pour
 * rester cohérente avec la direction sombre premium. Hexagone régulier
 * calculé trigonométriquement (six sommets à rayon constant, écartés de 60°)
 * pour une géométrie exacte, avec jonctions arrondies pour rester net à
 * très petite taille (favicon, en-tête).
 */
defineProps({
  taille: { type: Number, default: 40 },
})
</script>

<template>
  <span class="marque" :style="{ width: `${taille}px`, height: `${taille}px` }" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="presentation">
      <defs>
        <linearGradient :id="`hex-${taille}`" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="42%" stop-color="#c84edc" />
          <stop offset="74%" stop-color="#ff5b6e" />
          <stop offset="100%" stop-color="#ff7a45" />
        </linearGradient>
        <radialGradient :id="`noyau-${taille}`" cx="35%" cy="35%" r="75%">
          <stop offset="0%" stop-color="#c84edc" />
          <stop offset="100%" stop-color="#8b5cf6" />
        </radialGradient>
      </defs>
      <path
        d="M24 6.4 L39.24 15.2 L39.24 32.8 L24 41.6 L8.76 32.8 L8.76 15.2 Z"
        fill="none"
        :stroke="`url(#hex-${taille})`"
        stroke-width="4"
        stroke-linejoin="round"
      />
      <circle cx="24" cy="24" r="5.4" :fill="`url(#noyau-${taille})`" />
    </svg>
  </span>
</template>

<style scoped>
.marque {
  display: block;
  flex: none;
}

.marque svg {
  width: 100%;
  height: 100%;
}
</style>
