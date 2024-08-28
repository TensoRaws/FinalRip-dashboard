import { createRouter, createWebHashHistory } from 'vue-router'
import Upload from '@/views/Upload.vue'
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Upload,
    },
  ],
})
