import { createRouter, createWebHistory } from 'vue-router'
import Show from './Pages/Show.vue'
import Insert from './Pages/Insert.vue'

const routes = [
    { path: '/', name: 'Show', component: Show },
    { path: '/insert', name: 'Insert', component: Insert },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
