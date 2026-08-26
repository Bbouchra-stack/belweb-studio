<script setup>
import { computed } from 'vue'
import LogoMark from './LogoMark.vue'
import { coordonnees, lienWhatsapp } from '../composables/coordonnees.js'
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

const reseaux = [
  { id: 'whatsapp', libelle: 'WhatsApp', url: lienWhatsapp },
  { id: 'instagram', libelle: 'Instagram', url: 'https://instagram.com' },
  { id: 'linkedin', libelle: 'LinkedIn', url: 'https://linkedin.com' },
  { id: 'facebook', libelle: 'Facebook', url: 'https://facebook.com' },
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
              :href="reseau.url"
              class="reseaux__lien"
              :class="{ 'reseaux__lien--whatsapp': reseau.id === 'whatsapp' }"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">{{ reseau.libelle }}</span>

              <svg v-if="reseau.id === 'whatsapp'" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path
                  d="M16.04 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.42L3.2 28.8l6.55-1.71a12.75 12.75 0 0 0 6.29 1.64h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.68zm0 23.34h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.57 10.57 0 0 1-1.62-5.66c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"
                />
              </svg>

              <svg v-else-if="reseau.id === 'instagram'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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

.reseaux__lien:hover,
.reseaux__lien--whatsapp:hover {
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
  font-size: 0.86rem;
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
