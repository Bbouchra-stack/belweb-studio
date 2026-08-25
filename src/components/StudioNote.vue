<script setup>
/**
 * Le mot du studio.
 *
 * Ce qui humanise un site n'est pas nécessairement un visage : c'est une
 * voix. Cette section donne au studio une présence personnelle sans aucune
 * photo, en assumant la première personne.
 *
 * ─────────────────────────────────────────────────────────────────────
 *  TEXTE À PERSONNALISER — proposition de départ, à remplacer par vos
 *  propres mots. Gardez le ton direct et la première personne : c'est ce
 *  qui fait la différence avec une page « À propos » ordinaire.
 *  Évitez d'y ajouter des faits invérifiables (années d'expérience,
 *  nombre de clients) tant qu'ils ne sont pas exacts.
 * ─────────────────────────────────────────────────────────────────────
 */

const paragraphes = [
  "J'ai créé BELWEB Studio avec une conviction simple : un site web n'est pas un produit qu'on prend sur une étagère, c'est une vitrine qu'on dessine pour une activité précise.",
  "Trop de professionnels et de petites entreprises se retrouvent avec un modèle recyclé qu'ils n'osent montrer à personne. Ici, chaque projet commence par une conversation, et vous parlez à la même personne du premier échange jusqu'à la mise en ligne.",
  "C'est plus lent qu'un site en trois clics. C'est aussi la seule façon d'obtenir quelque chose qui vous ressemble vraiment.",
]

// Signature : à remplacer par votre prénom si vous souhaitez l'afficher.
const signature = 'Le studio'
const lieu = 'Casablanca'
</script>

<template>
  <section id="studio" class="section section--sombre section--sombre-alt mot">
    <div class="container mot__inner">
      <span class="eyebrow" v-reveal>Le mot du studio</span>

      <figure class="mot__bloc">
        <blockquote class="mot__texte" v-reveal="80">
        <span class="mot__guillemet" aria-hidden="true">«</span>
        <p v-for="(paragraphe, index) in paragraphes" :key="index">
          {{ paragraphe }}
        </p>
        </blockquote>

        <figcaption class="mot__signature" v-reveal="180">
          <span class="mot__filet" aria-hidden="true"></span>
          <span class="mot__nom">{{ signature }}</span>
          <span class="mot__lieu">{{ lieu }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.mot__inner {
  max-width: 760px;
  text-align: center;
}

.mot__inner .eyebrow {
  justify-content: center;
}

.mot__bloc {
  margin: 0;
}

.mot__texte {
  position: relative;
  margin: 0 0 40px;
  padding: 0;
}

.mot__guillemet {
  display: block;
  font-family: var(--font-display);
  font-size: 4rem;
  line-height: 0.6;
  background: var(--bw-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.7;
  margin-bottom: 18px;
}

.mot__texte p {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 0.95rem + 0.7vw, 1.45rem);
  font-style: italic;
  line-height: 1.55;
  color: var(--bw-text);
  margin: 0 auto 22px;
  max-width: 58ch;
  text-wrap: pretty;
}

/* Les deux derniers paragraphes reviennent au corps de texte : la
   respiration typographique évite le pavé italique indigeste. */
.mot__texte p:not(:first-of-type) {
  font-family: var(--font-texte);
  font-style: normal;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--bw-text-muted);
}

.mot__texte p:last-child {
  margin-bottom: 0;
}

.mot__signature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.mot__filet {
  width: 52px;
  height: 1px;
  margin-bottom: 18px;
  background: var(--bw-gradient);
}

.mot__nom {
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-style: italic;
  color: var(--bw-text);
}

.mot__lieu {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--bw-text-muted);
}

@media (max-width: 640px) {
  .mot__guillemet {
    font-size: 3rem;
  }
}
</style>
