/**
 * Coordonnées du studio, centralisées ici pour n'avoir qu'un seul
 * endroit à modifier en cas de changement.
 */

export const coordonnees = {
  nom: 'BELWEB Studio',
  formeJuridique: 'Auto-entrepreneur',
  ice: '002060971000064',
  telephoneAffiche: '+212 782 934 874',
  telephoneLien: '+212782934874',
  whatsapp: '212782934874',
  messageWhatsapp:
    'Bonjour BELWEB Studio, je souhaite des informations sur la création de mon site web.',
  email: 'contact@belwebstudio.ma',
  adresseLigne1: '374, Business Center',
  adresseLigne2: 'Bd Abdelmoumen — Casablanca',
  horaires: 'Du lundi au vendredi, 09h - 19h',
}

/** Prestataire technique qui héberge le site. */
export const hebergeur = {
  nom: 'Heberfacile',
  adresse: 'Bd Zerktouni — Casablanca',
  siteAffiche: 'www.heberfacile.com',
  siteLien: 'https://www.heberfacile.com',
}

export const lienWhatsapp = `https://wa.me/${coordonnees.whatsapp}?text=${encodeURIComponent(
  coordonnees.messageWhatsapp,
)}`
