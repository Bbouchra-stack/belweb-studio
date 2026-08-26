<script setup>
import { onBeforeUnmount, ref } from 'vue'
import LogoMark from './LogoMark.vue'

/**
 * Remplace le panneau de mesures en direct dans le héro : plutôt que
 * d'afficher des données (qui, pour un jeune studio sans portfolio livré,
 * pouvaient donner une impression de « on n'a rien à montrer »), cette carte
 * met en scène un « noyau numérique » abstrait autour du logo — halo à
 * plusieurs couches, orbites, particules, léger tilt 3D au curseur — pensé
 * comme une démonstration implicite de savoir-faire frontend plutôt qu'un
 * simple élément décoratif statique.
 *
 * Interaction souris en manipulation directe du DOM (pas de ref réactive
 * sur chaque frame) : à cette fréquence d'appel, passer par le rendu
 * réactif de Vue coûterait inutilement cher pour un résultat purement
 * visuel et non structurel.
 */

const conteneur = ref(null)
const actif = ref(false)

const reduireMouvement =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const sansCurseur =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches

const interactionSourisActive = !reduireMouvement && !sansCurseur

let animationPlanifiee = false
let dernierEvenement = null

function appliquerTilt() {
  animationPlanifiee = false
  const element = conteneur.value
  const evenement = dernierEvenement
  if (!element || !evenement) return

  const rect = element.getBoundingClientRect()
  const x = (evenement.clientX - rect.left) / rect.width
  const y = (evenement.clientY - rect.top) / rect.height
  const rx = (0.5 - y) * 9
  const ry = (x - 0.5) * 9

  element.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
  element.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
  element.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
  element.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
}

function surMouvement(evenement) {
  if (!interactionSourisActive) return
  dernierEvenement = evenement
  if (animationPlanifiee) return
  animationPlanifiee = true
  requestAnimationFrame(appliquerTilt)
}

function surEntree() {
  if (!interactionSourisActive) return
  actif.value = true
  const element = conteneur.value
  if (element) element.style.transition = 'none'
}

function surSortie() {
  if (!interactionSourisActive) return
  actif.value = false
  const element = conteneur.value
  if (!element) return
  element.style.transition = ''
  element.style.setProperty('--rx', '0deg')
  element.style.setProperty('--ry', '0deg')
  element.style.setProperty('--mx', '50%')
  element.style.setProperty('--my', '50%')
}

onBeforeUnmount(() => {
  dernierEvenement = null
})

// Positions figées (et non re-tirées à chaque rendu) pour les particules
// ambiantes : un léger désordre organique, sans jamais chevaucher le logo.
const particules = [
  { top: '18%', left: '22%', taille: 3, retard: '0s', duree: '6.5s' },
  { top: '28%', left: '78%', taille: 2, retard: '0.9s', duree: '7.5s' },
  { top: '68%', left: '16%', taille: 2, retard: '1.8s', duree: '6s' },
  { top: '76%', left: '82%', taille: 3, retard: '0.4s', duree: '8s' },
  { top: '12%', left: '55%', taille: 2, retard: '2.4s', duree: '7s' },
  { top: '84%', left: '48%', taille: 2, retard: '1.3s', duree: '6.8s' },
  { top: '50%', left: '10%', taille: 2, retard: '3s', duree: '7.8s' },
  { top: '46%', left: '90%', taille: 2, retard: '2s', duree: '6.2s' },
]
</script>

<template>
  <figure
    ref="conteneur"
    class="signature"
    :class="{ 'signature--actif': actif }"
    @mousemove="surMouvement"
    @mouseenter="surEntree"
    @mouseleave="surSortie"
  >
    <div class="signature__fond" aria-hidden="true"></div>
    <div class="signature__trame" aria-hidden="true"></div>

    <div class="signature__coeur" aria-hidden="true">
      <span class="signature__lueur"></span>
      <span class="signature__lueur signature__lueur--proche"></span>

      <span class="signature__orbite signature__orbite--1">
        <span class="signature__point-orbite"></span>
      </span>
      <span class="signature__orbite signature__orbite--2">
        <span class="signature__point-orbite"></span>
        <span class="signature__point-orbite signature__point-orbite--b"></span>
      </span>
      <span class="signature__orbite signature__orbite--3">
        <span class="signature__point-orbite"></span>
      </span>

      <span
        v-for="(particule, index) in particules"
        :key="index"
        class="signature__flotte"
        :style="{
          top: particule.top,
          left: particule.left,
          width: `${particule.taille}px`,
          height: `${particule.taille}px`,
          animationDelay: particule.retard,
          animationDuration: particule.duree,
        }"
      ></span>

      <div class="signature__emblème">
        <LogoMark :taille="58" />
      </div>
    </div>

    <span class="signature__scan" aria-hidden="true"></span>

    <span class="signature__repere signature__repere--haut" aria-hidden="true"></span>
    <span class="signature__repere signature__repere--bas" aria-hidden="true"></span>

    <figcaption class="signature__legende">
      <span class="signature__nom">BELWEB Studio</span>
      <span class="signature__lieu">Design sur mesure</span>
    </figcaption>
  </figure>
