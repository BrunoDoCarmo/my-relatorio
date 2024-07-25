// main.js ou main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faCoffee, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'

// Adicione os ícones à biblioteca
library.add(faUser, faCoffee, faClipboardList, faGithub, faStar)

// Crie a instância da aplicação e registre o componente FontAwesomeIcon globalmente
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
