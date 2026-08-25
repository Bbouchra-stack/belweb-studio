import { createApp } from 'vue'
import '../style.css'
import CGV from './CGV.vue'
import reveal from '../directives/reveal.js'

createApp(CGV).directive('reveal', reveal).mount('#app')
