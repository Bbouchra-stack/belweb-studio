import { createApp } from 'vue'
import '../style.css'
import MentionsLegales from './MentionsLegales.vue'
import reveal from '../directives/reveal.js'

createApp(MentionsLegales).directive('reveal', reveal).mount('#app')
