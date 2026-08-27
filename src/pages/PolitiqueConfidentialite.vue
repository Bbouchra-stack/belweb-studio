<script setup>
import LegalLayout from '../components/LegalLayout.vue'
import { coordonnees, hebergeur } from '../composables/coordonnees.js'
</script>

<template>
  <LegalLayout
    titre="Politique de confidentialité"
    chapeau="Comment BELWEB Studio collecte, utilise et protège vos données personnelles, conformément à la loi n° 09-08 et sous le contrôle de la CNDP."
    mise-a-jour="août 2026"
  >
    <h2>1. Qui est responsable du traitement&nbsp;?</h2>
    <p>
      Le responsable du traitement des données collectées sur ce site est
      <strong>{{ coordonnees.nom }}</strong>, dont le siège est situé
      {{ coordonnees.adresseLigne1 }}, {{ coordonnees.adresseLigne2 }}, Maroc.
    </p>
    <ul>
      <li><strong>E-mail&nbsp;:</strong> {{ coordonnees.email }}</li>
      <li><strong>Téléphone&nbsp;:</strong> {{ coordonnees.telephoneAffiche }}</li>
      <li>
        <strong>Déclaration CNDP&nbsp;:</strong>
        sera communiqué dès réception
      </li>
    </ul>
    <p>
      Ce traitement est soumis à la <strong>loi n° 09-08 du 18 février 2009
      relative à la protection des personnes physiques à l'égard du traitement
      des données à caractère personnel</strong> et à son décret d'application
      n° 2-09-165, sous le contrôle de la <strong>Commission Nationale de
      contrôle de la protection des Données à caractère Personnel
      (CNDP)</strong>.
    </p>

    <h2>2. Quelles données collectons-nous&nbsp;?</h2>
    <p>
      Nous appliquons le principe de minimisation&nbsp;: nous ne collectons que
      les données strictement nécessaires au traitement de votre demande.
    </p>

    <p>
      Nous ne collectons <strong>aucune donnée sensible</strong> au sens de
      l'article 1er de la loi 09-08. Merci de ne pas faire figurer
      d'informations de cette nature dans le champ « description du projet », en
      particulier s'agissant de données concernant vos clients.
    </p>

    <h2>3. Sur quel fondement&nbsp;?</h2>
    <p>
      Le traitement repose sur <strong>votre consentement</strong>, exprimé par
      l'envoi volontaire du formulaire de contact ou d'un message WhatsApp
      (article 4 de la loi 09-08), ainsi que sur l'exécution de mesures
      précontractuelles prises à votre demande (établissement d'un devis).
    </p>

    <h2>4. Qui a accès à vos données&nbsp;?</h2>
    <p>
      Vos données sont destinées aux seules personnes habilitées de
      {{ coordonnees.nom }} chargées du suivi commercial. Elles peuvent être
      hébergées par notre prestataire technique
      <strong>{{ hebergeur.nom }}</strong> ({{ hebergeur.adresse }}), agissant
      en qualité de sous-traitant et tenu à une obligation de confidentialité.
    </p>
    <p>
      <strong>Vos données ne sont ni vendues, ni louées, ni échangées</strong>
      avec des tiers à des fins commerciales.
    </p>
    <h2>5. Quels sont vos droits&nbsp;?</h2>
    <p>
      Conformément aux articles 7, 8 et 9 de la loi 09-08, vous disposez
      des droits suivants&nbsp;:
    </p>
    <ul>
      <li>
        <strong>Droit d'accès&nbsp;:</strong> obtenir confirmation que des
        données vous concernant sont traitées et en recevoir communication.
      </li>
      <li>
        <strong>Droit de rectification&nbsp;:</strong> faire corriger, compléter
        ou mettre à jour des données inexactes ou incomplètes.
      </li>
      <li>
        <strong>Droit de suppression&nbsp;:</strong> demander l'effacement des
        données dont le traitement n'est pas conforme à la loi.
      </li>
      <li>
        <strong>Droit d'opposition&nbsp;:</strong> vous opposer, pour des motifs
        légitimes, au traitement de vos données, et sans avoir à vous justifier
        lorsqu'il s'agit de prospection commerciale.
      </li>
    </ul>
    <p>
      Pour exercer ces droits, écrivez-nous à
      <a :href="`mailto:${coordonnees.email}`">{{ coordonnees.email }}</a> ou
      appelez-nous au
      <span class="tel-entier">{{ coordonnees.telephoneAffiche }}</span>, en
      joignant une copie d'une pièce d'identité. Nous vous répondons dans un
      délai maximum de 30 jours.
    </p>
    <p>
      Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir
      la CNDP&nbsp;: <a href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer">www.cndp.ma</a>.
    </p>

    <h2>6. Cookies</h2>
    <p>
      Un cookie est un petit fichier déposé sur votre appareil lors de la
      consultation d'un site. Ce site en utilise un nombre volontairement
      limité&nbsp;:
    </p>
    <ul>
      <li>
        <strong>Cookies strictement nécessaires&nbsp;:</strong> ils mémorisent
        votre choix de consentement et permettent le bon fonctionnement du site.
        Ils ne nécessitent pas votre accord préalable et ne servent à aucun
        suivi.
      </li>
      <li>
        <strong>Mesure d'audience&nbsp;:</strong> statistiques anonymes de
        fréquentation, déposées <strong>uniquement après votre accord</strong>
        via le bandeau affiché lors de votre première visite.
      </li>
      <li>
        <strong>Aucun cookie publicitaire</strong> ni traceur de réseaux sociaux
        n'est déposé sur ce site.
      </li>
    </ul>
    <p>
      Vous pouvez modifier votre choix à tout moment via le lien « Gérer mes
      cookies » présent en bas de chaque page, ou supprimer les cookies déjà
      déposés depuis les réglages de votre navigateur.
    </p>

    <h2>7. Sécurité</h2>
    <p>
      Nous mettons en œuvre les mesures techniques et organisationnelles
      appropriées pour protéger vos données contre la perte, l'altération, la
      divulgation ou l'accès non autorisé&nbsp;: connexion chiffrée (HTTPS),
      accès aux données limité aux personnes habilitées, mots de passe robustes
      et sauvegardes régulières.
    </p>

    <h2>8. WhatsApp et services tiers</h2>
    <p>
      Si vous choisissez de nous contacter via WhatsApp, votre échange est régi
      par la politique de confidentialité de ce service, sur laquelle nous
      n'avons aucun contrôle. Nous vous invitons à ne pas y transmettre
      d'informations confidentielles ou sensibles.
    </p>

    <h2>9. Modification de la présente politique</h2>
    <p>
      Cette politique peut être mise à jour pour tenir compte d'évolutions
      légales ou techniques. La date de dernière mise à jour figure en haut de
      cette page&nbsp;; nous vous invitons à la consulter régulièrement.
    </p>

    <h2>10. Nous contacter</h2>
    <p>
      Pour toute question relative à vos données personnelles&nbsp;:
      <a :href="`mailto:${coordonnees.email}`">{{ coordonnees.email }}</a> —
      <span class="tel-entier">{{ coordonnees.telephoneAffiche }}</span>.
    </p>
  </LegalLayout>
</template>

<style scoped>
p,
li {
  text-align: justify;
}

.tel-entier {
  white-space: nowrap;
}
</style>
