<script setup>
import LegalLayout from '../components/LegalLayout.vue'
import { coordonnees } from '../composables/coordonnees.js'
</script>

<template>
  <LegalLayout
    titre="Conditions générales de vente"
    chapeau="Conditions applicables à toute prestation commandée auprès de BELWEB Studio, conformément au droit marocain."
    mise-a-jour="août 2026"
  >
    <p>
      {{ coordonnees.nom }} («&nbsp;le Studio&nbsp;») est une entreprise
      individuelle relevant du régime de l'auto-entrepreneur, Identifiant
      Commun de l'Entreprise (ICE) n° {{ coordonnees.ice }}, dont le siège est
      situé {{ coordonnees.adresseLigne1 }}, {{ coordonnees.adresseLigne2 }}.
      Les présentes conditions générales de vente («&nbsp;CGV&nbsp;»)
      régissent les relations entre le Studio et toute personne physique ou
      morale lui passant commande («&nbsp;le Client&nbsp;»). Toute commande
      implique l'acceptation pleine et entière des présentes CGV, qui
      prévalent sur tout autre document sauf accord écrit contraire.
    </p>

    <h2>1. Prestations concernées</h2>
    <p>
      Les présentes CGV s'appliquent à l'ensemble des prestations du Studio&nbsp;:
      conception et développement de sites web, nom de domaine, hébergement,
      maintenance, automatisation de tâches par intelligence artificielle et
      prestations annexes. Le contenu précis de chaque prestation, son prix
      et ses délais sont détaillés dans le devis accepté par le Client, qui
      fait foi entre les parties pour l'ensemble du projet.
    </p>

    <h2>2. Devis et formation du contrat</h2>
    <p>
      Chaque projet fait l'objet d'un devis gratuit et détaillé. Le contrat
      est formé dès l'acceptation écrite du devis par le Client — signature,
      e-mail ou tout support durable équivalent, conformément à la
      <strong>loi n° 53-05 relative à l'échange électronique de données
      juridiques</strong> — et le versement de l'acompte prévu à l'article 3.
      Le Client s'engage à transmettre dans les délais convenus les contenus,
      accès et informations nécessaires&nbsp;; tout retard de sa part reporte
      d'autant la livraison, sans que la responsabilité du Studio puisse être
      engagée à ce titre.
    </p>

    <h2>3. Prix et paiement</h2>
    <p>
      Les prix sont exprimés en dirhams marocains et nets de taxe, le Studio
      relevant du régime de l'auto-entrepreneur. Sauf mention contraire au
      devis, un acompte de 30&nbsp;% est versé à la commande et le solde est
      réglé avant la mise en ligne ou la remise des livrables finaux. Les
      prestations récurrentes (hébergement, maintenance) sont facturées selon
      une périodicité annuelle ou mensuelle précisée au devis. Tout retard de
      paiement peut entraîner la suspension de la prestation jusqu'à
      régularisation, ainsi que des pénalités calculées conformément à la
      réglementation en vigueur.
    </p>

    <h2>4. Délais de réalisation</h2>
    <p>
      Les délais annoncés sont donnés à titre indicatif et courent à compter
      de la réception de l'ensemble des éléments nécessaires fournis par le
      Client. Ils ne constituent pas une obligation de résultat&nbsp;: un
      dépassement raisonnable ne peut donner lieu à annulation de commande ni
      à indemnité, sauf faute caractérisée et injustifiée du Studio.
    </p>

    <h2>5. Responsabilité du Studio</h2>
    <p>
      Le Studio est tenu à une obligation de moyens&nbsp;: il s'engage à
      apporter tout le soin nécessaire à la réalisation de la prestation,
      conformément aux règles de l'art. Sa responsabilité ne saurait être
      engagée en cas de dysfonctionnement résultant d'une mauvaise
      utilisation par le Client, d'une intervention non autorisée d'un tiers
      sur la prestation livrée, d'une interruption du réseau Internet, ou du
      fait d'un prestataire tiers (hébergeur, bureau d'enregistrement de noms
      de domaine) sur lequel le Studio n'exerce pas de contrôle direct.
    </p>

    <h2>6. Propriété intellectuelle</h2>
    <p>
      Les contenus fournis par le Client (textes, images, logo, données)
      restent son entière propriété&nbsp;; il garantit détenir les droits
      nécessaires à leur utilisation et garantit le Studio contre toute
      réclamation d'un tiers à ce sujet. Les créations du Studio (design,
      code, intégrations techniques) demeurent sa propriété jusqu'au paiement
      intégral de la prestation. Ce paiement emporte cession au Client des
      droits d'exploitation nécessaires au seul usage du site livré, à
      l'exclusion de toute revente ou duplication des sources à un tiers.
    </p>

    <h2>7. Données personnelles</h2>
    <p>
      Les données à caractère personnel collectées dans le cadre de la
      relation commerciale sont traitées conformément à la
      <strong>loi n° 09-08 relative à la protection des personnes physiques
      à l'égard du traitement des données à caractère personnel</strong> et à
      son décret d'application n° 2-09-165, sous le contrôle de la CNDP. Le
      détail de ce traitement figure dans notre
      <a href="politique-de-confidentialite.html">politique de confidentialité</a>.
    </p>

    <h2>8. Force majeure</h2>
    <p>
      Le Studio ne peut être tenu responsable d'un retard ou d'une
      inexécution résultant d'un événement de force majeure au sens du
      <strong>Code des obligations et des contrats</strong> — événement
      extérieur aux parties, imprévisible et irrésistible — qui rend
      impossible l'exécution normale de la prestation.
    </p>

    <h2>9. Références commerciales</h2>
    <p>
      Sauf opposition écrite du Client, le Studio peut mentionner son nom et
      présenter la prestation réalisée à titre de référence commerciale,
      notamment dans son portfolio et sur ses réseaux professionnels.
    </p>

    <h2>10. Modification des CGV</h2>
    <p>
      Le Studio peut modifier les présentes CGV à tout moment. La version
      applicable à un projet est celle en vigueur à la date d'acceptation du
      devis correspondant par le Client.
    </p>

    <h2>11. Droit applicable et litiges</h2>
    <p>
      Les présentes CGV sont soumises au droit marocain. Tout litige relatif
      à leur interprétation ou à leur exécution qui n'aurait pu être résolu à
      l'amiable relève de la compétence exclusive du Tribunal de commerce de
      Casablanca.
    </p>

    <h2>12. Nous contacter</h2>
    <p>
      Pour toute question relative aux présentes conditions générales de
      vente&nbsp;:
      <a :href="`mailto:${coordonnees.email}`">{{ coordonnees.email }}</a> —
      {{ coordonnees.telephoneAffiche }} — {{ coordonnees.adresseLigne1 }},
      {{ coordonnees.adresseLigne2 }}.
    </p>
  </LegalLayout>
</template>
