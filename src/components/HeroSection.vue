<script setup>
import SignatureVisual from './SignatureVisual.vue'
import AmbientFlow from './AmbientFlow.vue'
import { coordonnees } from '../composables/coordonnees.js'

// Découpé en caractères pour l'animation « saisie » du numéro (chaque
// chiffre apparaît l'un après l'autre). Les espaces sont conservés tels
// quels pour ne pas casser la mise en forme du numéro.
const telephoneCaracteres = coordonnees.telephoneAffiche.split('')
</script>

<template>
  <section id="accueil" class="bw-hero">
    <div class="bw-hero__lueur bw-hero__lueur--violette" aria-hidden="true"></div>
    <div class="bw-hero__lueur bw-hero__lueur--corail" aria-hidden="true"></div>
    <AmbientFlow />
    <div class="bw-hero__grain" aria-hidden="true"></div>

    <div class="container bw-hero__inner">
      <div class="bw-hero__contenu">
        <span class="bw-eyebrow" v-reveal:fade>
          <span class="bw-eyebrow__point" aria-hidden="true"></span>
          Studio digital · Casablanca
        </span>

        <h1 class="bw-hero__titre">
          <span class="bw-hero__ligne" v-reveal="0">Un site qui inspire</span>
          <span class="bw-hero__ligne bw-hero__ligne--degrade" v-reveal="110">confiance</span>
          <span class="bw-hero__ligne" v-reveal="220">dès la première seconde</span>
        </h1>

        <p class="bw-hero__sous-titre" v-reveal="340">
          BELWEB Studio dessine et développe des sites sur mesure pour les
          professionnels et les entreprises de Casablanca. Élégants, rapides,
          et pensés pour que celles et ceux qui vous cherchent vous trouvent.
        </p>

        <div class="bw-hero__actions" v-reveal="440">
          <a href="#contact" class="bw-btn-primaire">Nous contacter</a>
          <a href="#portfolio" class="bw-btn-ghost">Voir nos réalisations</a>
          <a :href="`tel:${coordonnees.telephoneLien}`" class="bw-btn-tel">
            <svg class="bw-btn-tel__icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.36 2.3.56 3.5.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.7 21 3 13.3 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1z" />
            </svg>
            <span class="bw-btn-tel__numero" aria-hidden="true">
              <span
                v-for="(caractere, index) in telephoneCaracteres"
                :key="index"
                class="bw-btn-tel__chiffre"
                :style="{ '--i': index }"
                >{{ caractere }}</span
              >
            </span>
            <span class="sr-only">{{ coordonnees.telephoneAffiche }}</span>
          </a>
        </div>

        <p class="bw-hero__signature" v-reveal="520">
          Premier échange gratuit · Devis sous 48&nbsp;h · Sans engagement
        </p>
      </div>

      <div class="bw-hero__preuve" v-reveal:scale="260">
        <SignatureVisual />
      </div>
    </div>
  </section>
</template>

<style scoped>
.bw-hero {
  position: relative;
  overflow: hidden;
  padding: 56px 0 120px;
  background: var(--bw-bg);
  color: var(--bw-text-muted);
  scroll-margin-top: var(--header-h);
}

/* ---------- Lumière ambiante : deux halos flous, mouvement très lent ---------- */

.bw-hero__lueur {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  will-change: transform;
  animation: bw-flotter 26s ease-in-out infinite;
}

.bw-hero__lueur--violette {
  top: -260px;
  left: -160px;
  width: 620px;
  height: 620px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.32) 0%,
    rgba(200, 78, 220, 0.14) 48%,
    transparent 72%
  );
}

.bw-hero__lueur--corail {
  bottom: -300px;
  right: -200px;
  width: 680px;
  height: 680px;
  background: radial-gradient(
    circle,
    rgba(255, 122, 69, 0.2) 0%,
    rgba(255, 91, 110, 0.1) 48%,
    transparent 72%
  );
  animation-duration: 32s;
  animation-delay: -6s;
}

