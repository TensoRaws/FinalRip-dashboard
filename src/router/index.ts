import type { Component } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import Code from '@/views/Code.vue'
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
      path: '/code',
      component: Code,
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
    {
      path: '/task/:videoKey',
      component: (): Component => import('@/views/Task.vue'),
      props: (to): any => ({ videoKey: to.params.videoKey }),
    },
  ],
})
