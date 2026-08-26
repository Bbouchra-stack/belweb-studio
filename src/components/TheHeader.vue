<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import LogoMark from './LogoMark.vue'

// Sur les pages légales, les ancres doivent repartir vers l'accueil ("/#methode").
const props = defineProps({
  prefixeAncres: { type: String, default: '' },
})

const links = computed(() =>
  [
    { ancre: '#methode', label: 'Méthode' },
    { ancre: '#avantages', label: 'Avantages' },
    { ancre: '#portfolio', label: 'Réalisations' },
    { ancre: '#faq', label: 'FAQ' },
  ].map((lien) => ({ ...lien, href: `${props.prefixeAncres}${lien.ancre}` })),
)

const lienAccueil = computed(() => `${props.prefixeAncres}#accueil`)
const lienContact = computed(() => `${props.prefixeAncres}#contact`)

const menuOuvert = ref(false)
const estDefile = ref(false)

function basculerMenu() {
  menuOuvert.value = !menuOuvert.value
}

function fermerMenu() {
  menuOuvert.value = false
}

function surDefilement() {
  estDefile.value = window.scrollY > 12
}

onMounted(() => {
  surDefilement()
  window.addEventListener('scroll', surDefilement, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', surDefilement)
})
</script>

<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>

  <header class="bw-shell" v-reveal:fade>
    <div class="bw-pill" :class="{ 'bw-pill--defile': estDefile }">
      <a :href="lienAccueil" class="bw-logo" @click="fermerMenu">
        <LogoMark :taille="42" />
        <span class="bw-logo__texte">
          <span class="bw-logo__nom">BELWEB</span>
          <span class="bw-logo__studio">Studio</span>
        </span>
      </a>

      <nav
        id="menu-principal"
        class="bw-nav"
        :class="{ 'bw-nav--ouvert': menuOuvert }"
        aria-label="Navigation principale"
      >
        <ul class="bw-nav__liste">
          <li v-for="lien in links" :key="lien.ancre">
            <a :href="lien.href" class="bw-nav__lien" @click="fermerMenu">{{ lien.label }}</a>
          </li>
        </ul>

        <a :href="lienContact" class="bw-cta bw-nav__cta" @click="fermerMenu">
          <span>Parlons de votre projet</span>
          <span class="bw-cta__fleche" aria-hidden="true">→</span>
        </a>
      </nav>

      <div class="bw-pill__droite">
        <a :href="lienContact" class="bw-cta bw-cta--desktop" @click="fermerMenu">
          <span>Parlons de votre projet</span>
          <span class="bw-cta__fleche" aria-hidden="true">→</span>
        </a>

        <button
          class="bw-burger"
          type="button"
          :aria-expanded="menuOuvert"
          aria-controls="menu-principal"
          @click="basculerMenu"
        >
          <span class="sr-only">{{ menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu' }}</span>
          <span class="bw-burger__barre" :class="{ 'bw-burger__barre--1': menuOuvert }"></span>
          <span class="bw-burger__barre" :class="{ 'bw-burger__barre--2': menuOuvert }"></span>
          <span class="bw-burger__barre" :class="{ 'bw-burger__barre--3': menuOuvert }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.skip-link {
  position: fixed;
  z-index: 100;
  top: 12px;
  left: 50%;
  transform: translate(-50%, -200%);
  padding: 10px 18px;
  border-radius: var(--bw-radius-sm);
  background: var(--bw-text);
  color: var(--bw-bg);
  font-weight: 600;
  transition: transform 0.2s ease;
}

.skip-link:focus {
  transform: translate(-50%, 0);
}

/* ---------- Coquille flottante ---------- */

.bw-shell {
  position: fixed;
  top: 18px;
  left: 0;
  right: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  padding-inline: 16px;
  pointer-events: none;
}

/* La pastille flotte sans jamais toucher les bords de l'écran : au-delà
   de sa largeur maximale, le contenu qui défile (bandeau de services…)
   reste visible dans ces marges et semble passer "derrière" la nav au
   moment où il croise sa hauteur en défilant. Ce voile, calé sur le
   fond de page, estompe tout contenu à cet endroit avant qu'il
   n'atteigne la pastille, quelle que soit sa largeur d'écran. */
.bw-shell::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 112px;
  background: linear-gradient(to bottom, var(--bw-bg) 0%, var(--bw-bg) 64%, transparent 100%);
  pointer-events: none;
}

.bw-pill {
  /* "position: relative" (sans décalage) est nécessaire pour que la
     pastille se peigne dans la même étape que le voile ::before
     ci-dessus (tous deux "positionnés") et gagne grâce à son ordre
     plus tardif dans le code — sans cela, un élément statique se peint
     toujours avant un élément positionné, même arrivé après lui. */
  position: relative;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  width: 100%;
  max-width: 1080px;
  padding: 10px 12px 10px 20px;
  border-radius: var(--bw-radius-pill);
  border: 1px solid var(--bw-border);
  /* Opaque à 96 % par défaut : le texte qui défile dessous ne doit
     jamais rester lisible, même quand backdrop-filter n'est pas rendu
     (GPU absente/désactivée — c'était le cas ici, le flou ne s'appliquait
     pas et le contenu défilait de façon visible derrière la nav). Le
     flou reste actif là où il fonctionne, en confort supplémentaire,
     mais l'opacité seule doit déjà suffire à masquer le contenu. */
  background: rgba(9, 9, 13, 0.96);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;
  transition: background-color var(--bw-duration) var(--bw-ease),
    border-color var(--bw-duration) var(--bw-ease),
    box-shadow var(--bw-duration) var(--bw-ease),
    padding var(--bw-duration) var(--bw-ease);
}

.bw-pill--defile {
  padding-block: 8px;
  background: rgba(6, 6, 9, 0.98);
  border-color: var(--bw-border-strong);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 1px 0 rgba(255, 255, 255, 0.05) inset;
}

/* ---------- Logo ---------- */

.bw-logo {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex: none;
  color: var(--bw-text);
}

.bw-logo:hover {
  color: var(--bw-text);
}

.bw-logo__texte {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.bw-logo__nom {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: var(--bw-text);
}

.bw-logo__studio {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.36em;
  text-transform: uppercase;
  color: var(--bw-text-muted);
}

/* ---------- Navigation ---------- */

.bw-nav {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.bw-nav__liste {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.bw-nav__lien {
  display: inline-block;
  padding: 9px 16px;
  border-radius: var(--bw-radius-pill);
  color: var(--bw-text-muted);
  font-size: 0.89rem;
  font-weight: 500;
  transition: color var(--bw-duration-fast) var(--bw-ease),
    background-color var(--bw-duration-fast) var(--bw-ease);
}

.bw-nav__lien:hover {
  color: var(--bw-text);
  background: rgba(255, 255, 255, 0.06);
}

/* ---------- CTA dégradé plein (texte foncé pour rester lisible sur
   toutes les teintes du dégradé — même principe que les badges
   « En cours » du portfolio) ---------- */

.bw-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 11px 20px;
  border-radius: var(--bw-radius-pill);
  background: var(--bw-gradient);
  background-size: 160% auto;
  background-position: 0% 50%;
  color: #050301;
  font-size: 0.85rem;
  font-weight: 700;
  white-space: nowrap;
  transition: background-position var(--bw-duration) var(--bw-ease),
    filter var(--bw-duration) var(--bw-ease), transform var(--bw-duration-fast) var(--bw-ease);
  /* Pulsation continue pour attirer l'œil vers le seul point de contact
     visible dans l'en-tête (pas de numéro affiché ici). Variation de
     luminosité pure (filter), jamais un box-shadow à étalement : ce
     dernier avait déjà débordé du contour de la pastille une fois
     réduite (état « défilé », padding plus fin) — un filtre ne peut
     géométriquement jamais dépasser la boîte du bouton. */
  animation: bw-cta-pulsation 2.2s ease-in-out infinite;
}

@keyframes bw-cta-pulsation {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.22);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bw-cta {
    animation: none;
  }
}

.bw-cta:hover {
  color: #050301;
  background-position: 100% 50%;
  transform: translateY(-1px);
  filter: brightness(1.1);
  animation-play-state: paused;
}

.bw-cta__fleche {
  display: inline-block;
  transition: transform var(--bw-duration-fast) var(--bw-ease);
}

.bw-cta:hover .bw-cta__fleche {
  transform: translateX(3px);
}

.bw-pill__droite {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: none;
}

/* Doit venir après .bw-cta dans la feuille de styles : même spécificité,
   c'est l'ordre qui tranche le "display" en cas d'égalité. */
.bw-nav__cta {
  display: none;
}

/* ---------- Burger ---------- */

.bw-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 42px;
  height: 42px;
  border: 1px solid var(--bw-border);
  border-radius: var(--bw-radius-pill);
  background: transparent;
}

.bw-burger__barre {
  display: block;
  height: 1.5px;
  width: 16px;
  margin-inline: auto;
  background-color: var(--bw-text);
  transition: transform var(--bw-duration-fast) var(--bw-ease),
    opacity var(--bw-duration-fast) var(--bw-ease);
}

.bw-burger__barre--1 {
  transform: translateY(6.5px) rotate(45deg);
}

.bw-burger__barre--2 {
  opacity: 0;
}

.bw-burger__barre--3 {
  transform: translateY(-6.5px) rotate(-45deg);
}

@media (max-width: 940px) {
  .bw-nav {
    position: fixed;
    top: 82px;
    left: 16px;
    right: 16px;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 4px;
    padding: 14px;
    border-radius: var(--bw-radius-lg);
    border: 1px solid var(--bw-border);
    background: rgba(7, 7, 10, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height var(--bw-duration) var(--bw-ease),
      opacity var(--bw-duration-fast) var(--bw-ease);
  }

  .bw-nav--ouvert {
    max-height: 420px;
    opacity: 1;
  }

  .bw-nav__liste {
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
  }

  .bw-nav__lien {
    padding: 13px 14px;
    border-radius: var(--bw-radius-sm);
  }

  .bw-nav__cta {
    display: inline-flex;
    justify-content: center;
    margin-top: 10px;
  }

  .bw-cta--desktop {
    display: none;
  }

  .bw-burger {
    display: flex;
  }
}
</style>
