<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Élément signature du héro : les performances réelles de cette page,
 * mesurées dans le navigateur du visiteur.
 *
 * Le parti pris : un studio web ne prouve pas son savoir-faire avec une
 * maquette dessinée, mais avec la page que le visiteur est en train de
 * regarder. Les chiffres sont donc mesurés, jamais écrits en dur.
 */

const mesures = ref(null)
const anime = ref(false)

const animationsReduites =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Valeurs affichées pendant le décompte
const affichage = ref({ affichage: 0, poids: 0, requetes: 0 })
let image = null

function relever() {
  if (typeof performance === 'undefined' || !performance.getEntriesByType) return

  const navigation = performance.getEntriesByType('navigation')[0]
  const ressources = performance.getEntriesByType('resource')

  const peinture = performance
    .getEntriesByType('paint')
    .find((e) => e.name === 'first-contentful-paint')

  const millisecondes = peinture
    ? peinture.startTime
    : navigation?.domContentLoadedEventEnd

  // transferSize vaut 0 pour les ressources tierces sans en-tête
  // Timing-Allow-Origin : on retombe alors sur la taille encodée.
  const octets = [navigation, ...ressources].reduce((total, entree) => {
    if (!entree) return total
    return total + (entree.transferSize || entree.encodedBodySize || 0)
  }, 0)

  if (!millisecondes || !octets) return

  mesures.value = {
    affichage: Math.round(millisecondes),
    poids: Math.round(octets / 1024),
    requetes: ressources.length + 1,
  }

  demarrerDecompte()
}

function demarrerDecompte() {
  anime.value = true

  if (animationsReduites) {
    affichage.value = { ...mesures.value }
    return
  }

  const duree = 900
  const depart = performance.now()

  const avancer = (maintenant) => {
    const t = Math.min((maintenant - depart) / duree, 1)
    // Décélération : rapide au début, posée à l'arrivée
    const progression = 1 - Math.pow(1 - t, 3)

    affichage.value = {
      affichage: Math.round(mesures.value.affichage * progression),
      poids: Math.round(mesures.value.poids * progression),
      requetes: Math.round(mesures.value.requetes * progression),
    }

    if (t < 1) image = requestAnimationFrame(avancer)
  }

  image = requestAnimationFrame(avancer)
}

onMounted(() => {
  // On attend la fin du chargement pour compter toutes les ressources.
  if (document.readyState === 'complete') {
    setTimeout(relever, 260)
  } else {
    window.addEventListener('load', () => setTimeout(relever, 260), { once: true })
  }
})

onBeforeUnmount(() => {
  if (image) cancelAnimationFrame(image)
})
</script>

<template>
  <figure class="console" :class="{ 'console--prete': anime }">
    <figcaption class="console__entete">
      <span class="console__pastille" aria-hidden="true"></span>
      Cette page, en direct
    </figcaption>

    <dl class="console__mesures">
      <div class="mesure">
        <dt>Affichage</dt>
        <dd>
          <span class="mesure__valeur">{{ mesures ? affichage.affichage : '—' }}</span>
          <span class="mesure__unite">ms</span>
        </dd>
      </div>

      <div class="mesure">
        <dt>Poids de la page</dt>
        <dd>
          <span class="mesure__valeur">{{ mesures ? affichage.poids : '—' }}</span>
          <span class="mesure__unite">Ko</span>
        </dd>
      </div>

      <div class="mesure">
        <dt>Requêtes réseau</dt>
        <dd>
          <span class="mesure__valeur">{{ mesures ? affichage.requetes : '—' }}</span>
        </dd>
      </div>
    </dl>

    <p class="console__note">
      Mesuré dans votre navigateur, à l'instant. Votre site aussi sera taillé
      pour la vitesse.
    </p>
  </figure>
</template>

<style scoped>
.console {
  position: relative;
  margin: 0;
  padding: 30px 34px 26px;
  border-radius: var(--bw-radius-lg);
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.055) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 40px 90px rgba(0, 0, 0, 0.45);
  /* Hauteur réservée : les chiffres arrivent après le chargement,
     la page ne doit pas sauter pour autant. */
  min-height: 340px;
}

/* Liseré en dégradé plutôt qu'une bordure pleine : plus proche de
   l'esprit « verre + lumière » que d'un simple cadre. */
.console::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(
    155deg,
    rgba(139, 92, 246, 0.55),
    rgba(255, 122, 69, 0.18) 55%,
    rgba(255, 255, 255, 0.06)
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.console__entete {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.console__pastille {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bw-gradient);
  box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.6);
  animation: battement 2.4s ease-out infinite;
}

@keyframes battement {
  0% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.5);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(139, 92, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
  }
}

.console__mesures {
  margin: 0;
  padding: 0;
}

.mesure {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  padding: 19px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.mesure dt {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.88rem;
}

.mesure dd {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin: 0;
}

.mesure__valeur {
  font-family: var(--font-texte);
  font-size: 2.1rem;
  font-weight: 800;
  line-height: 1;
  color: var(--bw-text);
  letter-spacing: -0.01em;
  /* Chiffres à chasse fixe : la largeur ne bouge pas pendant le décompte. */
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum';
}

.mesure__unite {
  color: rgba(255, 255, 255, 0.42);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
}

.console__note {
  margin: 20px 0 0;
  color: rgba(255, 255, 255, 0.42);
  font-size: 0.8rem;
  line-height: 1.55;
  max-width: 40ch;
}

@media (max-width: 640px) {
  .console {
    padding: 24px 22px 22px;
    min-height: 310px;
  }

  .mesure__valeur {
    font-size: 1.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .console__pastille {
    animation: none;
  }
}
</style>
