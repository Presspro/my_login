import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('../code/login.vue')
        },
        {
            path: '/home/:id',
            name: 'home',
            component: () => import('../code/home.vue')
        }
    ]
})

export default router