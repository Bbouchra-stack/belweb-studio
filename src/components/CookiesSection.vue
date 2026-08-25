<script setup>
import { choixCookies } from '../composables/consentement.js'

const familles = [
  { id: 'essentiels', titre: 'Cookies essentiels', statut: 'Toujours actifs' },
  { id: 'mesure', titre: "Mesure d'audience", statut: 'Soumis à votre accord' },
  { id: 'choix', titre: 'Vos choix', statut: 'Modifiable à tout moment' },
]

const libelleChoix = {
  accepte: 'Vous avez accepté la mesure d’audience.',
  refuse: 'Vous avez refusé la mesure d’audience.',
}
</script>

<template>
  <!-- Simple rappel informatif, volontairement discret : la gestion des
       cookies (bouton + lien vers la politique) vit uniquement dans le
       pied de page juste en dessous, pour éviter le double emploi. -->
  <section id="cookies" class="cookies">
    <div class="container cookies__inner" v-reveal>
      <p class="cookies__texte">
        <strong>Cookies&nbsp;:</strong> nous utilisons le strict nécessaire, et
        rien ne se fait sans votre accord.
        <span v-if="choixCookies">{{ libelleChoix[choixCookies] }}</span>
      </p>

      <ul class="familles">
        <li v-for="famille in familles" :key="famille.id" class="famille">
          {{ famille.titre }} <span>· {{ famille.statut }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cookies {
  padding: 18px 0;
  background-color: var(--bw-bg-alt);
  border-top: 1px solid var(--bw-border);
  color: var(--bw-text-muted);
  scroll-margin-top: var(--header-h);
}

.cookies__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px 28px;
}

.cookies__texte {
  margin: 0;
  font-size: 0.76rem;
  line-height: 1.5;
  max-width: 46ch;
}

.cookies__texte strong {
  color: var(--bw-text);
  font-weight: 600;
}

.familles {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 20px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.72rem;
}

.famille {
  color: var(--bw-text);
}

.famille span {
  color: var(--bw-text-muted);
  font-weight: 400;
}

@media (max-width: 640px) {
  .cookies__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
