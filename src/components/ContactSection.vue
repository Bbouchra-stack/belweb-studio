<script setup>
import { reactive, ref } from 'vue'
import { coordonnees, lienWhatsapp } from '../composables/coordonnees.js'

const champsVides = () => ({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  projet: '',
})

const formulaire = reactive(champsVides())
const erreurs = reactive({})
const touches = reactive({})
const envoye = ref(false)
const envoiEnCours = ref(false)

const regexEmail = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
// Numéros marocains (06/07…, +212…) et internationaux courants.
const regexTelephone = /^(?:\+|00)?[1-9](?:[\s.-]?\d){7,14}$|^0[5-7](?:[\s.-]?\d){8}$/

function valider(champ) {
  const valeur = formulaire[champ].trim()

  switch (champ) {
    case 'prenom':
      if (!valeur) return 'Merci d’indiquer votre prénom.'
      if (valeur.length < 2) return 'Le prénom doit contenir au moins 2 caractères.'
      return ''
    case 'nom':
      if (!valeur) return 'Merci d’indiquer votre nom.'
      if (valeur.length < 2) return 'Le nom doit contenir au moins 2 caractères.'
      return ''
    case 'email':
      if (!valeur) return 'Merci d’indiquer votre adresse e-mail.'
      if (!regexEmail.test(valeur)) return 'Cette adresse e-mail ne semble pas valide.'
      return ''
    case 'telephone':
      if (!valeur) return 'Merci d’indiquer un numéro de téléphone.'
      if (!regexTelephone.test(valeur))
        return 'Numéro invalide (ex. : 06 12 34 56 78 ou +212 782 934 874).'
      return ''
    case 'projet':
      if (!valeur) return 'Décrivez-nous votre projet en quelques mots.'
      if (valeur.length < 20) return 'Merci de détailler un peu plus (20 caractères minimum).'
      return ''
    default:
      return ''
  }
}

function validerChamp(champ) {
  touches[champ] = true
  erreurs[champ] = valider(champ)
}

function effacerErreur(champ) {
  if (touches[champ]) {
    erreurs[champ] = valider(champ)
  }
}

async function soumettre() {
  let premierChampInvalide = null

  Object.keys(champsVides()).forEach((champ) => {
    touches[champ] = true
    erreurs[champ] = valider(champ)
    if (erreurs[champ] && !premierChampInvalide) premierChampInvalide = champ
  })

  if (premierChampInvalide) {
    document.getElementById(premierChampInvalide)?.focus()
    return
  }

  // Pas de backend pour l'instant : on simule l'envoi.
  envoiEnCours.value = true
  await new Promise((resolve) => setTimeout(resolve, 600))
  envoiEnCours.value = false
  envoye.value = true
}

function nouveauMessage() {
  Object.assign(formulaire, champsVides())
  Object.keys(erreurs).forEach((champ) => delete erreurs[champ])
  Object.keys(touches).forEach((champ) => delete touches[champ])
  envoye.value = false
}
</script>

