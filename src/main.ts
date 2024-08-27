import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/tailwind.css'
import router from './router'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App).use(router).mount('#app')
