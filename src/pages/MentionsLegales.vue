<script setup>
import LegalLayout from '../components/LegalLayout.vue'
import { coordonnees, hebergeur } from '../composables/coordonnees.js'
</script>

<template>
  <LegalLayout
    titre="Mentions légales"
    chapeau="Informations légales relatives au site belwebstudio.ma, conformément à la législation marocaine en vigueur."
    mise-a-jour="août 2026"
  >
    <div class="encadre">
      <p>
        <strong>Reste à compléter avant la mise en ligne :</strong> le numéro de
        récépissé de déclaration à la CNDP (section 4). Nous vous recommandons
        également de faire relire ces pages par un juriste avant publication.
      </p>
    </div>

    <h2>1. Éditeur du site</h2>
    <p>Le présent site est édité par&nbsp;:</p>
    <ul>
      <li><strong>Dénomination sociale&nbsp;:</strong> {{ coordonnees.nom }}</li>
      <li><strong>Forme juridique&nbsp;:</strong> {{ coordonnees.formeJuridique }}</li>
      <li>
        <strong>Siège social&nbsp;:</strong> {{ coordonnees.adresseLigne1 }},
        {{ coordonnees.adresseLigne2 }}, Maroc
      </li>
      <li>
        <strong>Identifiant Commun de l'Entreprise (ICE)&nbsp;:</strong>
        n° {{ coordonnees.ice }}
      </li>
      <li><strong>Téléphone&nbsp;:</strong> {{ coordonnees.telephoneAffiche }}</li>
      <li><strong>E-mail&nbsp;:</strong> {{ coordonnees.email }}</li>
    </ul>

    <h2>2. Hébergement du site</h2>
    <p>Le site est hébergé par&nbsp;:</p>
    <ul>
      <li><strong>Hébergeur&nbsp;:</strong> {{ hebergeur.nom }}</li>
      <li><strong>Adresse&nbsp;:</strong> {{ hebergeur.adresse }}</li>
      <li>
        <strong>Site web&nbsp;:</strong>
        <a :href="hebergeur.siteLien" target="_blank" rel="noopener noreferrer">
          {{ hebergeur.siteAffiche }}
        </a>
      </li>
    </ul>

    <h2>3. Propriété intellectuelle</h2>
    <p>
      L'ensemble des éléments composant ce site — structure, textes, visuels,
      photographies, logos, icônes, chartes graphiques, code source — est la
      propriété exclusive de {{ coordonnees.nom }} ou de ses partenaires, et est
      protégé par la <strong>loi n° 2-00 relative aux droits d'auteur et droits
      voisins</strong>, telle que modifiée et complétée.
    </p>
    <p>
      Toute reproduction, représentation, modification, publication ou
      adaptation, totale ou partielle, de ces éléments, quel que soit le moyen
      ou le procédé utilisé, est interdite sans autorisation écrite préalable de
      {{ coordonnees.nom }}. Toute exploitation non autorisée est susceptible
      d'engager la responsabilité de son auteur et de constituer une contrefaçon
      sanctionnée par la loi.
    </p>
    <p>
      Les maquettes présentées dans la section Portfolio sont des visuels
      d'illustration. Les marques et logos de clients éventuellement présentés
      restent la propriété de leurs détenteurs respectifs.
    </p>

    <h2>4. Protection des données personnelles</h2>
    <p>
      Les traitements de données à caractère personnel réalisés depuis ce site
      sont soumis à la <strong>loi n° 09-08 relative à la protection des
      personnes physiques à l'égard du traitement des données à caractère
      personnel</strong> et à son décret d'application n° 2-09-165, sous le
      contrôle de la <strong>Commission Nationale de contrôle de la protection
      des Données à caractère Personnel (CNDP)</strong>.
    </p>
    <ul>
      <li>
        <strong>Déclaration CNDP&nbsp;:</strong>
        <span class="a-completer">n° de récépissé de déclaration</span>
      </li>
    </ul>
    <p>
      Les modalités de collecte, les finalités, les durées de conservation et
      les modalités d'exercice de vos droits sont détaillées dans notre
      <a href="politique-de-confidentialite.html">politique de confidentialité</a>.
    </p>

    <h2>5. Commerce et échanges électroniques</h2>
    <p>
      Les échanges effectués via ce site (formulaire de contact, courriers
      électroniques) relèvent de la <strong>loi n° 53-05 relative à l'échange
      électronique de données juridiques</strong>. Les informations relatives
      aux prestations proposées sont fournies à titre indicatif&nbsp;; seul le
      devis signé entre les parties a valeur contractuelle, dans les
      conditions précisées par nos <a href="cgv.html">conditions générales
      de vente</a>.
    </p>

    <h2>6. Limitation de responsabilité</h2>
    <p>
      {{ coordonnees.nom }} s'efforce d'assurer l'exactitude et la mise à jour
      des informations diffusées sur ce site, sans pouvoir en garantir
      l'exhaustivité. Les informations sont fournies à titre indicatif et sont
      susceptibles d'évoluer à tout moment.
    </p>
    <p>
      {{ coordonnees.nom }} ne saurait être tenue responsable des dommages
      directs ou indirects résultant de l'accès au site, de son utilisation, ou
      d'une interruption de service. L'utilisateur est seul responsable de
      l'usage qu'il fait des informations consultées.
    </p>

    <h2>7. Liens hypertextes</h2>
    <p>
      Ce site peut contenir des liens vers des sites tiers (réseaux sociaux,
      WhatsApp, partenaires). {{ coordonnees.nom }} n'exerce aucun contrôle sur
      ces sites et décline toute responsabilité quant à leur contenu, leurs
      pratiques ou leurs politiques de confidentialité.
    </p>
    <p>
      La création d'un lien pointant vers ce site est libre, sous réserve qu'elle
      ne porte pas atteinte à l'image de {{ coordonnees.nom }} et que la page
      liée ne soit pas insérée dans un cadre (frame).
    </p>

    <h2>8. Droit applicable et juridiction compétente</h2>
    <p>
      Les présentes mentions légales sont régies par le droit marocain. En cas
      de litige, et à défaut de résolution amiable, compétence exclusive est
      attribuée aux tribunaux compétents de Casablanca.
    </p>

    <h2>9. Nous contacter</h2>
    <p>
      Pour toute question relative aux présentes mentions légales&nbsp;:
      <a :href="`mailto:${coordonnees.email}`">{{ coordonnees.email }}</a> —
      {{ coordonnees.telephoneAffiche }} — {{ coordonnees.adresseLigne1 }},
      {{ coordonnees.adresseLigne2 }}.
    </p>
  </LegalLayout>
</template>