<template>
  <section id="contact" class="section section--sombre contact">
    <div class="container contact__inner">
      <div class="contact__intro">
        <span class="eyebrow" v-reveal>Contact</span>
        <h2 class="section__title" v-reveal="60">Parlons de votre projet</h2>
        <p v-reveal="120">
          Décrivez-nous votre activité et vos besoins en quelques lignes. Nous
          revenons vers vous sous 24&nbsp;h ouvrées avec une première
          proposition et un devis gratuit.
        </p>

        <ul class="contact__points" v-reveal="180">
          <li>Premier échange gratuit et sans engagement</li>
          <li>Devis détaillé sous 48&nbsp;h</li>
          <li>Un interlocuteur unique du début à la fin</li>
        </ul>

        <div class="contact__coordonnees" v-reveal="240">
          <p>
            <strong>Téléphone</strong>
            <a :href="`tel:${coordonnees.telephoneLien}`">{{ coordonnees.telephoneAffiche }}</a>
          </p>
          <p>
            <strong>E-mail</strong>
            <a :href="`mailto:${coordonnees.email}`">{{ coordonnees.email }}</a>
          </p>
          <p>
            <strong>Adresse</strong>
            <span>
              {{ coordonnees.adresseLigne1 }}<br />
              {{ coordonnees.adresseLigne2 }}
            </span>
          </p>
        </div>

        <a
          class="contact__whatsapp"
          :href="lienWhatsapp"
          target="_blank"
          rel="noopener noreferrer"
          v-reveal="280"
        >
          <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path
              d="M16.04 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.42L3.2 28.8l6.55-1.71a12.75 12.75 0 0 0 6.29 1.64h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.68zm0 23.34h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.57 10.57 0 0 1-1.62-5.66c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"
            />
          </svg>
          Discuter sur WhatsApp
        </a>
      </div>

      <div class="contact__carte" v-reveal="140">
        <Transition name="fondu" mode="out-in">
          <div v-if="envoye" key="confirmation" class="confirmation" role="status">
            <span class="confirmation__icone" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h3>Merci, votre message est bien parti&nbsp;!</h3>
            <p>
              Nous avons bien reçu votre demande et revenons vers vous sous
              24&nbsp;h ouvrées à l'adresse indiquée.
            </p>
            <button type="button" class="btn btn--ghost" @click="nouveauMessage">
              Envoyer un autre message
            </button>
          </div>

          <form v-else key="formulaire" class="formulaire" novalidate @submit.prevent="soumettre">
            <div class="formulaire__ligne">
              <div class="champ">
                <label for="prenom">Prénom <span aria-hidden="true">*</span></label>
                <input
                  id="prenom"
                  v-model="formulaire.prenom"
                  type="text"
                  name="prenom"
                  autocomplete="given-name"
                  placeholder="Votre prénom"
                  :class="{ 'champ--erreur': erreurs.prenom }"
                  :aria-invalid="Boolean(erreurs.prenom)"
                  :aria-describedby="erreurs.prenom ? 'erreur-prenom' : undefined"
                  @blur="validerChamp('prenom')"
                  @input="effacerErreur('prenom')"
                />
                <p v-if="erreurs.prenom" id="erreur-prenom" class="champ__erreur">
                  {{ erreurs.prenom }}
                </p>
              </div>

              <div class="champ">
                <label for="nom">Nom <span aria-hidden="true">*</span></label>
                <input
                  id="nom"
                  v-model="formulaire.nom"
                  type="text"
                  name="nom"
                  autocomplete="family-name"
                  placeholder="Votre nom"
                  :class="{ 'champ--erreur': erreurs.nom }"
                  :aria-invalid="Boolean(erreurs.nom)"
                  :aria-describedby="erreurs.nom ? 'erreur-nom' : undefined"
                  @blur="validerChamp('nom')"
                  @input="effacerErreur('nom')"
                />
                <p v-if="erreurs.nom" id="erreur-nom" class="champ__erreur">
                  {{ erreurs.nom }}
                </p>
              </div>
            </div>

            <div class="formulaire__ligne">
              <div class="champ">
                <label for="email">E-mail <span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  v-model="formulaire.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="vous@exemple.ma"
                  :class="{ 'champ--erreur': erreurs.email }"
                  :aria-invalid="Boolean(erreurs.email)"
                  :aria-describedby="erreurs.email ? 'erreur-email' : undefined"
                  @blur="validerChamp('email')"
                  @input="effacerErreur('email')"
                />
                <p v-if="erreurs.email" id="erreur-email" class="champ__erreur">
                  {{ erreurs.email }}
                </p>
              </div>

              <div class="champ">
                <label for="telephone">Téléphone <span aria-hidden="true">*</span></label>
                <input
                  id="telephone"
                  v-model="formulaire.telephone"
                  type="tel"
                  name="telephone"
                  autocomplete="tel"
                  placeholder="06 12 34 56 78"
                  :class="{ 'champ--erreur': erreurs.telephone }"
                  :aria-invalid="Boolean(erreurs.telephone)"
                  :aria-describedby="erreurs.telephone ? 'erreur-telephone' : undefined"
                  @blur="validerChamp('telephone')"
                  @input="effacerErreur('telephone')"
                />
                <p v-if="erreurs.telephone" id="erreur-telephone" class="champ__erreur">
                  {{ erreurs.telephone }}
                </p>
              </div>
            </div>

            <div class="champ">
              <label for="projet">Description du projet <span aria-hidden="true">*</span></label>
              <textarea
                id="projet"
                v-model="formulaire.projet"
                name="projet"
                rows="5"
                placeholder="Votre activité, vos objectifs, le type de site souhaité, vos délais…"
                :class="{ 'champ--erreur': erreurs.projet }"
                :aria-invalid="Boolean(erreurs.projet)"
                :aria-describedby="erreurs.projet ? 'erreur-projet' : undefined"
                @blur="validerChamp('projet')"
                @input="effacerErreur('projet')"
              ></textarea>
              <p v-if="erreurs.projet" id="erreur-projet" class="champ__erreur">
                {{ erreurs.projet }}
              </p>
            </div>

            <p class="formulaire__mention">
              Les champs marqués d'un <span aria-hidden="true">*</span> sont
              obligatoires. Vos données servent uniquement à répondre à votre
              demande.
            </p>

            <button
              type="submit"
              class="btn btn--primary btn--block"
              :disabled="envoiEnCours"
              :aria-busy="envoiEnCours"
            >
              {{ envoiEnCours ? 'Envoi en cours…' : 'Envoyer ma demande' }}
            </button>
          </form>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 60px;
  align-items: start;
}

