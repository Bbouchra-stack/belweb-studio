<script setup>
import LogoMark from './LogoMark.vue'

/**
 * Remplace le panneau de mesures en direct dans le héro : plutôt que
 * d'afficher des données (qui, pour un jeune studio sans portfolio livré,
 * pouvaient donner une impression de « on n'a rien à montrer »), cette
 * carte affiche une signature visuelle — dans l'esprit d'un emblème de
 * maison de luxe : peu de texte, une composition abstraite dans les
 * couleurs de la marque, beaucoup d'espace.
 */
</script>

<template>
  <figure class="signature">
    <div class="signature__orbe" aria-hidden="true">
      <span class="signature__anneau"></span>
      <span class="signature__lueur"></span>
    </div>

    <div class="signature__emblème">
      <LogoMark :taille="46" />
    </div>

    <figcaption class="signature__legende">
      <span class="signature__nom">BELWEB Studio</span>
      <span class="signature__lieu">Design sur mesure · Casablanca</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.signature {
  position: relative;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 30px 34px;
  border-radius: var(--bw-radius-lg);
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.055) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.45);
  min-height: 340px;
  text-align: center;
}

.signature::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(
    155deg,
    rgba(139, 92, 246, 0.55),
    rgba(255, 122, 69, 0.18) 55%,
    rgba(255, 255, 255, 0.06)
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* ---------- Composition abstraite ---------- */

.signature__orbe {
  position: relative;
  width: 168px;
  height: 168px;
}

.signature__lueur {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 120deg,
    var(--bw-purple),
    var(--bw-magenta),
    var(--bw-coral),
    var(--bw-orange),
    var(--bw-purple)
  );
  filter: blur(26px);
  opacity: 0.6;
  animation: signature-respirer 7s ease-in-out infinite;
}

.signature__anneau {
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.16);
  animation: signature-tourner 22s linear infinite;
}

.signature__anneau::before,
.signature__anneau::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bw-text);
}

.signature__anneau::before {
  top: -3px;
  left: calc(50% - 3px);
}

.signature__anneau::after {
  bottom: 18px;
  right: 6px;
  width: 4px;
  height: 4px;
  background: var(--bw-coral);
}

@keyframes signature-respirer {
  0%,
  100% {
    transform: scale(0.94);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.04);
    opacity: 0.72;
  }
}

@keyframes signature-tourner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.signature__emblème {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: rgba(7, 7, 10, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
}

.signature__legende {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.signature__nom {
  font-family: var(--font-display);
  font-weight: 560;
  font-size: 1.2rem;
  color: var(--bw-text);
}

.signature__lieu {
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--bw-text-muted);
}

@media (max-width: 640px) {
  .signature {
    padding: 26px 22px;
    min-height: 300px;
    gap: 24px;
  }

  .signature__orbe {
    width: 140px;
    height: 140px;
  }

  .signature__emblème {
    width: 62px;
    height: 62px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature__lueur,
  .signature__anneau {
    animation: none;
  }
}
</style>
