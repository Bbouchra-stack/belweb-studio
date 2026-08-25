<script setup>
import { lienWhatsapp } from '../composables/coordonnees.js'
import { banniereReduite, banniereVisible } from '../composables/consentement.js'
</script>

<template>
  <a
    class="whatsapp"
    :class="{ 'whatsapp--releve': banniereVisible && !banniereReduite }"
    :href="lienWhatsapp"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="whatsapp__pastille" aria-hidden="true"></span>
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path
        d="M16.04 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.73 6.42L3.2 28.8l6.55-1.71a12.75 12.75 0 0 0 6.29 1.64h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05a12.7 12.7 0 0 0-9.05-3.68zm0 23.34h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.57 10.57 0 0 1-1.62-5.66c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"
      />
    </svg>
    <span class="sr-only">Nous écrire sur WhatsApp</span>
    <span class="whatsapp__infobulle" aria-hidden="true">Écrivez-nous sur WhatsApp</span>
  </a>
</template>

<style scoped>
.whatsapp {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 60;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--bw-gradient);
  color: #fff;
  box-shadow: 0 12px 28px rgba(139, 92, 246, 0.32), 0 8px 20px rgba(255, 91, 110, 0.24);
  transition: transform 0.25s ease, box-shadow 0.25s ease, bottom 0.3s ease;
}

.whatsapp:hover {
  color: #fff;
  transform: scale(1.07);
  box-shadow: 0 16px 34px rgba(139, 92, 246, 0.4), 0 10px 24px rgba(255, 91, 110, 0.3);
}

.whatsapp svg {
  position: relative;
  width: 32px;
  height: 32px;
}

/* Halo qui pulse doucement pour attirer l'œil */
.whatsapp__pastille {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: var(--bw-coral);
  opacity: 0.55;
  animation: pulsation 2.6s ease-out infinite;
}

@keyframes pulsation {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.55);
    opacity: 0;
  }
  100% {
    transform: scale(1.55);
    opacity: 0;
  }
}

.whatsapp__infobulle {
  position: absolute;
  right: calc(100% + 14px);
  white-space: nowrap;
  padding: 9px 16px;
  border-radius: 4px;
  background-color: var(--bw-bg-alt);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 500;
  opacity: 0;
  transform: translateX(8px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.whatsapp:hover .whatsapp__infobulle,
.whatsapp:focus-visible .whatsapp__infobulle {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 640px) {
  .whatsapp {
    right: 16px;
    bottom: 16px;
    width: 54px;
    height: 54px;
  }

  .whatsapp svg {
    width: 29px;
    height: 29px;
  }

  .whatsapp__infobulle {
    display: none;
  }

  /* Sur mobile seulement, la carte cookies occupe toute la largeur du bas :
     on remonte le bouton pour ne pas la recouvrir. */
  .whatsapp--releve {
    bottom: 150px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .whatsapp__pastille {
    animation: none;
    opacity: 0;
  }
}
</style>
