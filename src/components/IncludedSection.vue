<script setup>
const reperes = [
  { valeur: '3 sem.', libelle: 'Délai moyen de livraison' },
  { valeur: '100 %', libelle: 'Sites responsives' },
  { valeur: '6 mois', libelle: "D'accompagnement inclus" },
]

const prestations = [
  {
    titre: 'Un site impeccable sur tous les écrans',
    detail: 'Mobile, tablette et ordinateur : chaque affichage est vérifié un par un.',
  },
  {
    titre: 'Un design sur mesure, à votre image',
    detail: 'Vos couleurs, votre univers, votre ton — jamais un modèle recyclé.',
  },
  {
    titre: 'Nom de domaine et hébergement sécurisé',
    detail: 'Connexion chiffrée HTTPS et cadenas de sécurité inclus dès le premier jour.',
  },
  {
    titre: 'Un formulaire qui vous amène des demandes',
    detail: 'Contact ou prise de rendez-vous, directement dans votre boîte mail.',
  },
  {
    titre: 'Les bases du référencement Google',
    detail: 'Titres, descriptions et vitesse optimisés pour que l’on vous trouve.',
  },
  {
    titre: 'Sauvegardes et maintenance continues',
    detail: 'Mises à jour, surveillance et restauration en cas de problème.',
  },
  {
    titre: 'Une formation à la prise en main',
    detail: 'Une heure pour devenir autonome sur vos textes, photos et horaires.',
  },
  {
    titre: 'Un support technique réactif',
    detail: 'Un interlocuteur unique, joignable directement — sans centre d’appel.',
  },
]
</script>

<template>
  <section id="inclus" class="section section--sombre">
    <div class="container">
      <div class="section__head">
        <span class="eyebrow" v-reveal>Prestation clé en main</span>
        <h2 class="section__title" v-reveal="60">Ce que comprend votre site</h2>
        <p class="section__subtitle" v-reveal="120">
          Tout le nécessaire à une présence en ligne professionnelle, réuni dans
          une seule prestation. Vous n'avez rien à assembler ni à négocier
          ailleurs.
        </p>
      </div>

      <ul class="reperes" v-reveal>
        <li v-for="repere in reperes" :key="repere.libelle">
          <strong>{{ repere.valeur }}</strong>
          <span>{{ repere.libelle }}</span>
        </li>
      </ul>

      <ul class="prestations">
        <li
          v-for="(prestation, index) in prestations"
          :key="prestation.titre"
          class="prestation"
          v-reveal="index * 90"
        >
          <span class="prestation__coche" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          <div>
            <h3 class="prestation__titre">{{ prestation.titre }}</h3>
            <p class="prestation__detail">{{ prestation.detail }}</p>
          </div>
        </li>
      </ul>

      <div class="prestations__pied" v-reveal="120">
        <p>
          Le tout à partir de <strong>2&nbsp;500,00 dirhams</strong>, devis
          détaillé et sans engagement.
        </p>
        <a href="#contact" class="btn btn--primary">Demander mon devis</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reperes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px 56px;
  margin: 0 0 56px;
  padding: 0 0 44px;
  border-bottom: 1px solid var(--bw-border);
  list-style: none;
  text-align: center;
}

.reperes li {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.reperes strong {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.1;
  background: var(--bw-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.reperes span {
  font-size: 0.84rem;
  color: var(--bw-text-muted);
}

.prestations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px 48px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.prestation {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 22px 4px;
  border-bottom: 1px solid var(--bw-border);
}

.prestation__coche {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  margin-top: 2px;
  border-radius: 50%;
  background-color: rgba(139, 92, 246, 0.14);
  border: 1px solid rgba(139, 92, 246, 0.32);
  color: var(--bw-purple);
  transition: background-color var(--bw-duration-fast) var(--bw-ease),
    color var(--bw-duration-fast) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease);
}

.prestation:hover .prestation__coche {
  background: var(--bw-gradient);
  border-color: transparent;
  color: #fff;
}

.prestation__coche svg {
  width: 16px;
  height: 16px;
}

.prestation__titre {
  font-family: var(--font-texte);
  font-size: 1rem;
  font-weight: 600;
  color: var(--bw-text);
  margin-bottom: 4px;
}

.prestation__detail {
  margin: 0;
  font-size: 0.92rem;
  color: var(--bw-text-muted);
}

.prestations__pied {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px 28px;
  margin-top: 52px;
  text-align: center;
}

.prestations__pied p {
  margin: 0;
  color: var(--bw-text-muted);
}

.prestations__pied strong {
  color: var(--bw-text);
  font-family: var(--font-display);
  font-size: 1.16rem;
}

@media (max-width: 860px) {
  .prestations {
    grid-template-columns: 1fr;
    gap: 0;
    max-width: 620px;
    margin-inline: auto;
  }
}
</style>