/* Grain très discret, pour éviter l'aplat trop propre du noir profond */
.bw-hero__grain {
  position: absolute;
  inset: 0;
  opacity: 0.05;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.bw-hero__inner {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 72px;
  align-items: center;
}

/* ---------- Surtitre ---------- */

.bw-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 28px;
  color: var(--bw-text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.bw-eyebrow__point {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bw-gradient);
}

/* ---------- Titre ---------- */

.bw-hero__titre {
  margin: 0 0 28px;
  font-family: var(--font-display);
  font-weight: 560;
  font-size: clamp(2.2rem, 1.1rem + 4vw, 3.9rem);
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: var(--bw-text);
}

.bw-hero__ligne {
  display: block;
}

.bw-hero__ligne--degrade {
  font-style: italic;
  font-weight: 500;
  background: var(--bw-gradient);
  background-size: 200% auto;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: bw-degrade-vivant 9s ease-in-out infinite;
}

@keyframes bw-degrade-vivant {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.bw-hero__sous-titre {
  font-size: 1.08rem;
  line-height: 1.65;
  color: var(--bw-text-muted);
  max-width: 46ch;
  margin: 0 0 38px;
}

/* ---------- Actions ---------- */

.bw-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 28px;
}

.bw-btn-primaire {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  border-radius: var(--bw-radius-pill);
  background: var(--bw-text);
  color: var(--bw-bg);
  font-size: 0.92rem;
  font-weight: 700;
  transition: transform var(--bw-duration-fast) var(--bw-ease),
    box-shadow var(--bw-duration) var(--bw-ease), background-color var(--bw-duration-fast) var(--bw-ease);
}

.bw-btn-primaire:hover {
  color: var(--bw-bg);
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(139, 92, 246, 0.28), 0 10px 24px rgba(255, 122, 69, 0.16);
}

.bw-btn-ghost {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 28px;
  border-radius: var(--bw-radius-pill);
  border: 1px solid var(--bw-border-strong);
  color: var(--bw-text);
  font-size: 0.92rem;
  font-weight: 600;
  transition: border-color var(--bw-duration-fast) var(--bw-ease),
    background-color var(--bw-duration-fast) var(--bw-ease);
}

.bw-btn-ghost:hover {
  color: var(--bw-text);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.32);
}

.bw-btn-tel {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 26px;
  border-radius: var(--bw-radius-pill);
  border: 1px solid var(--bw-border);
  color: var(--bw-text-muted);
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  transition: color var(--bw-duration-fast) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease),
    background-color var(--bw-duration-fast) var(--bw-ease);
}

.bw-btn-tel__icone {
  width: 18px;
  height: 18px;
  flex: none;
  color: var(--bw-coral);
  transform-origin: 50% 15%;
  /* Sonnerie : une salve de balancement au début de chaque cycle, puis
     un long repos — comme une icône de téléphone qui vibre. */
  animation: bw-tel-sonner 3.4s ease-in-out infinite;
}

@keyframes bw-tel-sonner {
  0%,
  62%,
  100% {
    transform: rotate(0deg);
  }
  64% {
    transform: rotate(-16deg);
  }
  67% {
    transform: rotate(14deg);
  }
  70% {
    transform: rotate(-11deg);
  }
  73% {
    transform: rotate(8deg);
  }
  76% {
    transform: rotate(-4deg);
  }
  79% {
    transform: rotate(0deg);
  }
}

.bw-btn-tel:hover {
  color: var(--bw-text);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.32);
}

/* ---------- Numéro qui « s'écrit » chiffre par chiffre ---------- */

.bw-btn-tel__numero {
  display: inline-flex;
}

.bw-btn-tel__chiffre {
  display: inline-block;
  opacity: 0;
  transform: scale(0.3);
  white-space: pre;
}

/* Ne se joue qu'une fois la rangée de boutons révélée au défilement
   (classe posée par la directive v-reveal), jamais avant — et seulement
   une fois cette rangée entièrement apparue (son propre fondu dure
   750ms, avec 440ms de délai : elle est donc pleinement visible à
   1190ms). En démarrant plus tôt, l'animation chiffre par chiffre se
   jouait alors que le bouton lui-même était encore en train de
   s'estomper depuis l'opacité 0 : invisible dans les faits. */
.reveal--visible .bw-btn-tel__chiffre {
  animation: bw-tel-ecrire 0.46s var(--bw-ease) forwards;
  animation-delay: calc(var(--i) * 55ms + 1300ms);
}

@keyframes bw-tel-ecrire {
  0% {
    opacity: 0;
    transform: scale(0.25);
  }
  55% {
    opacity: 1;
    transform: scale(1.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bw-btn-tel__icone {
    animation: none;
  }

  .bw-btn-tel__chiffre {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.bw-hero__signature {
  margin: 0;
  color: rgba(245, 245, 247, 0.4);
  font-size: 0.85rem;
  letter-spacing: 0.01em;
}

.bw-hero__preuve {
  position: relative;
}

@media (max-width: 1024px) {
  .bw-hero__inner {
    grid-template-columns: 1fr;
    gap: 56px;
  }

  .bw-hero__preuve {
    max-width: 460px;
  }
}

@media (max-width: 640px) {
  .bw-hero {
    padding: 32px 0 76px;
  }

  .bw-hero__actions .bw-btn-primaire,
  .bw-hero__actions .bw-btn-ghost {
    width: 100%;
  }

  .bw-hero__signature {
    font-size: 0.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bw-hero__lueur,
  .bw-hero__ligne--degrade {
    animation: none;
  }
}
</style>
