<script setup>
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import WhatsAppButton from './WhatsAppButton.vue'
import CookieBanner from './CookieBanner.vue'

defineProps({
  titre: { type: String, required: true },
  chapeau: { type: String, default: '' },
  miseAJour: { type: String, default: '' },
})
</script>

<template>
  <TheHeader prefixe-ancres="index.html" />

  <main id="contenu">
    <header class="legal-hero">
      <div class="container">
        <a href="index.html" class="legal-hero__retour">← Retour à l'accueil</a>
        <h1 class="legal-hero__titre">{{ titre }}</h1>
        <p v-if="chapeau" class="legal-hero__chapeau">{{ chapeau }}</p>
        <p v-if="miseAJour" class="legal-hero__date">
          Dernière mise à jour : {{ miseAJour }}
        </p>
      </div>
    </header>

    <div class="container legal-corps">
      <article class="prose">
        <slot />
      </article>
    </div>
  </main>

  <TheFooter prefixe-ancres="/" />
  <WhatsAppButton />
  <CookieBanner />
</template>

<style scoped>
.legal-hero {
  background-color: var(--bw-bg);
  color: var(--bw-text-muted);
  padding: 64px 0 52px;
}

.legal-hero__retour {
  display: inline-block;
  margin-bottom: 22px;
  color: var(--bw-purple);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.legal-hero__retour:hover {
  color: var(--bw-coral);
}

.legal-hero__titre {
  font-family: var(--font-display);
  font-weight: 560;
  font-size: clamp(1.7rem, 1.2rem + 2vw, 2.3rem);
  color: var(--bw-text);
  margin-bottom: 14px;
}

.legal-hero__chapeau {
  max-width: 62ch;
  margin: 0 0 12px;
  font-size: 0.92rem;
  color: var(--bw-text-muted);
}

.legal-hero__date {
  margin: 0;
  font-size: 0.78rem;
  color: rgba(245, 245, 247, 0.4);
}

.legal-corps {
  padding-block: 56px 80px;
  background-color: var(--bw-bg);
}

.prose {
  max-width: 76ch;
  margin-inline: auto;
  /* Couleur de base pour tout texte non explicitement redéfini (ex. les
     cellules <td> du tableau), afin qu'aucun élément n'hérite plus de
     l'ancienne teinte claire du body. */
  color: var(--bw-text-muted);
}

@media (max-width: 640px) {
  .legal-hero {
    padding: 48px 0 44px;
  }

  .legal-corps {
    padding-block: 44px 64px;
  }
}
</style>
