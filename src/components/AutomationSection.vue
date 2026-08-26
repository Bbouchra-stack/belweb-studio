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
          v-reveal="index * 100"
        >
          <span class="auto__lueur" aria-hidden="true"></span>
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
  overflow: hidden;
  padding: 34px 26px 30px;
  border: 1px solid var(--bw-border);
  border-radius: var(--bw-radius);
  background-color: var(--bw-bg);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease;
}

/* Filet d'accent en haut de carte : se remplit de gauche à droite à
   l'arrivée (petite touche « flux/traitement »), puis s'intensifie
   légèrement au survol. */
.auto::before {
  content: '';
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--teinte-texte), transparent 85%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--delai, 0ms) + 260ms),
    opacity 0.3s ease;
}

.auto.reveal--visible::before {
  transform: scaleX(1);
}

.auto:hover::before {
  opacity: 1;
  background: linear-gradient(90deg, var(--teinte-texte), var(--teinte-texte) 40%, transparent 90%);
}

/* Reflet diagonal qui balaie la carte au survol — sensation « premium »,
   coût nul (une seule translation, pas de repaint continu). */
.auto__lueur {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    115deg,
    transparent 30%,
    rgba(255, 255, 255, 0.09) 48%,
    transparent 66%
  );
  transform: translateX(-130%);
  transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.auto:hover .auto__lueur {
  transform: translateX(130%);
}

.auto:hover {
  transform: translateY(-9px) scale(1.015);
  border-color: var(--teinte-bordure);
  box-shadow: 0 26px 52px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--teinte-bordure) inset,
    0 0 40px -18px var(--teinte-bordure);
}

/* Entrée dynamique : plus ample et plus rapide que l'apparition générique
   du reste du site (v-reveal par défaut), pour une section volontairement
   plus énergique — sans toucher au système global de révélation. */
.auto.reveal {
  transform: translateY(46px) scale(0.94);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.auto.reveal--visible {
  transform: none;
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease;
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
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 22px;
  border-radius: 50%;
  background-color: var(--teinte-fond);
  border: 1px solid var(--teinte-bordure);
  color: var(--teinte-texte);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
}

/* Halo qui respire doucement autour de l'icône une fois la carte visible :
   suggère une activité continue (automatisation), sans jamais tourner ni
   distraire — amplitude et fréquence volontairement discrètes. */
.auto.reveal--visible .auto__icone::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1px solid var(--teinte-bordure);
  opacity: 0;
  animation: auto-icone-respirer 3.6s ease-in-out calc(var(--delai, 0ms) + 900ms) infinite;
}

@keyframes auto-icone-respirer {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.55;
    transform: scale(1.14);
  }
}

.auto__icone svg {
  width: 23px;
  height: 23px;
}

/* Entrée : léger « pop » décalé après le début du mouvement de la carte. */
.auto.reveal .auto__icone {
  opacity: 0;
  transform: scale(0.4) rotate(-16deg);
  transition: opacity 0.5s ease calc(var(--delai, 0ms) + 160ms),
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--delai, 0ms) + 160ms);
}

.auto.reveal--visible .auto__icone {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
}

.auto:hover .auto__icone {
  transform: scale(1.12);
  box-shadow: 0 0 0 7px var(--teinte-fond), 0 0 26px -6px var(--teinte-bordure);
}

.auto__titre {
  position: relative;
  z-index: 1;
  font-size: 1.06rem;
  margin-bottom: 10px;
}

.auto__description {
  position: relative;
  z-index: 1;
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

@media (prefers-reduced-motion: reduce) {
  .auto__icone::after {
    animation: none;
  }

  .auto__lueur {
    display: none;
  }
}
</style>
