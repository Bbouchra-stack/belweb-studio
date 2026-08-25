<script setup>
const automatisations = [
  {
    id: 'rendez-vous',
    ton: 'violet',
    titre: 'Prise de rendez-vous automatisée',
    description:
      'Vos clients réservent un créneau sans échange de messages : votre agenda se remplit tout seul et les rappels partent sans que vous y pensiez.',
  },
  {
    id: 'relances',
    ton: 'magenta',
    titre: 'Relances devis & clients',
    description:
      "E-mails et messages de suivi envoyés au bon moment, automatiquement — vous ne perdez plus un devis faute d'avoir relancé à temps.",
  },
  {
    id: 'emails',
    ton: 'corail',
    titre: 'Tri et réponses aux e-mails courants',
    description:
      'Les demandes fréquentes (horaires, tarifs, disponibilités) reçoivent une réponse immédiate, à toute heure.',
  },
  {
    id: 'outils',
    ton: 'orange',
    titre: 'Connexion de vos outils',
    description:
      'Agenda, messagerie, facturation, CRM : vos logiciels échangent enfin leurs informations, sans ressaisie manuelle.',
  },
]
</script>

<template>
  <section id="automatisation" class="section section--sombre section--sombre-alt">
    <div class="container">
      <div class="section__head">
        <span class="eyebrow" v-reveal>Nouveau · Automatisation IA</span>
        <h2 class="section__title" v-reveal="60">
          Libérez du temps sur les tâches répétitives
        </h2>
        <p class="section__subtitle" v-reveal="120">
          Un second service, pensé pour les petites et moyennes entreprises : on
          connecte vos outils et on automatise, grâce à l'IA, ce qui vous fait
          perdre du temps chaque semaine.
        </p>
      </div>

      <ul class="automatisations">
        <li
          v-for="(item, index) in automatisations"
          :key="item.id"
          class="auto"
          :class="`auto--${item.ton}`"
          v-reveal="index * 130"
        >
          <span class="auto__icone" aria-hidden="true">
            <svg
              v-if="item.id === 'rendez-vous'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3.5" y="4.5" width="17" height="16" rx="2.4" />
              <path d="M3.5 9.5h17" />
              <path d="M8 3v3M16 3v3" />
              <path d="m8.2 14.2 2.1 2.1 4.5-4.5" />
            </svg>

            <svg
              v-else-if="item.id === 'relances'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-3.2-6.9" />
              <path d="M21 4v5h-5" />
            </svg>

            <svg
              v-else-if="item.id === 'emails'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
              <path d="m4 7 8 6 8-6" />
            </svg>

            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 15 15 9" />
              <path d="M10.5 6.5 12 5a3 3 0 0 1 4.2 4.2l-1.5 1.5" />
              <path d="M13.5 17.5 12 19a3 3 0 0 1-4.2-4.2l1.5-1.5" />
            </svg>
          </span>

          <h3 class="auto__titre">{{ item.titre }}</h3>
          <p class="auto__description">{{ item.description }}</p>
        </li>
      </ul>

      <div class="auto__pied" v-reveal="180">
        <p>
          Chaque automatisation dépend des outils que vous utilisez déjà. Le
          premier échange est gratuit — on identifie ensemble ce qui vous ferait
          gagner le plus de temps.
        </p>
        <a href="#contact" class="btn btn--primary">Discuter de mon projet</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.automatisations {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.auto {
  position: relative;
  padding: 34px 26px 30px;
  border: 1px solid var(--bw-border);
  border-radius: var(--bw-radius);
  background-color: var(--bw-bg);
  transition: transform var(--bw-duration) var(--bw-ease),
    box-shadow var(--bw-duration) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease);
}

.auto:hover {
  transform: translateY(-6px);
  border-color: var(--bw-border-strong);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35);
}

.auto--violet {
  --teinte-fond: rgba(139, 92, 246, 0.14);
  --teinte-bordure: rgba(139, 92, 246, 0.32);
  --teinte-texte: var(--bw-purple);
}

.auto--magenta {
  --teinte-fond: rgba(200, 78, 220, 0.14);
  --teinte-bordure: rgba(200, 78, 220, 0.32);
  --teinte-texte: var(--bw-magenta);
}

.auto--corail {
  --teinte-fond: rgba(255, 91, 110, 0.14);
  --teinte-bordure: rgba(255, 91, 110, 0.32);
  --teinte-texte: var(--bw-coral);
}

.auto--orange {
  --teinte-fond: rgba(255, 122, 69, 0.14);
  --teinte-bordure: rgba(255, 122, 69, 0.32);
  --teinte-texte: var(--bw-orange);
}

.auto__icone {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 22px;
  border-radius: 50%;
  background-color: var(--teinte-fond);
  border: 1px solid var(--teinte-bordure);
  color: var(--teinte-texte);
}

.auto__icone svg {
  width: 23px;
  height: 23px;
}

.auto__titre {
  font-size: 1.06rem;
  margin-bottom: 10px;
}

.auto__description {
  margin: 0;
  color: var(--bw-text-muted);
  font-size: 0.92rem;
}

.auto__pied {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 18px 28px;
  margin-top: 52px;
  text-align: center;
}

.auto__pied p {
  margin: 0;
  max-width: 52ch;
  color: var(--bw-text-muted);
}

@media (max-width: 980px) {
  .automatisations {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .automatisations {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin-inline: auto;
  }
}
</style>
