import { createRouter, createWebHashHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import List from '@/views/List.vue'
import Setting from '@/views/Setting.vue'
import Start from '@/views/Start.vue'
import Upload from '@/views/Upload.vue'

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
    {
      path: '/setting',
      component: Setting,
    },
  ],
})
