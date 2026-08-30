import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Site multi-pages : l'accueil plus les pages légales, chacune avec sa
// propre URL (meilleur pour le référencement et obligatoire pour pouvoir
// être liée depuis l'extérieur).
export default defineConfig({
  // Chemins relatifs : le site doit fonctionner à la fois sous
  // bbouchra-stack.github.io/belweb-studio/ (sous-dossier) et sous le nom
  // de domaine personnalisé (racine) — un chemin absolu comme
  // "/belweb-studio/..." casserait le second cas (page blanche, JS introuvable).
  base: './',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        accueil: resolve(import.meta.dirname, 'index.html'),
        mentionsLegales: resolve(import.meta.dirname, 'mentions-legales.html'),
        confidentialite: resolve(import.meta.dirname, 'politique-de-confidentialite.html'),
        cgv: resolve(import.meta.dirname, 'cgv.html'),
      },
    },
  },
})
