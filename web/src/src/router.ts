import { createRouter, createWebHistory } from 'vue-router'
import Edit from './components/Edit.vue'
import Hello from './components/HelloWorld.vue'
import Insert from './components/Insert.vue'
import General from './components/General.vue'

const routes = [
    { path: '/', name: 'Hello', component: Hello },
    { path: '/edit', name: 'Edit', component: Edit },
    { path: '/insert', name: 'Insert', component: Insert },
    { path: '/general', name: 'Insert', component: General },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
