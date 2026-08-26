<script setup>
/**
 * Statuts affichés sur chaque carte : « Réalisé » pour un site livré et en
 * ligne, « Concept » pour une démonstration non commandée par un client.
 * Le statut reste visible sur la vignette pour ne jamais laisser croire à
 * une réalisation livrée quand ce n'est pas le cas — un portfolio inventé
 * se retourne toujours contre son auteur, et la loi 31-08 sanctionne la
 * publicité trompeuse.
 */
// Les images du dossier public/ ne sont pas réécrites par Vite quand elles
// sont référencées en JS (contrairement aux <img> statiques du HTML) : sans
// ce préfixe, elles pointent toujours vers la racine du domaine et cassent
// dès que le site est publié sous un sous-chemin (ex. /belweb-studio/).
const base = import.meta.env.BASE_URL

const classesStatut = {
  Concept: 'concept',
  Réalisé: 'realise',
  'En cours': 'cours',
}

const projets = [
  {
    id: 1,
    image: `${base}portfolio/integra-academy.jpg`,
    alt: 'Aperçu de la page d\'accueil du site INTEGRA Academy, à Tanger',
    categorie: 'Formation',
    statut: 'Réalisé',
    titre: 'INTEGRA Academy',
    description:
      'Présentation de la formatrice, du programme et de la méthode, avec un espace actualités et un formulaire de contact.',
  },
  {
    id: 2,
    image: `${base}portfolio/projet-1.svg`,
    alt: "Aperçu du concept de site pour un cabinet dentaire",
    categorie: 'Cabinet médical',
    statut: 'Concept',
    titre: 'Cabinet Dentaire Sérénité',
    description:
      "Présentation de l'équipe et des spécialités, horaires, plan d'accès et prise de rendez-vous en ligne : le patient trouve tout avant même d'appeler.",
  },
  {
    id: 3,
    image: `${base}portfolio/vision-line-auto.jpg`,
    alt: "Aperçu de la page d'accueil du site Vision Line Auto, garage automobile à Tanger",
    categorie: 'Automobile',
    statut: 'Réalisé',
    titre: 'Vision Line Auto',
    description:
      'Diagnostic de précision, mécanique et peinture haute finition, avec demande de devis et prise de contact par WhatsApp.',
  },
]
</script>

<template>
  <section id="portfolio" class="section section--sombre">
    <div class="container">
      <div class="section__head">
        <span class="eyebrow" v-reveal>Portfolio</span>
        <h2 class="section__title" v-reveal="60">Un aperçu de ce que nous créons</h2>
        <p class="section__subtitle" v-reveal="120">
          Un aperçu de nos réalisations livrées ; notre portfolio complet
          est mis à disposition sur demande.
        </p>
      </div>

      <ul class="projets">
        <li
          v-for="(projet, index) in projets"
          :key="projet.id"
          class="projet"
          v-reveal="index * 150"
        >
          <div class="projet__media">
            <img :src="projet.image" :alt="projet.alt" loading="lazy" width="800" height="560" />
            <span class="projet__categorie">{{ projet.categorie }}</span>
            <span
              class="projet__statut"
              :class="`projet__statut--${classesStatut[projet.statut]}`"
            >
              {{ projet.statut }}
            </span>
          </div>
          <div class="projet__corps">
            <h3 class="projet__titre">{{ projet.titre }}</h3>
            <p class="projet__description">{{ projet.description }}</p>
          </div>
        </li>
      </ul>

      <p class="projets__note" v-reveal="120">
        Un projet en tête&nbsp;?
        <a href="#contact">Parlons-en, le premier échange est gratuit.</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.projets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.projet {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--bw-bg-alt);
  border: 1px solid var(--bw-border);
  border-radius: var(--bw-radius);
  transition: transform var(--bw-duration) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease),
    box-shadow var(--bw-duration) var(--bw-ease);
}

.projet:hover {
  transform: translateY(-6px);
  border-color: var(--bw-border-strong);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35);
}

.projet__media {
  position: relative;
  overflow: hidden;
  background-color: var(--bw-bg);
}

.projet__media img {
  width: 100%;
  height: auto;
  aspect-ratio: 10 / 7;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.projet:hover .projet__media img {
  transform: scale(1.05);
}

.projet__categorie {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 14px;
  border-radius: var(--bw-radius-pill);
  background-color: rgba(7, 7, 10, 0.72);
  border: 1px solid var(--bw-border);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projet__statut {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 5px 12px;
  border-radius: var(--bw-radius-pill);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.projet__statut--concept {
  background-color: rgba(255, 255, 255, 0.94);
  color: var(--bw-bg);
}

.projet__statut--cours {
  background: linear-gradient(90deg, var(--bw-coral), var(--bw-orange));
  color: #1a0906;
}

.projet__statut--realise {
  background: var(--bw-gradient);
  color: #050301;
}

.projet__corps {
  padding: 28px 26px 30px;
}

.projet__titre {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.projet__description {
  margin: 0;
  color: var(--bw-text-muted);
  font-size: 0.95rem;
}

.projets__note {
  margin: 46px 0 0;
  text-align: center;
  color: var(--bw-text-muted);
}

.projets__note a {
  font-weight: 600;
  border-bottom: 1px solid var(--bw-coral);
}

@media (max-width: 900px) {
  .projets {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .projets {
    grid-template-columns: 1fr;
    max-width: 460px;
    margin-inline: auto;
  }
}
</style>
