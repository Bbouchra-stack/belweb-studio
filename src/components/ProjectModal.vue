<script setup>
import { onBeforeUnmount, onMounted, nextTick, ref, watch } from 'vue'
import { lienWhatsapp } from '../composables/coordonnees.js'
import {
  banniereReduite,
  banniereVisible,
  momentDuChoix,
} from '../composables/consentement.js'

/**
 * Invitation à décrire son projet.
 *
 * Bonnes pratiques appliquées :
 * - jamais à l'arrivée sur le site (on laisse le visiteur découvrir) : elle
 *   se déclenche après un temps de lecture, à mi-page, ou lorsque la souris
 *   quitte la fenêtre par le haut (intention de départ) ;
 * - une seule fois par visiteur, mémorisé 7 jours ;
 * - jamais par-dessus la carte cookies déployée : une interruption à la fois ;
 * - fermeture par la croix, la touche Échap ou un clic sur le fond.
 */

const CLE = 'belweb-invitation-projet'
const JOURS_AVANT_RAPPEL = 7
// Respiration imposée entre le bandeau cookies et cette fenêtre.
const DELAI_APRES_COOKIES = 8000

const ouverte = ref(false)
const boiteRef = ref(null)
let elementPrecedent = null
const minuteries = []

function dejaVue() {
  try {
    const enregistre = Number(localStorage.getItem(CLE))
    if (!enregistre) return false
    return Date.now() - enregistre < JOURS_AVANT_RAPPEL * 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

function memoriser() {
  try {
    localStorage.setItem(CLE, String(Date.now()))
  } catch {
    // Stockage indisponible : la fenêtre ne réapparaîtra pas durant cette visite.
  }
}

function ouvrir() {
  const banniereDeployee = banniereVisible.value && !banniereReduite.value
  if (ouverte.value || dejaVue() || banniereDeployee) return

  // Le visiteur vient de répondre au bandeau cookies : on le laisse respirer.
  const depuisLeChoix = Date.now() - momentDuChoix.value
  if (momentDuChoix.value && depuisLeChoix < DELAI_APRES_COOKIES) {
    minuteries.push(setTimeout(ouvrir, DELAI_APRES_COOKIES - depuisLeChoix))
    return
  }

  elementPrecedent = document.activeElement
  ouverte.value = true
  memoriser()
  retirerDeclencheurs()
  document.body.style.overflow = 'hidden'
  nextTick(() => boiteRef.value?.querySelector('.modale__fermer')?.focus())
}

function fermer() {
  if (!ouverte.value) return
  ouverte.value = false
  document.body.style.overflow = ''
  elementPrecedent?.focus?.()
}

function allerAuFormulaire() {
  fermer()
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

function surTouche(evenement) {
  if (evenement.key === 'Escape') fermer()
}

function surDefilement() {
  const hauteurTotale = document.body.scrollHeight - window.innerHeight
  if (hauteurTotale > 0 && window.scrollY / hauteurTotale > 0.45) ouvrir()
}

function surSortie(evenement) {
  if (evenement.clientY <= 0) ouvrir()
}

function retirerDeclencheurs() {
  minuteries.forEach(clearTimeout)
  window.removeEventListener('scroll', surDefilement)
  document.removeEventListener('mouseout', surSortie)
}

onMounted(() => {
  if (dejaVue()) return
  minuteries.push(setTimeout(ouvrir, 30000))
  window.addEventListener('scroll', surDefilement, { passive: true })
  document.addEventListener('mouseout', surSortie)
  document.addEventListener('keydown', surTouche)
})

onBeforeUnmount(() => {
  retirerDeclencheurs()
  document.removeEventListener('keydown', surTouche)
  document.body.style.overflow = ''
})

// Le bandeau cookies est prioritaire : on ne superpose jamais les deux.
watch([banniereVisible, banniereReduite], ([visible, reduite]) => {
  if (visible && !reduite) fermer()
})
</script>

<template>
  <Transition name="modale">
    <div v-if="ouverte" class="modale" @click.self="fermer">
      <div
        ref="boiteRef"
        class="modale__boite"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modale-titre"
      >
        <button type="button" class="modale__fermer" @click="fermer">
          <span class="sr-only">Fermer</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <span class="eyebrow">Votre projet</span>
        <h2 id="modale-titre" class="modale__titre">
          Parlons de ce dont vous avez besoin
        </h2>
        <p class="modale__texte">
          Décrivez-nous votre activité en deux lignes. Nous revenons vers vous
          sous 24&nbsp;h ouvrées avec une première proposition et un devis
          détaillé — gratuit et sans engagement.
        </p>

        <div class="modale__actions">
          <button type="button" class="btn btn--primary" @click="allerAuFormulaire">
            Décrire mon projet
          </button>
          <a
            class="btn btn--ghost"
            :href="lienWhatsapp"
            target="_blank"
            rel="noopener noreferrer"
            @click="fermer"
          >
            Écrire sur WhatsApp
          </a>
        </div>

        <ul class="modale__reperes">
          <li>Premier échange gratuit</li>
          <li>Réponse sous 24&nbsp;h ouvrées</li>
          <li>Sans engagement</li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modale {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 24px;
  background-color: rgba(4, 4, 7, 0.72);
  backdrop-filter: blur(3px);
}

.modale__boite {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 520px;
  padding: 46px 44px 40px;
  border: 1px solid var(--bw-border);
  border-radius: var(--bw-radius);
  background-color: var(--bw-bg-alt);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.modale__boite::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--bw-gradient);
}

.modale__fermer {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--bw-border);
  border-radius: 50%;
  background-color: transparent;
  color: var(--bw-text-muted);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.modale__fermer:hover {
  color: var(--bw-text);
  border-color: var(--bw-border-strong);
}

.modale__fermer svg {
  width: 17px;
  height: 17px;
}

.modale__boite .eyebrow {
  justify-content: center;
  color: var(--bw-text-muted);
}

.modale__boite .eyebrow::before,
.modale__boite .eyebrow::after {
  background: var(--bw-gradient);
  opacity: 1;
}

.modale__titre {
  font-family: var(--font-display);
  font-weight: 560;
  color: var(--bw-text);
  font-size: 1.6rem;
  margin-bottom: 14px;
}

.modale__texte {
  color: var(--bw-text-muted);
  font-size: 0.94rem;
  margin-bottom: 30px;
}

.modale__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.modale__actions .btn {
  flex: 1 1 190px;
  border-radius: var(--bw-radius-pill);
}

.modale__actions .btn--primary {
  background-color: var(--bw-text);
  border-color: var(--bw-text);
  color: var(--bw-bg);
}

.modale__actions .btn--primary:hover {
  background-color: #fff;
  border-color: #fff;
  color: var(--bw-bg);
  box-shadow: 0 16px 40px rgba(139, 92, 246, 0.28), 0 10px 24px rgba(255, 122, 69, 0.16);
}

.modale__actions .btn--ghost {
  border-color: var(--bw-border-strong);
  color: var(--bw-text);
}

.modale__actions .btn--ghost:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.32);
  color: var(--bw-text);
}

.modale__reperes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 20px;
  margin: 30px 0 0;
  padding: 22px 0 0;
  border-top: 1px solid var(--bw-border);
  list-style: none;
  font-size: 0.8rem;
  color: var(--bw-text-muted);
}

.modale__reperes li {
  position: relative;
  padding-left: 18px;
}

.modale__reperes li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 9px;
  height: 5px;
  border-left: 1.5px solid var(--bw-coral);
  border-bottom: 1.5px solid var(--bw-coral);
  transform: rotate(-45deg);
}

.modale-enter-active,
.modale-leave-active {
  transition: opacity 0.3s ease;
}

.modale-enter-active .modale__boite,
.modale-leave-active .modale__boite {
  transition: transform 0.34s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.modale-enter-from,
.modale-leave-to {
  opacity: 0;
}

.modale-enter-from .modale__boite,
.modale-leave-to .modale__boite {
  transform: translateY(22px) scale(0.97);
}

@media (max-width: 560px) {
  .modale__boite {
    padding: 40px 24px 32px;
  }

  .modale__titre {
    font-size: 1.44rem;
  }

  .modale__actions .btn {
    flex: 1 1 100%;
  }
}
</style>
