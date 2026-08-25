<script setup>
/**
 * Marque BELWEB — deux lames inclinées, dégradé violet → magenta → corail →
 * orange (identique à --bw-gradient) pour rester cohérente avec la nouvelle
 * direction sombre premium. Provisoire : à remplacer par le fichier définitif
 * fourni par le studio.
 */
defineProps({
  taille: { type: Number, default: 40 },
})
</script>

<template>
  <span class="marque" :style="{ width: `${taille}px`, height: `${taille}px` }" aria-hidden="true">
    <svg viewBox="0 0 48 48" role="presentation">
      <defs>
        <linearGradient :id="`lame1-${taille}`" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#c84edc" />
        </linearGradient>
        <linearGradient :id="`lame2-${taille}`" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#ec4899" />
          <stop offset="55%" stop-color="#ff5b6e" />
          <stop offset="100%" stop-color="#ff7a45" />
        </linearGradient>
      </defs>
      <path d="M15 7 L26 11 L20 43 L9 39 Z" :fill="`url(#lame1-${taille})`" />
      <path d="M30 5 L40 9 L34 41 L24 37 Z" :fill="`url(#lame2-${taille})`" />
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
