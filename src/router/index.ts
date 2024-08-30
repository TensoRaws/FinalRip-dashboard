import { createRouter, createWebHashHistory } from 'vue-router'
import Upload from '@/views/Upload.vue'
import Dashboard from '@/views/Dashboard.vue'
import Start from '@/views/Start.vue'
import List from '@/views/List.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Dashboard,
    },
    {
      path: '/upload',
      component: Upload,
    },
    {
      path: '/start',
      component: Start,
    },
    {
      path: '/list',
      component: List,
    },
  ],
})
