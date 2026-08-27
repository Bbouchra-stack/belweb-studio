<script setup>
import { computed } from 'vue'
import LogoMark from './LogoMark.vue'
import { coordonnees } from '../composables/coordonnees.js'
import { rouvrirBanniere } from '../composables/consentement.js'

const props = defineProps({
  prefixeAncres: { type: String, default: '' },
})

const annee = new Date().getFullYear()

const liensNav = computed(() =>
  [
    { ancre: '#methode', label: 'Notre méthode' },
    { ancre: '#avantages', label: 'Nos avantages' },
    { ancre: '#portfolio', label: 'Portfolio' },
    { ancre: '#automatisation', label: 'Automatisation IA' },
    { ancre: '#faq', label: 'FAQ' },
    { ancre: '#contact', label: 'Contact' },
  ].map((lien) => ({ ...lien, href: `${props.prefixeAncres}${lien.ancre}` })),
)

const lienAccueil = computed(() => `${props.prefixeAncres}#accueil`)

// Liens à intégrer dès la création des comptes du studio : les icônes
// restent affichées (identité visuelle prête), sans href tant qu'il n'y
// a pas de compte réel à cibler.
const reseaux = [
  { id: 'instagram', libelle: 'Instagram', url: '' },
  { id: 'linkedin', libelle: 'LinkedIn', url: '' },
  { id: 'facebook', libelle: 'Facebook', url: '' },
]
</script>

<template>
  <footer class="pied">
    <div class="container pied__inner">
      <div class="pied__marque">
        <a :href="lienAccueil" class="logo">
          <LogoMark :taille="46" />
          <span class="logo__texte">
            <span class="logo__nom">BELWEB</span>
            <span class="logo__studio">Studio</span>
          </span>
        </a>
        <p class="pied__baseline">
          Création de sites web sur mesure pour les professionnels et les
          entreprises de Casablanca.
        </p>

        <ul class="reseaux">
          <li v-for="reseau in reseaux" :key="reseau.id">
            <a
              :href="reseau.url || null"
              class="reseaux__lien"
              :target="reseau.url ? '_blank' : undefined"
              :rel="reseau.url ? 'noopener noreferrer' : undefined"
            >
              <span class="sr-only">{{ reseau.libelle }}</span>

              <svg v-if="reseau.id === 'instagram'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>

              <svg v-else-if="reseau.id === 'linkedin'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M7.5 10.5V17" />
                <circle cx="7.5" cy="7.3" r="1.1" fill="currentColor" stroke="none" />
                <path d="M11.5 17v-3.6a2.6 2.6 0 0 1 5.2 0V17" />
                <path d="M11.5 10.5V17" />
              </svg>

              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M14.5 21v-7.5h2.6l.5-3h-3.1V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4A21 21 0 0 0 15.3 4c-2.4 0-4 1.4-4 4.1v2.4H8.6v3h2.7V21" />
              </svg>
            </a>
          </li>
        </ul>
      </div>

      <nav class="pied__colonne" aria-label="Navigation de bas de page">
        <h2 class="pied__titre">Navigation</h2>
        <ul class="pied__liste">
          <li v-for="lien in liensNav" :key="lien.ancre">
            <a :href="lien.href">{{ lien.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="pied__colonne">
        <h2 class="pied__titre">Contact</h2>
        <ul class="pied__liste">
          <li>
            <a :href="`tel:${coordonnees.telephoneLien}`">{{ coordonnees.telephoneAffiche }}</a>
          </li>
          <li>
            <a :href="`mailto:${coordonnees.email}`">{{ coordonnees.email }}</a>
          </li>
          <li>
            {{ coordonnees.adresseLigne1 }}<br />
            {{ coordonnees.adresseLigne2 }}
          </li>
          <li>{{ coordonnees.horaires }}</li>
        </ul>
      </div>
    </div>

    <div class="container pied__bas">
      <p>© {{ annee }} {{ coordonnees.nom }} — Tous droits réservés.</p>
      <p class="pied__mentions">
        <a href="mentions-legales.html">Mentions légales</a>
        <span aria-hidden="true">·</span>
        <a href="politique-de-confidentialite.html">Confidentialité</a>
        <span aria-hidden="true">·</span>
        <a href="cgv.html">CGV</a>
        <span aria-hidden="true">·</span>
        <button type="button" class="pied__bouton-lien" @click="rouvrirBanniere">
          Gérer mes cookies
        </button>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.pied {
  background-color: var(--bw-bg);
  border-top: 1px solid var(--bw-border);
  color: var(--bw-text-muted);
  padding-top: 72px;
}

.pied__inner {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1.1fr;
  gap: 44px;
  padding-bottom: 52px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: #fff;
}

.logo:hover {
  color: #fff;
}

.logo__texte {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.logo__nom {
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--bw-text);
}

.logo__studio {
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--bw-text-muted);
}

.pied__baseline {
  max-width: 40ch;
  color: var(--bw-text-muted);
  font-size: 0.94rem;
  text-align: justify;
}

.reseaux {
  display: flex;
  gap: 12px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}

.reseaux__lien {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--bw-border-strong);
  border-radius: var(--bw-radius-pill);
  color: var(--bw-text);
  transition: background-color var(--bw-duration-fast) var(--bw-ease),
    color var(--bw-duration-fast) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease),
    transform var(--bw-duration-fast) var(--bw-ease);
}

.reseaux__lien:hover {
  background: var(--bw-gradient);
  border-color: transparent;
  color: #fff;
  transform: translateY(-2px);
}

.reseaux__lien svg {
  width: 19px;
  height: 19px;
}

.pied__titre {
  color: var(--bw-text);
  font-family: var(--font-texte);
  font-size: 0.74rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 20px;
}

.pied__liste {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.94rem;
}

.pied__liste li {
  margin-bottom: 12px;
  color: var(--bw-text-muted);
}

.pied__liste a {
  color: var(--bw-text-muted);
}

.pied__liste a:hover {
  color: var(--bw-coral);
}

.pied__bas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 24px;
  padding-top: 24px;
  padding-bottom: 30px;
  border-top: 1px solid var(--bw-border);
  font-size: 0.6rem;
  color: var(--bw-text-muted);
}

.pied__bas p {
  margin: 0;
}

.pied__mentions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pied__mentions a,
.pied__bouton-lien {
  color: var(--bw-text-muted);
}

.pied__mentions a:hover,
.pied__bouton-lien:hover {
  color: var(--bw-coral);
}

.pied__bouton-lien {
  padding: 0;
  border: 0;
  background: none;
  font-size: inherit;
  transition: color 0.2s ease;
}

@media (max-width: 900px) {
  .pied__inner {
    grid-template-columns: 1fr 1fr;
  }

  .pied__marque {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .pied__inner {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .pied__bas {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
