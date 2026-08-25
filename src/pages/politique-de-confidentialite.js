import { createApp } from 'vue'
import '../style.css'
import PolitiqueConfidentialite from './PolitiqueConfidentialite.vue'
import reveal from '../directives/reveal.js'

createApp(PolitiqueConfidentialite).directive('reveal', reveal).mount('#app')
