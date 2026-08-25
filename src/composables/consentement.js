import { ref } from 'vue'

/**
 * État partagé du consentement aux cookies.
 *
 * Le bandeau se présente en trois temps :
 *  1. carte compacte affichée à l'arrivée sur le site ;
 *  2. après quelques secondes sans réponse, elle s'efface au profit
 *     d'une simple pastille discrète (« mise de côté ») ;
 *  3. une fois le choix fait, tout disparaît — il reste rappelable
 *     depuis le pied de page.
 *
 * Le choix est mémorisé dans le navigateur (localStorage).
 */

const CLE = 'belweb-consentement-cookies'

function lireChoix() {
  try {
    return localStorage.getItem(CLE)
  } catch {
    // Navigation privée ou stockage bloqué : on considère qu'aucun choix n'a été fait.
    return null
  }
}

function ecrireChoix(valeur) {
  try {
    localStorage.setItem(CLE, valeur)
  } catch {
    // Sans stockage disponible, le choix ne vaut que pour la visite en cours.
  }
}

export const choixCookies = ref(lireChoix())

/** Le composant cookies est-il présent à l'écran (carte ou pastille) ? */
export const banniereVisible = ref(choixCookies.value === null)

/** Est-il replié en pastille discrète ? */
export const banniereReduite = ref(false)

/**
 * Horodatage du dernier choix effectué pendant cette visite.
 * Sert à ne pas enchaîner immédiatement le bandeau et la fenêtre
 * d'invitation : une seule sollicitation à la fois.
 */
export const momentDuChoix = ref(0)

function enregistrer(valeur) {
  choixCookies.value = valeur
  ecrireChoix(valeur)
  momentDuChoix.value = Date.now()
  banniereVisible.value = false
  banniereReduite.value = false
}

export function accepterCookies() {
  enregistrer('accepte')
}

export function refuserCookies() {
  enregistrer('refuse')
}

/** Passe la carte en pastille discrète, sans enregistrer de choix. */
export function reduireBanniere() {
  banniereReduite.value = true
}

/** Redéploie la carte depuis la pastille. */
export function deplierBanniere() {
  banniereReduite.value = false
}

/** Rappelle le bandeau (lien « Gérer mes cookies » du pied de page). */
export function rouvrirBanniere() {
  banniereReduite.value = false
  banniereVisible.value = true
}
