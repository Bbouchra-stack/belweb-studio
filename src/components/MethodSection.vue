<script setup>
const etapes = [
  {
    numero: '01',
    ton: 'violet',
    titre: 'Premier échange',
    description:
      "On prend le temps de discuter de votre activité, de celles et ceux que vous recevez, et de vos objectifs. À l'issue de cet échange gratuit, vous recevez un devis clair et sans engagement.",
  },
  {
    numero: '02',
    ton: 'magenta',
    titre: 'Conception sur mesure',
    description:
      "Nous imaginons l'arborescence, les textes et la maquette graphique de votre site. Vous validez le design avant la moindre ligne de code.",
  },
  {
    numero: '03',
    ton: 'corail',
    titre: 'Développement',
    description:
      'Votre site prend vie : intégration responsive, optimisation des performances, référencement naturel et mise en place des formulaires de contact et de prise de rendez-vous.',
  },
  {
    numero: '04',
    ton: 'orange',
    titre: 'Lancement & accompagnement',
    description:
      "Mise en ligne, nom de domaine, hébergement : on s'occupe de tout. Puis nous vous formons pour que vous restiez autonome au quotidien.",
  },
]
</script>

<template>
  <section id="methode" class="section section--sombre">
    <div class="container">
      <div class="section__head">
        <span class="eyebrow" v-reveal>Notre méthode</span>
        <h2 class="section__title" v-reveal="60">Un projet en 4 étapes, sans jargon</h2>
        <p class="section__subtitle" v-reveal="120">
          Une démarche simple et transparente, où vous savez toujours où en est
          votre projet.
        </p>
      </div>

      <ol class="etapes">
        <li
          v-for="(etape, index) in etapes"
          :key="etape.numero"
          class="etape"
          :class="`etape--${etape.ton}`"
          v-reveal="index * 140"
        >
          <span class="etape__numero" aria-hidden="true">{{ etape.numero }}</span>
          <h3 class="etape__titre">{{ etape.titre }}</h3>
          <p class="etape__description">{{ etape.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.etapes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.etape {
  position: relative;
  min-width: 0;
  padding: 36px 26px 32px;
  border: 1px solid var(--bw-border);
  border-radius: var(--bw-radius);
  /* Lueur colorée concentrée en haut, qui s'éteint avant la zone de
     texte — coloré et vivant, sans jamais menacer la lisibilité. */
  background: radial-gradient(130% 110% at 18% -12%, var(--teinte-lueur), transparent 60%),
    var(--bw-bg-alt);
  overflow: hidden;
  transition: transform var(--bw-duration) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease),
    box-shadow var(--bw-duration) var(--bw-ease);
}

/* Filet coloré en haut de carte */
.etape::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--teinte);
}

.etape:hover {
  transform: translateY(-6px);
  border-color: var(--bw-border-strong);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35), 0 0 0 1px var(--bw-border) inset;
}

.etape--violet {
  --teinte: var(--bw-purple);
  --teinte-lueur: rgba(139, 92, 246, 0.45);
}

.etape--magenta {
  --teinte: var(--bw-magenta);
  --teinte-lueur: rgba(200, 78, 220, 0.42);
}

.etape--corail {
  --teinte: var(--bw-coral);
  --teinte-lueur: rgba(255, 91, 110, 0.4);
}

.etape--orange {
  --teinte: var(--bw-orange);
  --teinte-lueur: rgba(255, 122, 69, 0.4);
}

.etape__numero {
  display: block;
  text-align: center;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 2.6rem;
  font-weight: 500;
  line-height: 1;
  color: var(--teinte);
  opacity: 0.9;
  margin-bottom: 20px;
}

.etape__titre {
  text-align: center;
  font-size: 1.04rem;
  margin-bottom: 12px;
}

.etape__description {
  margin: 0;
  font-size: 0.95rem;
  color: var(--bw-text-muted);
}

@media (max-width: 980px) {
  .etapes {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .etapes {
    grid-template-columns: 1fr;
  }
}
</style>