</template>

<style scoped>
@property --angle-lueur {
  syntax: '<angle>';
  inherits: false;
  initial-value: 120deg;
}

.signature {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 50%;
  --echelle: 1;
  position: relative;
  overflow: hidden;
  margin: 0;
  min-height: 380px;
  border-radius: var(--bw-radius-lg);
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.055) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.45);
  text-align: center;
  transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--echelle));
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease,
    box-shadow 0.4s ease;
  animation: signature-entree-cadre 0.9s var(--bw-ease) both;
}

.signature--actif {
  --echelle: 1.012;
  box-shadow: 0 48px 110px rgba(0, 0, 0, 0.5);
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
  transition: opacity 0.4s ease;
}

.signature--actif::before {
  opacity: 1.4;
}

/* ---------- Couches d'arrière-plan ---------- */

.signature__fond {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    120% 90% at calc(50% + (var(--mx) - 50%) * 0.12) calc(38% + (var(--my) - 50%) * 0.12),
    rgba(139, 92, 246, 0.16),
    transparent 62%
  );
  opacity: 0;
  animation: signature-fondu 1s ease 80ms both;
}

.signature__trame {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(65% 65% at 50% 42%, #000 0%, transparent 78%);
  opacity: 0;
  animation: signature-fondu 1.1s ease 160ms both;
}

/* ---------- Noyau : halo, orbites, particules, emblème ---------- */

.signature__coeur {
  position: absolute;
  top: 42%;
  left: 50%;
  width: 300px;
  height: 300px;
  translate: calc((var(--mx) - 50%) * 0.05) calc((var(--my) - 50%) * 0.05);
  transform: translate(-50%, -50%);
}

.signature__lueur {
  position: absolute;
  inset: 42px;
  border-radius: 50%;
  background: conic-gradient(
    from var(--angle-lueur),
    var(--bw-purple),
    var(--bw-magenta),
    var(--bw-coral),
    var(--bw-orange),
    var(--bw-purple)
  );
  filter: blur(30px);
  opacity: 0;
  animation: signature-lueur-entree 1.2s ease 260ms both,
    signature-respirer 7s ease-in-out 1.2s infinite,
    signature-lueur-tourner 16s linear infinite;
}

.signature__lueur--proche {
  inset: 96px;
  filter: blur(14px);
  opacity: 0;
  animation: signature-lueur-entree-proche 1.2s ease 420ms both,
    signature-respirer 5.5s ease-in-out 1.4s infinite reverse;
}

.signature--actif .signature__lueur {
  filter: blur(34px) brightness(1.18);
}

.signature--actif .signature__lueur--proche {
  filter: blur(16px) brightness(1.22);
}

.signature__orbite {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  opacity: 0;
}

.signature__orbite--1 {
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  animation: signature-orbite-entree 0.9s var(--bw-ease) 520ms both,
    signature-tourner 19s linear 900ms infinite;
}

.signature__orbite--2 {
  width: 216px;
  height: 216px;
  margin: -108px 0 0 -108px;
  border-color: rgba(255, 255, 255, 0.1);
  animation: signature-orbite-entree 0.9s var(--bw-ease) 620ms both,
    signature-tourner-inverse 27s linear 900ms infinite;
}

.signature__orbite--3 {
  width: 280px;
  height: 280px;
  margin: -140px 0 0 -140px;
  border-color: rgba(255, 255, 255, 0.07);
  z-index: 2;
  animation: signature-orbite-entree 0.9s var(--bw-ease) 700ms both,
    signature-tourner 38s linear 900ms infinite;
}

.signature__point-orbite {
  position: absolute;
  top: -2.5px;
  left: calc(50% - 2.5px);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--bw-text);
  box-shadow: 0 0 8px 1px rgba(255, 255, 255, 0.5);
}

.signature__point-orbite--b {
  top: auto;
  left: auto;
  bottom: 8%;
  right: 10%;
  width: 3.5px;
  height: 3.5px;
  background: var(--bw-coral);
  box-shadow: 0 0 8px 1px var(--bw-coral);
}

