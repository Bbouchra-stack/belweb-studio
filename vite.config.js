import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Site multi-pages : l'accueil plus les pages légales, chacune avec sa
// propre URL (meilleur pour le référencement et obligatoire pour pouvoir
// être liée depuis l'extérieur).
export default defineConfig({
  // En développement local, le site tourne à la racine ("/"). Une fois
  // construit sur GitHub Actions, il est publié sous /belweb-studio/
  // (adresse d'un site de projet GitHub Pages) : la base doit suivre.
  base: process.env.GITHUB_ACTIONS ? '/belweb-studio/' : '/',
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
