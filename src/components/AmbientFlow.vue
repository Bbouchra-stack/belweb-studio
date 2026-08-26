<script setup>
/**
 * Flux lumineux ambiant — filets qui convergent, dans le dégradé de
 * marque. Inspiré d'une image de référence (traînées de lumière),
 * recréé en SVG pur pour rester en cohérence avec le reste du site
 * (aucune photo, uniquement des formes vectorielles) et pour que la
 * couleur suive exactement --bw-gradient plutôt que le bleu d'origine.
 * Purement décoratif : aria-hidden, jamais porteur de texte ou de sens.
 */
defineProps({
  // Permet de renverser le sens du flux (ex. : convergence à gauche
  // plutôt qu'à droite) selon l'endroit où le composant est utilisé.
  inverse: { type: Boolean, default: false },
})
</script>

<template>
  <svg
    class="bw-flux"
    :class="{ 'bw-flux--inverse': inverse }"
    viewBox="0 0 1200 800"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="bw-flux-degrade" x1="0" y1="0" x2="1" y2="0.15">
        <stop offset="0%" style="stop-color: var(--bw-purple); stop-opacity: 0" />
        <stop offset="30%" style="stop-color: var(--bw-purple); stop-opacity: 0.5" />
        <stop offset="62%" style="stop-color: var(--bw-magenta); stop-opacity: 0.75" />
        <stop offset="86%" style="stop-color: var(--bw-coral); stop-opacity: 0.9" />
        <stop offset="100%" style="stop-color: var(--bw-orange); stop-opacity: 1" />
      </linearGradient>
      <filter id="bw-flux-flou" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
    </defs>

    <g filter="url(#bw-flux-flou)">
      <path class="bw-flux__ligne bw-flux__ligne--1" d="M -80 90 C 343 95, 739 210, 1241 330" />
      <path class="bw-flux__ligne bw-flux__ligne--2" d="M -80 200 C 317 195, 713 270, 1241 350" />
      <path class="bw-flux__ligne bw-flux__ligne--3" d="M -80 330 C 343 320, 739 350, 1241 375" />
      <path class="bw-flux__ligne bw-flux__ligne--4" d="M -80 470 C 343 450, 739 420, 1241 395" />
      <path class="bw-flux__ligne bw-flux__ligne--5" d="M -80 600 C 317 560, 713 450, 1241 405" />
      <path class="bw-flux__ligne bw-flux__ligne--6" d="M -80 710 C 343 630, 739 470, 1241 415" />
    </g>
  </svg>
</template>

<style scoped>
.bw-flux {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.55;
}

.bw-flux--inverse {
  transform: scaleX(-1);
}

.bw-flux__ligne {
  fill: none;
  stroke: url(#bw-flux-degrade);
  stroke-linecap: round;
}

.bw-flux__ligne--1 {
  stroke-width: 1.4;
}

.bw-flux__ligne--2 {
  stroke-width: 2.2;
}

.bw-flux__ligne--3 {
  stroke-width: 3.2;
}

.bw-flux__ligne--4 {
  stroke-width: 2.2;
}

.bw-flux__ligne--5 {
  stroke-width: 1.8;
}

.bw-flux__ligne--6 {
  stroke-width: 1.2;
}

/* Respiration très lente et légère, jamais un défilement franc. */
.bw-flux__ligne {
  animation: bw-flux-respirer 7s ease-in-out infinite;
}

.bw-flux__ligne--2 {
  animation-delay: -1.2s;
}

.bw-flux__ligne--3 {
  animation-delay: -2.4s;
}

.bw-flux__ligne--4 {
  animation-delay: -3.6s;
}

.bw-flux__ligne--5 {
  animation-delay: -4.8s;
}

.bw-flux__ligne--6 {
  animation-delay: -6s;
}

@keyframes bw-flux-respirer {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bw-flux__ligne {
    animation: none;
  }
}
</style>