.signature--actif .signature__point-orbite {
  box-shadow: 0 0 12px 2px rgba(255, 255, 255, 0.7);
}

.signature__flotte {
  position: absolute;
  border-radius: 50%;
  background: var(--bw-text);
  opacity: 0;
  animation: signature-flotter 6s ease-in-out infinite;
}

.signature--actif .signature__flotte {
  filter: brightness(1.3);
}

.signature__emblème {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: rgba(7, 7, 10, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
  opacity: 0;
  animation: signature-embleme-entree 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 950ms both;
}

.signature--actif .signature__emblème {
  border-color: rgba(255, 255, 255, 0.28);
}

/* ---------- Signal / scan ---------- */

.signature__scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    100deg,
    transparent 42%,
    rgba(255, 255, 255, 0.07) 49%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.07) 51%,
    transparent 58%
  );
  transform: translateX(-140%);
  opacity: 0;
  animation: signature-scan 7s ease-in-out 3.5s infinite;
  pointer-events: none;
}

/* ---------- Micro-détails techniques ---------- */

.signature__repere {
  position: absolute;
  width: 14px;
  height: 14px;
  opacity: 0;
  animation: signature-fondu 0.8s ease 1.1s both;
}

.signature__repere::before,
.signature__repere::after {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, 0.22);
}

.signature__repere::before {
  width: 100%;
  height: 1px;
  top: 0;
}

.signature__repere::after {
  width: 1px;
  height: 100%;
  left: 0;
}

.signature__repere--haut {
  top: 18px;
  left: 20px;
}

.signature__repere--bas {
  bottom: 18px;
  right: 20px;
  transform: rotate(180deg);
}

/* ---------- Légende ---------- */

.signature__legende {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: max-content;
  max-width: calc(100% - 48px);
  opacity: 0;
  animation: signature-fondu 0.8s ease 1.05s both;
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

/* ---------- Animations ---------- */

@keyframes signature-entree-cadre {
  from {
    opacity: 0;
    transform: perspective(1000px) translateY(14px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: perspective(1000px) translateY(0) scale(1);
  }
}

@keyframes signature-fondu {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes signature-lueur-entree {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 0.6;
    transform: scale(1);
  }
}

@keyframes signature-lueur-entree-proche {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 0.75;
    transform: scale(1);
  }
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

@keyframes signature-lueur-tourner {
  from {
    --angle-lueur: 120deg;
  }
  to {
    --angle-lueur: 480deg;
  }
}

@keyframes signature-orbite-entree {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-40deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
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

@keyframes signature-tourner-inverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes signature-flotter {
  0% {
    opacity: 0;
    transform: translate3d(0, 6px, 0) scale(0.8);
  }
  15% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.8;
    transform: translate3d(3px, -8px, 0) scale(1.1);
  }
  85% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translate3d(-2px, -14px, 0) scale(0.8);
  }
}

@keyframes signature-embleme-entree {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes signature-scan {
  0%,
  92%,
  100% {
    opacity: 0;
    transform: translateX(-140%);
  }
  4%,
  9% {
    opacity: 1;
  }
  12% {
    opacity: 0;
    transform: translateX(140%);
  }
}

@media (max-width: 640px) {
  .signature {
    min-height: 320px;
  }

  .signature__coeur {
    width: 240px;
    height: 240px;
  }

  .signature__orbite--1 {
    width: 122px;
    height: 122px;
    margin: -61px 0 0 -61px;
  }

  .signature__orbite--2 {
    width: 174px;
    height: 174px;
    margin: -87px 0 0 -87px;
  }

  .signature__orbite--3 {
    width: 222px;
    height: 222px;
    margin: -111px 0 0 -111px;
  }

  .signature__lueur {
    inset: 34px;
  }

  .signature__lueur--proche {
    inset: 78px;
  }

  .signature__emblème {
    width: 70px;
    height: 70px;
  }

  .signature__flotte:nth-child(n + 6) {
    display: none;
  }

  .signature__repere {
    display: none;
  }
}

@media (hover: none), (pointer: coarse) {
  .signature {
    transition: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature,
  .signature__fond,
  .signature__trame,
  .signature__lueur,
  .signature__lueur--proche,
  .signature__orbite,
  .signature__emblème,
  .signature__legende,
  .signature__repere {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
  }

  .signature__scan,
  .signature__flotte {
    display: none;
  }

  .signature {
    transform: none;
  }
}
</style>
