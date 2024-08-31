import '@/styles/tailwind.css'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App).use(pinia).use(router).mount('#app')
