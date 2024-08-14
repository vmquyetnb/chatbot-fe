import { bottom } from '@popperjs/core';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '',
    component: ()=> import('../layout/DefaultLayout.vue'),
    children: [
      {
        path: '/chat/:id',
        name : 'ChatWindow',
        component: ()=> import('../views/ChatWindow.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top : 0 }
  },
});

export default router;