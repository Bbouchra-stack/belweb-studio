<script setup>
import { computed, ref } from 'vue'

const questions = [
  {
    id: 'delai',
    question: 'Combien de temps faut-il pour créer un site ?',
    reponse:
      "Comptez en moyenne 3 à 4 semaines pour un site vitrine, à partir du moment où nous avons vos contenus (textes, photos, logo). Les projets plus complexes (prise de rendez-vous, boutique en ligne) demandent généralement 6 à 8 semaines. Un planning précis vous est remis avec le devis.",
  },
  {
    id: 'tarif',
    question: 'Combien coûte un site vitrine ?',
    reponse:
      "Un site vitrine démarre à partir de 2 500,00 dirhams, hébergement et nom de domaine de la première année inclus. Le tarif final dépend du nombre de pages et des fonctionnalités souhaitées. Le devis est gratuit, détaillé et sans engagement.",
  },
  {
    id: 'mobile',
    question: 'Le site sera-t-il adapté au mobile ?',
    reponse:
      "Oui, systématiquement. Chaque site est conçu « mobile d'abord » puis vérifié sur téléphone, tablette et ordinateur. Plus de 7 visiteurs sur 10 arrivent depuis un mobile : c'est une priorité, pas une option.",
  },
  {
    id: 'hebergement',
    question: "Qui gère l'hébergement et le nom de domaine ?",
    reponse:
      "Nous nous chargeons de la réservation du nom de domaine (.ma, .com…) et de la mise en place de l'hébergement, puis nous vous en transmettons la pleine propriété. Vous pouvez aussi nous confier la gestion technique dans le cadre du forfait de maintenance.",
  },
  {
    id: 'modification',
    question: 'Puis-je modifier mon site moi-même ensuite ?',
    reponse:
      "Bien sûr. Votre site est livré avec une interface d'administration simple et une session de formation d'une heure. Vous pouvez modifier vos textes, vos photos, vos horaires ou publier des actualités sans connaissance technique.",
  },
]

const ouverte = ref(questions[0].id)

// Répartition en deux colonnes sur grand écran (3 + 2).
const milieu = Math.ceil(questions.length / 2)
const colonnes = computed(() => [
  questions.slice(0, milieu),
  questions.slice(milieu),
])

function basculer(id) {
  ouverte.value = ouverte.value === id ? null : id
}
</script>

<template>
  <section id="faq" class="section section--sombre">
    <div class="container">
      <div class="section__head">
        <span class="eyebrow" v-reveal>FAQ</span>
        <h2 class="section__title" v-reveal="60">Les questions que l'on nous pose souvent</h2>
        <p class="section__subtitle" v-reveal="120">
          Vous ne trouvez pas votre réponse&nbsp;? Écrivez-nous, nous répondons
          sous 24&nbsp;h ouvrées.
        </p>
      </div>

      <div class="faq">
        <div v-for="(colonne, iCol) in colonnes" :key="iCol" class="faq__colonne">
        <div
          v-for="(item, index) in colonne"
          :key="item.id"
          class="faq__item"
          v-reveal="(iCol * colonnes[0].length + index) * 90"
        >
          <h3 class="faq__titre">
            <button
              class="faq__bouton"
              type="button"
              :aria-expanded="ouverte === item.id"
              :aria-controls="`reponse-${item.id}`"
              :id="`question-${item.id}`"
              @click="basculer(item.id)"
            >
              <span>{{ item.question }}</span>
              <span
                class="faq__chevron"
                :class="{ 'faq__chevron--ouvert': ouverte === item.id }"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
          </h3>

          <Transition name="repli">
            <div
              v-show="ouverte === item.id"
              :id="`reponse-${item.id}`"
              role="region"
              :aria-labelledby="`question-${item.id}`"
              class="faq__reponse"
            >
              <p>{{ item.reponse }}</p>
            </div>
          </Transition>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 56px;
  align-items: start;
}

.faq__colonne {
  border-top: 1px solid var(--bw-border);
}

.faq__item {
  border-bottom: 1px solid var(--bw-border);
}

.faq__titre {
  margin: 0;
  font-family: var(--font-texte);
  font-size: 1rem;
}

.faq__bouton {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 26px 8px;
  border: 0;
  background: none;
  text-align: left;
  color: var(--bw-text);
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 500;
  transition: color var(--bw-duration-fast) var(--bw-ease);
}

.faq__bouton:hover {
  color: var(--bw-text);
}

.faq__chevron {
  display: grid;
  place-items: center;
  flex: 0 0 34px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--bw-border);
  border-radius: 50%;
  color: var(--bw-text);
  transition: transform var(--bw-duration) var(--bw-ease),
    background-color var(--bw-duration-fast) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease);
}

.faq__chevron svg {
  width: 17px;
  height: 17px;
}

.faq__bouton:hover .faq__chevron {
  border-color: transparent;
  background: var(--bw-gradient);
}

.faq__chevron--ouvert {
  transform: rotate(180deg);
}

.faq__reponse {
  padding: 0 8px 28px;
  color: var(--bw-text-muted);
  overflow: hidden;
}

.faq__reponse p {
  margin: 0;
  max-width: 70ch;
  border-left: 2px solid var(--bw-purple);
  padding-left: 18px;
}

/* Animation d'ouverture / fermeture */
.repli-enter-active,
.repli-leave-active {
  transition: opacity 0.26s ease, transform 0.26s ease;
}

.repli-enter-from,
.repli-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 900px) {
  .faq {
    grid-template-columns: 1fr;
    max-width: 780px;
    margin-inline: auto;
    gap: 0;
  }

  /* Une seule bordure haute quand les colonnes s'empilent. */
  .faq__colonne + .faq__colonne {
    border-top: 0;
  }
}

@media (max-width: 640px) {
  .faq__bouton {
    padding: 22px 2px;
    font-size: 1.02rem;
  }

  .faq__reponse {
    padding: 0 2px 24px;
  }
}
</style>