.contact__intro > p {
  color: var(--bw-text-muted);
  max-width: 46ch;
  text-align: justify;
}

.contact__points {
  margin: 30px 0;
  padding: 0;
  list-style: none;
}

.contact__points li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 13px;
  color: var(--bw-text-muted);
}

.contact__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 16px;
  height: 9px;
  border-left: 2px solid var(--bw-coral);
  border-bottom: 2px solid var(--bw-coral);
  transform: rotate(-45deg);
}

.contact__coordonnees {
  display: grid;
  gap: 20px;
  padding-top: 28px;
  border-top: 1px solid var(--bw-border);
}

.contact__coordonnees p {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  color: var(--bw-text-muted);
  font-size: 0.97rem;
}

.contact__coordonnees strong {
  color: var(--bw-purple);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.contact__coordonnees a {
  color: var(--bw-text);
}

.contact__coordonnees a:hover {
  color: var(--bw-coral);
}

.contact__whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 12px 24px;
  border: 1px solid var(--bw-border-strong);
  border-radius: var(--bw-radius-pill);
  color: var(--bw-text);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  transition: background-color var(--bw-duration-fast) var(--bw-ease),
    color var(--bw-duration-fast) var(--bw-ease),
    border-color var(--bw-duration-fast) var(--bw-ease);
}

.contact__whatsapp svg {
  width: 20px;
  height: 20px;
}

.contact__whatsapp:hover {
  background: var(--bw-gradient);
  border-color: transparent;
  color: #fff;
}

/* Carte formulaire */
.contact__carte {
  position: relative;
  overflow: hidden;
  padding: 40px;
  background-color: var(--c-surface);
  border-radius: var(--bw-radius);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
}

.contact__carte::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--bw-gradient);
}

.formulaire__ligne {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.champ {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.champ label {
  margin-bottom: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--c-ink);
}

.champ label span {
  color: var(--bw-purple);
}

.champ input,
.champ textarea {
  width: 100%;
  padding: 14px 16px;
  font: inherit;
  font-size: 0.97rem;
  color: var(--c-ink);
  background-color: var(--c-cream);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.champ textarea {
  resize: vertical;
  min-height: 130px;
}

.champ input::placeholder,
.champ textarea::placeholder {
  color: #a8aec2;
}

.champ input:focus,
.champ textarea:focus {
  outline: none;
  background-color: var(--c-surface);
  border-color: var(--bw-purple);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.18);
}

.champ--erreur {
  border-color: var(--c-error) !important;
  background-color: #fdf3f2;
}

.champ--erreur:focus {
  box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.15) !important;
}

.champ__erreur {
  margin: 8px 0 0;
  color: var(--c-error);
  font-size: 0.85rem;
}

.formulaire__mention {
  margin: 4px 0 22px;
  font-size: 0.56rem;
  color: var(--c-muted);
}

.formulaire__mention span {
  color: var(--bw-purple);
}

.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Confirmation */
.confirmation {
  text-align: center;
  padding: 28px 8px 14px;
}

.confirmation__icone {
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: var(--bw-gradient);
  color: #fff;
}

.confirmation__icone svg {
  width: 32px;
  height: 32px;
}

/* La carte reste claire même dans une section sombre : on impose la
   couleur du texte plutôt que d'hériter de .section--sombre h3. */
.confirmation h3 {
  color: var(--c-ink);
  font-family: var(--font-titre);
  font-size: 1.42rem;
}

.confirmation p {
  color: var(--c-muted);
  max-width: 42ch;
  margin: 0 auto 28px;
}

.fondu-enter-active,
.fondu-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.fondu-enter-from,
.fondu-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 980px) {
  .contact__inner {
    grid-template-columns: 1fr;
    gap: 44px;
  }
}

@media (max-width: 620px) {
  .contact__carte {
    padding: 28px 20px 30px;
  }

  .formulaire__ligne {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
